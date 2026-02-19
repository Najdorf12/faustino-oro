// app/api/lichess-player/[tournamentId]/route.ts
import { NextRequest, NextResponse } from "next/server";

const FAUSTINO_FIDE_ID = "20000197";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ tournamentId: string }> },
) {
  const { tournamentId } = await params;

  try {
    const res = await fetch(
      `https://lichess.org/broadcast/${tournamentId}/players/${FAUSTINO_FIDE_ID}`,
      {
        headers: {
          Accept: "application/x-ndjson",
        },
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Lichess error:", res.status, text);
      return NextResponse.json(
        { error: `Lichess respondió ${res.status}` },
        { status: res.status },
      );
    }

    const text = await res.text();
    const players: any[] = text
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));

    const player =
      players.find((p) => String(p.fideId) === FAUSTINO_FIDE_ID) ??
      players.find((p) => p.name?.toLowerCase().includes("oro"));

    if (!player) {
      return NextResponse.json(
        { error: "Jugador no encontrado", players },
        { status: 404 },
      );
    }

    return NextResponse.json(player);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
