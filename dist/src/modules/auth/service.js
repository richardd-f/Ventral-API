"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const response_error_1 = require("../../errors/response-error");
const jwt_util_1 = require("../../utils/jwt.util");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    static async login(data) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                email: data.email
            }
        });
        if (!user) {
            throw new response_error_1.ResponseError(400, "Invalid email or password");
        }
        const isPasswordValid = await bcrypt_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new response_error_1.ResponseError(400, "Invalid email or password");
        }
        return (0, jwt_util_1.generateToken)({
            id: user.user_id,
            name: user.name,
            email: user.email
        });
    }
    static async register(data) {
        // Check if email already exists
        const email = await prisma_1.default.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (email) {
            throw new response_error_1.ResponseError(400, "Email already exists");
        }
        // Encrypt password
        data.password = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                bio: data.bio,
                img_url: data.img_url,
                date_of_birth: new Date(data.date_of_birth),
            }
        });
        return (0, jwt_util_1.generateToken)({
            id: user.user_id,
            name: user.name,
            email: user.email
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=service.js.map