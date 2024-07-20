"use server";

import { cookies } from "next/headers";
import Orders from "../model/ordersSchema";
import Products from "../model/productSchema";
import connectWithMongo from "../mongoConnection/mongoConnect";
import { decode } from "jsonwebtoken";
import { T_JwtVerifyDataType } from "../types/authToken-type";
import { T_Orders, T_myOrders } from "../types/orderTypes";
import { sendEmail } from "./nodemailer";
import User from "../model/usersSchema";
import {
  failedToGetOrder,
  failedToGetProducts,
  failedToGetSales,
  failedToUpdateOrderStatus,
  orderUpdated,
} from "../util/toastMessages";

export const getProducts = async () => {
  const authToken = cookies().get("authToken")?.value || "";
  const { user: userDataObject } = decode(authToken) as T_JwtVerifyDataType;

  try {
    await connectWithMongo();
    const usersProducts = await Products.find({
      brand_name: userDataObject.brandName,
    }).select("product_name primaryImgUrl price discount_percentage");

    return usersProducts;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(failedToGetProducts);
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
    throw new Error(failedToGetProducts);
  }
};

export const getOrders = async () => {
  const authToken = cookies().get("authToken")?.value || "";
  const { user: userDataObject } = decode(authToken) as T_JwtVerifyDataType;

  try {
    await connectWithMongo();
    const orders: T_Orders[] = await Orders.find({
      "products.brand_name": userDataObject.brandName,
      delivary_status: { $ne: "delivered" }, //? $ne means "not equal to"
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
    throw new Error(failedToGetOrder);
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

    //? updating the order status inside product array
    const allProducts = (await Orders.findByIdAndUpdate(
      JSON.parse(orderId),
      {
        $set: {
          "products.$[product].order_status": status,
        },
      },
      {
        arrayFilters: [{ "product._id": JSON.parse(productArrId) }],
      }
    ).select("products customer_id")) as T_Orders;

    //? checking if all the product's order status is delivered or not
    const isAllDelivered = allProducts.products.every((product) => {
      const isNewlyUpdatesIsDelivered =
        JSON.stringify(product._id) === productArrId && status === "delivered";

      return product.order_status === "delivered"
        ? true
        : isNewlyUpdatesIsDelivered;
    });

    //? collecting the product names
    const allProductNames = allProducts.products.map(
      (product) => `<li>${product.product_name}</li>`
    );

    //? if all products are delivered then changing the delivary status and payment status
    if (isAllDelivered) {
      await Orders.findByIdAndUpdate(JSON.parse(orderId), {
        $set: {
          delivary_status: "delivered",
          payment_status: "success",
        },
      });

      //? sending email to the customer
      const user = await User.findById(allProducts.customer_id);

      const { success, problem } = await sendEmail({
        subject: "Order Delivered",
        html: `
        <h1>Your given order on E-Card is delivered</h1> <br>
        <strong>Products:</strong>
        <ul>${allProductNames.join("")}</ul>
        `,
        to: user?.email,
      });
      if (!success) {
        return {
          success: false,
          message: failedToUpdateOrderStatus,
          problem,
        };
      }
    }

    return {
      success: true,
      message: orderUpdated,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: failedToUpdateOrderStatus,
    };
  }
};

export const getSales = async () => {
  const authToken = cookies().get("authToken")?.value || "";
  const { user: userDataObject } = decode(authToken) as T_JwtVerifyDataType;

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
    throw new Error(failedToGetSales);
  }
};
