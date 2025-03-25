const genreService = require('../services/genreServices');
const { CreateSuccessResponse, CreateErrorResponse, CreateSuccessResponseWithMessage, CreateSuccessResponseMessage } = require('../utils/responseHandler');

// Create new genre
const createGenre = async (req, res) => {
    try {
        const genreData = req.body;
        const newGenre = await genreService.createGenre(genreData);
        CreateSuccessResponseWithMessage(res, 201, 'Genre created successfully', newGenre);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get all genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await genreService.getAllGenres();
        CreateSuccessResponse(res, 200, genres);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get genre by ID
const getGenreById = async (req, res) => {
    try {
        const genre = await genreService.getGenreById(req.params.id);
        if (!genre) {
            CreateErrorResponse(res, 404, 'Genre not found');
        }
        CreateSuccessResponse(res, 200, genre);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Update genre
const updateGenre = async (req, res) => {
    try {
        const updatedGenre = await genreService.updateGenre(
            req.params.id,
            req.body
        );
        CreateSuccessResponseWithMessage(res, 200, 'Genre updated successfully', updatedGenre);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Delete genre
const deleteGenre = async (req, res) => {
    try {
        await genreService.deleteGenre(req.params.id);
        CreateSuccessResponseMessage(res, 200, 'Genre deleted successfully');
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};