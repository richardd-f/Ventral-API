import { NextFunction, Request, Response } from "express";
import { createEventSchema, updateEventSchema } from "./validation";
import { EventService } from "./service";
import { ResponseError } from "../../errors/response-error";
import { UserRequest } from "../../types/auth";

export class EventController {

    static async createEvent(req: UserRequest, res: Response, next: NextFunction) {
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
    static async updateEvent(req: UserRequest, res: Response, next: NextFunction) {
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

    static async getEventByUserId(req: UserRequest, res: Response, next: NextFunction) {
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

    static async getAllEvent(req: UserRequest, res: Response, next: NextFunction) {
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

    static async deleteEvent(req: UserRequest, res: Response, next: NextFunction) {
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
    
    static async getEventCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await EventService.getEventCategories();
            res.status(200).json({
                success: true,
                message: "Event categories retrieved successfully",
                data: categories
            });
        } catch (err) {
            next(err);
        }
    }

    static async applicateEvent(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { eventId } = req.params;
            const userId = req.user!.id;

            if(!eventId) throw new ResponseError(400, "Event ID is required");

            const application = await EventService.applicateEvent(userId, eventId);
            res.status(201).json({
                success: true,
                message: "Successfully registered for event",
                data: application
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAppliedEvent(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const events = await EventService.getAppliedEvent(userId);
            res.status(200).json({
                success: true,
                message: "Applied events retrieved successfully",
                data: events
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteApplication(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { eventId } = req.params;
            const userId = req.user!.id;

            if(!eventId) throw new ResponseError(400, "Event ID is required");

            await EventService.deleteApplication(userId, eventId);
            res.status(200).json({
                success: true,
                message: "Application deleted successfully"
            });
        } catch (err) {
            next(err);
        }
    }

    static async getEventStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { eventId } = req.query;

            if(!userId) throw new ResponseError(400, "User ID is required");
            if(!eventId) throw new ResponseError(400, "Event ID is required");

            const status = await EventService.getEventStatus(userId, eventId as string);
            res.status(200).json({
                success: true,
                message: "Event status retrieved successfully",
                data: status
            });
        } catch (err) {
            next(err);
        }
    }
}
