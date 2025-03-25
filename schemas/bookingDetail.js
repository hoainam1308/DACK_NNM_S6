const mongoose = require('mongoose');

const bookingDetailSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
    ticketPrice: { type: mongoose.Types.Decimal128, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BookingDetail', bookingDetailSchema);