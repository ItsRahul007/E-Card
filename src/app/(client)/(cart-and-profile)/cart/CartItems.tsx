"use client";

import SingleCartItem from "@/components/all-products/SingleCartItem";
import PageLoading from "@/components/common/loading/PageLoading";
import { useGetCartItems } from "@/lib/customHook/useCartItems";
import { useGetFetchedQuery } from "@/lib/customHook/useGetFetchedQuery";
import Image from "next/image";
import React, { useEffect } from "react";

type singleCartItemType = {
  product_name: string;
  current_price: number;
  primaryImgUrl: string;
  _id: string;
  quantity: number;
};

const CartItems = () => {
  const data = useGetFetchedQuery(["get-cart-items"]);

  const { isError, isLoading, refetch } = useGetCartItems();

  useEffect(() => {
    if (!data) refetch();
  });

  if (!isLoading && data && !data.success && isError) {
    console.log(data.problem || "");
    throw new Error(data.error);
  }

  return (
    <div className="flex-1 flex justify-center">
      <div className="h-full w-[98%] flex flex-col gap-2">
        {/* single cart item */}
        {isLoading ? (
          <PageLoading />
        ) : data.cartProducts && data.cartProducts.length > 0 ? (
          data.cartProducts.map((item: singleCartItemType) => (
            <SingleCartItem key={item._id} refetch={refetch} {...item} />
          ))
        ) : (
          <div className="relative h-3/4 w-60 md:w-96 flex flex-col items-center justify-center gap-2 text-xl md:text-3xl text-[#00bf85] mx-auto">
            <p className={`text-center font-bold font-ubuntu`}>
              No cart item found
            </p>
            <span className="relative h-80 md:h-96 w-80 md:w-96">
              <Image
                src="/images/not-found.png"
                alt="No cart item found"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItems;
