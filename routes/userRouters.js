const express = require('express');
const router = express.Router();
const { changePassword, getMyInformation, changeAvatar } = require('../controllers/userController');
const { authenticase} = require('../middlewares/auth');
const { uploadAvatar } = require('../middlewares/upload');

router.get('/me', authenticase, getMyInformation);
router.post('/changepassword', authenticase, changePassword);
router.post('/changeavatar', authenticase, uploadAvatar.single('avatar'), changeAvatar);

module.exports = router;
