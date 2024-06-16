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
  avatar: {
    type: String,
  },
  userRole: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
  },
  addresses: [
    {
      full_name: String,
      phone_number: Number,
      address: String,
    },
  ],
  mobile_number: Number,
  password: String,
  socialUser: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  brandName: {
    type: String,
    unique: [true, "Brand name already exists."],
  },
  contactEmail: {
    type: String,
    unique: [true, "Contact email already exists."],
  },
  contactNumber: {
    type: Number,
    unique: [true, "Contact number already exists."],
  },
});

const User = models.users || model("users", userModel);

export default User;
