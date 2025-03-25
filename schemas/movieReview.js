const mongoose = require('mongoose');

const movieReviewSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { 
        type: Number, 
        required: true,
        min: 1,
        max: 10
    },
    comment: { type: String },
    isVisible: { type: Boolean, default: true }
}, { 
    timestamps: true,
    index: { movie: 1, user: 1 },
    unique: true
});

module.exports = mongoose.model('MovieReview', movieReviewSchema);