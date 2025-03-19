const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');
// Middleware giả định cho xác thực
// const auth = require('../middleware/auth');

// Route để tạo ghế cho một phòng chiếu dựa trên template
router.post('/generate/:roomId', /* auth, */ seatController.generateSeats);

// Route để lấy tất cả ghế của một phòng
router.get('/room/:roomId', seatController.getSeatsByRoom);

// Route để thay đổi loại ghế
router.patch('/change-type', /* auth, */ seatController.changeSeatType);

// Route để vô hiệu hóa ghế
router.patch('/disable', /* auth, */ seatController.disableSeat);

// Route để ghép hai ghế
router.patch('/merge', /* auth, */ seatController.mergeSeats);

// Route để đặt lại ghế về trạng thái ban đầu
router.patch('/reset', /* auth, */ seatController.resetSeat);

module.exports = router; 