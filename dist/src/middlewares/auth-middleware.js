"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const response_error_1 = require("../errors/response-error");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next(new response_error_1.ResponseError(401, "Unauthorized"));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new response_error_1.ResponseError(401, "Unauthorized"));
    }
    try {
        const payload = (0, jwt_util_1.verifyToken)(token);
        req.user = payload;
        next();
    }
    catch (error) {
        return next(new response_error_1.ResponseError(401, "Unauthorized"));
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth-middleware.js.map