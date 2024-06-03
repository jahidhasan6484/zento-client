/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const existingChartInstance = chartRef.current.chart;

      if (existingChartInstance) {
        existingChartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: "Number of my blogs",
              data: Object.values(data),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Store the chart instance in the ref
      chartRef.current.chart = newChartInstance;
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
