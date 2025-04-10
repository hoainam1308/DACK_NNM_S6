const bookingService = require('../services/bookingServices');
const { CreateSuccessResponse, CreateErrorResponse, CreateSuccessResponseMessage, CreateSuccessResponseWithMessage } = require('../utils/responseHandler');

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = await bookingService.createBooking(bookingData);
        return CreateSuccessResponseWithMessage(res, 201, 'Booking created successfully', newBooking);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        return CreateSuccessResponse(res, 200, bookings);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) {
            return CreateErrorResponse(res, 404, 'Booking not found');
        }
        return CreateSuccessResponse(res, 200, booking);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

//Get booking by user ID
const getBookingByUserId = async (req, res) => {
    try {
        const booking = await bookingService.getBookingByUserId(req.params.id);
        if (!booking) {
            return CreateErrorResponse(res, 404, 'Booking not found');
        }
        return CreateSuccessResponse(res, 200, booking);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
    try {
        const updatedBooking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
        return CreateSuccessResponseWithMessage(res, 200, 'Booking status updated successfully', updatedBooking);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingByUserId,
    updateBookingStatus
};
