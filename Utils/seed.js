const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    Role,
    User,
    CinemaComplex,
    SeatTemplate,
    TheaterRoom,
    Seat,
    Genre,
    Movie,
    Showtime,
    PaymentMethod,
    ConcessionItem,
    TicketType
} = require('../models/newdb');

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/cinema_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Kết nối MongoDB thành công');
    seedDatabase();
}).catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
});

async function seedDatabase() {
    try {
        // Xóa dữ liệu cũ
        await clearDatabase();
        
        // Thêm dữ liệu mới
        const roles = await seedRoles();
        const users = await seedUsers(roles);
        const cinemaComplexes = await seedCinemaComplexes();
        const seatTemplates = await seedSeatTemplates();
        const theaterRooms = await seedTheaterRooms(cinemaComplexes, seatTemplates);
        await seedSeats(theaterRooms);
        const genres = await seedGenres();
        const movies = await seedMovies(genres);
        const paymentMethods = await seedPaymentMethods();
        await seedConcessionItems();
        await seedTicketTypes();
        await seedShowtimes(movies, theaterRooms);
        
        console.log('Đã thêm dữ liệu thành công!');
        console.log('Bạn có thể dùng dữ liệu này để kiểm tra các chức năng của ứng dụng.');
        
        // Đóng kết nối
        mongoose.connection.close();
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu:', error);
        mongoose.connection.close();
    }
}

async function clearDatabase() {
    await Role.deleteMany({});
    await User.deleteMany({});
    await CinemaComplex.deleteMany({});
    await SeatTemplate.deleteMany({});
    await TheaterRoom.deleteMany({});
    await Seat.deleteMany({});
    await Genre.deleteMany({});
    await Movie.deleteMany({});
    await Showtime.deleteMany({});
    await PaymentMethod.deleteMany({});
    await ConcessionItem.deleteMany({});
    await TicketType.deleteMany({});
    
    console.log('Đã xóa dữ liệu cũ');
}

async function seedRoles() {
    const roles = [
        {
            roleName: 'Admin',
            description: 'Quản trị viên hệ thống'
        },
        {
            roleName: 'Manager',
            description: 'Quản lý rạp chiếu phim'
        },
        {
            roleName: 'Staff',
            description: 'Nhân viên rạp chiếu phim'
        },
        {
            roleName: 'Customer',
            description: 'Khách hàng'
        }
    ];
    
    const savedRoles = await Role.insertMany(roles);
    console.log(`Đã thêm ${savedRoles.length} vai trò`);
    return savedRoles;
}

async function seedUsers(roles) {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const roleMap = {};
    roles.forEach(role => {
        roleMap[role.roleName] = role._id;
    });
    
    const users = [
        {
            role: roleMap['Admin'],
            username: 'admin',
            password: hashedPassword,
            email: 'admin@cinema.com',
            fullName: 'Người Quản Trị',
            phoneNumber: '0901234567',
            dateOfBirth: new Date('1990-01-01'),
            isActive: true
        },
        {
            role: roleMap['Manager'],
            username: 'manager',
            password: hashedPassword,
            email: 'manager@cinema.com',
            fullName: 'Quản Lý Rạp',
            phoneNumber: '0909876543',
            dateOfBirth: new Date('1985-05-15'),
            isActive: true
        },
        {
            role: roleMap['Staff'],
            username: 'staff',
            password: hashedPassword,
            email: 'staff@cinema.com',
            fullName: 'Nhân Viên',
            phoneNumber: '0908765432',
            dateOfBirth: new Date('1995-10-20'),
            isActive: true
        },
        {
            role: roleMap['Customer'],
            username: 'customer1',
            password: hashedPassword,
            email: 'customer1@example.com',
            fullName: 'Nguyễn Văn A',
            phoneNumber: '0912345678',
            dateOfBirth: new Date('1992-03-25'),
            isActive: true
        },
        {
            role: roleMap['Customer'],
            username: 'customer2',
            password: hashedPassword,
            email: 'customer2@example.com',
            fullName: 'Trần Thị B',
            phoneNumber: '0923456789',
            dateOfBirth: new Date('1994-07-10'),
            isActive: true
        }
    ];
    
    const savedUsers = await User.insertMany(users);
    console.log(`Đã thêm ${savedUsers.length} người dùng`);
    return savedUsers;
}

