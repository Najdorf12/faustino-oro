import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AchievementModel from "@/models/achievement";
import { translateText } from "@/lib/translate";

export async function GET() {
  try {
    await connectToDatabase();
    const achievements = await AchievementModel.find().sort({ order: 1 });
    return NextResponse.json(achievements);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const title_es = body.title?.es?.trim();
    const title_en = body.title?.en?.trim();

    if (!title_es) {
      return NextResponse.json({ message: "El título es requerido" }, { status: 400 });
    }

    // Si no viene EN del form, traducir automáticamente
    const translatedEn = title_en || await translateText(title_es, "es", "en");

    const lastInCategory = await AchievementModel.findOne({
      category: body.category,
    }).sort({ order: -1 });

    const savedAchievement = await AchievementModel.create({
      title: { es: title_es, en: translatedEn },
      category: body.category,
      order: lastInCategory ? lastInCategory.order + 1 : 0,
    });

    return NextResponse.json(savedAchievement, { status: 201 });
  } catch (error: any) {
    console.error("Error creating achievement:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}