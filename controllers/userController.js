const bcrypt = require('bcrypt');
let path = require('path')
let FormData = require('form-data')
let axios = require('axios')
let fs = require('fs')
const { avatarDir } = require('../config/uploadPath');


const { getAllUsers, getUsersByRole } = require('../services/userServices');
const { CreateErrorResponse, CreateSuccessResponse, CreateSuccessResponseMessage } = require('../utils/responseHandler');

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        return CreateSuccessResponse(res, 200, users);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

const getUsersByRoleController = async (req, res) => {
    try {
        const { roleId } = req.params;
        const users = await getUsersByRole(roleId);
        return CreateSuccessResponse(res, 200, users);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

const getMyInformation = async (req, res) => {
    try {
        const user = req.user;
        return CreateSuccessResponse(res, 200, user);
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return CreateErrorResponse(res, 400, 'Mật khẩu cũ không đúng.');
        }
        user.password = newPassword;
        await user.save();
        return CreateSuccessResponseMessage(res, 200, 'Đổi mật khẩu thành công.');
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
};


let serverCDN = 'http://localhost:4000/upload';

const changeAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return CreateErrorResponse(res, 400, "Không có file nào được upload.");
        }
        let imgPath = path.join(avatarDir, req.file.filename);
        let newform = new FormData();
        newform.append('avatar', fs.createReadStream(imgPath))
        let result = await axios.post(serverCDN, newform, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        fs.unlinkSync(imgPath)
        // let avatarURL = authURL + req.file.filename;
        req.user.avatarUrl = result.data.data;
        await req.user.save()
        CreateSuccessResponse(res, 200,req.user )
    } catch (error) {
        return CreateErrorResponse(res, 400, error.message);
    }
}


module.exports = { getAllUsersController, getUsersByRoleController, changePassword, getMyInformation, changeAvatar };
