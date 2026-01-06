"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("./service");
const response_error_1 = require("../../errors/response-error");
class UserController {
    static async getUserById(req, res, next) {
        try {
            const userId = req.params.userId;
            if (!userId)
                throw new response_error_1.ResponseError(400, "User ID is required");
            const user = await service_1.UserService.getUserDataById(userId);
            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async searchUsers(req, res, next) {
        try {
            const name = req.params.name;
            if (!name)
                throw new response_error_1.ResponseError(400, "User name is required");
            const user = await service_1.UserService.searchUsers(name);
            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=controller.js.map