import React from "react";
import FeatireItems from "./FeatireItems";
import FeatureGsap from "./FeatureGsap";

const FeatureProduct = () => {
  return (
    <div
      className="text-rootColor h-auto mb-10 md:mb-20 flex flex-col md:gap-10 gap-5"
      id="featured-products"
    >
      <FeatureGsap />
      <div className="self-center text-center flex flex-col gap-7 mt-24">
        <h1 className="font-semibold text-4xl">Featured Products</h1>
        <div className="w-24 self-center bg-[#1f92da] h-[1.5px]" />
      </div>
      <div className="h-auto w-full md:w-[786px] md:mx-auto flex flex-col gap-5 md:px-10 px-3 py-5 mt-10 relative">
        <div className="h-36 w-full flex items-center justify-between gap-1">
          <FeatireItems
            imgUrl="https://m.media-amazon.com/images/I/61D9VT4w7uL._SL1500_.jpg"
            productId="65b9d06c4cf38f6c039698a9"
            componentId="feature-items-top-left"
          />
          <FeatireItems
            imgUrl="https://m.media-amazon.com/images/I/61Or89ndGjL._SL1200_.jpg"
            productId="65bc6ec90d36aefa2a6e0c3c"
            componentId="feature-items-top-right"
          />
        </div>
        <div className="h-36 w-full flex items-center justify-center z-10">
          <FeatireItems
            imgUrl="https://m.media-amazon.com/images/I/416sy3XUkdL.jpg"
            productId="65bd0808113944ceed6560cb"
            componentId="feature-items-middle"
          />
        </div>
        <div className="h-36 w-full flex items-center justify-between gap-1">
          <FeatireItems
            imgUrl="https://m.media-amazon.com/images/I/71hYQ0wiHDL._SX522_.jpg"
            productId="65bc731107c274aa1f70a034"
            componentId="feature-items-bottom-left"
          />
          <FeatireItems
            imgUrl="https://m.media-amazon.com/images/I/61MnrUAKACL._SX679_.jpg"
            productId="65bd0463113944ceed65609d"
            componentId="feature-items-bottom-right"
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
