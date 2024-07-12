"use client";

import Button from "@/components/common/buttons/Button";
import {
  useGetCartItems,
  useSetCartItems,
} from "@/lib/customHook/useCartItems";
import { useGetFetchedQuery } from "@/lib/customHook/useGetFetchedQuery";
import {
  ErrorMessage,
  cartAddedSuccessMessage,
} from "@/lib/util/toastMessages";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import toast from "react-hot-toast";

interface I_BuyAndAddToCartButtons {
  _id: string;
  isUserLoggededIn: boolean;
  encriptedProductId: string;
}

const BuyAndAddToCartButtons: FC<I_BuyAndAddToCartButtons> = ({
  _id,
  isUserLoggededIn,
  encriptedProductId,
}) => {
  const router = useRouter();

  const redirect = (path: string) => {
    router.push(path);
  };

  const cartMutation = useSetCartItems();
  const { refetch: refetchCartItems } = useGetCartItems();
  const allCartItems = useGetFetchedQuery(["get-cart-items"]);
  const isProductAddedToCart = isUserLoggededIn
    ? allCartItems?.cartProducts?.some((item: any) => item.productId === _id)
    : false;

  useEffect(() => {
    if (isUserLoggededIn && !allCartItems) {
      refetchCartItems();
    }
  });

  function addToCart() {
    if (!isUserLoggededIn) {
      toast.error("Please login to add items to cart");
      redirect("/login");
      return;
    }

    if (isProductAddedToCart) {
      toast.success("Item is already added to cart");
      return;
    }

    cartMutation.mutate(
      { productId: _id, method: "post" },
      {
        onSuccess: () => {
          refetchCartItems();
          toast.success(cartAddedSuccessMessage);
        },
        onError: (err: any) => {
          console.log(err);
          toast.error(err.response.data.error || ErrorMessage);
        },
      }
    );
  }

  //! time to work on buy product

  return (
    <div className="mt-6 lg:w-full space-y-5">
      <Link
        href={`/buy-products/${encriptedProductId}`}
        className="w-fit lg:px-16 sm:px-10 px-8 py-4 text-sm font-bold bg-appTheme-600 mr-4 text-white rounded-lg mb-3 inline"
        target="_blank"
      >
        BUY NOW
      </Link>
      <Button
        text="ADD TO CART"
        className="lg:px-14 sm:px-7 px-5 py-4 text-sm font-bold bg-[#eb3c33] text-white rounded-lg"
        type="button"
        onClick={addToCart}
      />
    </div>
  );
};

export default BuyAndAddToCartButtons;
