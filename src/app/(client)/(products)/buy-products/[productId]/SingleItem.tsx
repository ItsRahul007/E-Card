import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type productType = {
  _id: string;
  product_name: string;
  price: number;
  current_price: number;
  primaryImgUrl: string;
  quantity?: number;
  isCartProducts: boolean;
  productQuantity: number;
  changeProductQuantity: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SingleItem: FC<productType> = ({
  _id,
  product_name,
  price,
  primaryImgUrl,
  quantity: cartProductQuantity,
  isCartProducts,
  productQuantity,
  changeProductQuantity,
}) => {
  return (
    <li className="flex px-4 py-6 sm:px-6">
      <div className="flex-shrink-0 w-20 h-20 relative">
        <Image
          src={primaryImgUrl}
          alt="product"
          className="rounded-md object-contain"
          fill
        />
      </div>

      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm">
              <Link
                href={"/single-product/" + _id}
                className="font-medium capitalize text-lightColor hover:text-rootColor"
              >
                {product_name}
              </Link>
              <p className="mt-1 text-sm font-medium text-rootColor">
                Price: ${price}
              </p>
              <p className="mt-1 text-sm font-medium text-rootColor">
                Quantity: {cartProductQuantity || productQuantity}
              </p>
            </h4>
          </div>

          <div className="ml-4 flow-root flex-shrink-0">
            <div className="-m-2.5 flex items-center justify-center bg-rootBg p-2.5 text-lightColor hover:text-rootColor">
              {!isCartProducts && (
                <select
                  className="rounded-md border border-lightColor bg-rootBg text-left text-base font-medium text-rootColor shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm cursor-pointer"
                  value={productQuantity}
                  onChange={changeProductQuantity}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleItem;
