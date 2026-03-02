"use client";

import { useEffect, useState, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
const ChessboardComponent = Chessboard as any;
// ─── Types ────────────────────────────────────────────────────────────────────

interface GameViewerProps {
  roundId: string;
  gameId: string;
  playerName?: string;   // ej: "Oro, Faustino"
  opponentName?: string; // ej: "Ivic, Velimir"
  playerColor?: "white" | "black";
  result?: string;       // "1/2", "1", "0"
}

interface ParsedGame {
  white: string;
  black: string;
  result: string;
  date: string;
  opening: string;
  moves: string[];
  headers: Record<string, string>;
}

// ─── Move List ─────────────────────────────────────────────────────────────────

function MoveList({
  moves,
  currentMove,
  onSelect,
}: {
  moves: string[];
  currentMove: number;
  onSelect: (idx: number) => void;
}) {
  const pairs: [string, string | undefined][] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push([moves[i], moves[i + 1]]);
  }

  return (
    <div className="flex flex-wrap gap-x-1 gap-y-0.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
      {pairs.map(([white, black], pairIdx) => {
        const whiteIdx = pairIdx * 2;
        const blackIdx = pairIdx * 2 + 1;
        return (
          <span key={pairIdx} className="flex items-center gap-0.5">
            <span className="text-zinc-500 text-xs w-5 text-right select-none">
              {pairIdx + 1}.
            </span>
            <button
              onClick={() => onSelect(whiteIdx + 1)}
              className={`px-1.5 py-0.5 rounded text-xs font-mono transition-colors ${
                currentMove === whiteIdx + 1
                  ? "bg-sky-500 text-white"
                  : "text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {white}
            </button>
            {black && (
              <button
                onClick={() => onSelect(blackIdx + 1)}
                className={`px-1.5 py-0.5 rounded text-xs font-mono transition-colors ${
                  currentMove === blackIdx + 1
                    ? "bg-sky-500 text-white"
                    : "text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {black}
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GameViewer({
  roundId,
  gameId,
  playerColor = "white",
}: GameViewerProps) {
  const [pgn, setPgn] = useState<string | null>(null);
  const [parsedGame, setParsedGame] = useState<ParsedGame | null>(null);
  /* const [chess] = useState(new Chess()); */
  const [positions, setPositions] = useState<string[]>([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch PGN
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/game-pgn?roundId=${roundId}&gameId=${gameId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setPgn(data.pgn);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [roundId, gameId]);


  // Parse PGN and build positions array
useEffect(() => {
  if (!pgn) return;

  const chessInstance = new Chess();

  // 🔥 SIEMPRE limpiamos primero
  const cleanPgn = pgn
    .replace(/\{[^}]*\}/g, "")        // elimina comentarios { ... }
    .replace(/\[\%[^\]]*\]/g, "")     // elimina [%eval] [%clk]
    .replace(/\$\d+/g, "")            // elimina NAGs $1 $2
    .replace(/\r?\n|\r/g, " ")        // elimina saltos de línea
    .replace(/\s+/g, " ")             // normaliza espacios
    .trim();

  try {
    chessInstance.loadPgn(cleanPgn);
  } catch (err) {
    console.error("Error cargando PGN limpio:", err);
    return;
  }

  const history = chessInstance.history();

  if (history.length === 0) {
    console.error("PGN parseado pero sin movimientos");
    return;
  }

  const headers = chessInstance.getHeaders();

  const pos: string[] = [];
  const tempChess = new Chess();

  pos.push(tempChess.fen());

  for (const move of history) {
    tempChess.move(move);
    pos.push(tempChess.fen());
  }

  setParsedGame({
    white: headers.White ?? "Blancas",
    black: headers.Black ?? "Negras",
    result: headers.Result ?? "*",
    date: headers.Date ?? "",
    opening: headers.Opening ?? headers.ECO ?? "",
    moves: history,
    headers,
  });

  setPositions(pos);
  setCurrentMove(pos.length - 1);
}, [pgn]);
  // Navegación por teclado (Corregida para usar el estado actual de positions)
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setCurrentMove((m) => Math.max(0, m - 1));
      if (e.key === "ArrowRight")
        setCurrentMove((m) => Math.min(positions.length - 1, m + 1));
    },
    [positions] // Dependencia de positions para saber el límite
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // ─── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-zinc-900 rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-zinc-500 text-sm">Cargando partida...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-zinc-900 rounded-xl">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!parsedGame || positions.length === 0) return null;

  const fen = positions[currentMove];
  const totalMoves = positions.length - 1;
  const progress = totalMoves > 0 ? (currentMove / totalMoves) * 100 : 0;

  const resultLabel =
    parsedGame.result === "1-0"
      ? "1 - 0"
      : parsedGame.result === "0-1"
      ? "0 - 1"
      : parsedGame.result === "1/2-1/2"
      ? "½ - ½"
      : "*";

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg bg-zinc-900 rounded-2xl border border-zinc-700/50 overflow-hidden">
      {/* Header: jugadores */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex flex-col gap-1">
          <PlayerBadge
            name={parsedGame.white}
            color="white"
            isActive={playerColor === "white"}
          />
          <PlayerBadge
            name={parsedGame.black}
            color="black"
            isActive={playerColor === "black"}
          />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-zinc-300 text-lg font-semibold tracking-wide">
            {resultLabel}
          </span>
          {parsedGame.opening && (
            <span className="text-zinc-500 text-xs">{parsedGame.opening}</span>
          )}
          {parsedGame.date && (
            <span className="text-zinc-600 text-xs">{parsedGame.date}</span>
          )}
        </div>
      </div>

      {/* Board */}
      <div className="px-4">
        <div className="rounded-xl overflow-hidden border border-zinc-700/40">
    <ChessboardComponent
  key={fen}   // 🔥 ESTO ES LO IMPORTANTE
  id={`game-viewer-${gameId}`}
  position={fen}
  boardOrientation={playerColor}
  arePiecesDraggable={false}
  animationDuration={300}
  customBoardStyle={{ borderRadius: "0" }}
  customDarkSquareStyle={{ backgroundColor: "#2d4a6b" }}
  customLightSquareStyle={{ backgroundColor: "#b8cfe8" }}
/>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4">
        <div className="w-full h-0.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-zinc-600 text-xs">Inicio</span>
          <span className="text-zinc-400 text-xs">
            {currentMove === 0
              ? "Posición inicial"
              : `Movimiento ${currentMove} de ${totalMoves}`}
          </span>
          <span className="text-zinc-600 text-xs">Final</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 px-4">
        <NavButton onClick={() => setCurrentMove(0)} disabled={currentMove === 0} label="«" title="Inicio" />
        <NavButton onClick={() => setCurrentMove((m) => Math.max(0, m - 1))} disabled={currentMove === 0} label="‹" title="Anterior (←)" />
        <NavButton onClick={() => setCurrentMove((m) => Math.min(positions.length - 1, m + 1))} disabled={currentMove === positions.length - 1} label="›" title="Siguiente (→)" />
        <NavButton onClick={() => setCurrentMove(positions.length - 1)} disabled={currentMove === positions.length - 1} label="»" title="Final" />
      </div>

      {/* Move list */}
      <div className="px-4 pb-4">
        <MoveList
          moves={parsedGame.moves}
          currentMove={currentMove}
          onSelect={setCurrentMove}
        />
        <p className="text-zinc-600 text-xs mt-2 text-center">
          Usá ← → para navegar
        </p>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PlayerBadge({
  name,
  color,
  isActive,
}: {
  name: string;
  color: "white" | "black";
  isActive: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 ${isActive ? "opacity-100" : "opacity-60"}`}>
      <div
        className={`w-3.5 h-3.5 rounded-sm border ${
          color === "white"
            ? "bg-zinc-100 border-zinc-400"
            : "bg-zinc-900 border-zinc-500"
        }`}
      />
      <span
        className={`text-sm font-medium ${
          isActive ? "text-zinc-100" : "text-zinc-400"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

function NavButton({
  onClick,
  disabled,
  label,
  title,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 text-lg hover:bg-zinc-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
    >
      {label}
    </button>
  );
}