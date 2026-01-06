"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
exports.AuthRoutes = (0, express_1.Router)();
exports.AuthRoutes.post("/login", controller_1.AuthController.login);
exports.AuthRoutes.post("/register", controller_1.AuthController.register);
//# sourceMappingURL=route.js.map