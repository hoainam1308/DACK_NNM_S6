const mongoose = require('mongoose');
const { TheaterRoom } = require('../models/newdb');
const { generateSeatsFromTemplate } = require('../services/seatServices');

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/cinema_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Kết nối MongoDB thành công');
}).catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
});

/**
 * Tạo ghế cho một phòng chiếu cụ thể
 * @param {String} roomId - ID của phòng chiếu
 */
async function generateSeatsForRoom(roomId) {
    try {
        // Kiểm tra xem phòng chiếu có tồn tại không
        const room = await TheaterRoom.findById(roomId);
        if (!room) {
            console.error(`Không tìm thấy phòng chiếu với ID: ${roomId}`);
            return;
        }

        // Gọi hàm generateSeatsFromTemplate từ seatServices
        const seats = await generateSeatsFromTemplate(roomId);
        
        console.log(`Đã tạo ${seats.length} ghế cho phòng chiếu: ${room.roomName}`);
    } catch (error) {
        console.error('Lỗi khi tạo ghế:', error);
    }
}

/**
 * Tạo ghế cho tất cả các phòng chiếu
 */
async function generateSeatsForAllRooms() {
    try {
        // Lấy tất cả phòng chiếu
        const rooms = await TheaterRoom.find({});
        console.log(`Tìm thấy ${rooms.length} phòng chiếu`);
        
        // Tạo ghế cho từng phòng
        for (const room of rooms) {
            console.log(`Đang tạo ghế cho phòng: ${room.roomName}`);
            try {
                const seats = await generateSeatsFromTemplate(room._id);
                console.log(`Đã tạo ${seats.length} ghế cho phòng chiếu: ${room.roomName}`);
            } catch (error) {
                console.error(`Lỗi khi tạo ghế cho phòng ${room.roomName}:`, error.message);
            }
        }
        
        console.log('Hoàn thành việc tạo ghế cho tất cả các phòng');
    } catch (error) {
        console.error('Lỗi khi tạo ghế:', error);
    } finally {
        // Đóng kết nối MongoDB
        mongoose.connection.close();
    }
}

// Kiểm tra tham số dòng lệnh
const args = process.argv.slice(2);
if (args.length > 0) {
    // Nếu có ID phòng được cung cấp, tạo ghế cho phòng đó
    const roomId = args[0];
    generateSeatsForRoom(roomId).finally(() => {
        mongoose.connection.close();
    });
} else {
    // Nếu không có tham số, tạo ghế cho tất cả các phòng
    generateSeatsForAllRooms();
}

/*
Hướng dẫn sử dụng:
1. Để tạo ghế cho tất cả các phòng:
   node utils/generateSeats.js

2. Để tạo ghế cho một phòng cụ thể:
   node utils/generateSeats.js <room_id>
   
   Ví dụ: node utils/generateSeats.js 60f1a5c3e8d7b2a1b4c3d5e6
*/ 