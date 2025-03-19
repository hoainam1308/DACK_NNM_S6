const mongoose = require('mongoose');
const { ConcessionItem } = require('../models/newdb');

// Create a new concession item
const createConcessionItem = async (itemData) => {
    try {
        const newItem = new ConcessionItem({
            name: itemData.name,
            description: itemData.description,
            price: itemData.price,
            category: itemData.category,
            image: itemData.image,
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newItem.save();
    } catch (error) {
        throw error;
    }
};

// Get all concession items
const getAllConcessionItems = async (includeUnavailable = false) => {
    try {
        const query = includeUnavailable ? {} : { isAvailable: true };
        return await ConcessionItem.find(query);
    } catch (error) {
        throw error;
    }
};

// Get concession item by ID
const getConcessionItemById = async (id) => {
    try {
        const item = await ConcessionItem.findById(id);
        if (!item) {
            throw new Error('Concession item not found');
        }
        return item;
    } catch (error) {
        throw error;
    }
};

// Get concession items by category
const getConcessionItemsByCategory = async (category) => {
    try {
        return await ConcessionItem.find({ 
            category: category,
            isAvailable: true 
        });
    } catch (error) {
        throw error;
    }
};

// Update concession item
const updateConcessionItem = async (id, updateData) => {
    try {
        const updatedItem = await ConcessionItem.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        );
        
        if (!updatedItem) {
            throw new Error('Concession item not found');
        }
        
        return updatedItem;
    } catch (error) {
        throw error;
    }
};

// Delete concession item (soft delete)
const deleteConcessionItem = async (id) => {
    try {
        const updatedItem = await ConcessionItem.findByIdAndUpdate(
            id,
            {
                isAvailable: false,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedItem) {
            throw new Error('Concession item not found');
        }

        return updatedItem;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createConcessionItem,
    getAllConcessionItems,
    getConcessionItemById,
    getConcessionItemsByCategory,
    updateConcessionItem,
    deleteConcessionItem
};