"use client";

import ReviewBox from "@/components/ReviewBox";
import ReviewStar from "@/components/ReviewStar";
import Button from "@/components/common/buttons/Button";
import React, { FC, useCallback, useState } from "react";
import {
  useGetReviewAndComments,
  useSetReviewAndComments,
} from "@/lib/customHook/useReview&Comments";
import PageLoading from "@/components/common/loading/PageLoading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ErrorMessage,
  reviewAddesSuccessMessage,
} from "@/lib/util/toastMessages";

interface I_ReviewSection {
  _id: string;
  isUserLoggededIn: boolean;
}

type ratingAndCommentsState = {
  comment: string;
  rating: number | undefined;
};

const ReviewSection: FC<I_ReviewSection> = ({ _id, isUserLoggededIn }) => {
  const router = useRouter();

  const [ratingAndComments, setRatingAndComments] =
    useState<ratingAndCommentsState>({
      comment: "",
      rating: 0,
    });

  const { data, isLoading, refetch } = useGetReviewAndComments(_id);

  const reviewComments = data ? data.data : [];

  const onRatingChange = (rating: number) => {
    setRatingAndComments((prev) => ({ ...prev, rating }));
  };

  const addReviewMutation = useSetReviewAndComments(_id);
  const onSubmitReview = useCallback(() => {
    if (!isUserLoggededIn) {
      toast.error("Please login to add a review");
      return router.push("/login");
    }

    if (!ratingAndComments.rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!ratingAndComments.comment) {
      toast.error("Please add a comment");
      return;
    }

    addReviewMutation.mutate(
      {
        comment: ratingAndComments.comment,
        ratingNumber: ratingAndComments.rating,
        productId: _id,
        method: "post",
      },
      {
        onSuccess: () => {
          setRatingAndComments({
            comment: "",
            rating: undefined,
          });
          refetch();
          toast.success(reviewAddesSuccessMessage);
        },
        onError: (err: any) => {
          console.log(err);
          toast.error(err.response.data.error || ErrorMessage);
        },
      }
    );
  }, [ratingAndComments, isUserLoggededIn, addReviewMutation, _id]);

  return (
    <section className="w-full flex justify-center items-center mt-2 mb-5">
      <div className="md:w-11/12 w-full h-auto md:border-2 border-lightColor p-2 bg-rootBg flex flex-col gap-4 rounded-lg">
        {/* header */}
        <div className="w-full text-2xl md:text-3xl mt-2">
          <h1 className={"ml-5 font-rubik font-medium"}>Reviews</h1>
        </div>

        {/* reviews */}
        <div className="w-full h-96 overflow-scroll flex flex-col gap-3 justify-start">
          {/* review components */}
          {isLoading ? (
            <PageLoading />
          ) : reviewComments.length > 0 ? (
            reviewComments.map((reviewObj: any, i: number) => (
              <ReviewBox
                key={reviewObj._id || i}
                rating={reviewObj.ratingNumber}
                reviewText={reviewObj.comment || "Settings rating"}
              />
            ))
          ) : (
            "No reviews yet"
          )}
        </div>

        {/* add review */}
        <div className="h-64 w-full flex flex-col">
          {/* heading */}
          <div className="h-[25%] w-full">
            <h3 className={"text-base font-rubik font-medium"}>
              Add your review and rating
            </h3>
            <div>
              <ReviewStar
                onRatingChange={onRatingChange}
                currentRating={ratingAndComments.rating}
              />
            </div>
          </div>
          <textarea
            className="border-2 h-3/5 w-full outline-[#3090a5] p-1 rounded-md bg-rootBg"
            placeholder="Write your review here..."
            value={ratingAndComments.comment}
            onChange={(e) =>
              setRatingAndComments((prev) => ({
                ...prev,
                comment: e.target.value,
              }))
            }
          />
          <div className="flex-1 flex items-center justify-end">
            <Button
              text="Submit"
              className="bg-[#3090a5] hover:!bg-[#256371] text-white p-2 px-3 mt-2 rounded-md font-semibold mr-5 duration-300"
              onClick={onSubmitReview}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
