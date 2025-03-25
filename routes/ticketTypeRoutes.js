const express = require('express');
const router = express.Router();
const ticketTypeController = require('../controllers/ticketTypeController');

// Create a new ticket type
router.post('/', ticketTypeController.createTicketType);

// Get all ticket types
router.get('/', ticketTypeController.getAllTicketTypes);

// Get ticket type by id
router.get('/:id', ticketTypeController.getTicketTypeById);

// Update ticket type by id
router.put('/:id', ticketTypeController.updateTicketType);

// Delete ticket type by id
router.delete('/:id', ticketTypeController.deleteTicketType);

module.exports = router;