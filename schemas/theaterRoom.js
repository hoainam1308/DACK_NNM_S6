const mongoose = require('mongoose');

const theaterRoomSchema = new mongoose.Schema({
    cinemaComplex: { type: mongoose.Schema.Types.ObjectId, ref: 'CinemaComplex', required: true },
    roomName: { type: String, required: true },
    capacity: { type: Number, required: true },
    roomType: { type: String },
    status: { type: String, enum: ['Active', 'Maintenance', 'Closed'], default: 'Active' },
    seatTemplate: { type: mongoose.Schema.Types.ObjectId, ref: 'SeatTemplate' }
}, { timestamps: true });

module.exports = mongoose.model('TheaterRoom', theaterRoomSchema);