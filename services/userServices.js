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

module.exports = { getAllUsers, getUsersByRole };
