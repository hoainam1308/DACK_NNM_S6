const SeatTemplate = require('../schemas/seatTemplate');

// Create a new seat template
const createSeatTemplate = async (templateData) => {
    try {
        const newTemplate = new SeatTemplate({
            name: templateData.name,
            rows: templateData.rows,
            columns: templateData.columns,
            seatMap: templateData.seatMap,
            description: templateData.description,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newTemplate.save();
    } catch (error) {
        throw error;
    }
};

// Get all seat templates
const getAllSeatTemplates = async (includeInactive = false) => {
    try {
        const query = includeInactive ? {} : { isActive: true };
        return await SeatTemplate.find(query).sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
};

// Get seat template by ID
const getSeatTemplateById = async (id) => {
    try {
        const template = await SeatTemplate.findById(id);
        if (!template) {
            throw new Error('Seat template not found');
        }
        return template;
    } catch (error) {
        throw error;
    }
};

// Update seat template
const updateSeatTemplate = async (id, updateData) => {
    try {
        const updatedTemplate = await SeatTemplate.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        );
        
        if (!updatedTemplate) {
            throw new Error('Seat template not found');
        }
        
        return updatedTemplate;
    } catch (error) {
        throw error;
    }
};

// Delete seat template (soft delete)
const deleteSeatTemplate = async (id) => {
    try {
        const updatedTemplate = await SeatTemplate.findByIdAndUpdate(
            id,
            {
                isActive: false,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedTemplate) {
            throw new Error('Seat template not found');
        }

        return updatedTemplate;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createSeatTemplate,
    getAllSeatTemplates,
    getSeatTemplateById,
    updateSeatTemplate,
    deleteSeatTemplate
};