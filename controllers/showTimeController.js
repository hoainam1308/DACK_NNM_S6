const showTimeService = require('../services/showTimeServices');
const { CreateSuccessResponseWithMessage, CreateErrorResponse, CreateSuccessResponseMessage, CreateSuccessResponse } = require('../utils/responseHandler');

// Create a new ShowTime
const createShowTime = async (req, res) => {
    try {
        const showTimeData = req.body;
        const newShowTime = await showTimeService.createShowtime(showTimeData);
        return CreateSuccessResponseWithMessage(res, 201, 'ShowTime created successfully', newShowTime);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
}

// Get all ShowTimes
const getAllShowTimes = async (req, res) => {
    try {
        const includeInactive = req.query.includeInactive === 'true';
        const showTimes = await showTimeService.getAllShowtimes(includeInactive);
        return CreateSuccessResponse(res, 200, showTimes);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
}

// Get ShowTime by ID
const getShowTimeById = async (req, res) => {
    try {
        const showTime = await showTimeService.getShowtimeById(req.params.id);
        if (!showTime) {
            return CreateErrorResponse(res, 404, 'ShowTime not found');
        }
        return CreateSuccessResponse(res, 200, showTime);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
}

// Get ShowTimes by movie
const getShowTimesByMovie = async (req, res) => {
    try {
        const showTimes = await showTimeService.getShowtimesByMovie(req.params.movieId);
        return CreateSuccessResponse(res, 200, showTimes);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
}

// Get ShowTimes by room
const getShowTimesByRoom = async (req, res) => {
    try {
        const showTimes = await showTimeService.getShowtimesByTheaterRoom(req.params.roomId);
        return CreateSuccessResponse(res, 200, showTimes);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
}

// Get ShowTimes by cinema complex
const getShowTimesByCinemaComplex = async (req, res) => {
    try {
        const showTimes = await showTimeService.getShowtimesByCinemaComplex(req.params.cinemaComplexId);
        return CreateSuccessResponse(res, 200, showTimes);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
}

// Update ShowTime
const updateShowTime = async (req, res) => {
    try {
        const showTimeData = req.body;
        const updatedShowTime = await showTimeService.updateShowtime(req.params.id, showTimeData);
        return CreateSuccessResponseWithMessage(res, 200, 'ShowTime updated successfully', updatedShowTime);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
}

// Delete ShowTime
const deleteShowTime = async (req, res) => {
    try {
        await showTimeService.deleteShowtime(req.params.id);
        return CreateSuccessResponseMessage(res, 200, 'ShowTime deleted successfully');
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
}

module.exports = {
    createShowTime,
    getAllShowTimes,
    getShowTimeById,
    getShowTimesByMovie,
    getShowTimesByRoom,
    getShowTimesByCinemaComplex,
    updateShowTime,
    deleteShowTime
};