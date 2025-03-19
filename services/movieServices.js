const mongoose = require('mongoose');
const { Movie } = require('../models/newdb');

// Create a new movie
const createMovie = async (movieData) => {
    try {
        const newMovie = new Movie({
            title: movieData.title,
            originalTitle: movieData.originalTitle,
            director: movieData.director,
            cast: movieData.cast,
            description: movieData.description,
            duration: movieData.duration,
            releaseDate: movieData.releaseDate,
            endDate: movieData.endDate,
            country: movieData.country,
            language: movieData.language,
            ageRestriction: movieData.ageRestriction,
            genres: movieData.genres,
            posterUrl: movieData.poster,
            trailerUrl: movieData.trailer,
            rating: movieData.rating,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newMovie.save();
    } catch (error) {
        throw error;
    }
};

// Get all movies
const getAllMovies = async (includeInactive = false) => {
    try {
        const query = includeInactive ? {} : { isActive: true };
        return await Movie.find(query).populate('genres');
    } catch (error) {
        throw error;
    }
};

// Get movie by ID
const getMovieById = async (id) => {
    try {
        const movie = await Movie.findById(id).populate('genres');
        if (!movie) {
            throw new Error('Movie not found');
        }
        return movie;
    } catch (error) {
        throw error;
    }
};


// Get movies by genre
const getMoviesByGenre = async (genreId) => {
    try {
        return await Movie.find({
            genres: genreId,
            isActive: true
        }).populate('genres');
    } catch (error) {
        throw error;
    }
};

// Update movie
const updateMovie = async (id, updateData) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        ).populate('genres');
        
        if (!updatedMovie) {
            throw new Error('Movie not found');
        }
        
        return updatedMovie;
    } catch (error) {
        throw error;
    }
};

// Delete movie (soft delete)
const deleteMovie = async (id) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            {
                isActive: false,
                updatedAt: new Date()
            },
            { new: true }
        ).populate('genres');

        if (!updatedMovie) {
            throw new Error('Movie not found');
        }

        return updatedMovie;
    } catch (error) {
        throw error;
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