import { cookies } from "next/headers";
import Orders from "../model/ordersSchema";
import Products from "../model/productSchema";
import connectWithMongo from "../mongoConnection/mongoConnect";
import { decode } from "jsonwebtoken";
import { T_JwtVerifyDataType } from "../types/authToken-type";

const authToken = cookies().get("authToken")?.value || "";

const { user: userDataObject } = decode(authToken) as T_JwtVerifyDataType;

export const getProducts = async () => {
  try {
    await connectWithMongo();
    const usersProducts = await Products.find({
      brand_name: userDataObject.brandName,
    }).select("product_name primaryImgUrl price discount_percentage");

    return usersProducts;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to get products, please try again!");
  }
};

export const getProductById = async (productId: string) => {
  try {
    await connectWithMongo();
    const product = await Products.findById(productId).select(
      "-current_price -updatedAt -__v -ratings -createdAt -brand_name"
    );

    return product;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to get product, please try again!");
  }
};

type orderProduct = {
  product_id: string;
  primaryImgUrl: string;
  product_name: string;
  quantity: number;
  product_price: number;
  brand_name: string;
  _id: string;
  order_status?:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
};

interface T_myOrders extends orderProduct {
  orderId: string;
}

type T_Orders = {
  products: orderProduct[];
  _id: string;
};

export const getOrders = async () => {
  try {
    const orders: T_Orders[] = await Orders.find({
      "products.brand_name": userDataObject.brandName,
    }).select("products");

    const myOrders: T_myOrders[] = orders
      .flatMap((order) => {
        return order.products.map((product) => {
          if (product.brand_name === userDataObject.brandName) {
            //* spread operator is not working fine thats why I'm doing that
            const {
              product_id,
              primaryImgUrl,
              product_name,
              quantity,
              product_price,
              _id,
              order_status,
            } = product;

            return {
              product_id,
              primaryImgUrl,
              product_name,
              quantity,
              product_price,
              _id,
              order_status,
              orderId: order._id,
            };
          } else {
            return null;
          }
        });
      })
      .filter((product) => product !== null) as T_myOrders[]; // Filter out nulls

    return myOrders;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to get orders, please try again!");
  }
};
