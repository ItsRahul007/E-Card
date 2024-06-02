import React from "react";
import { dayHours } from "@/lib/util/lineChartDatas";
import StatusCard from "@/components/seller/dashboard/StatusCard";
import Top5Table from "@/components/seller/dashboard/Top5Table";
import LineTable from "@/components/seller/dashboard/LineTable";

const Dashboard = () => {
  const data = {
    labels: dayHours,
    datasets: [
      {
        label: "Sales this day",
        data: [0, 5, 4, 0, 1, 2, 3, 4, 1, 6, 6, 1],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div className="h-auto w-full md:mt-3">
      {/* cards */}
      <section className="grid grid-cols-2 grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-4 w-fit xl:w-full max-[381px]:grid-cols-1 max-[381px]:grid-rows-4 max-[381px]:gap-2 max-[381px]:w-full xl:mx-auto">
        <StatusCard
          number={5}
          title="today's sales"
          icon={<i className="ri-bar-chart-box-fill"></i>}
          iconColorAndIconBg="bg-green-100 text-green-500"
          profitOrLossPercentage={10}
          isOnLoss
        />
        <StatusCard
          number={21}
          title="last 7 days sales"
          icon={<i className="ri-bar-chart-box-fill"></i>}
          iconColorAndIconBg="bg-blue-100 text-blue-500"
          profitOrLossPercentage={5}
        />
        <StatusCard
          number={122}
          title="total sales"
          icon={<i className="ri-bar-chart-box-fill"></i>}
          iconColorAndIconBg="bg-rose-100 text-rose-500"
        />
        <StatusCard
          number={500}
          title="orders"
          icon={<i className="ri-file-list-2-fill"></i>}
          iconColorAndIconBg="bg-purple-100 text-purple-700"
        />
      </section>

      <section className="w-full mt-3 bg-white md:px-4 px-2 sm:h-[28rem] h-80 rounded-md shadow md:shadow-md">
        <div className="mx-auto max-h-full h-auto flex justify-center items-center">
          <LineTable data={data} />
        </div>
      </section>

      {/* top 5 best selling */}
      <section className="w-full overflow-x-hidden h-auto mt-3 bg-white md:px-4 py-2 px-2 rounded-md shadow md:shadow-md">
        <div className="sm:w-full w-fit mx-auto h-10 text-xl md:text-2xl font-semibold capitalize md:mt-2 md:ml-2">
          <h4>top 5 best selling</h4>
        </div>
        <div className="w-full sm:mt-2 h-auto overflow-x-auto">
          <Top5Table />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
