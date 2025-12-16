import { Document, model, Schema } from "mongoose";

export interface IAdmin extends Document {
    avatar: string
    userName: string,
    password: string,
    newAcc: boolean,
    isArchived: boolean,
}

const adminSchema: Schema<IAdmin> = new Schema({
    avatar: {
        type: String,
        required: true,
        default: ""
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    newAcc: {
        type: Boolean,
        required: true,
        default: true
    },
    isArchived: {
        type: Boolean,
        required: true,
        default: false
    }
})

export const Admin = model("Admin", adminSchema)