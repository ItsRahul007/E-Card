import { Schema, model, models } from "mongoose";

const ratingSchema = new Schema({
    ratingBy: String,
    ratingNumber: Number,
});

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
    secondryImgUrls: {
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

    //! not required fields
    brand_name: String,
    ratings: [{
        ratingBy: String,
        ratingNumber: Number,
    }],
});

const Products = models.products || model("products", productSchema);

export default Products;