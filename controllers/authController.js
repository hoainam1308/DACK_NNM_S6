const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const roleServices = require('../services/roleServices');
const bcrypt = require('bcryptjs');
const {OAuth2Client} = require('google-auth-library');
const client_id = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(client_id);

const { CreateSuccessResponseWithMessage, CreateErrorResponse, CreateSuccessResponse, CreateSuccessResponseMessage } = require('../utils/responseHandler');
const role = require('../schemas/role');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('role');

        if (!user) {
            CreateErrorResponse(res, 401, 'Email hoặc mật khẩu không đúng.');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            CreateErrorResponse(res, 401, 'Email hoặc mật khẩu không đúng.');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        CreateSuccessResponseWithMessage(res, 200, 'Đăng nhập thành công', { user, token });
    } catch (error) {
        CreateErrorResponse(res, 400, 'Lỗi đăng nhập.');
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password, role, fullName, phoneNumber, dateOfBirth } = req.body;
        const user = new User({ username, email, password, role, fullName, phoneNumber, dateOfBirth });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        CreateSuccessResponseWithMessage(res, 201, 'Đăng ký thành công', { user, token });
    } catch (error) {
        CreateErrorResponse(res, 400, 'Lỗi đăng ký.');
    }
};

const verifyGoogleToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: client_id
    });
    const payload = ticket.getPayload();
    return payload;
};

const googleLogin = async (req, res) => {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);
    const {email, name, sub} = payload;
    const user = await User.findOne({ email }).populate('role');
    if (!user) {
        const role = await roleServices.getRoleByName('Customer');
        const newUser = new User({
            username: email,
            email,
            fullName: name,
            role: role._id
        });
        await newUser.save();
        const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        CreateSuccessResponseWithMessage(res, 201, 'Đăng ký thành công', { user: newUser, jwtToken });
    } else {
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        CreateSuccessResponseWithMessage(res, 200, 'Đăng nhập thành công', { user, jwtToken });
    }
};




module.exports = { login, register, googleLogin };
