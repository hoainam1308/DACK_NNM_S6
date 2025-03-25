const express = require('express');
const router = express.Router();
const movieReviewController = require('../controllers/movieReviewController');

// Create a new movie review
router.post('/', movieReviewController.createMovieReview);
router.get('/', movieReviewController.getAllMovieReviews);
router.get('/:id', movieReviewController.getReviewById);
router.get('/movie/:id', movieReviewController.getMovieReviews);
router.get('/user/:id', movieReviewController.getUserReviews);

module.exports = router;