"use client";

import PageLoading from "@/components/common/loading/PageLoading";
import { useGetCartItems } from "@/lib/customHook/useCartItems";
import { useGetFetchedQuery } from "@/lib/customHook/useGetFetchedQuery";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TotalPeice = () => {
  const [price, setPrice] = useState({
    subtotal: 0,
    discount: 0,
    tax: 0,
  });
  const data = useGetFetchedQuery(["get-cart-items"]);
  const { isLoading, refetch } = useGetCartItems();

  useEffect(() => {
    if (!data) refetch();
    if (data) {
      setPrice({
        subtotal: 0,
        discount: 0,
        tax: 0,
      });

      data.cartProducts &&
        data.cartProducts.map((obj: any) => {
          setPrice((prev: any) => ({
            subtotal: prev.subtotal + obj.price * obj.quantity,
            discount:
              prev.discount + (obj.price - obj.current_price) * obj.quantity,
            tax: 20,
          }));
        });
    }
  }, [data, refetch]);

  return (
    <>
      {!isLoading && data.cartProducts && data.cartProducts.length > 0 && (
        <div className="sm:w-full w-80 h-auto bg-rootBg border-2 border-lightColor rounded-lg px-6 py-4 flex flex-col justify-center items-start gap-2">
          <div className="w-full flex flex-col font-rubik text-rootColor text-sm">
            <div className="flex justify-between h-9">
              <span>Subtotal</span>
              <span>${price.subtotal}</span>
            </div>
            <div className="flex justify-between h-9 text-green-500 border-green-500">
              <span>Discount</span>
              <span>${Math.round(price.discount)}</span>
            </div>
            <div className="flex justify-between h-9">
              <span>TAX</span>
              <span>${price.tax}</span>
            </div>
            <div className="flex justify-center items-center w-full h-9">
              <hr className="w-full border-t-2 border-lightColor" />
            </div>
            <div className="flex justify-between h-9 font-medium text-base">
              <span>Total</span>
              <span>
                ${Math.round(price.subtotal - price.discount + price.tax)}
              </span>
            </div>

            {/* buttons */}
            <div className="w-full h-auto flex flex-col gap-3 mt-3">
              <Link
                href="/buy-products/all"
                className="uppercase border-2 bg-green-600 border-green-600 text-xs py-2 rounded-md text-white font-medium inline text-center"
                target="_blank"
              >
                Make purchase
              </Link>
              <Link
                href="/products/all"
                className="uppercase border-2 border-lightColor bg-rootBg text-xs py-2 rounded-md text-lightColor hover:text-rootColor hover:border-rootColor font-medium inline text-center"
              >
                back to shop
              </Link>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="sm:w-full w-80 h-auto bg-rootBg border-2 rounded-lg px-6 py-4 flex flex-col justify-center items-start gap-2">
          <PageLoading />
        </div>
      )}
    </>
  );
};

export default TotalPeice;
