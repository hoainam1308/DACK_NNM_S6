const mongoose = require('mongoose');
const { MovieShowtime } = require('../models/newdb');

// Create a new showtime
const createShowtime = async (showtimeData) => {
    try {
        const newShowtime = new MovieShowtime({
            movieId: showtimeData.movieId,
            theaterRoomId: showtimeData.theaterRoomId,
            startTime: showtimeData.startTime,
            endTime: showtimeData.endTime,
            basePrice: showtimeData.basePrice,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newShowtime.save();
    } catch (error) {
        throw error;
    }
};

// Get all showtimes
const getAllShowtimes = async (includeInactive = false) => {
    try {
        const query = includeInactive ? {} : { isActive: true };
        return await MovieShowtime.find(query)
            .populate('movieId')
            .populate({
                path: 'theaterRoomId',
                populate: {
                    path: 'cinemaComplexId'
                }
            })
            .sort({ startTime: 1 });
    } catch (error) {
        throw error;
    }
};

// Get showtime by ID
const getShowtimeById = async (id) => {
    try {
        const showtime = await MovieShowtime.findById(id)
            .populate('movieId')
            .populate({
                path: 'theaterRoomId',
                populate: {
                    path: 'cinemaComplexId'
                }
            });
        if (!showtime) {
            throw new Error('Showtime not found');
        }
        return showtime;
    } catch (error) {
        throw error;
    }
};

// Get showtimes by movie
const getShowtimesByMovie = async (movieId) => {
    try {
        return await MovieShowtime.find({
            movieId: movieId,
            isActive: true,
            startTime: { $gt: new Date() }
        })
        .populate('movieId')
        .populate({
            path: 'theaterRoomId',
            populate: {
                path: 'cinemaComplexId'
            }
        })
        .sort({ startTime: 1 });
    } catch (error) {
        throw error;
    }
};

// Get showtimes by theater room
const getShowtimesByTheaterRoom = async (theaterRoomId) => {
    try {
        return await MovieShowtime.find({
            theaterRoomId: theaterRoomId,
            isActive: true,
            startTime: { $gt: new Date() }
        })
        .populate('movieId')
        .populate({
            path: 'theaterRoomId',
            populate: {
                path: 'cinemaComplexId'
            }
        })
        .sort({ startTime: 1 });
    } catch (error) {
        throw error;
    }
};

// Update showtime
const updateShowtime = async (id, updateData) => {
    try {
        const updatedShowtime = await MovieShowtime.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        )
        .populate('movieId')
        .populate({
            path: 'theaterRoomId',
            populate: {
                path: 'cinemaComplexId'
            }
        });
        
        if (!updatedShowtime) {
            throw new Error('Showtime not found');
        }
        
        return updatedShowtime;
    } catch (error) {
        throw error;
    }
};

// Delete showtime (soft delete)
const deleteShowtime = async (id) => {
    try {
        const updatedShowtime = await MovieShowtime.findByIdAndUpdate(
            id,
            {
                isActive: false,
                updatedAt: new Date()
            },
            { new: true }
        )
        .populate('movieId')
        .populate({
            path: 'theaterRoomId',
            populate: {
                path: 'cinemaComplexId'
            }
        });

        if (!updatedShowtime) {
            throw new Error('Showtime not found');
        }

        return updatedShowtime;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createShowtime,
    getAllShowtimes,
    getShowtimeById,
    getShowtimesByMovie,
    getShowtimesByTheaterRoom,
    updateShowtime,
    deleteShowtime
};