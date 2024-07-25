import Image from "next/image";
import React from "react";
import style from "@/app/style/style.module.css";

interface I_SingleRatingCompo {
  primaryImgUrl: string;
  product_name: string;
  ratings: {
    ratingBy: string;
    comment: string;
    ratingNumber: number;
    _id?: string;
  };
}

const SingleRatingCompo: React.FC<I_SingleRatingCompo> = ({
  primaryImgUrl,
  product_name,
  ratings,
}) => {
  // Function to generate star icons based on the rounded rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // Determine the star color based on the current rating
      let starColorClass;

      if (i - 1 + 0.5 === ratings.ratingNumber) {
        starColorClass = `${style.half_star}`; // Half star
      } else if (i <= ratings.ratingNumber) {
        starColorClass = "text-[#35a3bc]"; // Full star
      } else {
        starColorClass = "text-gray-400"; // Inactive star
      }

      stars.push(
        <span
          key={i}
          className={`text-lg max-[385px]:text-base ${starColorClass}`}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="h-auto w-full flex gap-2">
      {/* image */}
      <div className="md:h-32 h-28 md:w-32 w-28 relative">
        <Image
          src={primaryImgUrl}
          alt="your product"
          className="object-contain h-full w-full"
          fill
        />
      </div>

      {/* other texts */}
      <div className="flex-1 flex flex-col max-w-[80%] overflow-hidden">
        <strong className="truncate">
          {product_name.length > 113
            ? product_name.slice(0, 113) + "..."
            : product_name}
        </strong>
        <span>{generateStars()}</span>
        <pre className="font-poppins">{ratings.comment}</pre>
      </div>
    </div>
  );
};

export default SingleRatingCompo;
