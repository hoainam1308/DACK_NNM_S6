const TicketType = require('../schemas/ticketType');

// Create a new ticket type
const createTicketType = async (ticketTypeData) => {
    try {
        const newTicketType = new TicketType({
            typeName: ticketTypeData.name,
            priceAdjustment: ticketTypeData.price,
            description: ticketTypeData.description,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newTicketType.save();
    } catch (error) {
        throw error;
    }
};

// Get all ticket types
const getAllTicketTypes = async () => {
    try {
        return await TicketType.find();
    } catch (error) {
        throw error;
    }
};

// Get ticket type by id
const getTicketTypeById = async (id) => {
    try {
        return await TicketType.findById(id);
    } catch (error) {
        throw error;
    }
};

// Update ticket type by id
const updateTicketType = async (id, ticketTypeData) => {
    try {
        const ticketType = await TicketType.findById(id);
        if (ticketType) {
            ticketType.typeName = ticketTypeData.name;
            ticketType.priceAdjustment = ticketTypeData.price;
            ticketType.description = ticketTypeData.description;
            ticketType.updatedAt = new Date();
            return await ticketType.save();
        }
    } catch (error) {
        throw error;
    }
};

// Delete ticket type by id
const deleteTicketType = async (id) => {
    try {
        return await TicketType.findByIdAndUpdate(id, {isActive: false});
    }
    catch (error) {
        throw error;
    }   
}

module.exports = {
    createTicketType,
    getAllTicketTypes,
    getTicketTypeById,
    updateTicketType,
    deleteTicketType
};