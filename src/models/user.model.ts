import { Document, model, Schema } from "mongoose"

export interface IUser extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    refreshToken: string,
    isArchived: boolean,
}

const userSchema: Schema<IUser> = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    isArchived: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false })

export const User = model<IUser>("User", userSchema)