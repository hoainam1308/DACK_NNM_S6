const { getAllUsers, getUsersByRole } = require('../services/userServices');

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsersByRoleController = async (req, res) => {
    try {
        const { roleId } = req.params;
        const users = await getUsersByRole(roleId);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsersController, getUsersByRoleController };
