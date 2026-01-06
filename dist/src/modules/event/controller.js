"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const validation_1 = require("./validation");
const service_1 = require("./service");
const response_error_1 = require("../../errors/response-error");
class EventController {
    static async createEvent(req, res, next) {
        try {
            const validatedData = validation_1.createEventSchema.parse(req.body);
            const userId = req.user.id;
            const event = await service_1.EventService.createEvent(validatedData, userId);
            res.status(201).json({
                success: true,
                message: "Event created successfully",
                data: event
            });
        }
        catch (err) {
            next(err);
        }
    }
    // support partial update (patch)
    static async updateEvent(req, res, next) {
        try {
            const { eventId } = req.params;
            if (!eventId)
                throw new response_error_1.ResponseError(400, "Event ID is required");
            const validatedData = validation_1.updateEventSchema.parse(req.body);
            const event = await service_1.EventService.updateEvent(eventId, validatedData);
            res.status(200).json({
                success: true,
                message: "Event updated successfully",
                data: event
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async getEventByUserId(req, res, next) {
        try {
            const { userId } = req.params;
            if (!userId)
                throw new response_error_1.ResponseError(400, "User ID is required");
            const events = await service_1.EventService.getEventByUserId(userId);
            res.status(200).json({
                success: true,
                message: "Events retrieved successfully",
                data: events
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async getAllEvent(req, res, next) {
        try {
            const events = await service_1.EventService.getAllEvent();
            res.status(200).json({
                success: true,
                message: "All events retrieved successfully",
                data: events
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteEvent(req, res, next) {
        try {
            const { eventId } = req.params;
            if (!eventId)
                throw new response_error_1.ResponseError(400, "Event ID is required");
            await service_1.EventService.deleteEvent(req.user.id, eventId);
            res.status(200).json({
                success: true,
                message: "Event deleted successfully"
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.EventController = EventController;
//# sourceMappingURL=controller.js.map