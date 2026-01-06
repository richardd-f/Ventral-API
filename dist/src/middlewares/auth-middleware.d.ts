import { NextFunction, Response } from "express";
import { UserRequest } from "../types/auth";
export declare const authMiddleware: (req: UserRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth-middleware.d.ts.map