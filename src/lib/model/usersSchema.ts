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
  send_email_when_get_an_order: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: Number || null,
    default: null,
  },
  coupons: [
    {
      coupon_name: String,
      coupon_code: String,
      coupon_discount: Number,
      starts_on: Date,
      ends_on: Date,
      is_active: Boolean,
    },
  ],
});

const User = models.users || model("users", userModel);

export default User;
