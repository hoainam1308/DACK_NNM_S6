const express = require('express');
const router = express.Router();
const showTimeController = require('../controllers/showTimeController');

// Create a new showtime
router.post('/', showTimeController.createShowTime);
router.get('/', showTimeController.getAllShowTimes);
router.get('/:id', showTimeController.getShowTimeById);
router.get('/movie/:movieId', showTimeController.getShowTimesByMovie);
router.get('/room/:roomId', showTimeController.getShowTimesByRoom);
router.get('/cinema/:cinemaId', showTimeController.getShowTimesByCinemaComplex);
router.put('/:id', showTimeController.updateShowTime);
router.delete('/:id', showTimeController.deleteShowTime);

module.exports = router;