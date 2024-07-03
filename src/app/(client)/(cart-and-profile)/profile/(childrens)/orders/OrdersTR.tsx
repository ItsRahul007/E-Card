import IconButton from "@/components/common/buttons/IconButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface I_OrdersTR {
  primaryImgUrl: string;
  payment_status: string;
  delivary_status: string;
  total_price: number | string;
  totalProducts: number;
  handleOnDelete?: () => void;
  _id: string;
}

const OrdersTR: React.FC<I_OrdersTR> = ({
  totalProducts,
  primaryImgUrl,
  payment_status,
  delivary_status,
  total_price,
  _id,
  handleOnDelete,
}) => {
  return (
    <tr className="hover:bg-appTheme-50 hover:text-appTheme-700 text-rootColor group font-normal">
      <td className="border px-4 py-1 truncate max-w-[18rem] sm:max-w-[24rem] text-rootColor">
        <div className="mx-auto flex justify-center">
          <Image
            src={primaryImgUrl}
            alt="Product Image"
            height={20}
            width={60}
            style={{
              objectFit: "contain",
            }}
          />
          <div className="h-full text-center my-auto font-normal">
            {totalProducts > 1 && "+ " + (totalProducts - 1)}
          </div>
        </div>
      </td>
      <td className="border px-4 py-1 truncate max-w-[15rem] sm:max-w-[20rem]">
        {payment_status}
      </td>
      <td className="border px-4 py-1 truncate max-w-[15rem] sm:max-w-[20rem]">
        {delivary_status}
      </td>
      <td className="border px-4 py-1 truncate max-w-[15rem] sm:max-w-[20rem]">
        {total_price}
      </td>
      <td className="border px-4 py-1 truncate max-w-[15rem] sm:max-w-[20rem] space-x-2 text-xl text-center">
        <IconButton
          icon={<i className="ri-close-circle-line text-[22px]"></i>}
          className="px-2 py-1 rounded-full hover:text-red-500 group-hover:text-red-500"
          type="button"
          onClick={handleOnDelete}
        />
        <Link
          href={`/profile/orders/${_id}`}
          target="_blank"
          className="px-2 py-1 rounded-full hover:text-blue-600 group-hover:text-blue-600"
        >
          <i className="ri-share-circle-fill"></i>
        </Link>
      </td>
    </tr>
  );
};

export default OrdersTR;
