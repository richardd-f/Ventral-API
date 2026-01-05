import { Router } from "express";
import { EventController } from "./controller";
import { authMiddleware } from "../../middlewares/auth-middleware";

export const EventRoutes: Router = Router();

EventRoutes.get("/events/user/:userId", EventController.getEventByUserId); // Get events by user
EventRoutes.get("/events", EventController.getAllEvent); // Get all events

EventRoutes.post("/events", authMiddleware, EventController.createEvent); // create events
EventRoutes.patch("/events/:eventId", authMiddleware, EventController.updateEvent); // Update events
EventRoutes.delete("/events/:eventId", authMiddleware, EventController.deleteEvent); // Delete events

