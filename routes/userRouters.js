const express = require('express');
const router = express.Router();
const { getAllUsersController, changePassword, getMyInformation } = require('../controllers/userController');
const { authenticase} = require('../middlewares/auth');

router.get('/', getAllUsersController);
router.get('/me', authenticase, getMyInformation);
router.post('/changepassword', authenticase, changePassword);

module.exports = router;
