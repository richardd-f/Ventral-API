"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const response_error_1 = require("../../errors/response-error");
class UserService {
    static async getUserDataById(userId) {
        const user = await prisma_1.default.user.findUnique({
            where: {
                user_id: userId
            },
            include: {
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        events: true
                    }
                }
            }
        });
        if (!user) {
            throw new response_error_1.ResponseError(404, "User not found");
        }
        return user;
    }
    static async searchUsers(name, limit = 10, skip = 0) {
        const users = await prisma_1.default.user.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
            take: limit, // Pagination: how many to return
            skip: skip, // Pagination: how many to skip
        });
        // findMany returns an empty array [] if nothing found, not null
        if (users.length === 0) {
            throw new response_error_1.ResponseError(404, "No users match your search");
        }
        return users;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=service.js.map