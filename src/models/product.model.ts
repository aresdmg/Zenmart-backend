import { Document, model, ObjectId, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string,
    shortDescription: string
    description: string
    price: number
    sizes?: string[]
    colors: string[]
    images: string[]
    categorySlug: string
    category: ObjectId,
    stock: number,
    isArchived: boolean
}

const productSchema: Schema<IProduct> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    description: {
        type: String,
        required: true,
        max: 200
    },
    price: {
        type: Number,
        required: true
    },
    sizes: [{
        type: String,
    }],
    colors: [{
        type: String,
        required: true,
    }],
    images: [{
        type: String,
        required: true
    }],
    categorySlug: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    isArchived: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true, versionKey: false })

export const Products = model<IProduct>("Products", productSchema) 