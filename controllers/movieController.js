const movieService = require('../services/movieServices');
const { CreateSuccessResponse, CreateErrorResponse, CreateSuccessResponseMessage, CreateSuccessResponseWithMessage } = require('../utils/responseHandler');

// Create new movie
const createMovie = async (req, res) => {
    try {
        const movieData = req.body;
        const newMovie = await movieService.createMovie(movieData);
        return CreateSuccessResponse(res, 201, newMovie);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get all movies
const getAllMovies = async (req, res) => {
    try {
        const includeInactive = req.query.includeInactive === 'true';
        const movies = await movieService.getAllMovies(includeInactive);
        return CreateSuccessResponse(res, 200, movies);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get movie by ID
const getMovieById = async (req, res) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        if (!movie) {
            return CreateErrorResponse(res, 404, 'Movie not found');
        }
        return CreateSuccessResponse(res, 200, movie);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get movies by genre
const getMoviesByGenre = async (req, res) => {
    try {
        const movies = await movieService.getMoviesByGenre(req.params.genreId);
        return CreateSuccessResponse(res, 200, movies);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Update movie
const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await movieService.updateMovie(
            req.params.id,
            req.body
        );
        return CreateSuccessResponseWithMessage(res, 200, 'Movie updated successfully', updatedMovie);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Delete movie
const deleteMovie = async (req, res) => {
    try {
        await movieService.deleteMovie(req.params.id);
        return CreateSuccessResponseMessage(res, 200, 'Movie deleted successfully');
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    getMoviesByGenre,
    updateMovie,
    deleteMovie
};