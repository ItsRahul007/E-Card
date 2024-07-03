import Table from "@/components/seller/Table";
import React from "react";
import PrimaryImg from "./PrimaryImg";
import classNames from "@/lib/util/classNames";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { getProducts } from "@/lib/server-side-actions/seller-side";

const SellerProducts = async () => {
  const headers: string[] = [
    "Name",
    "Price",
    "discount percentage",
    "Status",
    "Primary Image",
  ];

  await connectWithMongo();
  const usersProducts = await getProducts();

  const products = usersProducts.map((obj) => ({
    name: obj.product_name,
    price: obj.price,
    discount: obj.discount_percentage,
    status: <span className={classNames("text-green-500")}>Active</span>,
    primaryImage: <PrimaryImg alt="testing" src={obj.primaryImgUrl} />,
    id: obj._id,
  }));

  return (
    <div className="h-full w-full">
      <div className="overflow-x-auto w-full h-auto bg-rootBg shadow md:shadow-md rounded-md">
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
