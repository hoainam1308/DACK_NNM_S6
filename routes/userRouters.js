const express = require('express');
const router = express.Router();
const { getAllUsersController, getUsersByRoleController } = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/', getAllUsersController);
router.get('/role/:roleId', getUsersByRoleController);

module.exports = router;
