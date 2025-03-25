const movieRevewService = require('../services/movieReviewServices');
const { CreateSuccessResponse, CreateErrorResponse, CreateSuccessResponseMessage, CreateSuccessResponseWithMessage } = require('../utils/responseHandler');

// Create a new movie review
const createMovieReview = async (req, res) => {
    try {
        const movieReviewData = req.body;
        const newMovieReview = await movieRevewService.createMovieReview(movieReviewData);
        CreateSuccessResponseWithMessage(res, 201, 'Movie review created successfully', newMovieReview);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get all movie reviews
const getAllMovieReviews = async (req, res) => {
    try {
        const movieReviews = await movieRevewService.getAllMovieReviews();
        CreateSuccessResponse(res, 200, movieReviews);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get all reviews for a movie
const getMovieReviews = async (req, res) => {
    try {
        const movieId = req.params.id;
        const includeHidden = req.query.includeHidden === 'true';
        const reviews = await movieRevewService.getMovieReviews(movieId, includeHidden);
        CreateSuccessResponse(res, 200, reviews);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get review by ID
const getReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await movieRevewService.getReviewById(reviewId);
        CreateSuccessResponse(res, 200, review);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

// Get user's reviews
const getUserReviews = async (req, res) => {
    try {
        const userId = req.params.id;
        const reviews = await movieRevewService.getUserReviews(userId);
        CreateSuccessResponse(res, 200, reviews);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
};

module.exports = {
    createMovieReview,
    getAllMovieReviews,
    getMovieReviews,
    getReviewById,
    getUserReviews
};
