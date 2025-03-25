const PaymentHistory = require('../schemas/paymentHistory');

// Create a new payment
const createPayment = async (paymentHistory) => {
    try {
        const newPaymentHistory = new PaymentHistory({
            booking: paymentHistory.bookingId,
            amount: paymentHistory.amount,
            transactionId: paymentHistory.transaction,
            paymentMethod: paymentHistory.paymentMethod,
            paymentStatus: paymentHistory.paymentStatus,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await newPaymentHistory.save();
    }
    catch (error) {
        throw error;
    }
}

// Get all payments
const getAllPayments = async () => {
    try {
        return await PaymentHistory.find();
    } catch (error) {
        throw error;
    }
};

// Get payment by ID
const getPaymentById = async (id) => {
    try {
        const payment = await PaymentHistory.findById(id);
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    } catch (error) {
        throw error;
    }
};

// Update payment
const updatePayment = async (id, updateData) => {
    try {
        const updatedPayment = await PaymentHistory.findByIdAndUpdate(
            id,
            {
                ...updateData,
                updatedAt: new Date()
            },
            { new: true }
        );
        if (!updatedPayment) {
            throw new Error('Payment not found');
        }
        return updatedPayment;
    }
    catch (error) {
        throw error;
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment
};