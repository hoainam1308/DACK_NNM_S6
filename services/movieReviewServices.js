const MovieReview = require('../schemas/movieReview');

// Create a new movie review
const createMovieReview = async (reviewData) => {
    try {
        const newReview = new MovieReview({
            userId: reviewData.userId,
            movieId: reviewData.movieId,
            rating: reviewData.rating,
            comment: reviewData.comment,
            isVisible: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newReview.save();
    } catch (error) {
        throw error;
    }
};

// Get all movie reviews
const getAllMovieReviews = async () => {
    try {
        return await MovieReview.find()
            .populate('userId', 'username')
            .populate('movieId', 'title')
            .sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
};

// Get all reviews for a movie
const getMovieReviews = async (movieId, includeHidden = false) => {
    try {
        const query = { 
            movieId: movieId,
            ...(includeHidden ? {} : { isVisible: true })
        };
        return await MovieReview.find(query)
            .populate('userId', 'username')
            .sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
};

// Get review by ID
const getReviewById = async (id) => {
    try {
        const review = await MovieReview.findById(id)
            .populate('userId', 'username')
            .populate('movieId', 'title');
        if (!review) {
            throw new Error('Review not found');
        }
        return review;
    } catch (error) {
        throw error;
    }
};

// Get user's reviews
const getUserReviews = async (userId) => {
    try {
        return await MovieReview.find({ 
            userId: userId,
            isVisible: true 
        })
        .populate('movieId', 'title posterUrl')
        .sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
};

// Update review
const updateReview = async (id, userId, updateData) => {
    try {
        const review = await MovieReview.findOne({ 
            _id: id,
            userId: userId 
        });

        if (!review) {
            throw new Error('Review not found or unauthorized');
        }

        const updatedReview = await MovieReview.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        ).populate('userId', 'username')
         .populate('movieId', 'title');

        return updatedReview;
    } catch (error) {
        throw error;
    }
};

// Delete review (soft delete)
const deleteReview = async (id, userId) => {
    try {
        const review = await MovieReview.findOne({
            _id: id,
            userId: userId
        });

        if (!review) {
            throw new Error('Review not found or unauthorized');
        }

        const updatedReview = await MovieReview.findByIdAndUpdate(
            id,
            {
                isVisible: false,
                updatedAt: new Date()
            },
            { new: true }
        );

        return updatedReview;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createMovieReview,
    getAllMovieReviews,
    getMovieReviews,
    getReviewById,
    getUserReviews,
    updateReview,
    deleteReview
};