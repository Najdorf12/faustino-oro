"use client";

// ── Types ────────────────────────────────────────────────────────────────────
interface LichessOpponent {
  name: string;
  title?: string;
  rating: number;
  fideId: number;
  fed: string;
}

interface LichessGame {
  round: string;
  id: string;
  opponent: LichessOpponent;
  color: "white" | "black";
  fideTC: string;
  points: string;
  ratingDiff: number;
}

export interface LichessPlayerData {
  name: string;
  title?: string;
  rating: number;
  fideId: number;
  fed: string;
  played: number;
  score: number;
  ratingDiff: number;
  performance: number;
  rank: number;
  games: LichessGame[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function resultLabel(points: string) {
  if (points === "1") return { label: "G", color: "text-emerald-400" };
  if (points === "0") return { label: "P", color: "text-red-400" };
  return { label: "½", color: "text-zinc-400" };
}

function signedDiff(n: number) {
  return n > 0 ? `+${n}` : `${n}`;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function LichessPanel({
  loading,
  error,
  data,
}: {
  loading: boolean;
  error: string | null;
  data: LichessPlayerData | null;
}) {

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex items-center gap-2 py-6 text-zinc-500 text-sm">
        <span className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
        Cargando datos…
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <p className="py-4 text-zinc-500 text-sm bg-red-600">{error}</p>
    );
  }

  // ── No data ──
  if (!data) return null;

  // ── Main render ──
  return (
    <div className="space-y-4 pt-1 ">

      {/* ── Encabezado del jugador ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {data.title && (
            <span className="text-sky-400 text-xs font-bold">{data.title}</span>
          )}
          <span className="text-zinc-100 text-sm font-semibold">{data.name}</span>
          <span className="text-zinc-600 text-xs">#{data.rank}</span>
        </div>
        <span className="text-zinc-500 text-xs">
          {data.fed} · {data.rating}
        </span>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-2 bg-purple-600">

        <div className="bg-amber-800 rounded-lg p-3">
          <p className="text-zinc-500 text-[10px] uppercase tracking-wide mb-1">Puntos</p>
          <p className="text-zinc-100 font-bold text-lg leading-none">
            {data.score}
            <span className="text-zinc-600 text-sm font-normal">/{data.played}</span>
          </p>
        </div>

        <div className="bg-amber-800 rounded-lg p-3">
          <p className="text-zinc-500 text-[10px] uppercase tracking-wide mb-1">Performance</p>
          <p className="text-zinc-100 font-bold text-lg leading-none">{data.performance}</p>
        </div>

        <div className="bg-amber-800 rounded-lg p-3">
          <p className="text-zinc-500 text-[10px] uppercase tracking-wide mb-1">Rating Δ</p>
          <p className={`font-bold text-lg leading-none ${data.ratingDiff >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {signedDiff(data.ratingDiff)}
          </p>
          <p className="text-zinc-600 text-[10px] mt-0.5 bg-teal-500">
            {data.rating} → {data.rating + data.ratingDiff}
          </p>
        </div>

      </div>

      {/* ── Lista de partidas ── */}
      {data.games?.length > 0 && (
        <div>
          <p className="text-zinc-500 text-[10px] uppercase tracking-wide mb-2 bg-teal-600">Partidas</p>

          <div className="space-y-1">
            {data.games.map((game, i) => {
              const result = resultLabel(game.points);
              return (
                <a
                  key={game.id}
                  href={`https://lichess.org/${game.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  {/* Ronda */}
                  <span className="text-zinc-600 text-[10px] font-mono w-5 shrink-0">
                    R{i + 1}
                  </span>

                  {/* Resultado */}
                  <span className={`w-5 text-center text-xs font-bold shrink-0 ${result.color}`}>
                    {result.label}
                  </span>

                  {/* Color de piezas */}
                  <span
                    title={game.color === "white" ? "Blancas" : "Negras"}
                    className={`w-2.5 h-2.5 rounded-full shrink-0 border ${
                      game.color === "white"
                        ? "bg-zinc-100 border-zinc-400"
                        : "bg-zinc-900 border-zinc-500"
                    }`}
                  />

                  {/* Rival */}
                  <div className="flex-1 min-w-0 flex items-center gap-1.5">
                    {game.opponent.title && (
                      <span className="text-sky-400 text-[10px] font-semibold shrink-0">
                        {game.opponent.title}
                      </span>
                    )}
                    <span className="text-zinc-300 text-xs truncate">
                      {game.opponent.name}
                    </span>
                    <span className="text-zinc-600 text-[10px] shrink-0">
                      ({game.opponent.rating})
                    </span>
                  </div>

                  {/* Rating diff */}
                  {game.ratingDiff !== 0 && (
                    <span className={`text-[10px] font-semibold shrink-0 ${game.ratingDiff > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {signedDiff(game.ratingDiff)}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}