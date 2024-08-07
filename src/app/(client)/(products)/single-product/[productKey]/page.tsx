import AllProductNav from "@/components/all-products/Nav";
import React, { FC } from "react";
import style from "@/app/style/style.module.css";
import Footer from "@/components/common/footer/Footer";
import ImageContainer from "@/components/single-product-compos/ImageContainer";
import type { Metadata } from "next";
import BuyAndAddToCartButtons from "./BuyAndAddToCartButtons";
import ReviewSection from "./ReviewSection";
import { cookies } from "next/headers";
import RelatedProducts from "@/components/single-product-compos/RelatedProducts";
import { sign } from "jsonwebtoken";
import axios from "axios";

interface I_SingleProductPage {
  params: { productKey: string };
}

export async function generateMetadata({
  params,
}: I_SingleProductPage): Promise<Metadata> {
  //? reading route params
  const productId = params.productKey;

  //? capitalizing the product name
  function capitalizeText(text: string): string {
    if (text) {
      let wordsArray = text.split(/[\s-]+/);

      let capitalizedArray = wordsArray.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );

      let capitalizedText = capitalizedArray.join(" ");

      return capitalizedText;
    } else return "";
  }

  //? fetching product
  const response = await axios.get(
    `${process.env.DOMAIN}/api/single-product?productId=${productId}`,
    {
      headers: {
        AUTH_TOKEN: JSON.stringify(process.env.NEXT_PUBLIC_AUTH_TOKEN!),
      },
    }
  );

  const { product } = response.data;

  return {
    title: "E-Card - " + capitalizeText(product.product_name),
    description: product.product_description,
  };
}

const SingleProductPage: FC<I_SingleProductPage> = async ({ params }) => {
  const allCookies = cookies();
  const isUserLoggededIn = allCookies.get("authToken")?.value;

  //? reading route params
  const productId = params.productKey;

  const product = await axios.get(
    `${process.env.DOMAIN}/api/single-product?productId=${productId}`,
    {
      headers: {
        AUTH_TOKEN: JSON.stringify(process.env.NEXT_PUBLIC_AUTH_TOKEN!),
      },
    }
  );

  if (!product.data.success) {
    throw new Error(product.data.error || "Can't fine any product");
  }

  const {
    ratings,
    primaryImgUrl,
    secondaryImgUrls,
    price,
    product_name,
    product_type,
    discount_percentage,
    current_price,
    product_category,
    product_description,
  } = product.data.product;

  const encriptedProductId = sign(productId, process.env.JWT_SECRET!);

  //? Function to generate star icons based on the rounded rating
  const generateStars = () => {
    //? getting the total rating number
    let totalRatingNumber: number = 0;
    ratings.map((obj: any) => {
      const prevTotal = totalRatingNumber;
      totalRatingNumber = prevTotal + obj.ratingNumber;
    });

    // Round the rating to the nearest half
    const rating: number = totalRatingNumber / ratings.length;
    const roundedRating = Math.round(rating * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starColorClass;

      if (i - 1 + 0.5 === roundedRating) {
        starColorClass = `${style.half_star}`;
      } else if (i <= roundedRating) {
        starColorClass = "text-[#35a3bc]";
      } else {
        starColorClass = "text-gray-400";
      }

      stars.push(
        <span
          key={i + "rating-stars"}
          className={`text-xl max-[385px]:text-lg ${starColorClass}`}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen h-auto w-screen bg-lightBg flex flex-col">
      <AllProductNav />
      <div className="overflow-scroll w-screen h-auto bg-lightBg flex flex-col gap-3 p-2">
        {/* first section (product) */}
        <section className="w-full h-auto">
          <div className="h-full w-full lg:w-11/12 sm:p-4 p-2 sm:px-6 flex md:flex-row flex-col lg:gap-2 max-[639.5px]:items-center gap-6">
            {/* images container */}
            <ImageContainer
              primaryImgUrl={primaryImgUrl}
              product_type={product_type}
              secondaryImgUrls={secondaryImgUrls}
            />

            {/* text container */}
            <div className="lg:flex-1">
              {/* product name */}
              <div className="min-h-8 h-auto w-full text-left text-2xl capitalize text-ellipsis sm:text-3xl">
                <h4 className={`font-outfit font-medium`}>{product_name}</h4>
              </div>

              {/* product rating */}
              <div className="mt-1 sm:mt-2 flex items-center select-none">
                {generateStars()}
                <span
                  className={`ml-4 sm:text-sm text-xs text-slate-500 font-rubik font-medium`}
                >
                  {ratings.length > 0
                    ? `(${ratings.length} customer reviewed)`
                    : "(no reviews)"}
                </span>
              </div>

              {/* product price */}
              <div
                className={`mt-3 sm:mt-5 font-rubik font-medium flex gap-2 select-none`}
              >
                <span className="sm:text-2xl text-xl">
                  ${Math.round(current_price)}
                </span>
                <span className="sm:text-xl text-lg font-sans text-lightColor mt-1 line-through decoration-gray-700 decoration-2">
                  ${price}
                </span>
                <span className="sm:text-xl text-lg italic opacity-80 text-green-600">
                  {discount_percentage}% off
                </span>
              </div>

              {/* about the product */}
              <div className="font-medium text-sm text-gray-500 dark:text-gray-400 md:w-[90%] mt-4">
                {product_description ||
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia quis minus quia adipisci perferendis! Distinctio illo officiis sapiente. Ex perferendis, quae rerum odit doloremque, accusantium blanditiis dolores est quos incidunt animi labore recusandae velit quaerat commodi laboriosam eaque eveniet, distinctio aperiam. Earum, ipsam. Illum pariatur laboriosam aliquid doloribus rerum, maxime assumenda soluta ut quidem sint reiciendis optio cupiditate nihil unde harum ipsa dolorem maiores repudiandae distinctio quia delectus possimus quasi non! Ex quasi suscipit, laboriosam quaerat maxime doloribus voluptas tenetur maiores illum eligendi provident, veniam, vitae expedita eveniet aperiam nemo quos commodi reiciendis culpa aspernatur eius. Quidem odio dolorum ipsa enim id beatae cum totam sapiente in quasi similique minus atque optio accusamus, exercitationem officia. Eligendi quasi ut optio sunt distinctio dolorem sapiente necessitatibus quod temporibus deserunt unde facilis quidem corrupti omnis delectus harum aliquam voluptatem corporis ducimus odio aut, et consequuntur neque dolores? Quod qui magnam laborum ad libero."}
              </div>

              {/* buy or add to cart button */}
              <BuyAndAddToCartButtons
                _id={productId}
                isUserLoggededIn={isUserLoggededIn ? true : false}
                encriptedProductId={encriptedProductId}
              />
            </div>
          </div>
        </section>

        {/* second section (review) */}
        <ReviewSection
          _id={productId}
          isUserLoggededIn={isUserLoggededIn ? true : false}
        />

        {/* third section (related products) */}
        <RelatedProducts
          product_type={product_type}
          product_category={product_category}
          productId={productId}
        />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default SingleProductPage;
