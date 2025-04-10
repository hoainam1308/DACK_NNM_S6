let { body, validationResult } = require('express-validator')
const {CreateErrorResponse} = require('../utils/responseHandler')

module.exports = {
    userValidate: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return CreateErrorResponse(res, 422, errors.array())
        }
        next()
    },
    signupValidator: [
        body('username').isLength(3).withMessage('User Name phai co do dai tu 3 ky tu'),
        body('email').isEmail().withMessage('Email phai co dang xxx@domain'),
        body('password').isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage('Password phai co it nhat 8 ky tu, 1 chu hoa, 1 chu thuong, 1 so va 1 ky tu dac biet')
    ],
    loginValidator: [
        body('email').isEmail().withMessage('Email hoac mat khau khong dung'),
        body('password').isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage('Email hoac mat khau khong dung')
    ]
}
