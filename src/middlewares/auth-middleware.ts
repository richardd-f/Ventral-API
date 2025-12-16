import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.util";
import { ResponseError } from "../errors/response-error";
import { UserJWTPayload } from "../modules/auth/interface";
import { UserResponse } from "../types/auth";

export const authMiddleware = async (req: UserResponse, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return next(new ResponseError(401, "Unauthorized"));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next(new ResponseError(401, "Unauthorized"));
    }

    try {
        const payload = verifyToken(token) as UserJWTPayload;
        req.user = payload;
        next();
    } catch (error) {
        return next(new ResponseError(401, "Unauthorized"));
    }
}
