import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/response.js";

export interface ExtendedError extends Error {
    statusCode: number,
    errors?: Error,
    message: string,
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || null
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || "Internal server error"
    });
};