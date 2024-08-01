import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    //! required fields
    product_name: {
      required: true,
      type: String,
    },
    primaryImgUrl: {
      required: true,
      type: String,
    },
    secondaryImgUrls: {
      required: true,
      type: [String],
    },
    price: {
      required: true,
      type: Number,
    },
    product_type: {
      required: true,
      type: String,
      set: (value: string) => value.toLowerCase(),
    },
    product_category: {
      required: true,
      type: String,
      set: (value: string) => value.toLowerCase(),
    },
    current_price: {
      required: true,
      type: Number,
    },
    product_description: {
      required: true,
      type: String,
    },

    //! not required fields
    brand_name: String,
    ratings: [
      {
        ratingBy: {
          type: String,
          required: [true, "Please provide a reviewer id"],
        },
        ratingNumber: {
          type: Number,
          required: [true, "Please provide a rating between 1 and 5"],
        },
        comment: {
          type: String,
          required: [true, "Please a review comment"],
        },
      },
    ],
    discount_percentage: Number,
  },
  { timestamps: true, get: (time: any) => time.toDateString() }
);

const Products = models.products || model("products", productSchema);
export default Products;
