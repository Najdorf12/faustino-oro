import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AchievementModel from "@/models/achievement";
import { translateText } from "@/lib/translate";

export async function POST() {
  try {
    await connectToDatabase();

    // Buscar solo los que tienen title_es vacío y tienen title legacy
    const toMigrate = await AchievementModel.find({
      title: { $exists: true, $ne: "" },
      $or: [
        { title_es: { $exists: false } },
        { title_es: "" },
      ],
    });

    if (toMigrate.length === 0) {
      return NextResponse.json({ message: "Nada para migrar", migrated: 0 });
    }

    console.log(`[Migrate] ${toMigrate.length} logros a migrar`);

    const results = [];

    for (const achievement of toMigrate) {
      const title_es = achievement.title;
      const title_en = await translateText(title_es, "es", "en");

      await AchievementModel.findByIdAndUpdate(achievement._id, {
        $set: { title_es, title_en },
      });

      console.log(`[Migrate] ✓ "${title_es.slice(0, 50)}..."`);
      results.push({ id: achievement._id, title_es, title_en });
    }

    return NextResponse.json({
      message: "Migración completada",
      migrated: results.length,
      results,
    });
  } catch (error: any) {
    console.error("[Migrate] Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}