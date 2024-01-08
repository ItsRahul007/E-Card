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
    password: String,
    socialUser: Boolean,
    fevoriteItems: Array,
});

const User = models.users || model("users", userModel);

export default User;