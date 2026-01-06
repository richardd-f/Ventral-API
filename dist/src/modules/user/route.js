"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
exports.UserRoutes = (0, express_1.Router)();
exports.UserRoutes.get("/users/id/:userId", auth_middleware_1.authMiddleware, controller_1.UserController.getUserById);
exports.UserRoutes.get("/users/search/:name", auth_middleware_1.authMiddleware, controller_1.UserController.searchUsers);
//# sourceMappingURL=route.js.map