async function seedCinemaComplexes() {
    const cinemaComplexes = [
        {
            name: 'CGV Landmark 81',
            address: 'Tầng B1, TTTM Landmark 81, 720A Điện Biên Phủ',
            city: 'TP Hồ Chí Minh',
            phoneNumber: '1900 6017',
            email: 'landmark81@cgv.vn',
            description: 'Rạp chiếu phim cao nhất Việt Nam',
            openingTime: '08:00',
            closingTime: '24:00',
            isActive: true
        },
        {
            name: 'CGV Vincom Đồng Khởi',
            address: 'Tầng 3, TTTM Vincom Center, 72 Lê Thánh Tôn',
            city: 'TP Hồ Chí Minh',
            phoneNumber: '1900 6017',
            email: 'dongkhoi@cgv.vn',
            description: 'Rạp chiếu phim cao cấp tại trung tâm thành phố',
            openingTime: '09:00',
            closingTime: '23:00',
            isActive: true
        },
        {
            name: 'Galaxy Nguyễn Du',
            address: '116 Nguyễn Du, Quận 1',
            city: 'TP Hồ Chí Minh',
            phoneNumber: '(028) 3823 5235',
            email: 'nguyendu@galaxy.vn',
            description: 'Rạp chiếu phim lâu đời tại TP HCM',
            openingTime: '09:00',
            closingTime: '22:00',
            isActive: true
        },
        {
            name: 'Beta Cinemas Thái Nguyên',
            address: 'Tầng 5 TTTM Vincom Thái Nguyên',
            city: 'Thái Nguyên',
            phoneNumber: '0917 921 316',
            email: 'thainguyen@betacinemas.vn',
            description: 'Rạp chiếu phim hiện đại tại Thái Nguyên',
            openingTime: '09:00',
            closingTime: '23:00',
            isActive: true
        }
    ];
    
    const savedCinemaComplexes = await CinemaComplex.insertMany(cinemaComplexes);
    console.log(`Đã thêm ${savedCinemaComplexes.length} cụm rạp`);
    return savedCinemaComplexes;
}

async function seedSeatTemplates() {
    const seatTemplates = [
        {
            templateName: 'Phòng chuẩn nhỏ',
            description: 'Mẫu bố trí ghế cho phòng chiếu nhỏ',
            totalRows: 5,
            seatsPerRow: 8
        },
        {
            templateName: 'Phòng chuẩn trung bình',
            description: 'Mẫu bố trí ghế cho phòng chiếu kích thước trung bình',
            totalRows: 8,
            seatsPerRow: 12
        },
        {
            templateName: 'Phòng VIP',
            description: 'Mẫu bố trí ghế cho phòng chiếu VIP',
            totalRows: 6,
            seatsPerRow: 10
        },
        {
            templateName: 'Phòng IMAX',
            description: 'Mẫu bố trí ghế cho phòng chiếu IMAX',
            totalRows: 10,
            seatsPerRow: 16
        }
    ];
    
    const savedSeatTemplates = await SeatTemplate.insertMany(seatTemplates);
    console.log(`Đã thêm ${savedSeatTemplates.length} mẫu bố trí ghế`);
    return savedSeatTemplates;
}

