import { User } from "@prisma/client";
export declare class UserService {
    static getUserDataById(userId: string): Promise<User>;
    static searchUsers(name: string, limit?: number, skip?: number): Promise<User[]>;
}
//# sourceMappingURL=service.d.ts.map