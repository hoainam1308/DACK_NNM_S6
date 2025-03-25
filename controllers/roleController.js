const roleService = require('../services/roleServices');
const { CreateSuccessResponseWithMessage, CreateErrorResponse, CreateSuccessResponse } = require('../utils/responseHandler');

// Create new role
const createRole = async (req, res) => {
    try {
        const roleData = req.body;
        const newRole = await roleService.createRole(roleData);
       CreateSuccessResponseWithMessage(res, 201, 'Role created successfully', newRole);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        CreateSuccessResponse(res, 200, roles);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get role by ID
const getRoleById = async (req, res) => {
    try {
        const role = await roleService.getRoleById(req.params.id);
        if (!role) {
            CreateErrorResponse(res, 404, 'Role not found');
        }
        CreateSuccessResponse(res, 200, role);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById
};
