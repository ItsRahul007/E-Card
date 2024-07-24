"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  scales,
} from "chart.js";

const LineTable = ({ data }: { data: any }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: true,
        text: "Last Seven Days Sales",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(148, 163, 184, 0.5)",
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(148, 163, 184, 0.5)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default LineTable;
