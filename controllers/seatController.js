const { 
    changeSeatType, 
    disableSeat, 
    generateSeatsFromTemplate, 
    mergeSeats, 
    resetSeat 
} = require('../services/seatServices');
const { TheaterRoom, Seat } = require('../models/newdb');

/**
 * Controller để tạo ghế cho một phòng chiếu dựa trên mẫu ghế
 * @param {Object} req - Request object
 * @param {Object} res - Response object 
 */
exports.generateSeats = async (req, res) => {
    try {
        const { roomId } = req.params;
        
        // Kiểm tra xem phòng chiếu có tồn tại không
        const room = await TheaterRoom.findById(roomId);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy phòng chiếu'
            });
        }
        
        // Kiểm tra xem phòng chiếu đã có ghế chưa
        const existingSeats = await Seat.countDocuments({ room: roomId });
        if (existingSeats > 0) {
            return res.status(400).json({
                success: false,
                message: 'Phòng chiếu này đã có ghế. Vui lòng xóa ghế hiện tại trước khi tạo mới.'
            });
        }
        
        // Tạo ghế dựa trên template
        const seats = await generateSeatsFromTemplate(roomId);
        
        return res.status(201).json({
            success: true,
            message: `Đã tạo ${seats.length} ghế cho phòng chiếu ${room.roomName}`,
            data: {
                roomName: room.roomName,
                seatCount: seats.length
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi tạo ghế',
            error: error.message
        });
    }
};

/**
 * Controller để thay đổi loại ghế
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.changeSeatType = async (req, res) => {
    try {
        const { roomId, rowLetter, seatNumber, newType } = req.body;
        const userId = req.user.id; // Giả sử bạn đã có middleware xác thực người dùng
        
        const seat = await changeSeatType(roomId, rowLetter, parseInt(seatNumber), newType, userId);
        
        return res.status(200).json({
            success: true,
            message: `Đã thay đổi loại ghế ${rowLetter}${seatNumber} thành ${newType}`,
            data: seat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi thay đổi loại ghế',
            error: error.message
        });
    }
};

/**
 * Controller để vô hiệu hóa ghế
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.disableSeat = async (req, res) => {
    try {
        const { roomId, rowLetter, seatNumber, reason } = req.body;
        const userId = req.user.id; // Giả sử bạn đã có middleware xác thực người dùng
        
        const seat = await disableSeat(roomId, rowLetter, parseInt(seatNumber), reason, userId);
        
        return res.status(200).json({
            success: true,
            message: `Đã vô hiệu hóa ghế ${rowLetter}${seatNumber}`,
            data: seat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi vô hiệu hóa ghế',
            error: error.message
        });
    }
};

/**
 * Controller để ghép hai ghế
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.mergeSeats = async (req, res) => {
    try {
        const { roomId, primaryRow, primarySeat, secondaryRow, secondarySeat } = req.body;
        const userId = req.user.id; // Giả sử bạn đã có middleware xác thực người dùng
        
        const seat = await mergeSeats(
            roomId, 
            primaryRow, 
            parseInt(primarySeat), 
            secondaryRow, 
            parseInt(secondarySeat), 
            userId
        );
        
        return res.status(200).json({
            success: true,
            message: `Đã ghép ghế ${primaryRow}${primarySeat} với ghế ${secondaryRow}${secondarySeat}`,
            data: seat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi ghép ghế',
            error: error.message
        });
    }
};

/**
 * Controller để đặt lại ghế về trạng thái ban đầu
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.resetSeat = async (req, res) => {
    try {
        const { roomId, rowLetter, seatNumber } = req.body;
        const userId = req.user.id; // Giả sử bạn đã có middleware xác thực người dùng
        
        const seat = await resetSeat(roomId, rowLetter, parseInt(seatNumber), userId);
        
        return res.status(200).json({
            success: true,
            message: `Đã đặt lại ghế ${rowLetter}${seatNumber} về trạng thái ban đầu`,
            data: seat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi đặt lại ghế',
            error: error.message
        });
    }
};

/**
 * Controller để lấy tất cả ghế của một phòng
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.getSeatsByRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        
        // Kiểm tra xem phòng chiếu có tồn tại không
        const room = await TheaterRoom.findById(roomId);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy phòng chiếu'
            });
        }
        
        // Lấy tất cả ghế của phòng
        const seats = await Seat.find({ room: roomId }).sort({ seatRow: 1, seatNumber: 1 });
        
        return res.status(200).json({
            success: true,
            message: `Đã tìm thấy ${seats.length} ghế cho phòng chiếu ${room.roomName}`,
            data: seats
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách ghế',
            error: error.message
        });
    }
}; 