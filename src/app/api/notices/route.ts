import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import NoticeModel from "@/models/notice";
import { revalidatePath } from "next/cache";
import { translateText } from "@/lib/translate";
import { translateNotice } from "@/lib/translateNotice";

type RouteContext = {
  params: Promise<Record<string, never>>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await connectToDatabase();
    const notices = await NoticeModel.find().sort({ createdAt: -1 });
    return NextResponse.json(notices);
  } catch (error: any) {
    console.error("Error fetching notices:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const {
      titleEn,
      descriptionEn,
      contentEn,
    } = await translateNotice({
      title: body.title,
      description: body.description,
      content: body.content,
    });

    const newNotice = new NoticeModel({
      title: {
        es: body.title,
        en: titleEn,
      },
      description: {
        es: body.description,
        en: descriptionEn,
      },
      content: {
        es: body.content,
        en: contentEn,
      },
      category: body.category,
      isActive: body.isActive ?? true,
      images: body.images || [],
    });

    const savedNotice = await newNotice.save();

    revalidatePath("/");
    revalidatePath("/notices");

    return NextResponse.json(savedNotice, {
      status: 201,
    });
  } catch (error: any) {
    console.error("Error creating notice:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}