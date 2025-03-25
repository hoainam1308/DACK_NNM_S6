const CinemaComplex = require('../schemas/cinemaComplex');
// Create a new cinema complex
const createCinemaComplex = async (cinemaComplexData) => {
    try {
        const newCinemaComplex = new CinemaComplex({
            name: cinemaComplexData.name,
            address: cinemaComplexData.address,
            phoneNumber: cinemaComplexData.phoneNumber,
            description: cinemaComplexData.description,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newCinemaComplex.save();
    } catch (error) {
        throw error;
    }
};

// Get all cinema complexes
const getAllCinemaComplexes = async () => {
    try {
        return await CinemaComplex.find();
    } catch (error) {
        throw error;
    }
};

// Get cinema complex by ID
const getCinemaComplexById = async (id) => {
    try {
        const cinemaComplex = await CinemaComplex.findById(id);
        if (!cinemaComplex) {
            throw new Error('Cinema Complex not found');
        }
        return cinemaComplex;
    } catch (error) {
        throw error;
    }
};

// Update cinema complex
const updateCinemaComplex = async (id, updateData) => {
    try {
        const updatedCinemaComplex = await CinemaComplex.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        );
        
        if (!updatedCinemaComplex) {
            throw new Error('Cinema Complex not found');
        }
        
        return updatedCinemaComplex;
    } catch (error) {
        throw error;
    }
};

// Delete cinema complex
const deleteCinemaComplex = async (id) => {
    try {
        const updatedCinemaComplex = await CinemaComplex.findByIdAndUpdate(
            id,
            {
                isActive: false,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedCinemaComplex) {
            throw new Error('Cinema Complex not found');
        }

        return updatedCinemaComplex;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createCinemaComplex,
    getAllCinemaComplexes,
    getCinemaComplexById,
    updateCinemaComplex,
    deleteCinemaComplex
};