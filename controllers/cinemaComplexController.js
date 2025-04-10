const cinemaComplexService = require('../services/cinemaComplexServices');
const { CreateSuccessResponse, CreateErrorResponse, CreateSuccessResponseMessage, CreateSuccessResponseWithMessage } = require('../utils/responseHandler');

// Create a new cinema complex
const createCinemaComplex = async (req, res) => {
    try {
        const cinemaComplexData = req.body;
        const newCinemaComplex = await cinemaComplexService.createCinemaComplex(cinemaComplexData);
        return CreateSuccessResponseWithMessage(res, 201, 'Cinema complex created successfully', newCinemaComplex);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get all cinema complexes
const getAllCinemaComplexes = async (req, res) => {
    try {
        const cinemaComplexes = await cinemaComplexService.getAllCinemaComplexes();
        return CreateSuccessResponse(res, 200, cinemaComplexes);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get cinema complex by ID
const getCinemaComplexById = async (req, res) => {
    try {
        const cinemaComplex = await cinemaComplexService.getCinemaComplexById(req.params.id);
        if (!cinemaComplex) {
            return CreateErrorResponse(res, 404, 'Cinema complex not found');
        }
        CreateSuccessResponse(res, 200, cinemaComplex);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Update cinema complex
const updateCinemaComplex = async (req, res) => {
    try {
        const updatedCinemaComplex = await cinemaComplexService.updateCinemaComplex(req.params.id, req.body);
        return CreateSuccessResponseWithMessage(res, 200, 'Cinema complex updated successfully', updatedCinemaComplex);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Delete cinema complex
const deleteCinemaComplex = async (req, res) => {
    try {
        const deletedCinemaComplex = await cinemaComplexService.deleteCinemaComplex(req.params.id);
        return CreateSuccessResponseWithMessage(res, 200, 'Cinema complex deleted successfully', deletedCinemaComplex);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createCinemaComplex,
    getAllCinemaComplexes,
    getCinemaComplexById,
    updateCinemaComplex,
    deleteCinemaComplex
};