import { Router } from "express";
import { EventController } from "./controller";
import { authMiddleware } from "../../middlewares/auth-middleware";

export const EventRoutes: Router = Router();

EventRoutes.get("/events/categories", EventController.getEventCategories); // Get event categories
EventRoutes.get("/events/user/:userId", EventController.getEventByUserId); // Get events by user
EventRoutes.get("/events", EventController.getAllEvent); // Get all events
EventRoutes.get("/events/applied", authMiddleware, EventController.getAppliedEvent); // Get applied event

EventRoutes.post("/events", authMiddleware, EventController.createEvent); // create events
EventRoutes.patch("/events/:eventId", authMiddleware, EventController.updateEvent); // Update events
EventRoutes.delete("/events/:eventId", authMiddleware, EventController.deleteEvent); // Delete events

// Application
EventRoutes.post("/events/:eventId/apply", authMiddleware, EventController.applicateEvent); // register to event
EventRoutes.delete("/events/:eventId/apply", authMiddleware, EventController.deleteApplication); // unregister from event

// Check User Action related Events
EventRoutes.get("/events/:userId/status", EventController.getEventStatus); // Get info about user's like, dislike,  and register status