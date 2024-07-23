"use server";

import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import {
  failedToGetProducts,
  failedToUpdateOrderStatus,
} from "../util/toastMessages";
import connectWithMongo from "../mongoConnection/mongoConnect";
import { invalidRequest } from "../util/apiMessages";
import Orders from "../model/ordersSchema";
import Products from "../model/productSchema";
import {
  I_BestSaleGetProducts,
  I_BestSalesSingleItem,
} from "../types/productTyps";

type T_UpdateOrderStatus = {
  orderId: string;
  payment_status: string;
};

export const updateOrderStatus = async ({
  orderId,
  payment_status,
}: T_UpdateOrderStatus) => {
  try {
    const allCookies = cookies();

    const encriptedOrderId = allCookies.get("encriptedOrderId")?.value || "";

    if (encriptedOrderId !== orderId) {
      console.log("diffrent order objects");
      throw new Error(invalidRequest);
    }

    const decodedOrderId = verify(orderId, process.env.JWT_SECRET!) as String;
    const newOrderId = decodedOrderId.replace(/"/g, "");

    await connectWithMongo();

    const orderToUpdate = await Orders.findById(newOrderId);
    if (!orderToUpdate) {
      throw new Error("Order not found");
    }

    if (orderToUpdate.payment_status !== "pending")
      return { success: true, message: "Order already updated" };

    const newOrder = await Orders.findByIdAndUpdate(
      newOrderId,
      {
        $set: {
          payment_status,
        },
      },
      { new: true }
    );

    return {
      success: true,
      message: "Order updated successfully",
      data: newOrder,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: failedToUpdateOrderStatus,
    };
  }
};

export const getNewReleaseProducts = async () => {
  try {
    const newReleaseProducts = await Products.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("product_name _id primaryImgUrl current_price");
    return newReleaseProducts;
  } catch (err: any) {
    console.log(err.message);
    throw new Error(failedToGetProducts);
  }
};

export const getProductsByIds = async (
  productsIds: { productId: string; quantity: any }[]
) => {
  try {
    const allProducts = await Promise.all(
      productsIds.map(async ({ productId, quantity }) => {
        const product = (await Products.findById(productId).select(
          "product_name _id primaryImgUrl current_price ratings"
        )) as I_BestSaleGetProducts;

        //? getting the total rating number
        let totalRatingNumber: number = 0;
        product.ratings &&
          product.ratings.length > 0 &&
          product.ratings.map((obj: any) => {
            const prevTotal = totalRatingNumber;
            totalRatingNumber = prevTotal + obj.ratingNumber;
          });

        // Round the rating to the nearest half
        const rating: number =
          totalRatingNumber > 0
            ? totalRatingNumber / product.ratings.length
            : 0;
        const roundedRating = Math.round(rating * 2) / 2;

        const formatedProductObject: I_BestSalesSingleItem = {
          _id: product._id,
          product_name: product.product_name,
          primaryImgUrl: product.primaryImgUrl,
          current_price: product.current_price,
          quantity,
          ratingNumber: roundedRating === 0 ? "No Ratings" : roundedRating,
        };
        return formatedProductObject;
      })
    );
    return allProducts;
  } catch (err: any) {
    console.log(err.message);
    throw new Error(failedToGetProducts);
  }
};
