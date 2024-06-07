import Image from "next/image";
import React from "react";

interface I_PrimaryImg {
  src: string;
  alt: string;
}

const PrimaryImg: React.FC<I_PrimaryImg> = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={100}
      height={100}
      className="object-contain"
    />
  );
};

export default PrimaryImg;
