const mongoose = require('mongoose');
const { 
    Seat, 
    SeatChangeHistory, 
    TheaterRoom, 
    SeatTemplate 
} = require('../models/newdb');

/**
 * Thay thế cho procedure ChangeSeatType
 * Thay đổi loại ghế và lưu lịch sử thay đổi
 * 
 * @param {ObjectId} roomId - ID của phòng
 * @param {String} rowLetter - Chữ cái của hàng
 * @param {Number} seatNum - Số ghế
 * @param {String} newType - Loại ghế mới
 * @param {ObjectId} userId - ID của người dùng thực hiện thay đổi
 * @returns {Promise<Object>} - Ghế sau khi đã được cập nhật
 */
async function changeSeatType(roomId, rowLetter, seatNum, newType, userId) {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();
        
        // Tìm ghế và loại ghế hiện tại
        const seat = await Seat.findOne({ 
            room: roomId, 
            seatRow: rowLetter, 
            seatNumber: seatNum 
        }).session(session);
        
        if (!seat) {
            throw new Error('Không tìm thấy ghế');
        }
        
        const currentType = seat.seatType;
        
        // Cập nhật loại ghế
        seat.seatType = newType;
        await seat.save({ session });
        
        // Lưu lịch sử
        await SeatChangeHistory.create([{
            seat: seat._id,
            room: roomId,
            changedBy: userId,
            previousState: currentType,
            currentState: newType,
            changeReason: `Changed seat type from ${currentType} to ${newType}`
        }], { session });
        
        await session.commitTransaction();
        return seat;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

/**
 * Thay thế cho procedure DisableSeat
 * Vô hiệu hóa ghế và lưu lịch sử thay đổi
 * 
 * @param {ObjectId} roomId - ID của phòng
 * @param {String} rowLetter - Chữ cái của hàng
 * @param {Number} seatNum - Số ghế
 * @param {String} reason - Lý do vô hiệu hóa
 * @param {ObjectId} userId - ID của người dùng thực hiện thay đổi
 * @returns {Promise<Object>} - Ghế sau khi đã được cập nhật
 */
async function disableSeat(roomId, rowLetter, seatNum, reason, userId) {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();
        
        // Tìm seat_id
        const seat = await Seat.findOne({ 
            room: roomId, 
            seatRow: rowLetter, 
            seatNumber: seatNum 
        }).session(session);
        
        if (!seat) {
            throw new Error('Không tìm thấy ghế');
        }
        
        // Cập nhật trạng thái ghế
        seat.isAvailable = false;
        await seat.save({ session });
        
        // Lưu lịch sử thay đổi
        await SeatChangeHistory.create([{
            seat: seat._id,
            room: roomId,
            changedBy: userId,
            previousState: 'Available',
            currentState: 'Disabled',
            changeReason: reason
        }], { session });
        
        await session.commitTransaction();
        return seat;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

/**
 * Thay thế cho procedure GenerateSeatsFromTemplate
 * Tạo ghế cho phòng dựa trên template
 * 
 * @param {ObjectId} roomId - ID của phòng
 * @returns {Promise<Array>} - Danh sách ghế đã được tạo
 */
async function generateSeatsFromTemplate(roomId) {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();
        
        // Lấy template_id từ phòng chiếu
        const room = await TheaterRoom.findById(roomId).session(session);
        
        if (!room) {
            throw new Error('Không tìm thấy phòng');
        }
        
        const templateId = room.seatTemplate;
        
        // Lấy thông tin từ template
        const template = await SeatTemplate.findById(templateId).session(session);
        
        if (!template) {
            throw new Error('Không tìm thấy template');
        }
        
        const totalRows = template.totalRows;
        const seatsPerRow = template.seatsPerRow;
        
        // Tạo mảng lưu trữ danh sách ghế để insert
        const seatsToInsert = [];
        
        // Tạo ghế cho từng hàng
        for (let rowCounter = 0; rowCounter < totalRows; rowCounter++) {
            // Chuyển đổi số thành chữ (0->A, 1->B, ...)
            const rowLetter = String.fromCharCode(65 + rowCounter);
            
            // Tạo ghế cho hàng hiện tại
            for (let seatCounter = 1; seatCounter <= seatsPerRow; seatCounter++) {
                seatsToInsert.push({
                    room: roomId,
                    seatRow: rowLetter,
                    seatNumber: seatCounter,
                    seatType: 'Standard',
                    isAvailable: true,
                    isActive: true
                });
            }
        }
        
        // Thêm hàng loạt các ghế
        const seats = await Seat.insertMany(seatsToInsert, { session });
        
        await session.commitTransaction();
        return seats;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

/**
 * Thay thế cho procedure MergeSeats
 * Ghép hai ghế thành một ghế đôi
 * 
 * @param {ObjectId} roomId - ID của phòng
 * @param {String} primaryRow - Hàng của ghế chính
 * @param {Number} primarySeat - Số ghế chính
 * @param {String} secondaryRow - Hàng của ghế phụ
 * @param {Number} secondarySeat - Số ghế phụ
 * @param {ObjectId} userId - ID của người dùng thực hiện thay đổi
 * @returns {Promise<Object>} - Ghế chính sau khi đã được cập nhật
 */
async function mergeSeats(roomId, primaryRow, primarySeat, secondaryRow, secondarySeat, userId) {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();
        
        // Tìm ghế chính
        const primarySeatDoc = await Seat.findOne({ 
            room: roomId, 
            seatRow: primaryRow, 
            seatNumber: primarySeat 
        }).session(session);
        
        if (!primarySeatDoc) {
            throw new Error('Không tìm thấy ghế chính');
        }
        
        // Tìm ghế phụ
        const secondarySeatDoc = await Seat.findOne({ 
            room: roomId, 
            seatRow: secondaryRow, 
            seatNumber: secondarySeat 
        }).session(session);
        
        if (!secondarySeatDoc) {
            throw new Error('Không tìm thấy ghế phụ');
        }
        
        // Cập nhật ghế phụ để đánh dấu đã ghép
        secondarySeatDoc.isMerged = true;
        secondarySeatDoc.mergedWithSeat = primarySeatDoc._id;
        secondarySeatDoc.isAvailable = false;
        await secondarySeatDoc.save({ session });
        
        // Cập nhật loại ghế chính thành ghế đôi
        primarySeatDoc.seatType = 'Couple';
        await primarySeatDoc.save({ session });
        
        // Lưu lịch sử cho ghế phụ
        await SeatChangeHistory.create([{
            seat: secondarySeatDoc._id,
            room: roomId,
            changedBy: userId,
            previousState: 'Standard',
            currentState: 'Merged',
            changeReason: `Merged with seat ${primaryRow}${primarySeat}`
        }], { session });
        
        // Lưu lịch sử cho ghế chính
        await SeatChangeHistory.create([{
            seat: primarySeatDoc._id,
            room: roomId,
            changedBy: userId,
            previousState: 'Standard',
            currentState: 'Couple',
            changeReason: `Primary seat in merge with ${secondaryRow}${secondarySeat}`
        }], { session });
        
        await session.commitTransaction();
        return primarySeatDoc;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

/**
 * Thay thế cho procedure ResetSeat
 * Đưa ghế về trạng thái ban đầu
 * 
 * @param {ObjectId} roomId - ID của phòng
 * @param {String} rowLetter - Chữ cái của hàng
 * @param {Number} seatNum - Số ghế
 * @param {ObjectId} userId - ID của người dùng thực hiện thay đổi
 * @returns {Promise<Object>} - Ghế sau khi đã được cập nhật
 */
async function resetSeat(roomId, rowLetter, seatNum, userId) {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();
        
        // Tìm ghế
        const seat = await Seat.findOne({ 
            room: roomId, 
            seatRow: rowLetter, 
            seatNumber: seatNum 
        }).session(session);
        
        if (!seat) {
            throw new Error('Không tìm thấy ghế');
        }
        
        // Lưu trạng thái hiện tại dưới dạng JSON
        const currentState = JSON.stringify({
            type: seat.seatType,
            merged: seat.isMerged,
            available: seat.isAvailable
        });
        
        // Reset ghế về trạng thái ban đầu
        seat.seatType = 'Standard';
        seat.isMerged = false;
        seat.mergedWithSeat = null;
        seat.isAvailable = true;
        await seat.save({ session });
        
        // Reset các ghế bị ghép với ghế này (nếu có)
        await Seat.updateMany(
            { mergedWithSeat: seat._id },
            {
                $set: {
                    isMerged: false,
                    mergedWithSeat: null,
                    isAvailable: true
                }
            },
            { session }
        );
        
        // Lưu lịch sử
        await SeatChangeHistory.create([{
            seat: seat._id,
            room: roomId,
            changedBy: userId,
            previousState: currentState,
            currentState: '{"type":"Standard", "merged":false, "available":true}',
            changeReason: 'Reset to default state'
        }], { session });
        
        await session.commitTransaction();
        return seat;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports = {
    changeSeatType,
    disableSeat,
    generateSeatsFromTemplate,
    mergeSeats,
    resetSeat
}; 