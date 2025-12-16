import mongoose, { model, ObjectId, Schema } from "mongoose";
import { IProduct } from "./product.model";

export interface IOrder extends Document {
    userId: ObjectId,
    email: string,
    amount: number,
    status: "success" | "failed",
    products: IProduct[]
}

const orderSchema: Schema<IOrder> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["success", "failed"],
        default: "success"
    }
}, { timestamps: true, versionKey: false })

export const Order = model<IOrder>("Order", orderSchema);