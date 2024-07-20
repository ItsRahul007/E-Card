import React, { FC } from "react";
import OrderTableBody from "./OrderTableBody";
import { updateOrderStatus } from "@/lib/server-side-actions/client-side";
import { redirect } from "next/navigation";

interface I_Orders {
  searchParams: {
    payment: string;
    order: string;
  };
}

const Orders: FC<I_Orders> = async ({ searchParams }) => {
  const orderId = searchParams.order || "";
  const payment = searchParams.payment || "";
  const InitialVal = {
    success: false,
    message: "",
  };

  const { success, message } =
    orderId.length > 0 && payment.length > 0
      ? await updateOrderStatus({
          orderId,
          payment_status: payment,
        })
      : InitialVal;

  success && message.length && redirect("/profile/orders");

  return <OrderTableBody />;
};

export default Orders;
