let { body, validationResult } = require('express-validator')
const {CreateErrorResponse} = require('../utils/responseHandler')

module.exports = {
    validateTheaterRoom: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return CreateErrorResponse(res, 422, errors.array())
        }
        next()
    },
    createTheaterRoomValidator: [
        body('name').notEmpty().withMessage('Name is required'),
        body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
        body('location').notEmpty().withMessage('Location is required')
    ],
    updateTheaterRoomValidator: [
        body('name').optional().notEmpty().withMessage('Name cannot be empty'),
        body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
        body('location').optional().notEmpty().withMessage('Location cannot be empty')
    ]
}