async function seedTheaterRooms(cinemaComplexes, seatTemplates) {
    // Map các mẫu template theo tên để dễ tham chiếu
    const templateMap = {};
    seatTemplates.forEach(template => {
        templateMap[template.templateName] = template._id;
    });
    
    const theaterRooms = [
        {
            cinemaComplex: cinemaComplexes[0]._id, // CGV Landmark 81
            roomName: 'Phòng 1',
            capacity: 40,
            roomType: 'Standard',
            status: 'Active',
            seatTemplate: templateMap['Phòng chuẩn nhỏ']
        },
        {
            cinemaComplex: cinemaComplexes[0]._id,
            roomName: 'Phòng 2',
            capacity: 96,
            roomType: 'Standard',
            status: 'Active',
            seatTemplate: templateMap['Phòng chuẩn trung bình']
        },
        {
            cinemaComplex: cinemaComplexes[0]._id,
            roomName: 'Phòng VIP',
            capacity: 60,
            roomType: 'VIP',
            status: 'Active',
            seatTemplate: templateMap['Phòng VIP']
        },
        {
            cinemaComplex: cinemaComplexes[1]._id, // CGV Vincom Đồng Khởi
            roomName: 'Phòng IMAX',
            capacity: 160,
            roomType: 'IMAX',
            status: 'Active',
            seatTemplate: templateMap['Phòng IMAX']
        },
        {
            cinemaComplex: cinemaComplexes[1]._id,
            roomName: 'Phòng Gold Class',
            capacity: 60,
            roomType: 'Gold',
            status: 'Active',
            seatTemplate: templateMap['Phòng VIP']
        },
        {
            cinemaComplex: cinemaComplexes[2]._id, // Galaxy Nguyễn Du
            roomName: 'Phòng 1',
            capacity: 96,
            roomType: 'Standard',
            status: 'Active',
            seatTemplate: templateMap['Phòng chuẩn trung bình']
        },
        {
            cinemaComplex: cinemaComplexes[3]._id, // Beta Cinemas Thái Nguyên
            roomName: 'Phòng 1',
            capacity: 40,
            roomType: 'Standard',
            status: 'Active',
            seatTemplate: templateMap['Phòng chuẩn nhỏ']
        }
    ];
    
    const savedTheaterRooms = await TheaterRoom.insertMany(theaterRooms);
    console.log(`Đã thêm ${savedTheaterRooms.length} phòng chiếu`);
    return savedTheaterRooms;
}

async function seedSeats(theaterRooms) {
    // Hàm này sẽ tạo ghế cho một phòng chiếu dựa trên template
    async function createSeatsForRoom(room) {
        // Lấy thông tin template
        const roomWithTemplate = await TheaterRoom.findById(room._id)
            .populate('seatTemplate');
        
        const template = roomWithTemplate.seatTemplate;
        const totalRows = template.totalRows;
        const seatsPerRow = template.seatsPerRow;
        
        // Mảng chứa tất cả các ghế cần tạo
        const seatsToInsert = [];
        
        // Tạo ghế cho từng hàng
        for (let rowCounter = 0; rowCounter < totalRows; rowCounter++) {
            // Chuyển đổi số thành chữ (0->A, 1->B, ...)
            const rowLetter = String.fromCharCode(65 + rowCounter);
            
            // Tạo ghế cho hàng hiện tại
            for (let seatCounter = 1; seatCounter <= seatsPerRow; seatCounter++) {
                let seatType = 'Standard';
                
                // Nếu là 2 hàng cuối của phòng VIP hoặc Gold, đặt là ghế đôi
                if ((room.roomType === 'VIP' || room.roomType === 'Gold') && 
                    rowCounter >= totalRows - 2 && seatCounter % 2 === 1) {
                    seatType = 'Couple';
                }
                
                // Nếu là 2 hàng đầu của phòng IMAX, đặt là ghế cao cấp
                if (room.roomType === 'IMAX' && rowCounter < 2) {
                    seatType = 'Premium';
                }
                
                seatsToInsert.push({
                    room: room._id,
                    seatRow: rowLetter,
                    seatNumber: seatCounter,
                    seatType: seatType,
                    isAvailable: true,
                    isActive: true,
                    isMerged: false
                });
            }
        }
        
        return await Seat.insertMany(seatsToInsert);
    }
    
    let totalSeats = 0;
    // Tạo ghế cho từng phòng
    for (const room of theaterRooms) {
        const seats = await createSeatsForRoom(room);
        totalSeats += seats.length;
    }
    
    console.log(`Đã thêm ${totalSeats} ghế cho ${theaterRooms.length} phòng chiếu`);
}

