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
            profileImage: userData.profileImage
        });
        return await newUser.save();
    } catch (error) {
        throw error;
    }
};

module.exports = { getAllUsers, getUsersByRole, getUserByEmail, createUser };
