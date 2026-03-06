"use client";

import { useEffect, useState, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
const ChessboardComponent = Chessboard as any;
const blackPieces = {
  bK: ({ squareWidth }: { squareWidth: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={squareWidth} height={squareWidth} viewBox="0 0 45 45">
      <g fill="#52525c" stroke="#52525c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.5 11.63V6M20 8h5" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#52525c" stroke="none"/>
        <path d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V17s-5.5-5.5-10 0c-3 6 5 10 5 10V37z" fill="#52525c"/>
        <path d="M12.5 30c5.5-3 14.5-3 20 0M12.5 33.5c5.5-3 14.5-3 20 0M12.5 37c5.5-3 14.5-3 20 0" stroke="#888" strokeWidth="1"/>
      </g>
    </svg>
  ),
  bQ: ({ squareWidth }: { squareWidth: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={squareWidth} height={squareWidth} viewBox="0 0 45 45">
      <g fill="#52525c" stroke="#52525c" strokeWidth="1.5" strokeLinejoin="round">
        <circle cx="6" cy="12" r="2.75"/>
        <circle cx="14" cy="9" r="2.75"/>
        <circle cx="22.5" cy="8" r="2.75"/>
        <circle cx="31" cy="9" r="2.75"/>
        <circle cx="39" cy="12" r="2.75"/>
        <path d="M9 26c8.5-8.5 15.5-8.5 27 0l2.5-12.5L31 25l-.3-14.1-8.2 13.4-8.2-13.4L14 25 6.5 13.5 9 26z" strokeLinecap="butt"/>
        <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4"/>
        <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c4-1.5 17-1.5 21 0" stroke="#888" strokeWidth="1"/>
      </g>
    </svg>
  ),
  bR: ({ squareWidth }: { squareWidth: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={squareWidth} height={squareWidth} viewBox="0 0 45 45">
      <g fill="#52525c" stroke="#52525c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt"/>
        <path d="M34 14l-3 3H14l-3-3"/>
        <path d="M31 17v12.5H14V17" strokeLinecap="butt"/>
        <path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/>
        <path d="M11 14h23" fill="none" stroke="#888" strokeWidth="1"/>
      </g>
    </svg>
  ),
  bB: ({ squareWidth }: { squareWidth: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={squareWidth} height={squareWidth} viewBox="0 0 45 45">
      <g fill="#52525c" stroke="#52525c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"/>
        <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/>
        <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path d="M17.5 26h10M15 30h15" stroke="#888" strokeWidth="1"/>
      </g>
    </svg>
  ),
  bN: ({ squareWidth }: { squareWidth: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={squareWidth} height={squareWidth} viewBox="0 0 45 45">
      <g fill="#52525c" stroke="#52525c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#52525c"/>
        <path d="M24 18c.38 5.12-5.38 8.88-9 10-1.5-3-1-4.5 1-5.5-2.5-1.5-2.5-5 0-7.5-1.5 3 1 6 4 5" fill="#888"/>
        <path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" fill="#888" stroke="#888"/>
        <path d="M14.933 15.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 0 1 .866.5z" fill="#888" stroke="none"/>
      </g>
    </svg>
  ),
  bP: ({ squareWidth }: { squareWidth: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={squareWidth} height={squareWidth} viewBox="0 0 45 45">
      <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03C15.41 27.09 11 31.58 11 39.5H34c0-7.92-4.41-12.41-7.41-13.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#52525c" stroke="#52525c" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};
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
    <div className="flex flex-col w-full bg-zinc-900 rounded-lg border border-zinc-700/60 overflow-hidden lg:flex-row lg:pt-3 lg:max-w-full">
      {/* ── Header ── */}
      <div className="px-2.5 pt-6 pb-3 flex flex-col gap-2 lg:gap-4 lg:px-4 lg:pt-6 lg:max-w-100">
        {/* Jugadores + resultado */}
        <div className="flex items-center justify-between gap-3 py-1 ">
          <div className="flex flex-col gap-1.5 min-w-0 h-full ">
            <PlayerRow {...faustino} isFaustino />
            <PlayerRow {...opponent} />
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0 ">
            <span
              className={`text-xs font-medium px-4.5 py-0.5 rounded-sm border ${badge.cls}`}
            >
              {badge.label}
            </span>
            <span className="text-zinc-600 text-sm font-mono">
              {meta?.result ?? ""}
            </span>
          </div>
        </div>

        {/* Apertura + fecha */}
        {(meta?.opening || meta?.date) && (
          <div className="flex  items-start justify-between gap-2 pt-1 mt-1">
            {meta?.opening && (
              <span className="text-zinc-500 text-xs text-balance">
                {meta.opening}
              </span>
            )}
            {meta?.date && (
              <span className="text-zinc-600 text-xs shrink-0">
                {meta.date.replace(/\./g, "/")}
              </span>
            )}
          </div>
        )}
        {/* ── Lista de movimientos ── */}
        <div className="mt-1 pb-4 pt-2 w-full">
          <div className="flex flex-wrap gap-x-2 gap-y-1 max-h-38 overflow-y-auto bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 px-1 lg:max-h-105">
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
              lightSquareStyle: { backgroundColor: "#00598a",},
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
          <div className="flex justify-center gap-2 px-3 pt-2 ">
            <NavBtn
              onClick={() => setCurrentMove(0)}
              disabled={currentMove === 0}
              label="«"
            />
            <NavBtn
              onClick={() => setCurrentMove((m) => Math.max(0, m - 1))}
              disabled={currentMove === 0}
              label="‹"
            />
            <NavBtn
              onClick={() =>
                setCurrentMove((m) => Math.min(positions.length - 1, m + 1))
              }
              disabled={currentMove === positions.length - 1}
              label="›"
            />
            <NavBtn
              onClick={() => setCurrentMove(positions.length - 1)}
              disabled={currentMove === positions.length - 1}
              label="»"
            />
          </div>
          <p className="text-zinc-600 text-xs text-center mt-2">
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
        <span className="text-yellow-500 text-xs font-semibold shrink-0">
          {title}
        </span>
      )}
      <span
        className={`text-sm truncate ${isFaustino ? "text-zinc-100 font-medium" : "text-zinc-400"}`}
      >
        {name}
      </span>
      {rating && (
        <span className="text-zinc-500 text-xs shrink-0">({rating})</span>
      )}
    </div>
  );
}

function NavBtn({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-10 h-8  flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 text-lg hover:bg-zinc-700 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all"
    >
      {label}
    </button>
  );
}
