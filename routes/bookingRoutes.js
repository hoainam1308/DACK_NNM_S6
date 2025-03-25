const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.get('/user/:id', bookingController.getBookingByUserId);
router.put('/:id', bookingController.updateBookingStatus);

module.exports = router;