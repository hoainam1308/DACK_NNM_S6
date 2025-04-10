const promotionService = require('../services/promotionServices');
const { CreateSuccessResponse, CreateSuccessResponseWithMessage, CreateErrorResponse } = require('../utils/responseHandler');

// Create a new promotion
const createPromotion = async (req, res) => {
    try {
        const promotion = await promotionService.createPromotion(req.body);
        return CreateSuccessResponseWithMessage(res, 201, 'Promotion created successfully', promotion);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get all promotions
const getAllPromotions = async (req, res) => {
    try {
        const promotions = await promotionService.getAllPromotions();
        return CreateSuccessResponse(res, 200, promotions);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Get promotion by ID
const getPromotionById = async (req, res) => {
    try {
        const promotion = await promotionService.getPromotionById(req.params.id);
        if (!promotion) {
            return CreateErrorResponse(res, 404, 'Promotion not found');
        }
        return CreateSuccessResponse(res, 200, promotion);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Update promotion
const updatePromotion = async (req, res) => {
    try {
        const promotion = await promotionService.updatePromotion(req.params.id, req.body);
        return CreateSuccessResponseWithMessage(res, 200, 'Promotion updated successfully', promotion);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

// Delete promotion
const deletePromotion = async (req, res) => {
    try {
        const promotion = await promotionService.deletePromotion(req.params.id);
        return CreateSuccessResponseWithMessage(res, 200, 'Promotion deleted successfully', promotion);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createPromotion,
    getAllPromotions,
    getPromotionById,
    updatePromotion,
    deletePromotion
};
