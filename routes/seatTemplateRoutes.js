const express = require('express');
const router = express.Router();
const seatTemplateController = require('../controllers/seatTemplateController');

// Public routes
router.get('/', seatTemplateController.getAllSeatTemplates);
router.get('/:id', seatTemplateController.getSeatTemplateById);
router.post('/', seatTemplateController.createSeatTemplate);
router.put('/:id', seatTemplateController.updateSeatTemplate);
router.delete('/:id', seatTemplateController.deleteSeatTemplate);

module.exports = router;
