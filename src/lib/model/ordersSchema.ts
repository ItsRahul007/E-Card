import { Schema, model, models } from "mongoose";

const ordersModel = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      require: [true, "Please prvide the customer id"],
    },
    shipping_address: {
      full_name: {
        type: String,
        require: [true, "Full name is required"],
      },
      phone_number: {
        type: Number,
        require: [true, "Phone number is required"],
      },
      address: {
        type: String,
        require: [true, "Address is required"],
      },
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          require: [true, "Product id is required"],
        },
        primaryImgUrl: {
          require: [true, "Primary image url is required"],
          type: String,
        },
        product_name: {
          require: [true, "Product name is required"],
          type: String,
        },
        quantity: {
          type: Number,
          require: [true, "Product quantity is required"],
          min: 1,
        },
        product_price: {
          type: Number,
          require: [true, "Product price is required"],
        },
        brand_name: {
          type: String,
          require: [true, "Brand name is required"],
        },
        order_status: {
          type: String,
          enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        },
      },
    ],
    total_price: {
      type: Number,
      require: [true, "Total price is required"],
      min: 0,
    },
    total_discount: {
      type: Number,
      default: 0,
      require: [true, "Total discount is required"],
    },
    tax: {
      type: Number,
      default: 20,
      require: [true, "Tax is required"],
    },
    delivary_status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    payment_type: {
      type: String,
      enum: ["cash-on-delivery", "stripe"],
      require: [true, "Payment type is required"],
    },
    payment_status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true, get: (time: any) => time.toDateString() }
);

const Orders = models.orders || model("orders", ordersModel);

export default Orders;
