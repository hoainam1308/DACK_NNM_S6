const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'TheaterRoom', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Showtime', showtimeSchema);