import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import { ResponseError } from "../errors/response-error"


export const errorMiddleware = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            status: "error",
            message: "Validation error",
            errors: error.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        });
    }

    if (error instanceof ResponseError) {
        return res.status(error.status).json({
            status: "error",
            message: error.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message: error.message,
    });
};
