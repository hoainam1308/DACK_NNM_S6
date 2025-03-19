const mongoose = require('mongoose');

// ------------------ TẠO CÁC SCHEMA ------------------

// Schema cho Role (Vai trò người dùng)
const roleSchema = new mongoose.Schema({
    roleName: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

// Schema cho User (Người dùng)
const userSchema = new mongoose.Schema({
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    profileImage: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Schema cho CinemaComplex (Cụm rạp)
const cinemaComplexSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },
    description: { type: String },
    openingTime: { type: String },
    closingTime: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Schema cho SeatTemplate (Mẫu sắp xếp ghế)
const seatTemplateSchema = new mongoose.Schema({
    templateName: { type: String, required: true },
    description: { type: String },
    totalRows: { type: Number, required: true },
    seatsPerRow: { type: Number, required: true }
}, { timestamps: true });

// Schema cho TheaterRoom (Phòng chiếu)
const theaterRoomSchema = new mongoose.Schema({
    cinemaComplex: { type: mongoose.Schema.Types.ObjectId, ref: 'CinemaComplex', required: true },
    roomName: { type: String, required: true },
    capacity: { type: Number, required: true },
    roomType: { type: String },
    status: { type: String, enum: ['Active', 'Maintenance', 'Closed'], default: 'Active' },
    seatTemplate: { type: mongoose.Schema.Types.ObjectId, ref: 'SeatTemplate' }
}, { timestamps: true });

// Schema cho Seat (Ghế)
const seatSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'TheaterRoom', required: true },
    seatRow: { type: String, required: true },
    seatNumber: { type: Number, required: true },
    seatType: { type: String, default: 'Standard' },
    isAvailable: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isMerged: { type: Boolean, default: false },
    mergedWithSeat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }
}, { 
    timestamps: true,
    index: { room: 1, seatRow: 1, seatNumber: 1 }, 
    unique: true 
});

// Schema cho SeatChangeHistory (Lịch sử thay đổi ghế)
const seatChangeHistorySchema = new mongoose.Schema({
    seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'TheaterRoom', required: true },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    previousState: { type: String },
    currentState: { type: String },
    changeReason: { type: String },
    changedAt: { type: Date, default: Date.now }
});

// Schema cho Genre (Thể loại phim)
const genreSchema = new mongoose.Schema({
    genreName: { type: String, required: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Schema cho Movie (Phim)
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    originalTitle: { type: String },
    director: { type: String },
    cast: { type: String },
    description: { type: String },
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    endDate: { type: Date },
    country: { type: String },
    language: { type: String },
    ageRestriction: { type: String },
    trailerUrl: { type: String },
    posterUrl: { type: String },
    isActive: { type: Boolean, default: true },
    rating: { type: mongoose.Types.Decimal128, default: 0 },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }]
}, { timestamps: true });

// Schema cho MovieReview (Đánh giá phim)
const movieReviewSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { 
        type: Number, 
        required: true,
        min: 1,
        max: 10
    },
    comment: { type: String }
}, { 
    timestamps: true,
    index: { movie: 1, user: 1 },
    unique: true
});

