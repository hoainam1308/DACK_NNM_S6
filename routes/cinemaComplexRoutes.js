const express = require('express');
const router = express.Router();
const cinemaComplexController = require('../controllers/cinemaComplexController');

// Create a new cinema complex
router.post('/', cinemaComplexController.createCinemaComplex);
router.get('/', cinemaComplexController.getAllCinemaComplexes);
router.get('/:id', cinemaComplexController.getCinemaComplexById);
router.put('/:id', cinemaComplexController.updateCinemaComplex);
router.delete('/:id', cinemaComplexController.deleteCinemaComplex);

module.exports = router;