"use client";

import React, { FC, useEffect } from "react";
import { useSetIsPaid } from "@/lib/customHook/useBuyProducts";
import toast from "react-hot-toast";

interface I_SetIsPaid {
  order: string;
  payment: string;
}

const IsPaid: FC<I_SetIsPaid> = ({ order, payment }) => {
  const isPaidMutation = useSetIsPaid();

  useEffect(() => {
    if (order.length) {
      isPaidMutation.mutate(
        { order, payment_status: payment },
        {
          onSuccess: (data) => toast.success(data.message),
        }
      );
    }
  });

  return <></>;
};

export default IsPaid;
