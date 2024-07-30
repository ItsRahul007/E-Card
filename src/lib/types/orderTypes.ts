import { addressTypeInputValues } from "./addressTypes";

export type orderProductType = {
  _id: string;
  product_name: string;
  price: number;
  current_price: number;
  primaryImgUrl: string;
  quantity?: number;
  discount_percentage?: number;
  brand_name: string;
};

export type orderPriceStateType = {
  subtotal: number;
  discount: number;
  tax: number;
};

//? schema structure
export interface routeProduct {
  product_id: string;
  primaryImgUrl: string;
  product_name: string;
  quantity: number;
  product_price: number;
}

export type orderCouponType = {
  coupon_name: string;
  coupon_code: string;
  coupon_discount: number;
};

export type couponType = orderCouponType & {
  starts_on: Date;
  ends_on: Date;
  is_active: boolean;
};

//? schema structure
export interface Order {
  customer_id: string;
  shipping_address: addressTypeInputValues;
  products: routeProduct[];
  total_price: number; //* with tax and discount
  total_discount: number;
  tax: number;
  delivary_status?:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  payment_type: "cash-on-delivery" | "stripe" | string;
  payment_status?: "pending" | "success" | "failed";
  is_paid?: boolean;
  coupon?: orderCouponType;
}

export type T_orderObj = {
  shipping_address: addressTypeInputValues;
  products: orderProductType[];
  total_price: number;
  payment_type: "cash-on-delivery" | "stripe" | string;
  payment_status?: string;
  customer_id?: string;
  total_discount: number;
  tax: number;
  delivary_status?:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  coupon_code?: string;
};

export type orderProduct = {
  product_id: string;
  primaryImgUrl: string;
  product_name: string;
  quantity: number;
  product_price: number;
  brand_name: string;
  _id: string;
  order_status?:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
};

export interface T_myOrders extends orderProduct {
  orderId: string;
  createdAt?: Date;
}

export type T_Orders = {
  products: orderProduct[];
  _id: string;
  customer_id?: string;
};
