"use client";

import { useGetMyReview } from "@/lib/customHook/useReview&Comments";
import React from "react";
import ReviewTR from "./ReviewTR";
import PageLoading from "@/components/common/loading/PageLoading";

type ReviewObj = {
  primaryImgUrl: string;
  ratingNumber: number;
  comment: string;
  _id: string;
  productId: string;
};

const ReviewTable = () => {
  const { data, isLoading } = useGetMyReview();

  return (
    <div className="h-auto max-w-full overflow-x-scroll text-zinc-800">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead className="bg-appTheme-500 text-white">
          <tr>
            <th className="px-4 py-1.5 truncate border">Product</th>
            <th className="px-4 py-1.5 truncate border">Rating</th>
            <th className="px-4 py-1.5 truncate border">Review</th>
            {/* <th className="px-4 py-1.5 truncate border">Date</th> */}
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {!isLoading &&
              data.data.length > 0 &&
              data.data.map((obj: ReviewObj) => (
                <ReviewTR key={obj._id} {...obj} />
              ))}
          </tbody>
        )}
      </table>
      <div className="h-auto mt-3">{isLoading && <PageLoading />}</div>
    </div>
  );
};

export default ReviewTable;
