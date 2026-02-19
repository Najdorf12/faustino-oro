import type { FideStats } from "@/types/fideStats";
import DoughnutChart from "./DoughtnutChart";

export default function StatsView({ stats }: { stats: FideStats }) {
  // Helper para calcular derrotas
  const calculateLosses = (total: string, wins: string, draws: string) => {
    return Number(total) - Number(wins) - Number(draws);
  };

  // Datos para cada categoría
  const categories = [
    {
      title: "TOTAL",
      white: {
        wins: Number(stats.stats.white_win_num),
        draws: Number(stats.stats.white_draw_num),
        losses: calculateLosses(
          stats.stats.white_total,
          stats.stats.white_win_num,
          stats.stats.white_draw_num
        ),
      },
      black: {
        wins: Number(stats.stats.black_win_num),
        draws: Number(stats.stats.black_draw_num),
        losses: calculateLosses(
          stats.stats.black_total,
          stats.stats.black_win_num,
          stats.stats.black_draw_num
        ),
      },
    },
    {
      title: "STANDAR",
      white: {
        wins: Number(stats.stats.white_win_num_std),
        draws: Number(stats.stats.white_draw_num_std),
        losses: calculateLosses(
          stats.stats.white_total_std,
          stats.stats.white_win_num_std,
          stats.stats.white_draw_num_std
        ),
      },
      black: {
        wins: Number(stats.stats.black_win_num_std),
        draws: Number(stats.stats.black_draw_num_std),
        losses: calculateLosses(
          stats.stats.black_total_std,
          stats.stats.black_win_num_std,
          stats.stats.black_draw_num_std
        ),
      },
    },
    {
      title: "RAPID",
      white: {
        wins: Number(stats.stats.white_win_num_rpd),
        draws: Number(stats.stats.white_draw_num_rpd),
        losses: calculateLosses(
          stats.stats.white_total_rpd,
          stats.stats.white_win_num_rpd,
          stats.stats.white_draw_num_rpd
        ),
      },
      black: {
        wins: Number(stats.stats.black_win_num_rpd),
        draws: Number(stats.stats.black_draw_num_rpd),
        losses: calculateLosses(
          stats.stats.black_total_rpd,
          stats.stats.black_win_num_rpd,
          stats.stats.black_draw_num_rpd
        ),
      },
    },
    {
      title: "BLITZ",
      white: {
        wins: Number(stats.stats.white_win_num_blz),
        draws: Number(stats.stats.white_draw_num_blz),
        losses: calculateLosses(
          stats.stats.white_total_blz,
          stats.stats.white_win_num_blz,
          stats.stats.white_draw_num_blz
        ),
      },
      black: {
        wins: Number(stats.stats.black_win_num_blz),
        draws: Number(stats.stats.black_draw_num_blz),
        losses: calculateLosses(
          stats.stats.black_total_blz,
          stats.stats.black_win_num_blz,
          stats.stats.black_draw_num_blz
        ),
      },
    },
  ];

  return (
    <section className="text-zinc-300 w-full h-full flex flex-wrap gap-6 justify-center items-center relative z-500 pt-12 lg:pt-9">
      {categories.map((category) => (
        <div key={category.title} className="flex flex-col items-center justify-center">
          <h6 className="text-center text-xl font-medium mb-3">
            {category.title}
          </h6>
          <div className="flex">
            <DoughnutChart
              title="Blancas"
              wins={category.white.wins}
              draws={category.white.draws}
              losses={category.white.losses}
              side="white"
            />
            <DoughnutChart
              title="Negras"
              wins={category.black.wins}
              draws={category.black.draws}
              losses={category.black.losses}
              side="black"
            />
          </div>
        </div>
      ))}
    </section>
  );
}