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
    mobileNumber: Number,
    password: String,
    socialUser: Boolean,
    cart: Array,
    orders: Array,
});

const User = models.users || model("users", userModel);

export default User;