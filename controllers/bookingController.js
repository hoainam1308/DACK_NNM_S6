const bookingService = require('../services/bookingServices');
const { CreateSuccessResponse, CreateErrorResponse, CreateSuccessResponseMessage, CreateSuccessResponseWithMessage } = require('../utils/responseHandler');

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = await bookingService.createBooking(bookingData);
        CreateSuccessResponseWithMessage(res, 201, 'Booking created successfully', newBooking);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        CreateSuccessResponse(res, 200, bookings);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) {
           CreateErrorResponse(res, 404, 'Booking not found');
        }
        CreateSuccessResponse(res, 200, booking);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

//Get booking by user ID
const getBookingByUserId = async (req, res) => {
    try {
        const booking = await bookingService.getBookingByUserId(req.params.id);
        if (!booking) {
            CreateErrorResponse(res, 404, 'Booking not found');
        }
        CreateSuccessResponse(res, 200, booking);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
    try {
        const updatedBooking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
        CreateSuccessResponseWithMessage(res, 200, 'Booking status updated successfully', updatedBooking);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingByUserId,
    updateBookingStatus
};
