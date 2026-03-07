"use client";

import { useEffect, useState, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
const ChessboardComponent = Chessboard as any;
import cheRight from "@/assets/images/icons/cheRight.svg";
import cheLeft from "@/assets/images/icons/cheLeft.svg";
import cheStart from "@/assets/images/icons/cheStart.svg";
import cheEnd from "@/assets/images/icons/cheEnd.svg";

interface GameViewerProps {
  roundId: string;
  gameId: string;
  playerColor?: "white" | "black";
  // Info del oponente pasada desde CardTournament
  opponentName?: string;
  opponentTitle?: string;
  opponentRating?: number;
  playerName?: string;
  playerTitle?: string;
  playerRating?: number;
  points?: string; // "1", "0", "1/2"
}

interface GameMeta {
  white: string;
  black: string;
  result: string;
  date: string;
  opening: string;
}

export default function GameViewer({
  roundId,
  gameId,
  playerColor = "white",
  opponentName,
  opponentTitle,
  opponentRating,
  playerName,
  playerTitle,
  playerRating,
  points,
}: GameViewerProps) {
  const [positions, setPositions] = useState<string[]>([]);
  const [moves, setMoves] = useState<string[]>([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<GameMeta | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/game-pgn?roundId=${roundId}&gameId=${gameId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);

        const pgn: string = data.pgn;

        // Extraer headers antes de limpiar
        const getHeader = (key: string) => {
          const m = pgn.match(new RegExp(`\\[${key}\\s+"([^"]+)"\\]`));
          return m ? m[1] : "";
        };

        setMeta({
          white: getHeader("White"),
          black: getHeader("Black"),
          result: getHeader("Result"),
          date: getHeader("Date"),
          opening: getHeader("Opening") || getHeader("ECO"),
        });

        // Limpieza
        let clean = pgn;
        clean = clean.replace(/\{[^{}]*\}/g, "");
        clean = clean.replace(/\$\d+/g, "");
        clean = clean.replace(/[?!]+/g, "");
        clean = clean
          .replace(/\r?\n|\r/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const chess = new Chess();
        chess.loadPgn(clean);

        const history = chess.history();
        if (history.length === 0) throw new Error("Sin movimientos");

        const pos: string[] = [];
        const temp = new Chess();
        pos.push(temp.fen());
        for (const move of history) {
          temp.move(move);
          pos.push(temp.fen());
        }

        setMoves(history);
        setPositions(pos);
        setCurrentMove(0);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, [roundId, gameId]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentMove((m) => Math.max(0, m - 1));
      if (e.key === "ArrowRight")
        setCurrentMove((m) => Math.min(positions.length - 1, m + 1));
    },
    [positions.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // ── Datos de jugadores ─────────────────────────────────────────────────────
  const faustino = {
    name:
      playerName ??
      (playerColor === "white" ? meta?.white : meta?.black) ??
      "Oro, Faustino",
    title: playerTitle ?? "IM",
    rating: playerRating,
    side: playerColor,
  };
  const opponent = {
    name:
      opponentName ??
      (playerColor === "white" ? meta?.black : meta?.white) ??
      "Oponente",
    title: opponentTitle,
    rating: opponentRating,
    side: playerColor === "white" ? ("black" as const) : ("white" as const),
  };

  // ── Badge de resultado ─────────────────────────────────────────────────────
  const badge = (() => {
    if (points === "1")
      return {
        label: "Ganó",
        cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      };
    if (points === "0")
      return {
        label: "Perdió",
        cls: "bg-red-500/20 text-red-400 border-red-500/40",
      };
    if (points === "1/2")
      return {
        label: "Tablas",
        cls: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
      };
    if (meta?.result === "1-0")
      return playerColor === "white"
        ? {
            label: "Ganó",
            cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
          }
        : {
            label: "Perdió",
            cls: "bg-red-500/20 text-red-400 border-red-500/40",
          };
    if (meta?.result === "0-1")
      return playerColor === "black"
        ? {
            label: "Ganó",
            cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
          }
        : {
            label: "Perdió",
            cls: "bg-red-500/20 text-red-400 border-red-500/40",
          };
    return {
      label: "½ - ½",
      cls: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
    };
  })();

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="w-full max-w-sm flex flex-col items-center justify-center gap-3 py-12 text-zinc-500">
        <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs">Cargando partida...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-sm bg-red-950/40 border border-red-700/50 rounded-xl p-4 text-red-400 text-sm text-center">
        {error}
      </div>
    );
  }

  if (positions.length === 0) return null;

  const totalMoves = positions.length - 1;
  const progress = totalMoves > 0 ? (currentMove / totalMoves) * 100 : 0;

  return (
    <div className="flex flex-col w-full bg-zinc-900 rounded-lg border border-zinc-700/60 overflow-hidden lg:flex-row lg:pt-6 lg:border-zinc-700 lg:px-3 lg:max-w-full">
      {/* ── Header ── */}
      <div className="px-2.5 pt-6 pb-3 flex flex-col gap-2 lg:gap-4 lg:px-4 lg:pt-3 lg:max-w-100">
        {/* Jugadores + resultado */}
        <div className="flex items-center justify-between gap-3 py-1 ">
          <div className="flex flex-col gap-1.5 min-w-0 h-full ">
            <PlayerRow {...faustino} isFaustino />
            <PlayerRow {...opponent} />
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0 lg:items-center">
            <span
              className={`text-xs font-medium px-4.5 py-0.5 rounded-sm border lg:text-sm lg:px-5 ${badge.cls}`}
            >
              {badge.label}
            </span>
            <span className="text-zinc-600 text-sm font-mono lg:text-base">
              {meta?.result ?? ""}
            </span>
          </div>
        </div>

        {/* Apertura + fecha */}
        {(meta?.opening || meta?.date) && (
          <div className="flex  items-start justify-between gap-2 pt-1 mt-1 lg:items-center">
            {meta?.opening && (
              <span className="text-zinc-500 text-xs text-balance md:text-sm lg:text-base">
                {meta.opening}
              </span>
            )}
            {meta?.date && (
              <span className="text-zinc-600 text-xs shrink-0  md:text-sm">
                {meta.date.replace(/\./g, "/")}
              </span>
            )}
          </div>
        )}
        {/* ── Lista de movimientos ── */}
        <div className="mt-1 pb-4 pt-2 w-full">
          <div
            className="flex flex-wrap gap-x-2 gap-y-1 max-h-38 overflow-y-auto bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-1 lg:max-h-90
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-zinc-600
  [&::-webkit-scrollbar-thumb]:rounded-full
  hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500"
          >
            {Array.from(
              { length: Math.ceil(moves.length / 2) },
              (_, pairIdx) => {
                const wi = pairIdx * 2;
                const bi = pairIdx * 2 + 1;
                return (
                  <span key={pairIdx} className="flex items-center gap-1">
                    <span className="text-zinc-600 text-xs w-5 text-right select-none">
                      {pairIdx + 1}.
                    </span>
                    <button
                      onClick={() => setCurrentMove(wi + 1)}
                      className={`px-1.5 py-0.5 rounded text-xs font-mono transition-colors ${
                        currentMove === wi + 1
                          ? "bg-sky-500 text-white"
                          : "text-zinc-300 hover:bg-zinc-700"
                      }`}
                    >
                      {moves[wi]}
                    </button>
                    {moves[bi] && (
                      <button
                        onClick={() => setCurrentMove(bi + 1)}
                        className={`px-1.5 py-0.5 rounded text-xs font-mono transition-colors ${
                          currentMove === bi + 1
                            ? "bg-sky-500 text-white"
                            : "text-zinc-300 hover:bg-zinc-700"
                        }`}
                      >
                        {moves[bi]}
                      </button>
                    )}
                  </span>
                );
              },
            )}
          </div>
        </div>
      </div>

      {/* ── Board ── */}
      <section className="px-3 mt-3 ">
        <div className="rounded-lg overflow-hidden border border-zinc-700/40">
          <ChessboardComponent
            key={currentMove}
            id={`game-viewer-${gameId}`}
            options={{
              position: positions[currentMove],
              boardOrientation: playerColor,
              arePiecesDraggable: false,
              animationDuration: 350,
              darkSquareStyle: { backgroundColor: "#27272a" },
              lightSquareStyle: { backgroundColor: "#00598a" },
            }}
          />
        </div>

        <div className="px-3 py-3 lg:py-4 flex flex-col gap-1 lg:gap-2">
          <div className="w-full h-0.5 bg-zinc-800 rounded-full overflow-hidden">
            {/* ── Progress bar ── */}
            <div
              className="h-full bg-sky-500 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-zinc-500 text-xs mt-1">
            {currentMove === 0
              ? "Posición inicial"
              : `Movimiento ${currentMove} de ${totalMoves}`}
          </p>
          {/* ── Controles ── */}
          <div className="flex justify-center gap-3 px-3 pt-2 lg:gap-4 ">
            <NavBtn
              onClick={() => setCurrentMove(0)}
              disabled={currentMove === 0}
              icon={cheStart}
            />
            <NavBtn
              onClick={() => setCurrentMove((m) => Math.max(0, m - 1))}
              disabled={currentMove === 0}
              icon={cheLeft}
            />
            <NavBtn
              onClick={() =>
                setCurrentMove((m) => Math.min(positions.length - 1, m + 1))
              }
              disabled={currentMove === positions.length - 1}
              icon={cheRight}
            />
            <NavBtn
              onClick={() => setCurrentMove(positions.length - 1)}
              disabled={currentMove === positions.length - 1}
              icon={cheEnd}
            />
          </div>
          <p className="text-zinc-600 text-xs text-center mt-2 lg:text-sm">
            Pulsa {"‹ - ›"} para navegar
          </p>
        </div>
      </section>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function PlayerRow({
  name,
  title,
  rating,
  side,
  isFaustino = false,
}: {
  name: string;
  title?: string;
  rating?: number;
  side: "white" | "black";
  isFaustino?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div
        className={`w-4 h-4 rounded-full shrink-0 border ${
          side === "white"
            ? "bg-zinc-100 border-zinc-400"
            : "bg-zinc-900 border-zinc-500"
        }`}
      />
      {title && (
        <span className="text-yellow-500 text-xs font-semibold shrink-0 lg:text-sm">
          {title}
        </span>
      )}
      <span
        className={`text-sm truncate lg:text-base ${isFaustino ? "text-zinc-100 font-medium" : "text-zinc-400"}`}
      >
        {name}
      </span>
      {rating && (
        <span className="text-zinc-500 text-xs shrink-0 lg:text-base">
          ({rating})
        </span>
      )}
    </div>
  );
}

function NavBtn({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: string | { src: string };
}) {
  const src = typeof icon === "string" ? icon : icon.src;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-12 h-9 flex items-center justify-center rounded-lg bg-zinc-800 border-2 border-zinc-700 hover:bg-zinc-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all lg:w-16 lg:h-10"
    >
      <img src={src} alt="" className="w-7 h-7 lg:w-9 lg:h-9" />
    </button>
  );
}
