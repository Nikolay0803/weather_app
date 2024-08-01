"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ForecastData } from "../types/types";

// Регістрація компонентів Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type WeatherChartProps = {
  forecast: ForecastData;
};

const WeatherChart: React.FC<WeatherChartProps> = ({ forecast }) => {
  if (!forecast || forecast.list.length === 0) {
    console.log("No forecast data available");
    return <div>No data available</div>;
  }

  console.log("Forecast data for chart:", forecast);

  const labels = forecast.list.map((entry) =>
    new Date(entry.dt * 1000).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const temperatures = forecast.list.map((entry) => entry.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: temperatures,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 1,
        pointRadius: 2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={data} />
    </div>
  );
};

export default WeatherChart;
