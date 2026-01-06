import { NextFunction, Response } from "express";
import { UserRequest } from "../../types/auth";
export declare class UserController {
    static getUserById(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static searchUsers(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map