"use server";

import { cookies } from "next/headers";
import Orders from "../model/ordersSchema";
import Products from "../model/productSchema";
import connectWithMongo from "../mongoConnection/mongoConnect";
import { decode } from "jsonwebtoken";
import { T_JwtVerifyDataType } from "../types/authToken-type";
import { T_Orders, T_myOrders } from "../types/orderTypes";

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

export const getOrders = async () => {
  try {
    await connectWithMongo();
    const orders: T_Orders[] = await Orders.find({
      "products.brand_name": userDataObject.brandName,
    })
      .select("products")
      .sort({ createdAt: -1 });

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

export const updateOrderStatus = async (
  status: string,
  orderId: string,
  productArrId: string
) => {
  try {
    //* get the order id and order-product-id and status and update it
    await connectWithMongo();
    await Orders.findByIdAndUpdate(
      orderId,
      {
        $set: {
          "products.$[product].order_status": status,
        },
      },
      {
        arrayFilters: [{ "product._id": productArrId }],
      }
    );

    return {
      success: true,
      message: "Order status updated!",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: "Failed update order status, please try again!",
    };
  }
};

//* figureout the diffrence between orders and sales then create a function who will return the total-sales number and last-7-day-sales number

export const getSales = async () => {
  try {
    await connectWithMongo();
    const orders = await Orders.find({
      "products.brand_name": userDataObject.brandName,
      delivary_status: "delivered",
    })
      .select("products createdAt")
      .sort({ createdAt: -1 });

    const myOrders = orders
      .flatMap((order) => {
        return order.products.map((product: any) => {
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
              createdAt: order.createdAt,
            };
          } else {
            return null;
          }
        });
      })
      .filter((product) => product !== null); // Filter out nulls

    const lastSevenDaysSales = myOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 7);

      return orderDate >= currentDate;
    });

    return {
      totalSales: myOrders.length,
      lastSevenDaysSales: lastSevenDaysSales.length,
    };
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to get sales, please try again!");
  }
};
