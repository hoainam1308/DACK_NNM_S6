const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookingTime: { type: Date, default: Date.now },
    totalAmount: { type: mongoose.Types.Decimal128, required: true },
    paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' },
    paymentStatus: { 
        type: String, 
        enum: ['Chưa thanh toán', 'Đã thanh toán', 'Đã hủy'],
        default: 'Chưa thanh toán'
    },
    bookingStatus: {
        type: String,
        enum: ['Đang xử lý', 'Đã xác nhận', 'Đã hủy'],
        default: 'Đang xử lý'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);