import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    reviewDetails: [{
        reviewerId: {
            type: String,
            required: true
        },
        reviewComment: {
            type: String,
            required: true
        },
    }]
});

const reviews = models.reviews || model("reviews", reviewSchema);

export default reviews;