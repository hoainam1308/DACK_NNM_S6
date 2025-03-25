const mongoose = require('mongoose');

const bookingConcessionSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    concessionItem: { type: mongoose.Schema.Types.ObjectId, ref: 'ConcessionItem', required: true },
    quantity: { type: Number, required: true },
    price: { type: mongoose.Types.Decimal128, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BookingConcession', bookingConcessionSchema);