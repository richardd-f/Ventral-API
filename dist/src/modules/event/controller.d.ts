import { NextFunction, Response } from "express";
import { UserRequest } from "../../types/auth";
export declare class EventController {
    static createEvent(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static updateEvent(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static getEventByUserId(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static getAllEvent(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static deleteEvent(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map