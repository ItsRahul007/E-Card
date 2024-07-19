"use client";
import {
  useGetCartItems,
  useSetCartItems,
} from "@/lib/customHook/useCartItems";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetFetchedQuery } from "@/lib/customHook/useGetFetchedQuery";
import {
  cartAddedSuccessMessage,
  ErrorMessage,
  itemAlreadyExistsInCart,
  pleaseLoginToAddCartItem,
  productAddingToCart,
} from "@/lib/util/toastMessages";
import Button from "@/components/common/buttons/Button";

interface I_AddToCartButton {
  _id: string;
  isUserLoggededIn: boolean;
}

const AddToCartButton: React.FC<I_AddToCartButton> = ({
  _id,
  isUserLoggededIn,
}) => {
  const cartMutation = useSetCartItems();
  const router = useRouter();

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
      toast.error(pleaseLoginToAddCartItem);
      router.push("/login");
      return;
    }

    if (isProductAddedToCart) {
      toast.success(itemAlreadyExistsInCart);
      return;
    }

    toast.loading(productAddingToCart);
    cartMutation.mutate(
      { productId: JSON.parse(_id), method: "post" },
      {
        onSuccess: () => {
          refetchCartItems();
          toast.dismiss();
          toast.success(cartAddedSuccessMessage);
        },
        onError: (err: any) => {
          console.log(err);
          toast.dismiss();
          toast.error(err.response.data.error || ErrorMessage);
        },
      }
    );
  }

  return (
    <Button
      className="capitalize py-2 px-4 bg-addToCartBtnBg text-rootBg w-fit font-semibold"
      onClick={addToCart}
      text="add to cart"
      type="button"
    />
  );
};

export default AddToCartButton;
