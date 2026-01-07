import { Event, EventStatus } from "@prisma/client";
import prisma from "../../config/prisma";
import { CreateEventInput, UpdateEventInput } from "./validation";
import { ResponseError } from "../../errors/response-error";

export class EventService {
    static async createEvent(data: CreateEventInput, userId: string): Promise<Event> {
        // 1. Check if an event with this name already exists
        const existingEvent = await prisma.event.findUnique({
            where: { name: data.name }
        });

        if (existingEvent) {
            throw new ResponseError(400, "Event name is already registered");
        }

        return await prisma.event.create({
            data: {
                author_id: userId,
                name: data.name,
                description: data.description,
                date_start: new Date(data.date_start),
                date_end: new Date(data.date_end),
                price: data.price,
                ...(data.quota !== undefined && { quota: data.quota }),
                status: data.status ? (data.status as EventStatus) : EventStatus.OPEN,
                ...(data.images && data.images.length > 0 && {
                    images: {
                        create: data.images.map((url) => ({
                            img_url: url
                        }))
                    }
                }),
                ...(data.categories && data.categories.length > 0 && {
                    categories: {
                        create: data.categories.map((categoryId) => ({
                            category_id: categoryId
                        }))
                    }
                })
            },
            include: {
                images: true,
                categories: {
                    include: { category: true }
                },
                _count: {
                    select: {
                        applications: true,
                        likes: true,
                        dislikes: true
                    }
                }
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
            data: updateData,
            include: {
                images: true,
                categories: {
                    include: { category: true }
                },
                _count: {
                    select: {
                        applications: true,
                        likes: true,
                        dislikes: true
                    }
                }
            }
        });
    }

    static async getEventById(eventId: string): Promise<Event> {
        const event = await prisma.event.findUnique({
            where: { event_id: eventId },
            include: {
                images: true,
                categories: {
                    include: { category: true }
                },
                _count: {
                    select: {
                        applications: true,
                        likes: true,
                        dislikes: true
                    }
                }
            }
        });
        if(!event){
            throw new ResponseError(404, "Event not found");
        }
        return event;
    }

    static async getEventByUserId(userId: string): Promise<Event[]> {
        return await prisma.event.findMany({
            where: { author_id: userId },
            orderBy: { date_start: 'desc' }, // Optional: order by date
            include: { // Optional: include useful relations
                images: true,
                categories: {
                    include: { category: true }
                },
                _count: {
                    select: {
                        applications: true,
                        likes: true,
                        dislikes: true
                    }
                }
            }
        });
    }

    static async getAllEvent(): Promise<Event[]> {
        return await prisma.event.findMany({
            where: { status: EventStatus.OPEN }, // Typically we only show open events
            orderBy: { date_start: 'asc' },
            include: {
                images: true,
                categories: {
                    include: { category: true }
                },
                _count: {
                    select: {
                        applications: true,
                        likes: true,
                        dislikes: true
                    }
                }
            }
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
    static async getEventCategories() {
        return await prisma.category.findMany();
    }

    static async applicateEvent(userId: string, eventId: string) {
        // 1. Check if event exists
        const event = await prisma.event.findUnique({
            where: { event_id: eventId }
        });

        if (!event) {
            throw new ResponseError(404, "Event not found");
        }

        // 2. Check if event is open
        if (event.status !== EventStatus.OPEN) {
            throw new ResponseError(400, "Event is not open for registration");
        }

        // 3. Check if user already applied
        const existingApplication = await prisma.application.findFirst({
            where: {
                user_id: userId,
                event_id: eventId
            }
        });

        if (existingApplication) {
            throw new ResponseError(400, "User already registered for this event");
        }

        // 4. Check quota
        if (event.quota !== null) {
            const currentApplications = await prisma.application.count({
                where: { event_id: eventId }
            });

            if (currentApplications >= event.quota) {
                throw new ResponseError(400, "Event quota reached");
            }
        }

        return await prisma.application.create({
            data: {
                user_id: userId,
                event_id: eventId
            }
        });
    }
}
