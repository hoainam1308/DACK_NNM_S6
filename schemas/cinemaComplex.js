const mongoose = require('mongoose');

const cinemaComplexSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },
    description: { type: String },
    openingTime: { type: String },
    closingTime: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CinemaComplex', cinemaComplexSchema);