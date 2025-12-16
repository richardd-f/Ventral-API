import { NextFunction, Request, Response } from "express";
import { createEventSchema, updateEventSchema } from "./validation";
import { EventService } from "./service";
import { ResponseError } from "../../errors/response-error";
import { UserResponse } from "../../types/auth";

export class EventController {

    static async createEvent(req: UserResponse, res: Response, next: NextFunction) {
        try {
            const validatedData = createEventSchema.parse(req.body);
            const userId = req.user!.id;
            
            const event = await EventService.createEvent(validatedData, userId);
            res.status(201).json({
                success: true,
                message: "Event created successfully",
                data: event
            });
        } catch (err) {
            next(err);
        }
    }

    // support partial update (patch)
    static async updateEvent(req: UserResponse, res: Response, next: NextFunction) {
        try {
            const { eventId } = req.params;
            if(!eventId) throw new ResponseError(400, "Event ID is required");

            const validatedData = updateEventSchema.parse(req.body);
            const event = await EventService.updateEvent(eventId, validatedData);
            res.status(200).json({
                success: true,
                message: "Event updated successfully",
                data: event
            });
        } catch (err) {
            next(err);
        }
    }

    static async getEventByUserId(req: UserResponse, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            if(!userId) throw new ResponseError(400, "User ID is required");
            const events = await EventService.getEventByUserId(userId);
            res.status(200).json({
                success: true,
                message: "Events retrieved successfully",
                data: events
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAllEvent(req: UserResponse, res: Response, next: NextFunction) {
        try {
            const events = await EventService.getAllEvent();
            res.status(200).json({
                success: true,
                message: "All events retrieved successfully",
                data: events
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteEvent(req: UserResponse, res: Response, next: NextFunction) {
        try {
            const { eventId } = req.params;
            if(!eventId) throw new ResponseError(400, "Event ID is required");
            await EventService.deleteEvent(req.user!.id, eventId);
            res.status(200).json({
                success: true,
                message: "Event deleted successfully"
            });
        } catch (err) {
            next(err);
        }
    }
}
