import { NextFunction, Request, Response } from "express"
import { success, ZodError } from "zod"
import { ResponseError } from "../errors/response-error"


export const errorMiddleware = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ZodError) {
        // Extract just the message strings and join them
        // Example result: "Invalid email address, Password is too short"
        const errorMessage = error.issues.map((issue) => issue.message).join(', ');

        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: errorMessage,
        });
    }

    if (error instanceof ResponseError) {
        return res.status(error.status).json({
            success: false,
            message: "Service error",
            errors: error.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Server error",
        errors: error.message,
    });
};
