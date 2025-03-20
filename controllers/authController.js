const jwt = require('jsonwebtoken');
const { User } = require('../models/newdb');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng.' });
        }
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server.' });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password, role, fullName, phoneNumber, dateOfBirth } = req.body;
        const user = new User({ username, email, password, role, fullName, phoneNumber, dateOfBirth });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'Lỗi đăng ký.' });
    }
};

module.exports = { login, register };
