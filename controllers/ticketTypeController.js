const ticketTypeService = require('../services/ticketTypeServices');
const { CreateSuccessResponseWithMessage, CreateErrorResponse, CreateSuccessResponse, CreateSuccessResponseMessage } = require('../utils/responseHandler');

// Create a new ticket type
const createTicketType = async (req, res) => {
    try {
        const ticketType = await ticketTypeService.createTicketType(req.body);
        CreateSuccessResponseWithMessage(res, 201, 'Ticket type created successfully', ticketType);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get all ticket types
const getAllTicketTypes = async (req, res) => {
    try {
        const ticketTypes = await ticketTypeService.getAllTicketTypes();
        CreateSuccessResponse(res, 200, ticketTypes);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get ticket type by id
const getTicketTypeById = async (req, res) => {
    try {
        const ticketType = await ticketTypeService.getTicketTypeById(req.params.id);
        if (ticketType) {
            CreateErrorResponse(res, 200, ticketType);
        } else {
            CreateErrorResponse(res, 404, 'Ticket type not found');
        }
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Update ticket type by id
const updateTicketType = async (req, res) => {
    try {
        const ticketType = await ticketTypeService.updateTicketType(req.params.id, req.body);
        if (ticketType) {
            CreateSuccessResponseWithMessage(res, 200, 'Ticket type updated successfully', ticketType);
        } else {
            CreateErrorResponse(res, 404, 'Ticket type not found');
        }
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Delete ticket type by id
const deleteTicketType = async (req, res) => {
    try {
        const ticketType = await ticketTypeService.deleteTicketType(req.params.id);
        if (ticketType) {
            CreateSuccessResponseMessage(res, 200, 'Ticket type deleted successfully');
        } else {
            CreateErrorResponse(res, 404, 'Ticket type not found');
        }
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createTicketType,
    getAllTicketTypes,
    getTicketTypeById,
    updateTicketType,
    deleteTicketType
};