import Table from "@/components/seller/Table";
import React from "react";
import StatusDropdown from "./StatusDropdown";
import { getOrders } from "@/lib/server-side-actions/seller-side";
import NotFound from "@/components/common/NotFound";

const SellerOrders = async () => {
  const headers: string[] = ["product", "quantity", "price", "status"];
  const orders = await getOrders();

  const ordersArr = orders.map((order) => ({
    id: order._id,
    productName: order.product_name,
    quantity: order.quantity,
    price: order.product_price,
    status: (
      <StatusDropdown
        key={order._id + "order-status"}
        status={order.order_status ? order.order_status : "pending"}
        orderId={JSON.stringify(order.orderId)}
        productArrId={JSON.stringify(order._id)}
      />
    ),
  }));

  return (
    <div className="h-auto w-full">
      <div className="overflow-x-auto w-full h-auto bg-rootBg shadow md:shadow-md rounded-md">
        <div className="sm:w-full w-fit mx-auto h-10 text-xl md:text-2xl font-semibold capitalize md:mt-4 mt-2 md:ml-6">
          <h4>orders</h4>
        </div>
        <div className="w-full sm:mt-2 h-auto overflow-x-auto">
          {ordersArr.length > 0 ? (
            <Table
              headers={headers}
              tableScreenName="seller-orders"
              bodyData={ordersArr}
            />
          ) : (
            <NotFound
              header="You don't have any latest orders"
              key="seller-order-not-found"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
