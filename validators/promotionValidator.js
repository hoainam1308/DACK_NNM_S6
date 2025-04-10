let { body, validationResult } = require('express-validator')
const {CreateErrorResponse} = require('../utils/responseHandler')

module.exports = {
    promotionValidate: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return CreateErrorResponse(res, 422, errors.array())
        }
        next()
    },
    createPromotionValidator: [
        body('code').notEmpty().withMessage('Promotion code is required'),
        body('discount').isFloat({ min: 0 }).withMessage('Discount must be a positive number'),
        body('expiryDate').isDate().withMessage('Expiry date must be a valid date')
    ]
}