import { Schema, model, models } from "mongoose";

const ordersModel = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        require: [true, "Please prvide the customer id"]
    },
    shipping_address: {
        full_name: {
            type: String,
            require: true
        },
        phone_number: {
            type: Number,
            require: true
        },
        address: {
            type: String,
            require: true
        }
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    total_price: {
        type: Number,
        require: true,
        min: 0
    },
    discount_percentage: {
        type: Number,
        default: 0
    },
    delivary_status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    payment_type: {
        type: String,
        enum: ["cash on delivery", "credit card", "debit card", "paypal"]
    },
    payment_status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    }
}, { timestamps: true, get: (time: any) => time.toDateString() });

const Orders = models.orders || model("orders", ordersModel);

export default Orders;