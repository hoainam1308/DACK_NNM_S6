const mongoose = require('mongoose');

const ticketTypeSchema = new mongoose.Schema({
    typeName: { type: String, required: true },
    description: { type: String },
    priceAdjustment: { type: mongoose.Types.Decimal128, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('TicketType', ticketTypeSchema);