async function seedGenres() {
    const genres = [
        {
            genreName: 'Hành Động',
            description: 'Phim có nhiều cảnh đánh đấm, rượt đuổi, nổ'
        },
        {
            genreName: 'Tình Cảm',
            description: 'Phim về các mối quan hệ tình cảm'
        },
        {
            genreName: 'Kinh Dị',
            description: 'Phim mang lại cảm giác sợ hãi, ghê rợn'
        },
        {
            genreName: 'Khoa Học Viễn Tưởng',
            description: 'Phim về công nghệ tương lai, du hành vũ trụ'
        },
        {
            genreName: 'Hoạt Hình',
            description: 'Phim hoạt hình dành cho mọi lứa tuổi'
        },
        {
            genreName: 'Hài Hước',
            description: 'Phim có nhiều tình huống hài hước'
        },
        {
            genreName: 'Phiêu Lưu',
            description: 'Phim về những cuộc phiêu lưu, mạo hiểm'
        },
        {
            genreName: 'Tâm Lý',
            description: 'Phim khai thác sâu vào tâm lý nhân vật'
        }
    ];
    
    const savedGenres = await Genre.insertMany(genres);
    console.log(`Đã thêm ${savedGenres.length} thể loại phim`);
    return savedGenres;
}

async function seedMovies(genres) {
    // Map các thể loại phim theo tên để dễ tham chiếu
    const genreMap = {};
    genres.forEach(genre => {
        genreMap[genre.genreName] = genre._id;
    });
    
    const movies = [
        {
            title: 'Người Nhện: Không Còn Nhà',
            originalTitle: 'Spider-Man: No Way Home',
            director: 'Jon Watts',
            cast: 'Tom Holland, Zendaya, Benedict Cumberbatch',
            description: 'Peter Parker đối mặt với hậu quả khi thế giới biết anh là Spider-Man và cầu cứu Doctor Strange giúp đỡ.',
            duration: 148,
            releaseDate: new Date('2021-12-17'),
            endDate: new Date('2022-02-17'),
            country: 'Mỹ',
            language: 'Tiếng Anh',
            ageRestriction: 'PG-13',
            trailerUrl: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
            posterUrl: 'https://example.com/spiderman.jpg',
            isActive: true,
            genres: [genreMap['Hành Động'], genreMap['Phiêu Lưu'], genreMap['Khoa Học Viễn Tưởng']]
        },
        {
            title: 'Mộng Du',
            originalTitle: 'Inception',
            director: 'Christopher Nolan',
            cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
            description: 'Dom Cobb là một kẻ trộm có khả năng đánh cắp bí mật từ tiềm thức của người khác khi họ mơ.',
            duration: 148,
            releaseDate: new Date('2010-07-30'),
            country: 'Mỹ',
            language: 'Tiếng Anh',
            ageRestriction: 'PG-13',
            trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
            posterUrl: 'https://example.com/inception.jpg',
            isActive: true,
            genres: [genreMap['Hành Động'], genreMap['Khoa Học Viễn Tưởng'], genreMap['Tâm Lý']]
        },
        {
            title: 'Kẻ Hủy Diệt',
            originalTitle: 'The Terminator',
            director: 'James Cameron',
            cast: 'Arnold Schwarzenegger, Linda Hamilton, Michael Biehn',
            description: 'Một cyborg sát thủ được gửi từ tương lai đến để giết Sarah Connor.',
            duration: 107,
            releaseDate: new Date('1984-10-26'),
            country: 'Mỹ',
            language: 'Tiếng Anh',
            ageRestriction: 'R',
            trailerUrl: 'https://www.youtube.com/watch?v=k64P4l2Wmeg',
            posterUrl: 'https://example.com/terminator.jpg',
            isActive: true,
            genres: [genreMap['Hành Động'], genreMap['Khoa Học Viễn Tưởng']]
        },
        {
            title: 'Ký Sinh Trùng',
            originalTitle: 'Parasite',
            director: 'Bong Joon-ho',
            cast: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong',
            description: 'Một gia đình nghèo dần dần xâm nhập vào cuộc sống của một gia đình giàu có.',
            duration: 132,
            releaseDate: new Date('2019-05-30'),
            country: 'Hàn Quốc',
            language: 'Tiếng Hàn',
            ageRestriction: '16+',
            trailerUrl: 'https://www.youtube.com/watch?v=5xH0HfJHsaY',
            posterUrl: 'https://example.com/parasite.jpg',
            isActive: true,
            genres: [genreMap['Tâm Lý'], genreMap['Hài Hước']]
        },
        {
            title: 'Soul',
            originalTitle: 'Soul',
            director: 'Pete Docter',
            cast: 'Jamie Foxx, Tina Fey, Graham Norton',
            description: 'Một giáo viên âm nhạc có linh hồn tách khỏi cơ thể và phải tìm cách trở lại.',
            duration: 100,
            releaseDate: new Date('2020-12-25'),
            endDate: new Date('2021-02-28'),
            country: 'Mỹ',
            language: 'Tiếng Anh',
            ageRestriction: 'PG',
            trailerUrl: 'https://www.youtube.com/watch?v=xOsLIiBStEs',
            posterUrl: 'https://example.com/soul.jpg',
            isActive: true,
            genres: [genreMap['Hoạt Hình'], genreMap['Tâm Lý'], genreMap['Hài Hước']]
        }
    ];
    
    const savedMovies = await Movie.insertMany(movies);
    console.log(`Đã thêm ${savedMovies.length} phim`);
    return savedMovies;
}

