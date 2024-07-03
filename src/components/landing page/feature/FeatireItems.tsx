import Image from "next/image";
import Link from "next/link";
import React from "react";

interface I_FeatireItems {
  productId: string;
  imgUrl: string;
  componentId?: string;
}

const FeatireItems: React.FC<I_FeatireItems> = ({
  imgUrl,
  productId,
  componentId,
}) => {
  return (
    <Link
      href={"/single-product/" + productId}
      className="h-full sm:h-60 w-60 cursor-pointer relative"
      target="_blank"
      id={componentId}
    >
      <Image
        src={imgUrl}
        alt="item"
        fill
        className="object-contain md:shadow-md cursor-pointer shadow-rootColor"
      />
    </Link>
  );
};

export default FeatireItems;
