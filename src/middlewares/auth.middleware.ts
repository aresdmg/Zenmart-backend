import { NextFunction, Request } from "express";
import asyncHandler from "../utils/asynchandler";
import { IUser, User } from "../models/user.model";
import { ApiError } from "../utils/response";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

interface ZenMartPayload extends JwtPayload {
    userId: ObjectId,
    firstName?: string,
    lastName?: string
}

export interface ExtendedRequest extends Request {
    user?: IUser
}

export const authorizedUser = asyncHandler(async (req: ExtendedRequest, _, next: NextFunction) => {
    try {
        const accessToken = req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.zenmart_accessToken
        if (!accessToken) {
            throw new ApiError(401, "Unauthorized access")
        }

        const accessSecret = process.env.ACCESS_SECRET
        if (!accessSecret) {
            throw new Error("Access or Refresh secrete is missing. Check .env")
        }

        const decodedToken = jwt.verify(accessToken, accessSecret) as ZenMartPayload
        const user = await User.findById(decodedToken?.userId)
        if (!user) {
            throw new ApiError(400, "Invalid access token")
        }

        req.user = user
        next()
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(401, error?.message, error)
        }
        throw new ApiError(401, "Invalid access token", error as Error)
    }
})