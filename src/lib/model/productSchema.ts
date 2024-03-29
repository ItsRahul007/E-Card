import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    //! required fields
    product_name: {
        required: true,
        type: String,
    },
    primaryImgUrl: {
        required: true,
        type: String,
        unique: true,
    },
    secondaryImgUrls: {
        required: true,
        type: [String],
        unique: true,
    },
    price: {
        required: true,
        type: Number,
    },
    product_type: {
        required: true,
        type: String,
    },
    product_category: {
        required: true,
        type: String,
    },
    search_keys: {
        required: true,
        type: [String],
    },
    current_price: {
        required: true,
        type: Number,
    },

    //! not required fields
    brand_name: String,
    ratings: [{
        ratingBy: {
            type: String,
            required: [true, "Please provide a reviewer id"]
        },
        ratingNumber: {
            type: Number,
            required: [true, "Please provide a rating between 1 and 5"]
        },
        comment: {
            type: String,
            required: [true, "Please a review comment"]
        },
    }],
    discount_percentage: Number,
}, { timestamps: true, get: (time: any) => time.toDateString() });

const Products = models.products || model("products", productSchema);
export default Products;