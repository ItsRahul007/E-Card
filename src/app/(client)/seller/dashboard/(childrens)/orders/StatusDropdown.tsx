"use client";

import { updateOrderStatus } from "@/lib/server-side-actions/seller-side";
import { statusOptions } from "@/lib/util/SomeStaticDatas";
import { revalidateUrl } from "@/lib/util/revalidate";
import React from "react";
import toast from "react-hot-toast";

interface I_StatusDropdown {
  status: string;
  orderId: string;
  productArrId: string;
}

const StatusDropdown: React.FC<I_StatusDropdown> = ({
  status,
  orderId,
  productArrId,
}) => {
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    toast.loading("Updating status...");
    const response = await updateOrderStatus(
      e.target.value,
      orderId,
      productArrId
    );

    toast.dismiss();
    if (response.success) {
      revalidateUrl({
        revalidatePathUrl: "/seller/dashboard/orders",
        revalidateLayout: "page",
      });
      toast.success(response.message);
    } else {
      toast.error(response.message);
      console.log(response.problem);
    }
  };

  return (
    <div>
      <select
        className="text-rootColor bg-lightBg rounded-md cursor-pointer disabled:cursor-not-allowed"
        defaultValue={status}
        onChange={handleChange}
        disabled={
          status.toLowerCase() === "delivered" ||
          status.toLowerCase() === "cancelled"
        }
      >
        <option className="py-2" disabled>
          Select a status
        </option>
        {statusOptions.map((option, i) => (
          <option className="py-2" value={option.value} key={option.label + i}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusDropdown;
