import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema({
    productId: {
        type: String,
        required: [true, "Please provide a product id"]
    },
    reviewDetails: [{
        reviewerId: {
            type: String,
            required: [true, "Please provide a reviewer id"]
        },
        rating: {
            type: Number,
            required: [true, "Please provide a rating between 1 and 5"]
        },
        reviewComment: {
            type: String,
            required: [true, "Please a review comment"]
        },
    }]
});

const reviews = models.reviews || model("reviews", reviewSchema);

export default reviews;