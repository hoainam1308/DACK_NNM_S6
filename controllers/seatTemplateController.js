const seatTemplateService = require('../services/seatTemplateServices');
const { CreateSuccessResponseWithMessage, CreateErrorResponse } = require('../utils/responseHandler');

// Create a new seat template
const createSeatTemplate = async (req, res) => {
    try {
        const templateData = req.body;
        const newTemplate = await seatTemplateService.createSeatTemplate(templateData);
        return CreateSuccessResponseWithMessage(res, 201, 'Seat template created successfully', newTemplate);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get all seat templates
const getAllSeatTemplates = async (req, res) => {
    try {
        const includeInactive = req.query.includeInactive === 'true';
        const templates = await seatTemplateService.getAllSeatTemplates(includeInactive);
        return CreateSuccessResponse(res, 200, templates);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get seat template by ID
const getSeatTemplateById = async (req, res) => {
    try {
        const template = await seatTemplateService.getSeatTemplateById(req.params.id);
        if (!template) {
            return CreateErrorResponse(res, 404, 'Seat template not found');
        }
        return CreateSuccessResponse(res, 200, template);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Update seat template
const updateSeatTemplate = async (req, res) => {
    try {
        const updateData = req.body;
        const updatedTemplate = await seatTemplateService.updateSeatTemplate(req.params.id, updateData);
        return CreateSuccessResponseWithMessage(res, 200, 'Seat template updated successfully', updatedTemplate);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Delete seat template (soft delete)
const deleteSeatTemplate = async (req, res) => {
    try {
        const updatedTemplate = await seatTemplateService.deleteSeatTemplate(req.params.id);
        return CreateSuccessResponseWithMessage(res, 200, 'Seat template deleted successfully', updatedTemplate);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createSeatTemplate,
    getAllSeatTemplates,
    getSeatTemplateById,
    updateSeatTemplate,
    deleteSeatTemplate
};