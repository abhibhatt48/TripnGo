// Author: Abhishek Bhatt

module.exports = {
    sendSuccess: (res, data, message = "Operation successful.") => {
        return res.status(200).json({
            success: true,
            message: message,
            data: data
        });
    },
    
    sendError: (res, error, statusCode = 400) => {
        return res.status(statusCode).json({
            success: false,
            message: error
        });
    },
}
