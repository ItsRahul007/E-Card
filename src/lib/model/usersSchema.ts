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
    mobileNumber: Number,
    password: String,
    socialUser: Boolean,
    // favourite: Array,
    cart: Array,
    orders: Array,
});

const User = models.users || model("users", userModel);

export default User;