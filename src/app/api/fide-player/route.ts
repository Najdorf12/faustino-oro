// app/api/fide-player/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

const FideCacheSchema = new mongoose.Schema(
  { data: mongoose.Schema.Types.Mixed },
  { timestamps: true }
);
const FideCache =
  mongoose.models.FideCache || mongoose.model("FideCache", FideCacheSchema);

export async function GET() {
  await connectToDatabase();

  try {
    const res = await fetch(
      "https://fide-api.vercel.app/player_info/?fide_id=20000197&history=true",
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const data = await res.json();
      await FideCache.findOneAndUpdate({}, { data }, { upsert: true });
      return NextResponse.json(data);
    }
  } catch (e) {
    console.error("FIDE API failed:", e);
  }

  // Fallback al cache guardado
  const cached = await FideCache.findOne().lean();
  if (cached) return NextResponse.json((cached as any).data);

  return NextResponse.json(null, { status: 503 });
}