async function seedPaymentMethods() {
    const paymentMethods = [
        {
            methodName: 'Tiền mặt',
            description: 'Thanh toán bằng tiền mặt tại quầy',
            isActive: true
        },
        {
            methodName: 'Thẻ tín dụng/ghi nợ',
            description: 'Thanh toán bằng thẻ Visa, Mastercard, JCB',
            isActive: true
        },
        {
            methodName: 'MoMo',
            description: 'Thanh toán qua ví điện tử MoMo',
            isActive: true
        },
        {
            methodName: 'ZaloPay',
            description: 'Thanh toán qua ví điện tử ZaloPay',
            isActive: true
        },
        {
            methodName: 'VNPay',
            description: 'Thanh toán qua cổng thanh toán VNPay',
            isActive: true
        }
    ];
    
    const savedPaymentMethods = await PaymentMethod.insertMany(paymentMethods);
    console.log(`Đã thêm ${savedPaymentMethods.length} phương thức thanh toán`);
    return savedPaymentMethods;
}

async function seedConcessionItems() {
    const concessionItems = [
        {
            name: 'Bắp rang lớn',
            price: mongoose.Types.Decimal128.fromString('60000'),
            description: 'Bắp rang kích thước lớn, tự chọn vị',
            category: 'Thức ăn',
            imageUrl: 'https://example.com/popcorn-large.jpg',
            isAvailable: true
        },
        {
            name: 'Bắp rang vừa',
            price: mongoose.Types.Decimal128.fromString('50000'),
            description: 'Bắp rang kích thước vừa, tự chọn vị',
            category: 'Thức ăn',
            imageUrl: 'https://example.com/popcorn-medium.jpg',
            isAvailable: true
        },
        {
            name: 'Coca-Cola lớn',
            price: mongoose.Types.Decimal128.fromString('40000'),
            description: 'Coca-Cola size lớn',
            category: 'Thức uống',
            imageUrl: 'https://example.com/coke-large.jpg',
            isAvailable: true
        },
        {
            name: 'Coca-Cola vừa',
            price: mongoose.Types.Decimal128.fromString('35000'),
            description: 'Coca-Cola size vừa',
            category: 'Thức uống',
            imageUrl: 'https://example.com/coke-medium.jpg',
            isAvailable: true
        },
        {
            name: 'Combo bắp + nước lớn',
            price: mongoose.Types.Decimal128.fromString('90000'),
            description: 'Bắp rang lớn + nước lớn tự chọn',
            category: 'Combo',
            imageUrl: 'https://example.com/combo-large.jpg',
            isAvailable: true
        },
        {
            name: 'Hot dog',
            price: mongoose.Types.Decimal128.fromString('45000'),
            description: 'Hot dog cỡ lớn với xúc xích cao cấp',
            category: 'Thức ăn',
            imageUrl: 'https://example.com/hotdog.jpg',
            isAvailable: true
        },
        {
            name: 'Nachos phô mai',
            price: mongoose.Types.Decimal128.fromString('55000'),
            description: 'Nachos với sốt phô mai',
            category: 'Thức ăn',
            imageUrl: 'https://example.com/nachos.jpg',
            isAvailable: true
        }
    ];
    
    const savedConcessionItems = await ConcessionItem.insertMany(concessionItems);
    console.log(`Đã thêm ${savedConcessionItems.length} món ăn/đồ uống`);
    return savedConcessionItems;
}

