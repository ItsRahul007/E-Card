import Products from "@/lib/model/productSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import Link from "next/link";
import React, { FC } from "react";
import ItemCard from "../all-products/ItemCard";

interface I_RelatedProducts {
  product_type: string;
  product_category: string;
  productId: string;
}

const RelatedProducts: FC<I_RelatedProducts> = async ({
  product_type,
  product_category,
  productId,
}) => {
  const selectText =
    "product_name primaryImgUrl current_price ratings discount_percentage";

  await connectWithMongo();
  const relatedProducts = await Products.find({
    product_type: { $regex: product_type, $options: "i" },
    $or: [{ product_category: { $regex: product_category, $options: "i" } }],
  })
    .limit(5)
    .select(selectText);

  return (
    <>
      {relatedProducts && relatedProducts.length > 0 ? (
        <section className="w-full my-5">
          <div className="h-auto w-full xl:w-11/12 flex flex-col p-2 gap-4">
            {/* heading */}
            <div className="w-11/12 self-end text-2xl md:text-3xl mt-2">
              <h1 className="2xl:mml-[2vw] font-rubik">Related Products</h1>
            </div>

            {/* product container */}
            <div className="flex flex-col h-full xl:w-[72rem] lg:w-full self-center">
              <div className="grid grid-rows-none gap-4 justify-center relative grid-cols-2 sm:grid-cols-3 md:p-4 p-2 lg:grid-cols-4 xl:grid-cols-5">
                {relatedProducts.map((item) => {
                  if (JSON.stringify(item._id) === JSON.stringify(productId))
                    return <></>;
                  return (
                    <ItemCard
                      key={JSON.stringify(item._id) + "related-products"}
                      current_price={item.current_price}
                      primaryImgUrl={item.primaryImgUrl}
                      product_name={item.product_name}
                      ratings={item.ratings || []}
                      _id={item._id}
                      discount_percentage={item.discount_percentage}
                      isCartIconFalse
                    />
                  );
                })}
              </div>
              {relatedProducts.length > 5 && (
                <Link
                  href={
                    "/products/search-products?search=" +
                    product_type +
                    " for " +
                    product_category
                  }
                  className="mt-3 text-xs sm:text-sm text-center font-semibold border-2 border-blue-600 rounded-2xl lg:bg-blue-100 lg:hover:bg-blue-200 bg-blue-200 text-blue-600  px-2 self-end"
                >
                  See all related products
                </Link>
              )}
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default RelatedProducts;
