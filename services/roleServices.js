const Role = require('../schemas/role');

// Create a new role
const createRole = async (roleData) => {
    try {
        const newRole = new Role({
            roleName: roleData.roleName,
            description: roleData.description,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newRole.save();
    } catch (error) {
        throw error;
    }
};

// Get all Rolees
const getAllRoles = async () => {
    try {
        return await Role.find();
    } catch (error) {
        throw error;
    }
};

// Get role complex by ID
const getRoleById = async (id) => {
    try {
        const role = await Role.findById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById
};
