const bcrypt = require('bcrypt');
const { getAllUsers, getUsersByRole } = require('../services/userServices');
const { CreateSuccessResponseWithMessage, CreateErrorResponse, CreateSuccessResponse, CreateSuccessResponseMessage } = require('../utils/responseHandler');

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        return CreateSuccessResponse(res, 200, users);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

const getUsersByRoleController = async (req, res) => {
    try {
        const { roleId } = req.params;
        const users = await getUsersByRole(roleId);
        return CreateSuccessResponse(res, 200, users);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

const getMyInformation = async (req, res) => {
    try {
        const user = req.user;
        return CreateSuccessResponse(res, 200, user);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return CreateErrorResponse(res, 400, 'Mật khẩu cũ không đúng.');
        }
        user.password = newPassword;
        await user.save();
        return CreateSuccessResponseMessage(res, 200, 'Đổi mật khẩu thành công.');
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = { getAllUsersController, getUsersByRoleController, changePassword, getMyInformation };
