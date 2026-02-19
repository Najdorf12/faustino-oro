"use client";

import { Line } from "react-chartjs-2";
import type { FideHistory } from "@/types/fidePlayer";
import { useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ProgressView({ history }: { history: FideHistory[] }) {
  const orderedHistory = [...history].reverse();
  const [range, setRange] = useState<"1Y" | "2Y" | "3Y" | "ALL">("ALL");

  const getFilteredHistory = () => {
    if (range === "ALL") return orderedHistory;

    const monthsMap = {
      "1Y": 12,
      "2Y": 24,
      "3Y": 36,
    };

   return orderedHistory.slice(0, monthsMap[range]);
  };

  const filteredHistory = getFilteredHistory();

  const labels = filteredHistory.map((h) => h.period);

  const data = {
  labels,
  datasets: [
    {
      label: "Classical",
      data: filteredHistory.map((h) =>
        h.classical_rating === 0 ? null : h.classical_rating
      ),
      borderColor: "#e5e7eb",
      tension: .5,
      spanGaps: false,
    },
    {
      label: "Rapid",
      data: filteredHistory.map((h) =>
        h.rapid_rating === 0 ? null : h.rapid_rating
      ),
      borderColor: "#38bdf8",
      tension: .5,
      spanGaps: false,
    },
    {
      label: "Blitz",
      data: filteredHistory.map((h) =>
        h.blitz_rating === 0 ? null : h.blitz_rating
      ),
      borderColor: "#f43f5e",
      tension: .5,
      spanGaps: false,
    },
  ],
};

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <section className=" w-full h-full flex flex-col items-center justify-center">
      <div className="flex gap-2 mb-4 relative z-200 mt-14  md:mt-0">
        {["1Y", "2Y", "3Y", "ALL"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r as any)}
            className={`px-6 md:px-9 py-1 rounded-md text-sm transition font-medium cursor-pointer hover:bg-sky-600
        ${
          range === r
            ? "bg-white text-zinc-800"
            : "bg-zinc-700 text-zinc-300 hover:bg-zinc-700"
        }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="w-full h-100 md:h-125 mt-6 bg-zinc-900 rounded-xl p-4 relative">
       <Line key={range} data={data} options={options} />
      </div>
    </section>
  );
}
