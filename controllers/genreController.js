const genreService = require('../services/genreServices');

// Create new genre
const createGenre = async (req, res) => {
    try {
        const genreData = req.body;
        const newGenre = await genreService.createGenre(genreData);
        res.status(201).json({
            success: true,
            message: 'Genre created successfully',
            data: newGenre
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await genreService.getAllGenres();
        res.status(200).json({
            success: true,
            data: genres
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get genre by ID
const getGenreById = async (req, res) => {
    try {
        const genre = await genreService.getGenreById(req.params.id);
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: 'Genre not found'
            });
        }
        res.status(200).json({
            success: true,
            data: genre
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update genre
const updateGenre = async (req, res) => {
    try {
        const updatedGenre = await genreService.updateGenre(
            req.params.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: 'Genre updated successfully',
            data: updatedGenre
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete genre
const deleteGenre = async (req, res) => {
    try {
        await genreService.deleteGenre(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Genre deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};