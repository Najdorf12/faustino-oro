"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  title: string;
  wins: number;
  draws: number;
  losses: number;
  side?: "white" | "black";
}

export default function DoughnutChart({
  title,
  wins,
  draws,
  losses,
  side = "white",
}: DoughnutChartProps) {
  const data = {
    labels: ["Victorias", "Empates", "Derrotas"],
    datasets: [
      {
        data: [wins, draws, losses],
        backgroundColor:
          side === "white"
            ? ["#0069a8", "#e4e4e7", "#27272a"]
            : ["#0069a8", "#e4e4e7", "#27272a"],
        borderWidth: 1,
        borderColor: "#3f3f46",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#d4d4d8",
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = wins + draws + losses;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-55 bg-zinc-700 p-2 rounded-lg border border-zinc-500">
      <h3 className="text-center text-base mb-3 text-zinc-300 font-medium lg:text-lg">
        {title}
      </h3>
      <Doughnut data={data} options={options} />
    </div>
  );
}
