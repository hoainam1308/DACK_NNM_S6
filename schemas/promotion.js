const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    promotionName: { type: String, required: true },
    description: { type: String },
    discountAmount: { type: mongoose.Types.Decimal128 },
    discountPercentage: { type: mongoose.Types.Decimal128 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    promotionCode: { type: String, unique: true },
    minPurchase: { type: mongoose.Types.Decimal128 },
    maxDiscount: { type: mongoose.Types.Decimal128 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);