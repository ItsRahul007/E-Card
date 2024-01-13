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
    secondryImgUrls: {
        required: true,
        type: [String],
        unique: true,
        validate: {
            validator: function (value: string[]) {
                return value.length === 3; //? if length is 3 then its valid
            },
            message: 'Must have 3 secondry images',
        },
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
    brand_name: String,
    rating: Number,
    ratedBy: Array,
});

const Products = models.products || model("products", productSchema);

export default Products;