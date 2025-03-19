const movieService = require('../services/movieServices');

// Create new movie
const createMovie = async (req, res) => {
    try {
        const movieData = req.body;
        const newMovie = await movieService.createMovie(movieData);
        res.status(201).json({
            success: true,
            message: 'Movie created successfully',
            data: newMovie
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all movies
const getAllMovies = async (req, res) => {
    try {
        const includeInactive = req.query.includeInactive === 'true';
        const movies = await movieService.getAllMovies(includeInactive);
        res.status(200).json({
            success: true,
            data: movies
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get movie by ID
const getMovieById = async (req, res) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }
        res.status(200).json({
            success: true,
            data: movie
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get movies by genre
const getMoviesByGenre = async (req, res) => {
    try {
        const movies = await movieService.getMoviesByGenre(req.params.genreId);
        res.status(200).json({
            success: true,
            data: movies
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update movie
const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await movieService.updateMovie(
            req.params.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: 'Movie updated successfully',
            data: updatedMovie
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete movie
const deleteMovie = async (req, res) => {
    try {
        await movieService.deleteMovie(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
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