const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    originalTitle: { type: String },
    director: { type: String },
    cast: { type: String },
    description: { type: String },
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    endDate: { type: Date },
    country: { type: String },
    language: { type: String },
    ageRestriction: { type: String },
    trailerUrl: { type: String },
    posterUrl: { type: String },
    isActive: { type: Boolean, default: true },
    rating: { type: mongoose.Types.Decimal128, default: 0 },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);