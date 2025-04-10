const path = require('path');

const avatarDir = path.join(__dirname, '../avatars');
const authURL = "http://localhost:3000/auth/avatars/";
const cdnServerURL = 'http://localhost:4000/upload';

module.exports = {
    avatarDir,
    authURL,
    cdnServerURL
};