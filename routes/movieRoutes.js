const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Public routes
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.get('/genre/:genreId', movieController.getMoviesByGenre);

router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;