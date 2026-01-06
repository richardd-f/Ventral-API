"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const validation_1 = require("./validation");
const service_1 = require("./service");
class AuthController {
    static async login(req, res, next) {
        try {
            const validatedData = validation_1.loginSchema.parse(req.body);
            const token = await service_1.AuthService.login(validatedData);
            res.status(200).json({
                success: true,
                message: "Login succesfully",
                data: token
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async register(req, res, next) {
        try {
            const validatedData = validation_1.registerSchema.parse(req.body);
            const token = await service_1.AuthService.register(validatedData);
            res.status(201).json({
                success: true,
                message: "Register succesfully",
                data: token
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=controller.js.map