"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../errors/response-error");
const errorMiddleware = async (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        // Extract just the message strings and join them
        // Example result: "Invalid email address, Password is too short"
        const errorMessage = error.issues.map((issue) => issue.message).join(', ');
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: errorMessage,
        });
    }
    if (error instanceof response_error_1.ResponseError) {
        return res.status(error.status).json({
            success: false,
            message: "Service error",
            errors: error.message,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Server error",
        errors: error.message,
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error-middleware.js.map