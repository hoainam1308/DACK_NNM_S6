const user = require('../schemas/user');
const User = require('../schemas/user');

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách người dùng.');
    }
};

const getUsersByRole = async (roleId) => {
    try {
        const users = await User.find({ role: roleId }).populate('role');
        return users;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách người dùng theo vai trò.');
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    }
    catch (error) {
        throw new Error('Lỗi khi lấy thông tin người dùng.');
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate('role');
        return user;
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin người dùng.');
    }
};

const getUserByToken = async (token) => {
    return await user.findOne({ resetPasswordToken: token});
}

const createUser = async (userData) => {
    try {
        const newUser = new User({
            role: userData.role,
            username: userData.username,
            password: userData.password,
            email: userData.email,
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber,
            dateOfBirth: userData.dateOfBirth,
            avatarUrl: userData.avatarUrl
        });
        return await newUser.save();
    } catch (error) {
        throw error;
    }
};

module.exports = { getAllUsers, getUsersByRole, getUserByEmail, getUserByToken, createUser };
