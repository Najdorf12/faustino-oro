// app/api/game-pgn/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roundId = searchParams.get("roundId");
  const gameId = searchParams.get("gameId");

  if (!roundId || !gameId) {
    return NextResponse.json(
      { error: "roundId y gameId son requeridos" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      `https://lichess.org/api/broadcast/round/${roundId}.pgn`,
      {
        headers: { Accept: "application/x-chess-pgn" },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Error al obtener el PGN de Lichess" },
        { status: res.status },
      );
    }

    const fullPgn = await res.text();

    // Cada partida en el PGN está separada por doble salto de línea antes de [Event
    // Dividimos y buscamos la que contiene el gameId
    const games = fullPgn
      .split(/\r?\n\r?\n(?=\[)/) // separa en bloques que empiezan con [
      .filter((g) => g.includes("[Event") && g.includes(gameId));

    const gamePgn = games[0];

    if (!gamePgn) {
      return NextResponse.json(
        { error: `No se encontró la partida con id ${gameId}` },
        { status: 404 },
      );
    }

    return NextResponse.json({ pgn: gamePgn.trim() });
  } catch (err) {
    console.error("Error fetching PGN:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
