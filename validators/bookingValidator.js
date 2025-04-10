let { body, validationResult } = require('express-validator')
const {CreateErrorResponse} = require('../utils/responseHandler')

module.exports = {
    bookingValidate: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return CreateErrorResponse(res, 422, errors.array())
        }
        next()
    },
    createBookingValidator: [
        body('showtimeId').notEmpty().withMessage('Showtime ID is required'),
        body('seatNumbers').isArray().withMessage('Seat numbers must be an array'),
        body('userId').notEmpty().withMessage('User ID is required')
    ]
}