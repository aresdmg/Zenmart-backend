import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

interface ICategory extends Document {
    name: string,
    slug: string,
    image: string,
    products: ObjectId[],
}

const categorySchema: Schema<ICategory> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    }],
    image: {
        type: String,
        required: true,
        default: ""
    },
}, { timestamps: true, versionKey: false })

export const Category = model<ICategory>("Category", categorySchema)