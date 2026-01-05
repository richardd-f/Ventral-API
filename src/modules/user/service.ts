import { User } from "@prisma/client";
import prisma from "../../config/prisma";
import { ResponseError } from "../../errors/response-error";

export class UserService {
    static async getUserDataById(userId: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                user_id: userId
            },
            include: {
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        events: true
                    }
                }
            }
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        return user;
    }
    
    static async searchUsers(name: string, limit: number = 10, skip: number = 0): Promise<User[]> {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
            
            take: limit, // Pagination: how many to return
            skip: skip,  // Pagination: how many to skip
        });

        // findMany returns an empty array [] if nothing found, not null
        if (users.length === 0) {
            throw new ResponseError(404, "No users match your search");
        }

        return users;
    }

}
