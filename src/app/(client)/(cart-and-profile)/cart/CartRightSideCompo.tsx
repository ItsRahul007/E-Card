"use client";

import Button from "@/components/common/buttons/Button";
import InputCompo from "@/components/common/inputs/InputCompo";
import React, { useState } from "react";
import TotalPeice from "./TotalPeice";
import { getCouponByCouponCode } from "@/lib/server-side-actions/client-side";
import toast from "react-hot-toast";

const CartRightSideCompo = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDisscount, setCouponDisscount] = useState<number | undefined>(
    undefined
  );
  const [encryptedDiscount, setEncryptedDiscount] = useState<
    string | undefined
  >(undefined);

  const onCouponApply = async () => {
    toast.loading("Please wait...");
    const {
      message,
      success,
      coupon_discount,
      problem,
      encrypetedDiscountPrice,
    } = await getCouponByCouponCode(couponCode);

    toast.dismiss();
    if (success) {
      toast.success(message);
      setCouponDisscount(coupon_discount);
      setEncryptedDiscount(encrypetedDiscountPrice);
    } else {
      toast.error(message);
      console.error(problem);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* cupon component */}
      <div className="sm:w-full min-w-80 bg-rootBg sm:border-2 sm:border-lightColor sm:rounded-lg px-6 py-4 flex flex-col justify-center items-start h-28 gap-2">
        <h4 className="text-base font-normal text-rootColor">Have coupon?</h4>
        <div className="flex w-full">
          <InputCompo
            name="cupon_code"
            type="text"
            placeholder="Coupon code"
            className="border px-2 py-1 rounded-l focus:outline-blue-400 shadow-none w-full bg-lightBg text-rootColor disabled:cursor-not-allowed disabled:opacity-30"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={couponDisscount !== undefined}
          />
          <Button
            text="Apply"
            type="button"
            className="uppercase border text-xs px-3 border-l-0 rounded-r font-medium bg-stone-100 hover:bg-stone-200 text-gray-500 dark:bg-zinc-800 dark:text-rootColor dark:hover:bg-zinc-900 dark:border-zinc-600 disabled:cursor-not-allowed"
            onClick={onCouponApply}
            disabled={couponDisscount !== undefined}
          />
        </div>
      </div>

      {/* total price component */}
      <TotalPeice
        coupon_discount={couponDisscount}
        coupon_code={couponCode}
        encryptedDiscount={encryptedDiscount}
      />
    </div>
  );
};

export default CartRightSideCompo;
