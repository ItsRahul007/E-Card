import Table from "@/components/seller/Table";
import React from "react";

const SellerOrders = () => {
  //   return <div className="min-h-[84vh] h-auto w-full">SellerOrders</div>;

  // Example data, replace with actual data fetching logic
  const orders = [
    {
      id: 1,
      productName: "Product 1",
      quantity: 2,
      price: 200,
      status: "Shipped",
    },
    {
      id: 2,
      productName: "Product 2",
      quantity: 1,
      price: 150,
      status: "Processing",
    },
    {
      id: 3,
      productName: "Product 3",
      quantity: 4,
      price: 800,
      status: "Delivered",
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
        <Table
          headers={headers}
          tableScreenName="seller-orders"
          bodyData={orders}
        />
      </div>
    </div>
  );
};

export default SellerOrders;
