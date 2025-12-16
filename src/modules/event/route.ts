import { Router } from "express";
import { EventController } from "./controller";
import { authMiddleware } from "../../middlewares/auth-middleware";

export const eventRoute: Router = Router();

eventRoute.post("/events", authMiddleware, EventController.createEvent); // create events
eventRoute.patch("/events/:eventId", authMiddleware, EventController.updateEvent); // Update events
eventRoute.get("/events/user/:userId", EventController.getEventByUserId); // Get events by user
eventRoute.get("/events", EventController.getAllEvent); // Get all events
eventRoute.delete("/events/:eventId", authMiddleware, EventController.deleteEvent); // Delete events
