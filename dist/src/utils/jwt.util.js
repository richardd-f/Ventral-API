"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_util_1 = require("./env.util");
function generateToken(payload, expiryTime = "1h") {
    return jsonwebtoken_1.default.sign(payload, env_util_1.JWT_SECRET_KEY || "secret_key", {
        expiresIn: expiryTime,
    });
}
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_util_1.JWT_SECRET_KEY || "secret_key");
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.util.js.map