import { Schema, model, models } from "mongoose";

const userModel = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    userRole: {
        type: String,
        enum: ["user", "seller", "admin"],
        default: "user",
    },
    addresses: [{
        full_name: String,
        phone_number: Number,
        address: String
    }],
    mobile_number: Number,
    password: String,
    socialUser: Boolean,
    cart: {
        type: [String],
        unique: [true, "Item is already in cart"], // Add this line to ensure unique values
    },
    orders: Array,
});

const User = models.users || model("users", userModel);

export default User;