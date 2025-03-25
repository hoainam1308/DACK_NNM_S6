const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genreName: { type: String, required: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Genre', genreSchema);