let multer = require('multer')
const { avatarDir } = require('../config/uploadPath');


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, avatarDir),
    filename: (req, file, cb) => cb(null,
        file.originalname
    )
})

const uploadAvatar =  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match('image')) {
            cb(new Error("tao nhan anh? thoi"));
        } else {
            cb(null, true);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

module.exports = {uploadAvatar};