import { Event } from "@prisma/client";
import { CreateEventInput, UpdateEventInput } from "./validation";
export declare class EventService {
    static createEvent(data: CreateEventInput, userId: string): Promise<Event>;
    static updateEvent(eventId: string, data: UpdateEventInput): Promise<Event>;
    static getEventById(eventId: string): Promise<Event>;
    static getEventByUserId(userId: string): Promise<Event[]>;
    static getAllEvent(): Promise<Event[]>;
    static deleteEvent(userId: string, eventId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=service.d.ts.map