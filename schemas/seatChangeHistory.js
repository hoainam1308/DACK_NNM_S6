const mongoose = require('mongoose');

const seatChangeHistorySchema = new mongoose.Schema({
    seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'TheaterRoom', required: true },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    previousState: { type: String },
    currentState: { type: String },
    changeReason: { type: String },
    changedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SeatChangeHistory', seatChangeHistorySchema);