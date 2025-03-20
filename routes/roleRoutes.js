const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Public routes
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.post('/', roleController.createRole);

module.exports = router;