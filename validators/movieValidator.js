let { body, validationResult } = require('express-validator')
const {CreateErrorResponse} = require('../utils/responseHandler')

module.exports = {
    movieValidate: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return CreateErrorResponse(res, 422, errors.array())
        }
        next()
    },
    createMovieValidator: [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('releaseDate').isDate().withMessage('Release date must be a valid date'),
        body('rating').isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10')
    ]
}