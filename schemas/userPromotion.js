const mongoose = require('mongoose');

const userPromotionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', required: true },
    isUsed: { type: Boolean, default: false },
    usedAt: { type: Date }
}, {
    index: { user: 1, promotion: 1 },
    unique: true
});

module.exports = mongoose.model('UserPromotion', userPromotionSchema);