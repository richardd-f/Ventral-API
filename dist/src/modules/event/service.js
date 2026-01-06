"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../config/prisma"));
const response_error_1 = require("../../errors/response-error");
class EventService {
    static async createEvent(data, userId) {
        // 1. Check if an event with this name already exists
        const existingEvent = await prisma_1.default.event.findUnique({
            where: { name: data.name }
        });
        if (existingEvent) {
            throw new response_error_1.ResponseError(400, "Event name is already registered");
        }
        return await prisma_1.default.event.create({
            data: {
                author_id: userId,
                name: data.name,
                description: data.description,
                date_start: new Date(data.date_start),
                date_end: new Date(data.date_end),
                price: data.price,
                ...(data.quota !== undefined && { quota: data.quota }),
                status: data.status ? data.status : client_1.EventStatus.OPEN
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
    static async updateEvent(eventId, data) {
        const event = await prisma_1.default.event.findUnique({
            where: { event_id: eventId }
        });
        if (!event) {
            throw new response_error_1.ResponseError(404, "Event not found");
        }
        const updateData = { ...data };
        if (data.date_start)
            updateData.date_start = new Date(data.date_start);
        if (data.date_end)
            updateData.date_end = new Date(data.date_end);
        if (data.quota !== undefined)
            updateData.quota = data.quota;
        return await prisma_1.default.event.update({
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
    static async getEventById(eventId) {
        const event = await prisma_1.default.event.findUnique({
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
        if (!event) {
            throw new response_error_1.ResponseError(404, "Event not found");
        }
        return event;
    }
    static async getEventByUserId(userId) {
        return await prisma_1.default.event.findMany({
            where: { author_id: userId },
            orderBy: { date_start: 'desc' }, // Optional: order by date
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
    static async getAllEvent() {
        return await prisma_1.default.event.findMany({
            where: { status: client_1.EventStatus.OPEN }, // Typically we only show open events
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
    static async deleteEvent(userId, eventId) {
        const event = await prisma_1.default.event.findUnique({
            where: {
                event_id: eventId,
                author_id: userId
            }
        });
        if (!event) {
            throw new response_error_1.ResponseError(404, "Event not found");
        }
        await prisma_1.default.event.delete({
            where: { event_id: eventId }
        });
        return {
            success: true,
            message: `Event ${eventId} deleted`
        };
    }
}
exports.EventService = EventService;
//# sourceMappingURL=service.js.map