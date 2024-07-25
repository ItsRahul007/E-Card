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
  failedToGetReviews,
  failedToGetSales,
  failedToUpdateOrderStatus,
  orderUpdated,
} from "../util/toastMessages";
import { getProductsByIds } from "./client-side";

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

export const getProductReviews = async () => {
  const authToken = cookies().get("authToken")?.value || "";
  const { user: userDataObject } = decode(authToken) as T_JwtVerifyDataType;
  try {
    await connectWithMongo();
    const reviewsAndRatings = await Products.find({
      brand_name: userDataObject.brandName,
      ratings: { $ne: [] },
    })
      .select("ratings primaryImgUrl product_name")
      .sort({ createdAt: -1 });

    const filteredReviews = reviewsAndRatings
      .map((obj) => {
        const filteredRatings = obj.ratings.filter(
          (obj: any) => obj.ratingBy !== "system"
        );
        return {
          ...obj.toObject(),
          ratings: filteredRatings,
        };
      })
      .filter((obj) => obj.ratings.length > 0);

    return filteredReviews;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(failedToGetReviews);
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
      const user = await User.findById(allProducts.customer_id).select("email");

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

const calculateDailySales = (lastSevenDaysSales: T_myOrders[]) => {
  // Create an array to store daily sales counts
  const dailySales: number[] = new Array(7).fill(0);
  const today = new Date();

  // Iterate through the lastSevenDaysSales array
  lastSevenDaysSales.forEach((order) => {
    // Get the order date
    const orderDate = new Date(order.createdAt!);

    // Calculate the difference in days between the order date and today
    const daysDifference = Math.floor(
      (today.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // If the order is within the last 7 days
    if (daysDifference >= 0 && daysDifference < 7) {
      // Increment the sales count for the corresponding day
      dailySales[daysDifference]++;
    }
  });

  return dailySales;
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
    const last7DaySalesCounts = calculateDailySales(lastSevenDaysSales);

    return {
      totalSales: myOrders.length,
      lastSevenDaysSales: lastSevenDaysSales.length,
      last7DaySalesCounts,
    };
  } catch (error: any) {
    console.log(error.message);
    throw new Error(failedToGetSales);
  }
};

export const getTop5Products = async () => {
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

    const productQuantities: any = {};
    orders.forEach((order) => {
      //* Iterate through each product in the order
      order.products.forEach((product: any) => {
        //? Increment the quantity for this product
        const productId = product.product_id.toString(); //? Convert ObjectId to string for easy comparison
        if (productQuantities[productId]) {
          productQuantities[productId] += product.quantity;
        } else {
          productQuantities[productId] = product.quantity;
        }
      });
    });

    //* Convert productQuantities object to an array of { productId, quantity } objects
    const productQuantitiesArray = Object.keys(productQuantities).map(
      (productId) => ({
        productId,
        quantity: productQuantities[productId],
      })
    );

    //* Sort products based on quantity in descending order
    //* Select top 6 products
    const top5ProductIds = productQuantitiesArray
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 6);

    const top5BestProducts = await getProductsByIds(top5ProductIds);
    return top5BestProducts;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(failedToGetSales);
  }
};
