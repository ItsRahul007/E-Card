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
};
