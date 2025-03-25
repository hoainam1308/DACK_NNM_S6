const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'TheaterRoom', required: true },
    seatRow: { type: String, required: true },
    seatNumber: { type: Number, required: true },
    seatType: { type: String, default: 'Standard' },
    isAvailable: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isMerged: { type: Boolean, default: false },
    mergedWithSeat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }
}, { 
    timestamps: true,
    index: { room: 1, seatRow: 1, seatNumber: 1 }, 
    unique: true 
});

module.exports = mongoose.model('Seat', seatSchema);