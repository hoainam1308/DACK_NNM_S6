const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

const { authenticase, authorize } = require('./middlewares/auth');

const app = express()
const port = 3000
const secret_key = process.env.JWT_SECRET;

app.use(express.json())
app.use(cookieParser(secret_key));
app.use(cors({
    origin:'*'
}))
// Import routes
app.use('/api/seats', require('./routes/seatRoutes'));
app.use('/api/genres', require('./routes/genreRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/seatTemplates', require('./routes/seatTemplateRoutes'));
app.use('/api/promotions', require('./routes/promotionRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/showtimes', require('./routes/showTimeRoutes'));
app.use('/api/cinemaComplexes', require('./routes/cinemaComplexRoutes'));
app.use('/api/theaterRooms', require('./routes/theaterRoomRoutes'));
app.use('/api/concessionItems', require('./routes/concessionItemRoutes'));
app.use('/api/ticketTypes', require('./routes/ticketTypeRoutes'));
app.use('/api/movieReviews', require('./routes/movieReviewRoutes'));

app.use('/auth', require('./routes/authRoutes'));
app.use('/user', require('./routes/userRouters'));
app.use('/roles', require('./routes/roleRoutes'));
// Kết nối MongoDB với cơ sở dữ liệu QLDV
mongoose.connect('mongodb://127.0.0.1:27017/cinema_db')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

// Route gốc
app.get('/api/protected',authenticase, authorize(['Admin', 'User']), (req, res) => {
    res.send('Hệ thống quản lý đặt vé xem phim');
});

app.listen(port, () => {
  console.log(`App đang chạy tại http://localhost:${port}`)
}) 
