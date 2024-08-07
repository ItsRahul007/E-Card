"use client";

import PageLoading from "@/components/common/loading/PageLoading";
import { useCancleOrder, useGetOrders } from "@/lib/customHook/useBuyProducts";
import React, { useState } from "react";
import OrdersTR from "./OrdersTR";
import ConfirmationDialog from "@/components/common/confirmation/ConfirmationDialog";
import toast from "react-hot-toast";
import {
  ErrorMessage,
  canclingOrder,
  orderCancelled,
} from "@/lib/util/toastMessages";
import NotFound from "@/components/common/NotFound";

const OrderTableBody = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");

  const { data, isLoading, refetch } = useGetOrders();

  const cancleOrderMutation = useCancleOrder();

  const cancleOrder = () => {
    setIsOpen(false);
    toast.loading(canclingOrder);
    cancleOrderMutation.mutate(orderId, {
      onSuccess: () => {
        setIsOpen(false);
        refetch();
        setOrderId("");
        toast.dismiss();
        toast.success(orderCancelled);
      },
      onError: (err) => {
        setIsOpen(false);
        setOrderId("");
        toast.dismiss();
        toast.error(ErrorMessage);
        console.log(err);
      },
    });
  };

  const tableHeaders = [
    "Products",
    "Payment status",
    "delivary status",
    "total price",
    "order date",
    "options",
  ];

  return (
    <div className="h-auto w-full overflow-x-auto text-zinc-800">
      {isOpen && (
        <ConfirmationDialog
          onCancel={() => {
            setIsOpen(false);
            setOrderId("");
          }}
          onConfirm={() => {
            setIsOpen(false);
            cancleOrder();
          }}
          text="Are you sure you want to cancle this order?"
        />
      )}
      <table className="table-auto border-collapse border border-gray-300 w-full max-w-screen text-sm duration-100 overflow-x-auto">
        <thead className="bg-appTheme-500 text-white">
          <tr>
            {tableHeaders.map((header) => (
              <th
                className="px-4 py-1.5 truncate border capitalize"
                key={header}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.data.length > 0 &&
            data.data.map((obj: any) => {
              const {
                _id,
                products,
                payment_status,
                delivary_status,
                total_price,
                createdAt,
              } = obj;
              return (
                <OrdersTR
                  _id={_id}
                  key={_id}
                  delivary_status={delivary_status}
                  payment_status={payment_status}
                  total_price={total_price}
                  primaryImgUrl={products[0].primaryImgUrl}
                  totalProducts={products.length}
                  orderDate={createdAt}
                  handleOnDelete={() => {
                    setIsOpen(true);
                    setOrderId(_id);
                  }}
                />
              );
            })}
        </tbody>
      </table>
      {isLoading && (
        <div className="w-full h-20">
          <PageLoading />
        </div>
      )}
      {data && data.data.length <= 0 && (
        <NotFound header="You don't have any order yet" />
      )}
    </div>
  );
};

export default OrderTableBody;
