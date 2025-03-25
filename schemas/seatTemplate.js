const mongoose = require('mongoose');

const seatTemplateSchema = new mongoose.Schema({
    templateName: { type: String, required: true },
    description: { type: String },
    totalRows: { type: Number, required: true },
    seatsPerRow: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SeatTemplate', seatTemplateSchema);