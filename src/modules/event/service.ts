import { Event, EventStatus } from "@prisma/client";
import prisma from "../../config/prisma";
import { CreateEventInput, UpdateEventInput } from "./validation";
import { ResponseError } from "../../errors/response-error";

export class EventService {
    static async createEvent(data: CreateEventInput, userId: string): Promise<Event> {
        return await prisma.event.create({
            data: {
                author_id: userId,
                name: data.name,
                description: data.description,
                date_start: new Date(data.date_start),
                date_end: new Date(data.date_end),
                price: data.price,
                ...(data.quota !== undefined && { quota: data.quota }),
                status: data.status ? data.status as EventStatus : EventStatus.OPEN
            }
        });
    }

    static async updateEvent(eventId: string, data: UpdateEventInput): Promise<Event> {
        const event = await prisma.event.findUnique({
            where: { event_id: eventId }
        });

        if (!event) {
            throw new ResponseError(404, "Event not found");
        }

        const updateData: any = { ...data };
        if (data.date_start) updateData.date_start = new Date(data.date_start);
        if (data.date_end) updateData.date_end = new Date(data.date_end);
        if (data.quota !== undefined) updateData.quota = data.quota;

        return await prisma.event.update({
            where: { event_id: eventId },
            data: updateData
        });
    }

    static async getEventByUserId(userId: string): Promise<Event[]> {
        return await prisma.event.findMany({
            where: { author_id: userId },
            orderBy: { date_start: 'desc' }, // Optional: order by date
            include: { // Optional: include useful relations
                images: true,
                categories: {
                    include: { category: true }
                }
            }
        });
    }

    static async getAllEvent(): Promise<Event[]> {
        return await prisma.event.findMany({
            where: { status: EventStatus.OPEN }, // Typically we only show open events
            orderBy: { date_start: 'asc' }
        });
    }

    static async deleteEvent(userId: string, eventId: string) {
        const event = await prisma.event.findUnique({
            where: { 
                event_id: eventId,
                author_id: userId
             }
        });

        if (!event) {
            throw new ResponseError(404, "Event not found");
        }

        await prisma.event.delete({
            where: { event_id: eventId }
        });
        
        return {
            success: true,
            message: `Event ${eventId} deleted`
        };
    }
}
