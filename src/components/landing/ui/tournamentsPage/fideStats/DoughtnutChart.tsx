"use client";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

interface DoughnutChartProps {
  title: string;
  wins: number;
  draws: number;
  losses: number;
  side?: "white" | "black";
}

const COLORS = {
  wins: "#0069a8",
  draws: "#e4e4e7",
  losses: "#27272a",
};

export default function DoughnutChart({
  title,
  wins,
  draws,
  losses,
  side = "white",
}: DoughnutChartProps) {
  const total = wins + draws + losses;

  const labels = [
    { label: "Victorias", value: wins, color: COLORS.wins },
    { label: "Empates", value: draws, color: COLORS.draws },
    { label: "Derrotas", value: losses, color: COLORS.losses },
  ];

  const data = {
    labels: ["Victorias", "Empates", "Derrotas"],
    datasets: [
      {
        data: [wins, draws, losses],
        backgroundColor: [COLORS.wins, COLORS.draws, COLORS.losses],
        borderWidth: 1,
        borderColor: "#3f3f46",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false }, // 👈 leyenda nativa desactivada
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div
      className={`relative z-100 p-2 rounded-lg border flex flex-col items-center justify-center w-45 lg:p-4 sm:w-48 lg:h-58 xl:w-56 xl:h-68 2xl:w-60 2xl:h-72 3xl:w-65 3xl:h-88 ${
        side === "white"
          ? "bg-zinc-300 border-zinc-300"
          : "bg-zinc-700 border-zinc-500"
      }`}
    >
      <h6
        className={`text-center text-base mb-2 font-medium lg:text-lg lg:mb-2  xl:text-xl 3xl:text-2xl ${
          side === "white" ? "text-zinc-700" : "text-zinc-300"
        }`}
      >
        {title}
      </h6>
      <div className="flex items-center justify-center w-32 sm:w-36 lg:w-30 lg:h-25 xl:w-full xl:h-32 2xl:h-46  3xl:h-42">
        <Doughnut data={data} options={options} />
      </div>

      {/* Labels custom en HTML */}
      <div className="flex flex-col gap-1 mt-3 lg:mt-4 xl:mt-6 self-start">
        {labels.map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 3xl:w-4 3xl:h-4 rounded-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <span
              className={`text-xs xl:text-sm 2xl:text-base 3xl:text-lg  ${
                side === "white" ? "text-zinc-700" : "text-zinc-300"
              }`}
            >
              {label}:{" "}
              <span className="font-semibold">
                {value} ({((value / total) * 100).toFixed(1)}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
