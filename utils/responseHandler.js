const CreateSuccessResponse = (res, status, data) => {
    res.status(status).json({
        success: true,
        data: data
    });
}

const CreateErrorResponse = (res, status, message) => {
    res.status(status).json({
        success: false,
        message: message
    });
}

const CreateSuccessResponseWithMessage = (res, status, message, data) => {
    res.status(status).json({
        success: true,
        message: message,
        data: data
    });
}

const CreateSuccessResponseMessage = (res, status, message) => {
    res.status(status).json({
        success: true,
        message: message
    });
}

module.exports = { CreateSuccessResponse, CreateErrorResponse, CreateSuccessResponseWithMessage, CreateSuccessResponseMessage };