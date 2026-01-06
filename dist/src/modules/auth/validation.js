"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// Login schema
exports.loginSchema = zod_1.default.object({
    email: zod_1.default
        .string()
        .min(1, "Email is required")
        .email(),
    password: zod_1.default
        .string()
        .min(8, "Password must be at least 8 characters long"),
});
// Register schema
exports.registerSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(1, "Name is required"),
    email: zod_1.default
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: zod_1.default
        .string()
        .min(8, "Password must be at least 8 characters long"),
    phone: zod_1.default
        .string()
        .min(7, "Phone number must be at least 10 digits long")
        .max(14, "Phone number must be at most 14 digits long"),
    bio: zod_1.default
        .string()
        .min(1, "Bio is required")
        .max(300, "Bio must be at most 300 characters long"),
    img_url: zod_1.default
        .string()
        .min(1, "Image url is required")
        .url("Invalid image url"),
    date_of_birth: zod_1.default
        .string()
        .min(10, "Date of birth is required")
        .date("Date of birth must be in YYYY-MM-DD format")
});
//# sourceMappingURL=validation.js.map