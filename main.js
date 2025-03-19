const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

app.use(express.json())

// Import routes
app.use('/api/seats', require('./routes/seatRoutes'));
app.use('/api/genres', require('./routes/genreRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));

// Kết nối MongoDB với cơ sở dữ liệu QLDV
mongoose.connect('mongodb://127.0.0.1:27017/cinema_db')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

// Route gốc
app.get('/', (req, res) => {
    res.send('Hệ thống quản lý đặt vé xem phim');
});

app.listen(port, () => {
  console.log(`App đang chạy tại http://localhost:${port}`)
})