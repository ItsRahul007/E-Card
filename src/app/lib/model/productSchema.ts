import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    product_name: {
        required: true,
        type: String,
    },
    imgUrl: {
        required: true,
        type: String,
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
        type: Array,
    },
    brand_name: String,
    rating: Number,
});

const Products = models.products || model("products", productSchema);

export default Products;