"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
exports.EventRoutes = (0, express_1.Router)();
exports.EventRoutes.get("/events/user/:userId", controller_1.EventController.getEventByUserId); // Get events by user
exports.EventRoutes.get("/events", controller_1.EventController.getAllEvent); // Get all events
exports.EventRoutes.post("/events", auth_middleware_1.authMiddleware, controller_1.EventController.createEvent); // create events
exports.EventRoutes.patch("/events/:eventId", auth_middleware_1.authMiddleware, controller_1.EventController.updateEvent); // Update events
exports.EventRoutes.delete("/events/:eventId", auth_middleware_1.authMiddleware, controller_1.EventController.deleteEvent); // Delete events
//# sourceMappingURL=route.js.map