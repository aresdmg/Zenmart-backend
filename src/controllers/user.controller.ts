import bcrypt from "bcrypt"
import { Request, Response } from "express";
import asyncHandler from "../utils/asynchandler";
import { ApiError, ApiResponse } from "../utils/response";
import { User } from "../models/user.model";
import { AsyncRequestHandler } from "../utils/types";
import { generateAccessAndRefreshTokens } from "../utils/token";
import { ExtendedRequest } from "../middlewares/auth.middleware";

export const registerUser: AsyncRequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new ApiError(400, "This email is taken")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    const createdUser = await User.findById(user?._id).select(
        "-password -refreshToken -isArchived"
    )

    return res.status(201).json(
        new ApiResponse(201, createdUser as Object, "User created")
    )
})

export const loginUser: AsyncRequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password)
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user)
    await User.findByIdAndUpdate(user?._id,
        {
            $set: { refreshToken },
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .cookie("zenmart_accessToken", accessToken, { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 1 })
        .cookie("zenmart_refreshToken", refreshToken, { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
        .json(
            new ApiResponse(200, {}, "User logged in")
        )
})

export const logoutUser: AsyncRequestHandler = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .clearCookie("zenmart_accessToken", { secure: true, httpOnly: true })
        .clearCookie("zenmart_refreshToken", { secure: true, httpOnly: true })
        .json(
            new ApiResponse(200, {}, "User logged out")
        )
})