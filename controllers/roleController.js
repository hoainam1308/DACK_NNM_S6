const roleService = require('../services/roleServices');

// Create new role
const createRole = async (req, res) => {
    try {
        const roleData = req.body;
        const newRole = await roleService.createRole(roleData);
        res.status(201).json({
            success: true,
            message: 'Role created successfully',
            data: newRole
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json({
            success: true,
            data: roles
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get role by ID
const getRoleById = async (req, res) => {
    try {
        const role = await roleService.getRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Role not found'
            });
        }
        res.status(200).json({
            success: true,
            data: role
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById
};
