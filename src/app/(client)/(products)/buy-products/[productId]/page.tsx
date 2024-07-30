import Navbar from "@/components/all-products/Nav";
import React, { FC } from "react";
import { decode, verify } from "jsonwebtoken";
import OrderSummary from "./OrderSummary";
import { isValidObjectId } from "mongoose";
import axios from "axios";
import { hasSymbols } from "@/lib/util/emailChecker";

interface I_SingleProductPage {
  params: {
    productId: string;
  };
  searchParams: {
    couponCode?: string;
    discount?: string;
  };
}

const BuyProducts: FC<I_SingleProductPage> = async ({
  params,
  searchParams,
}) => {
  const encriptedProductId = params.productId;
  const productId = decode(encriptedProductId);
  const { coupon_discount } = searchParams.discount
    ? (verify(searchParams.discount, process.env.JWT_SECRET!) as {
        coupon_discount: number;
      })
    : {
        coupon_discount: undefined,
      };

  //? checking if the id have symbol or not
  const isProductIdHaveSymbol = hasSymbols(productId?.toString());

  //? checking if the id valid or not
  const isValidMongooDBId =
    productId && !isProductIdHaveSymbol && isValidObjectId(productId);

  const product = isValidMongooDBId
    ? await axios.get(
        `${process.env.DOMAIN}/api/single-product?productId=${productId}`,
        {
          headers: {
            AUTH_TOKEN: JSON.stringify(process.env.NEXT_PUBLIC_AUTH_TOKEN!),
          },
        }
      )
    : { data: {} };

  return (
    <div className="h-auto w-screen flex flex-col gap-2 bg-lightBg text-rootColor">
      <Navbar />

      <div className="mx-auto max-w-2xl px-4 md:pb-24 md:pt-16 pb-12 pt-6 sm:px-6 lg:max-w-7xl lg:px-8 bg-lightBg">
        <OrderSummary
          product={product.data?.success ? [product.data.product] : []}
          couponCode={searchParams.couponCode}
          coupon_discount={coupon_discount}
        />
      </div>
    </div>
  );
};

export default BuyProducts;
