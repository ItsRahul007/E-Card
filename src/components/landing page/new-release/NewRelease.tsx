import React from "react";
import SingleNewReleaseItem from "./SingleNewReleaseItem";
import Image from "next/image";
import Products from "@/lib/model/productSchema";
import Link from "next/link";
import NewReleaseGsap from "./NewReleaseGsap";
import AddToCartButton from "./AddToCartButton";
import { cookies } from "next/headers";

const NewRelease = async ({
  newReleaseProducts,
}: {
  newReleaseProducts: any[];
}) => {
  const authToken = cookies().get("authToken")?.value;
  const isUserLoggededIn = authToken && authToken.length > 0 ? true : false;

  return (
    <section
      className="w-screen max-w-[1540px] mt-10 mx-auto h-auto min-h-[28rem] py-7 px-3 md:py-10 md:px-5 space-y-5 font-rubik"
      id="new-release"
    >
      <div className="h-20 w-fit mx-auto capitalize font-semibold text-4xl">
        New Release
      </div>
      <NewReleaseGsap />
      <div
        className="w-full h-auto flex flex-col md:flex-row gap-4"
        id="new-release-items"
      >
        <div className="h-96 md:h-[28rem] w-full md:w-2/4 flex flex-col lg:flex-row gap-2 items-center bg-lightBg md:py-0 py-3">
          <Link
            href={"/single-product/" + newReleaseProducts[0]._id}
            target="_blank"
            className="w-3/5 h-full relative"
          >
            <Image
              src={newReleaseProducts[0].primaryImgUrl}
              alt="item"
              fill
              className="object-contain cursor-pointer"
            />
          </Link>
          <div className="flex-1 gap-y-3 flex flex-col items-center justify-center text-center text-sm px-3">
            <span className="text-base font-medium text-lightColor">
              {newReleaseProducts[0].product_name}
            </span>
            <span className="text-rootColor text-sm font-medium">
              ${newReleaseProducts[0].current_price}
            </span>
            <AddToCartButton
              _id={JSON.stringify(newReleaseProducts[0]._id)}
              isUserLoggededIn={isUserLoggededIn}
            />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
          {newReleaseProducts
            .slice(1)
            .map(({ _id, primaryImgUrl, current_price, product_name }) => (
              <SingleNewReleaseItem
                key={_id}
                product_name={product_name}
                imgUrl={primaryImgUrl}
                price={current_price}
                productId={_id}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewRelease;
