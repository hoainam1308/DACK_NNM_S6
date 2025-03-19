const mongoose = require('mongoose');
const {
    Booking,
    BookingDetail,
    BookingConcession
} = require('../models/newdb');


const createBooking = async (bookingData) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // Create new booking
        const newBooking = await Booking.create([{
            userId: bookingData.userId,
            movieShowtimeId: bookingData.movieShowtimeId,
            totalAmount: bookingData.totalAmount,
            status: 'PENDING',
            createdAt: new Date(),
            updatedAt: new Date()
        }], { session });

        // Create booking details for seats
        const bookingDetails = bookingData.seats.map(seat => ({
            bookingId: newBooking[0]._id,
            seatId: seat.seatId,
            price: seat.price
        }));

        await BookingDetail.create(bookingDetails, { session });

        // Create booking concessions if any
        if (bookingData.concessions && bookingData.concessions.length > 0) {
            const bookingConcessions = bookingData.concessions.map(concession => ({
                bookingId: newBooking[0]._id,
                concessionId: concession.concessionId,
                quantity: concession.quantity,
                price: concession.price
            }));

            await BookingConcession.create(bookingConcessions, { session });
        }

        await session.commitTransaction();
        return newBooking[0];

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const getBookingById = async (bookingId) => {
    return await Booking.findById(bookingId)
        .populate('userId')
        .populate({
            path: 'movieShowtimeId',
            populate: {
                path: 'movieId'
            }
        });
};

const updateBookingStatus = async (bookingId, status) => {
    try {
        const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
        
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid booking status');
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            {
                status: status,
                updatedAt: new Date()
            },
            { new: true }
        ).populate('userId')
        .populate({
            path: 'movieShowtimeId',
            populate: {
                path: 'movieId'
            }
        });

        if (!updatedBooking) {
            throw new Error('Booking not found');
        }

        return updatedBooking;
    } catch (error) {
        throw error;
    }
};

// Update the exports
module.exports = {
    createBooking,
    getBookingById,
    updateBookingStatus
};