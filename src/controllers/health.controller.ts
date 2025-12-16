import { Request, RequestHandler, Response } from "express";
import asyncHandler from "../utils/asynchandler";
import { ApiResponse } from "../utils/response";
import mongoose from "mongoose";

export const healthCheck: RequestHandler = asyncHandler(async (_req: Request, res: Response) => {

    const results = await mongoose.connection.db?.admin().ping()

    const serverStats = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date(Date.now()),
        services: {
            database: results?.ok === 1 ? "UP" : "DOWN"
        }
    }

    return res.status(200).json(
        new ApiResponse(200, serverStats, "Server stats")
    )
})