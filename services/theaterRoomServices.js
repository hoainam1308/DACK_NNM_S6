const TheaterRoom = require('../schemas/theaterRoom');

// Create a new theater room
const createTheaterRoom = async (theaterRoomData) => {
    try {
        const newTheaterRoom = new TheaterRoom({
            name: theaterRoomData.name,
            cinemaComplexId: theaterRoomData.cinemaComplexId,
            capacity: theaterRoomData.capacity,
            type: theaterRoomData.type,
            description: theaterRoomData.description,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newTheaterRoom.save();
    } catch (error) {
        throw error;
    }
};

// Get all theater rooms
const getAllTheaterRooms = async (includeInactive = false) => {
    try {
        const query = includeInactive ? {} : { isActive: true };
        return await TheaterRoom.find(query)
            .populate('cinemaComplexId');
    } catch (error) {
        throw error;
    }
};

// Get theater room by ID
const getTheaterRoomById = async (id) => {
    try {
        const theaterRoom = await TheaterRoom.findById(id)
            .populate('cinemaComplexId');
        if (!theaterRoom) {
            throw new Error('Theater Room not found');
        }
        return theaterRoom;
    } catch (error) {
        throw error;
    }
};

// Get theater rooms by cinema complex ID
const getTheaterRoomsByCinemaComplex = async (cinemaComplexId) => {
    try {
        return await TheaterRoom.find({ 
            cinemaComplexId: cinemaComplexId,
            isActive: true 
        }).populate('cinemaComplexId');
    } catch (error) {
        throw error;
    }
};

// Update theater room
const updateTheaterRoom = async (id, updateData) => {
    try {
        const updatedTheaterRoom = await TheaterRoom.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        ).populate('cinemaComplexId');
        
        if (!updatedTheaterRoom) {
            throw new Error('Theater Room not found');
        }
        
        return updatedTheaterRoom;
    } catch (error) {
        throw error;
    }
};

// Delete theater room (soft delete)
const deleteTheaterRoom = async (id) => {
    try {
        const updatedTheaterRoom = await TheaterRoom.findByIdAndUpdate(
            id,
            {
                status: 'CLOSED',
                updatedAt: new Date()
            },
            { new: true }
        ).populate('cinemaComplexId');

        if (!updatedTheaterRoom) {
            throw new Error('Theater Room not found');
        }

        return updatedTheaterRoom;
    } catch (error) {
        throw error;
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