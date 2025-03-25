const Promotion = require('../schemas/promotion');

// Create a new promotion
const createPromotion = async (promotionData) => {
    try {
        const newPromotion = new Promotion({
            name: promotionData.name,
            description: promotionData.description,
            discount: promotionData.discount,
            startDate: promotionData.startDate,
            endDate: promotionData.endDate,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newPromotion.save();
    } catch (error) {
        throw error;
    }
};

// Get all promotions
const getAllPromotions = async () => {
    try {
        return await Promotion.find();
    } catch (error) {
        throw error;
    }
};

// Get promotion by ID
const getPromotionById = async (id) => {
    try {
        const promotion = await Promotion.findById(id);
        if (!promotion) {
            throw new Error('Promotion not found');
        }
        return promotion;
    } catch (error) {
        throw error;
    }
};

// Update promotion
const updatePromotion = async (id, updateData) => {
    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        );
        if (!updatedPromotion) {
            throw new Error('Promotion not found');
        }
        return updatedPromotion;
    }
    catch (error) {
        throw error;
    }
}

// Delete promotion
const deletePromotion = async (id) => {
    try {
        const promotion = await Promotion.findById(id);
        if (!promotion) {
            throw new Error('Promotion not found');
        }
        promotion.isActive = false;
        return await promotion.save();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPromotion,
    getAllPromotions,
    getPromotionById,
    updatePromotion,
    deletePromotion
};