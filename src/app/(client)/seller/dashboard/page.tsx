import React from "react";
import { last7Days } from "@/lib/util/lineChartDatas";
import StatusCard from "@/components/seller/dashboard/StatusCard";
import Top5Table from "@/components/seller/dashboard/Top5Table";
import LineTable from "@/components/seller/dashboard/LineTable";
import {
  getOrders,
  getProducts,
  getSales,
  getTop5Products,
} from "@/lib/server-side-actions/seller-side";
import { ChartData } from "chart.js";

const Dashboard = async () => {
  const myOrders = await getOrders();
  const myProducts = await getProducts();
  const sales = await getSales();
  const top5bestSales = await getTop5Products();

  const data: ChartData<"bar"> = {
    labels: last7Days,
    datasets: [
      {
        label: "Sales",
        data: sales.last7DaySalesCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-auto w-full">
      {/* cards */}
      <section className="grid grid-cols-2 grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-4 w-fit xl:w-full max-[381px]:grid-cols-1 max-[381px]:grid-rows-4 max-[381px]:gap-2 max-[381px]:w-full xl:mx-auto">
        <StatusCard
          number={sales.totalSales}
          title="total sales"
          icon={<i className="ri-bar-chart-box-fill"></i>}
          iconColorAndIconBg="bg-rose-100 text-rose-500"
        />
        <StatusCard
          number={sales.lastSevenDaysSales}
          title="last seven days sales"
          icon={<i className="ri-bar-chart-box-fill"></i>}
          iconColorAndIconBg="bg-blue-100 text-blue-500"
          profitOrLossPercentage={5}
        />
        <StatusCard
          number={myProducts.length}
          title="products"
          icon={<i className="ri-shopping-bag-2-fill"></i>}
          iconColorAndIconBg="bg-orange-100 text-orange-500"
        />
        <StatusCard
          number={myOrders.length}
          title="orders"
          icon={<i className="ri-shopping-cart-2-fill"></i>}
          iconColorAndIconBg="bg-purple-100 text-purple-700"
        />
      </section>

      <section className="w-full mt-3 bg-rootBg md:px-4 px-2 sm:h-[28rem] h-80 rounded-md shadow md:shadow-md">
        <div className="mx-auto max-h-full h-auto flex justify-center items-center xl:py-1">
          <LineTable data={data} />
        </div>
      </section>

      {/* top 5 best selling */}
      <section className="w-full overflow-x-hidden h-auto mt-3 bg-rootBg md:px-4 py-2 px-2 rounded-md shadow md:shadow-md">
        <div className="sm:w-full w-fit mx-auto h-10 text-xl md:text-2xl font-semibold capitalize md:mt-2 md:ml-2">
          <h4>top 5 best selling</h4>
        </div>
        <div className="w-full sm:mt-2 h-auto overflow-x-auto">
          <Top5Table top5bestSales={top5bestSales} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