// Schema cho Showtime (Lịch chiếu)
const showtimeSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'TheaterRoom', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Schema cho PaymentMethod (Phương thức thanh toán)
const paymentMethodSchema = new mongoose.Schema({
    methodName: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Schema cho Promotion (Khuyến mãi)
const promotionSchema = new mongoose.Schema({
    promotionName: { type: String, required: true },
    description: { type: String },
    discountAmount: { type: mongoose.Types.Decimal128 },
    discountPercentage: { type: mongoose.Types.Decimal128 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    promotionCode: { type: String, unique: true },
    minPurchase: { type: mongoose.Types.Decimal128 },
    maxDiscount: { type: mongoose.Types.Decimal128 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Schema cho UserPromotion (Khuyến mãi của người dùng)
const userPromotionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', required: true },
    isUsed: { type: Boolean, default: false },
    usedAt: { type: Date }
}, {
    index: { user: 1, promotion: 1 },
    unique: true
});

// Schema cho ConcessionItem (Bán hàng bổ sung - đồ ăn, nước uống)
const concessionItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: mongoose.Types.Decimal128, required: true },
    description: { type: String },
    category: { type: String },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

// Schema cho Booking (Đặt vé)
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookingTime: { type: Date, default: Date.now },
    totalAmount: { type: mongoose.Types.Decimal128, required: true },
    paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' },
    paymentStatus: { 
        type: String, 
        enum: ['Chưa thanh toán', 'Đã thanh toán', 'Đã hủy'],
        default: 'Chưa thanh toán'
    },
    bookingStatus: {
        type: String,
        enum: ['Đang xử lý', 'Đã xác nhận', 'Đã hủy'],
        default: 'Đang xử lý'
    }
}, { timestamps: true });

// Schema cho BookingDetail (Chi tiết đặt vé)
const bookingDetailSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
    ticketPrice: { type: mongoose.Types.Decimal128, required: true }
}, { timestamps: true });

// Schema cho TicketType (Loại vé)
const ticketTypeSchema = new mongoose.Schema({
    typeName: { type: String, required: true },
    description: { type: String },
    priceAdjustment: { type: mongoose.Types.Decimal128, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Schema cho BookingConcession (Đặt đồ ăn)
const bookingConcessionSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    concessionItem: { type: mongoose.Schema.Types.ObjectId, ref: 'ConcessionItem', required: true },
    quantity: { type: Number, required: true },
    price: { type: mongoose.Types.Decimal128, required: true }
}, { timestamps: true });

// Schema cho PaymentHistory (Lịch sử thanh toán)
const paymentHistorySchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    amount: { type: mongoose.Types.Decimal128, required: true },
    transactionId: { type: String },
    paymentTime: { type: Date, default: Date.now },
    paymentStatus: { 
        type: String, 
        enum: ['Thành công', 'Thất bại', 'Đang xử lý'],
        required: true
    }
}, { timestamps: true });

// ------------------ TẠO CÁC MODEL ------------------

const Role = mongoose.model('Role', roleSchema);
const User = mongoose.model('User', userSchema);
const CinemaComplex = mongoose.model('CinemaComplex', cinemaComplexSchema);
const SeatTemplate = mongoose.model('SeatTemplate', seatTemplateSchema);
const TheaterRoom = mongoose.model('TheaterRoom', theaterRoomSchema);
const Seat = mongoose.model('Seat', seatSchema);
const SeatChangeHistory = mongoose.model('SeatChangeHistory', seatChangeHistorySchema);
const Genre = mongoose.model('Genre', genreSchema);
const Movie = mongoose.model('Movie', movieSchema);
const MovieReview = mongoose.model('MovieReview', movieReviewSchema);
const Showtime = mongoose.model('Showtime', showtimeSchema);
const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
const Promotion = mongoose.model('Promotion', promotionSchema);
const UserPromotion = mongoose.model('UserPromotion', userPromotionSchema);
const ConcessionItem = mongoose.model('ConcessionItem', concessionItemSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const BookingDetail = mongoose.model('BookingDetail', bookingDetailSchema);
const TicketType = mongoose.model('TicketType', ticketTypeSchema);
const BookingConcession = mongoose.model('BookingConcession', bookingConcessionSchema);
const PaymentHistory = mongoose.model('PaymentHistory', paymentHistorySchema);

// Export các Model
module.exports = mongoose.models = {
    Role,
    User,
    CinemaComplex,
    SeatTemplate,
    TheaterRoom,
    Seat,
    SeatChangeHistory,
    Genre,
    Movie,
    MovieReview,
    Showtime,
    PaymentMethod,
    Promotion,
    UserPromotion,
    ConcessionItem,
    Booking,
    BookingDetail,
    TicketType,
    BookingConcession,
    PaymentHistory
};
