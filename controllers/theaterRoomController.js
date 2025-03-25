const theaterRoomService = require('../services/theaterRoomServices');
const { CreateSuccessResponseWithMessage, CreateErrorResponse, CreateSuccessResponse, CreateSuccessResponseMessage } = require('../utils/responseHandler');

// Create a new theater room
const createTheaterRoom = async (req, res) => {
    try {
        const theaterRoom = await theaterRoomService.createTheaterRoom(req.body);
        CreateSuccessResponseWithMessage(res, 201, 'Theater room created successfully', theaterRoom);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get all theater rooms
const getAllTheaterRooms = async (req, res) => {
    try {
        const theaterRooms = await theaterRoomService.getAllTheaterRooms();
        CreateSuccessResponse(res, 200, theaterRooms);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get theater room by ID
const getTheaterRoomById = async (req, res) => {
    try {
        const theaterRoom = await theaterRoomService.getTheaterRoomById(req.params.id);
        if (!theaterRoom) {
            CreateSuccessResponseMessage(res, 404, 'Theater room not found');
        }
        CreateSuccessResponse(res, 200, theaterRoom);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get theater rooms by cinema complex ID
const getTheaterRoomsByCinemaComplex = async (req, res) => {
    try {
        const theaterRooms = await theaterRoomService.getTheaterRoomsByCinemaComplex(req.params.cinemaComplexId);
        CreateSuccessResponse(res, 200, theaterRooms);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Update theater room
const updateTheaterRoom = async (req, res) => {
    try {
        const updatedTheaterRoom = await theaterRoomService.updateTheaterRoom(req.params.id, req.body);
        CreateSuccessResponseWithMessage(res, 200, 'Theater room updated successfully', updatedTheaterRoom);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Delete theater room
const deleteTheaterRoom = async (req, res) => {
    try {
        const updatedTheaterRoom = await theaterRoomService.deleteTheaterRoom(req.params.id);
        CreateSuccessResponseWithMessage(res, 200, 'Theater room deleted successfully', updatedTheaterRoom);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createTheaterRoom,
    getAllTheaterRooms,
    getTheaterRoomById,
    getTheaterRoomsByCinemaComplex,
    updateTheaterRoom,
    deleteTheaterRoom
};