async function seedTicketTypes() {
    const ticketTypes = [
        {
            typeName: 'Người lớn',
            description: 'Vé dành cho người lớn',
            priceAdjustment: mongoose.Types.Decimal128.fromString('0'),
            isActive: true
        },
        {
            typeName: 'Học sinh/Sinh viên',
            description: 'Vé dành cho học sinh, sinh viên (Yêu cầu thẻ học sinh/sinh viên)',
            priceAdjustment: mongoose.Types.Decimal128.fromString('-10000'),
            isActive: true
        },
        {
            typeName: 'Trẻ em',
            description: 'Vé dành cho trẻ em dưới 12 tuổi',
            priceAdjustment: mongoose.Types.Decimal128.fromString('-20000'),
            isActive: true
        },
        {
            typeName: 'Người cao tuổi',
            description: 'Vé dành cho người từ 60 tuổi trở lên',
            priceAdjustment: mongoose.Types.Decimal128.fromString('-15000'),
            isActive: true
        },
        {
            typeName: 'VIP',
            description: 'Vé hạng VIP (bao gồm ghế cao cấp, đồ ăn miễn phí)',
            priceAdjustment: mongoose.Types.Decimal128.fromString('50000'),
            isActive: true
        }
    ];
    
    const savedTicketTypes = await TicketType.insertMany(ticketTypes);
    console.log(`Đã thêm ${savedTicketTypes.length} loại vé`);
    return savedTicketTypes;
}

async function seedShowtimes(movies, theaterRooms) {
    // Hàm tạo các lịch chiếu cho một ngày cụ thể
    function createShowtimesForDay(date, movie, room, price) {
        const showTimes = [];
        const startTimes = ['10:00', '13:30', '16:00', '19:00', '21:30'];
        
        startTimes.forEach(time => {
            const [hours, minutes] = time.split(':').map(Number);
            
            const startTime = new Date(date);
            startTime.setHours(hours, minutes, 0, 0);
            
            const endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes() + movie.duration);
            
            showTimes.push({
                movie: movie._id,
                room: room._id,
                startTime: startTime,
                endTime: endTime,
                price: mongoose.Types.Decimal128.fromString(price.toString()),
                isActive: true
            });
        });
        
        return showTimes;
    }
    
    const showtimes = [];
    
    // Tạo lịch chiếu trong 7 ngày tiếp theo
    for (let day = 0; day < 7; day++) {
        const date = new Date();
        date.setDate(date.getDate() + day);
        
        // Phim 1 - Người Nhện (Phòng IMAX)
        showtimes.push(...createShowtimesForDay(date, movies[0], theaterRooms[3], 150000));
        
        // Phim 2 - Mộng Du (Phòng VIP)
        showtimes.push(...createShowtimesForDay(date, movies[1], theaterRooms[2], 120000));
        
        // Phim 3 - Kẻ Hủy Diệt (Phòng chuẩn)
        showtimes.push(...createShowtimesForDay(date, movies[2], theaterRooms[0], 90000));
        
        // Phim 4 - Ký Sinh Trùng (Phòng Gold)
        showtimes.push(...createShowtimesForDay(date, movies[3], theaterRooms[4], 130000));
        
        // Phim 5 - Soul (Phòng chuẩn)
        showtimes.push(...createShowtimesForDay(date, movies[4], theaterRooms[1], 90000));
    }
    
    const savedShowtimes = await Showtime.insertMany(showtimes);
    console.log(`Đã thêm ${savedShowtimes.length} lịch chiếu`);
    return savedShowtimes;
}

// Chạy seed function
// seedDatabase(); 