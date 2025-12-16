import jwt from "jsonwebtoken"
import { IUser } from "../models/user.model"

export const generateAccessAndRefreshTokens = async (user: IUser) => {
    const accessSecret = process.env.ACCESS_SECRET
    const refreshSecret = process.env.REFRESH_SECRET
    if (!accessSecret || !refreshSecret) {
        throw new Error("Access or Refresh secret is missing. Check .env")
    }

    const accessToken = jwt.sign(
        {
            userId: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName
        },
        accessSecret,
        {
            expiresIn: "1d"
        }
    )

    const refreshToken = jwt.sign(
        {
            userId: user?._id,
        },
        refreshSecret,
        {
            expiresIn: "30d"
        }
    )
    return { accessToken, refreshToken }
}