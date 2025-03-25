const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
const { CreateSuccessResponseWithMessage, CreateErrorResponse, CreateSuccessResponse, CreateSuccessResponseMessage } = require('../utils/responseHandler');

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

module.exports = { login, register };
