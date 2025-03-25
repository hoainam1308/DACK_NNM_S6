const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    amount: { type: mongoose.Types.Decimal128, required: true },
    transactionId: { type: String },
    paymentTime: { type: Date, default: Date.now },
    paymentStatus: { 
        type: String, 
        enum: ['Thành công', 'Thất bại', 'Đang xử lý'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('PaymentHistory', paymentHistorySchema);