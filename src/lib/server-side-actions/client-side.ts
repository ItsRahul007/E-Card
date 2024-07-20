"use server";

import { cookies } from "next/headers";
import { decode, verify } from "jsonwebtoken";
import { failedToUpdateOrderStatus } from "../util/toastMessages";
import connectWithMongo from "../mongoConnection/mongoConnect";
import { invalidRequest } from "../util/apiMessages";
import Orders from "../model/ordersSchema";
import { ObjectId } from "mongoose";

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
