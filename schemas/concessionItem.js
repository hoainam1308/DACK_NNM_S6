const mongoose = require('mongoose');

const concessionItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    description: { type: String },
    category: { type: String },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('ConcessionItem', concessionItemSchema);