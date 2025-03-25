const concesstionItemService = require('../services/concessionItemServices');
const { CreateSuccessResponse, CreateErrorResponse, CreateSuccessResponseWithMessage } = require('../utils/responseHandler');

// Create a new concession item
const createConcessionItem = async (req, res) => {
    try {
        const concessionItemData = req.body;
        const newConcessionItem = await concesstionItemService.createConcessionItem(concessionItemData);
        CreateSuccessResponseWithMessage(res, 201, 'Concession item created successfully', newConcessionItem);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get all concession items
const getAllConcessionItems = async (req, res) => {
    try {
        const concessionItems = await concesstionItemService.getAllConcessionItems();
        CreateSuccessResponse(res, 200, concessionItems);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get concession item by ID
const getConcessionItemById = async (req, res) => {
    try {
        const concessionItem = await concesstionItemService.getConcessionItemById(req.params.id);
        if (!concessionItem) {
            CreateErrorResponse(res, 404, 'Concession item not found');
        }
        CreateSuccessResponse(res, 200, concessionItem);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Update concession item
const updateConcessionItem = async (req, res) => {
    try {
        const updatedConcessionItem = await concesstionItemService.updateConcessionItem(req.params.id, req.body);
        CreateSuccessResponseWithMessage(res, 200, 'Concession item updated successfully', updatedConcessionItem);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Delete concession item
const deleteConcessionItem = async (req, res) => {
    try {
        const concessionItem = await concesstionItemService.deleteConcessionItem(req.params.id);
        CreateSuccessResponseWithMessage(res, 200, 'Concession item deleted successfully', concessionItem);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createConcessionItem,
    getAllConcessionItems,
    getConcessionItemById,
    updateConcessionItem,
    deleteConcessionItem
};