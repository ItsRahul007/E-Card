import React, { FC } from "react";
import style from "@/app/style/style.module.css";
import classNames from "@/lib/util/classNames";

interface ReviewStarProps {
  currentRating: number | undefined;
  onRatingChange: (rating: number) => void;
}

const ReviewStar: FC<ReviewStarProps> = ({ currentRating, onRatingChange }) => {
  return (
    <div className="flex flex-row-reverse w-[82px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          className={classNames(
            "text-xl text-gray-400 cursor-pointer",
            style.review_star,
            currentRating && currentRating >= 5 - index ? "!text-[#35a3bc]" : ""
          )}
          key={index + "empty-review-stars"}
          onClick={() => onRatingChange(5 - index)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default ReviewStar;
