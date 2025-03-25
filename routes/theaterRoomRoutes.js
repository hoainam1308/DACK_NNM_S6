const express = require('express');
const router = express.Router();
const theaterRoomController = require('../controllers/theaterRoomController');

router.post('/', theaterRoomController.createTheaterRoom);
router.get('/', theaterRoomController.getAllTheaterRooms);
router.get('/:id', theaterRoomController.getTheaterRoomById);
router.get('/cinemaComplex/:cinemaComplexId', theaterRoomController.getTheaterRoomsByCinemaComplex);
router.put('/:id', theaterRoomController.updateTheaterRoom);
router.delete('/:id', theaterRoomController.deleteTheaterRoom);

module.exports = router;
