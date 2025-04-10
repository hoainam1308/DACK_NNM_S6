const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const roleServices = require('../services/roleServices');
const userServices = require('../services/userServices');
const bcrypt = require('bcryptjs');
const {OAuth2Client} = require('google-auth-library');
const client_id = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(client_id);
const crypto = require('crypto');
// const mailer = require('../utils/mailer');

const { CreateSuccessResponseWithMessage, CreateErrorResponse, CreateSuccessResponse, CreateCookieResponse } = require('../utils/responseHandler');
const role = require('../schemas/role');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('role');

        if (!user) {
            return CreateErrorResponse(res, 401, 'Email hoặc mật khẩu không đúng.');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return CreateErrorResponse(res, 401, 'Email hoặc mật khẩu không đúng.');
        }
        let token = jwt.sign({ 
            id: user._id 
        }, process.env.JWT_SECRET, { expiresIn: '1h' })
        let exp = (new Date(Date.now() + 60 * 60 * 1000)).getTime();
        CreateCookieResponse(res, 'token', token, exp);
        return CreateSuccessResponseWithMessage(res, 200, 'Đăng nhập thành công', { user, token });
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password, role, fullName, phoneNumber, dateOfBirth } = req.body;
        const user = new User({ username, email, password, role, fullName, phoneNumber, dateOfBirth });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return CreateSuccessResponseWithMessage(res, 201, 'Đăng ký thành công', { user, token });
    } catch (error) {
        return CreateErrorResponse(res, 400, 'Lỗi đăng ký.');
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
        const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '2m' });
        return CreateSuccessResponseWithMessage(res, 201, 'Đăng ký thành công', { user: newUser, jwtToken });
    } else {
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return CreateSuccessResponseWithMessage(res, 200, 'Đăng nhập thành công', { user, jwtToken });
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return CreateErrorResponse(res, 404, 'Email không tồn tại.');
        }
        user.resetPasswordToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordTokenExp = (new Date(Date.now() + 10 * 60 * 1000));
        await user.save();
        const url = `http://localhost:3000/auth/resetpassword/${user.resetPasswordToken}`;
        // await mailer.sendMailForgotPassword(user.email, url);
        CreateSuccessResponse(res, 200, url);
    }
    catch (error) {
        return CreateErrorResponse(res, 500, error.message);
    }
}

const resetPassword = async (req, res, next) => {
    const  token = req.params.token;
    const { password } = req.body;
    const user = await userServices.getUserByToken(token);
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExp = null;
    await user.save();
    return CreateSuccessResponse(res, 200, user);
}


module.exports = { login, register, googleLogin, forgotPassword, resetPassword };
