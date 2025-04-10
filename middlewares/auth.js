const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const { getRoleById } = require('../services/roleServices');

const authenticase = async (req, res, next) => {
    try {
        let token;
        if (!req.headers || !req.headers.authorization) {
            token = req.signedCookies.token;
        } else {
            token = req.header('Authorization').replace('Bearer ', '');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Vui lòng xác thực.' });
    }
};

// Middleware kiểm tra vai trò
const authorize = (roles = []) => {
    return async (req, res, next) => {
        try {
            const role = await getRoleById(req.user.role); 
            if (!roles.includes(role.roleName)) {
                return res.status(403).json({ error: 'Bạn không có quyền truy cập!' });
            }

            next();
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi kiểm tra quyền hạn!' });
        }
    };
};
module.exports = { authenticase, authorize };
