let { body, validationResult } = require('express-validator')
const {CreateErrorResponse} = require('../utils/responseHandler')

module.exports = {
    showtimeValidate: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return CreateErrorResponse(res, 422, errors.array())
        }
        next()
    },
    createShowtimeValidator: [
        body('movieId').notEmpty().withMessage('Movie ID is required'),
        body('cinemaId').notEmpty().withMessage('Cinema ID is required'),
        body('showtime').isDate().withMessage('Showtime must be a valid date')
    ]
}