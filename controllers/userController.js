const { getAllUsers, getUsersByRole } = require('../services/userServices');
const { CreateSuccessResponseWithMessage, CreateErrorResponse, CreateSuccessResponse, CreateSuccessResponseMessage } = require('../utils/responseHandler');

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        CreateSuccessResponse(res, 200, users);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

const getUsersByRoleController = async (req, res) => {
    try {
        const { roleId } = req.params;
        const users = await getUsersByRole(roleId);
        CreateSuccessResponse(res, 200, users);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = { getAllUsersController, getUsersByRoleController };
