import Table from "@/components/seller/Table";
import React from "react";
import PrimaryImg from "./PrimaryImg";
import classNames from "@/lib/util/classNames";

const SellerProducts = () => {
  const headers: string[] = [
    "Name",
    "Price",
    "Quantity",
    "Status",
    "Primary Image",
  ];

  const products = Array.from({ length: 4 }).map((_, i) => ({
    name: "Product " + i,
    price: 13 * i,
    quantity: i,
    status: <span className={classNames("text-green-500")}>Active</span>,
    primaryImage: (
      <PrimaryImg
        alt="testing"
        src="https://m.media-amazon.com/images/I/51gT4n52pmL._SX679_.jpg"
      />
    ),
    id: i,
  }));

  return (
    <div className="h-full w-full">
      <div className="overflow-x-auto w-full h-auto bg-white shadow md:shadow-md rounded-md">
        <div className="sm:w-full w-fit mx-auto h-10 text-xl md:text-2xl font-semibold capitalize md:mt-4 mt-2 md:ml-6">
          <h4>products</h4>
        </div>
        <div className="w-full sm:mt-2 h-auto overflow-x-auto">
          <Table
            headers={headers}
            tableScreenName="seller-orders"
            bodyData={products}
            isEditOption
          />
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
