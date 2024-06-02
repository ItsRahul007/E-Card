import Table from "@/components/seller/Table";
import React from "react";
import StatusDropdown from "./StatusDropdown";

const SellerOrders = () => {
  const orders: any = [
    {
      id: 1,
      productName: "Product 1",
      quantity: 2,
      price: 200,
      status: <StatusDropdown status="Shipped" />,
    },
    {
      id: 2,
      productName: "Product 2",
      quantity: 1,
      price: 150,
      status: <StatusDropdown status="Processing" />,
    },
    {
      id: 3,
      productName: "Product 3",
      quantity: 4,
      price: 800,
      status: <StatusDropdown status="Delivered" />,
      options: {
        isEditable: true,
        onClick: () => {},
      },
    },
  ];

  const headers: string[] = ["product", "quantity", "price", "status"];

  return (
    <div className="min-h-[84vh] h-auto w-full">
      <div className="overflow-x-auto w-full h-auto bg-white">
        <div className="sm:w-full w-fit mx-auto h-10 text-xl md:text-2xl font-semibold capitalize md:mt-4 md:ml-6">
          <h4>orders</h4>
        </div>
        <div className="w-full sm:mt-2 h-auto overflow-x-auto">
          <Table
            headers={headers}
            tableScreenName="seller-orders"
            bodyData={orders}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
