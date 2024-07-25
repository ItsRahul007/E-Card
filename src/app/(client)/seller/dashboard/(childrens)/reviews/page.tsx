import { getProductReviews } from "@/lib/server-side-actions/seller-side";
import React from "react";
import SingleRatingCompo from "./SingleRatingCompo";

const Reviews = async () => {
  const reviewsAndRatings = await getProductReviews();

  return (
    <div className="bg-rootBg p-2 sm:rounded-md h-auto w-full">
      <div className="sm:w-full w-fit mx-auto h-10 text-xl md:text-2xl font-semibold capitalize md:mt-4 mt-2 md:ml-6">
        <h4>Reviews</h4>
      </div>
      <div className="w-full h-auto flex flex-col gap-y-3 md:mt-6 mt-3">
        {reviewsAndRatings.map((obj, i) => {
          return obj.ratings.map((ratingObj: any, ratingIdx: number) => (
            <>
              <SingleRatingCompo
                primaryImgUrl={obj.primaryImgUrl}
                product_name={obj.product_name}
                ratings={ratingObj}
                key={ratingObj._id + "seller-reviews"}
              />
              {reviewsAndRatings.length - 1 === i &&
              ratingIdx === obj.ratings.length - 1 ? null : (
                <hr />
              )}
            </>
          ));
        })}
      </div>
    </div>
  );
};

export default Reviews;
