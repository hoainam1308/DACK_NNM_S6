const Genre = require('../schemas/genre');

// Create a new genre
const createGenre = async (genreData) => {
    try {
        const newGenre = new Genre({
            genreName: genreData.genreName,
            description: genreData.description,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newGenre.save();
    } catch (error) {
        throw error;
    }
};

// Get all Genrees
const getAllGenres = async () => {
    try {
        return await Genre.find();
    } catch (error) {
        throw error;
    }
};

// Get genre complex by ID
const getGenreById = async (id) => {
    try {
        const genre = await Genre.findById(id);
        if (!genre) {
            throw new Error('Genre not found');
        }
        return genre;
    } catch (error) {
        throw error;
    }
};

// Update genre
const updateGenre = async (id, updateData) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        );
        
        if (!updatedGenre) {
            throw new Error('Genre not found');
        }
        
        return updatedGenre;
    } catch (error) {
        throw error;
    }
};

// Delete Genre
const deleteGenre = async (id) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedGenre) {
            throw new Error('Genre not found');
        }

        return updatedGenre;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};