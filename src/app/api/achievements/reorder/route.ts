import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AchievementModel from "@/models/achievement";
import { revalidatePath } from "next/cache";

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const body: { id: string; order: number }[] = await request.json();

    await Promise.all(
      body.map(({ id, order }) =>
        AchievementModel.findByIdAndUpdate(id, { order }),
      ),
    );
    revalidatePath("/");
    return NextResponse.json({ message: "Orden actualizado" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
