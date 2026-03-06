"use client";

import { useEffect, useState, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
const ChessboardComponent = Chessboard as any;

interface GameViewerProps {
  roundId: string;
  gameId: string;
  playerColor?: "white" | "black";
}

export default function GameViewer({
  roundId,
  gameId,
  playerColor = "white",
}: GameViewerProps) {
  const [positions, setPositions] = useState<string[]>([]);
  const [moves, setMoves] = useState<string[]>([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const log = (msg: string) => {
    console.log("[GameViewer]", msg);
    setLogs((prev) => [...prev, msg]);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setLogs([]);

    log(`Fetching: roundId=${roundId} gameId=${gameId}`);

    fetch(`/api/game-pgn?roundId=${roundId}&gameId=${gameId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);

        const pgn: string = data.pgn;
        log(`PGN recibido: ${pgn.length} chars`);

        let clean = pgn;
        clean = clean.replace(/\{[^{}]*\}/g, "");
        log(`Después de quitar comentarios: ${clean.length} chars`);
        clean = clean.replace(/\$\d+/g, "");
        clean = clean.replace(/[?!]+/g, ""); // sufijos de anotación
        clean = clean
          .replace(/\r?\n|\r/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        log(`PGN limpio: ${clean.length} chars`);

        const chess = new Chess();
        try {
          chess.loadPgn(clean);
          log("loadPgn: OK");
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          log(`loadPgn ERROR: ${msg}`);
          throw new Error(msg);
        }

        const history = chess.history();
        log(`Movimientos parseados: ${history.length}`);

        if (history.length === 0) {
          throw new Error("PGN parseado pero sin movimientos");
        }

        // Construir posiciones
        const pos: string[] = [];
        const temp = new Chess();
        pos.push(temp.fen());
        for (const move of history) {
          temp.move(move);
          pos.push(temp.fen());
        }

        log(`Posiciones construidas: ${pos.length}`);
        setMoves(history);
        setPositions(pos);
        setCurrentMove(0); // ← arranca en posición inicial
        setLoading(false);
      })
      .catch((e: Error) => {
        log(`FATAL: ${e.message}`);
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

  // ── Render ─────────────────────────────────────────────────────────────────
  console.log(
    "currentMove:",
    currentMove,
    "fen:",
    positions[currentMove]?.slice(0, 30),
  );
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      {/* DEBUG LOGS */}
      <div className="bg-zinc-950 border border-zinc-700 rounded-xl p-3 font-mono text-xs text-zinc-400 max-h-40 overflow-y-auto">
        <p className="text-yellow-400 font-bold mb-1">LOGS</p>
        {logs.map((l, i) => (
          <p
            key={i}
            className={
              l.startsWith("FATAL") || l.includes("ERROR")
                ? "text-red-400"
                : l.includes("OK")
                  ? "text-green-400"
                  : ""
            }
          >
            › {l}
          </p>
        ))}
        {loading && <p className="text-sky-400 animate-pulse">Cargando...</p>}
      </div>

      {error && (
        <div className="bg-red-950 border border-red-700 rounded-xl p-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      {positions.length > 0 && (
        <>
          {/* Board */}
          <div className="rounded-xl overflow-hidden border border-zinc-700">
    <ChessboardComponent
  key={currentMove}
  id={`game-viewer-${gameId}`}
  options={{
    position: positions[currentMove],
    boardOrientation: playerColor,
    arePiecesDraggable: false,
    animationDuration: 200,
    customDarkSquareStyle: { backgroundColor: "#2d4a6b" },
    customLightSquareStyle: { backgroundColor: "#b8cfe8" },
  }}
/>
          </div>

          {/* Counter */}
          <p className="text-center text-zinc-400 text-sm">
            {currentMove === 0
              ? "Posición inicial"
              : `Movimiento ${currentMove} de ${positions.length - 1}`}
          </p>

          {/* Botones */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setCurrentMove(0)}
              disabled={currentMove === 0}
              className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              «
            </button>
            <button
              onClick={() => setCurrentMove((m) => Math.max(0, m - 1))}
              disabled={currentMove === 0}
              className="px-5 py-2 rounded-lg bg-zinc-800 text-zinc-200 text-lg hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ‹ Anterior
            </button>
            <button
              onClick={() =>
                setCurrentMove((m) => Math.min(positions.length - 1, m + 1))
              }
              disabled={currentMove === positions.length - 1}
              className="px-5 py-2 rounded-lg bg-zinc-800 text-zinc-200 text-lg hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente ›
            </button>
            <button
              onClick={() => setCurrentMove(positions.length - 1)}
              disabled={currentMove === positions.length - 1}
              className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              »
            </button>
          </div>

          {/* Lista de movimientos — pares con número de jugada */}
          <div className="flex flex-wrap gap-x-2 gap-y-1 max-h-36 overflow-y-auto bg-zinc-900 rounded-xl p-3">
            {Array.from(
              { length: Math.ceil(moves.length / 2) },
              (_, pairIdx) => {
                const wi = pairIdx * 2; // índice blancas en moves[]
                const bi = pairIdx * 2 + 1; // índice negras en moves[]
                return (
                  <span key={pairIdx} className="flex items-center gap-1">
                    {/* Número de jugada */}
                    <span className="text-zinc-600 text-xs w-5 text-right select-none">
                      {pairIdx + 1}.
                    </span>
                    {/* Movimiento blancas */}
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
                    {/* Movimiento negras (puede no existir en la última jugada) */}
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

          <p className="text-zinc-600 text-xs text-center">← → para navegar</p>
        </>
      )}
    </div>
  );
}
