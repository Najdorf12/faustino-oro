import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import NoticeModel from "@/models/notice";
import mongoose from "mongoose";
import { deleteImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { translateText } from "@/lib/translate";
import { translateNotice } from "@/lib/translateNotice";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await connectToDatabase();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }

    const notice = await NoticeModel.findById(id);

    if (!notice) {
      return NextResponse.json(
        { message: "Noticia no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json(notice);
  } catch (error: any) {
    console.error("Error fetching notice:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();
    const notice = await NoticeModel.findById(id);
    if (!notice) {
      return NextResponse.json({ message: "Noticia no encontrada" }, { status: 404 });
    }

    const esChanged =
      body.title !== notice.title.es ||
      body.description !== notice.description.es ||
      body.content !== notice.content.es;

    // Si vienen campos EN explícitos y no vacíos, usarlos directamente
    const hasManualEn =
      body.titleEn?.trim() &&
      body.descriptionEn?.trim() &&
      body.contentEn?.trim();

    let titleEn = notice.title.en;
    let descriptionEn = notice.description.en;
    let contentEn = notice.content.en;

    if (hasManualEn) {
      // El usuario corrigió manualmente el EN — respetar siempre
      titleEn = body.titleEn.trim();
      descriptionEn = body.descriptionEn.trim();
      contentEn = body.contentEn.trim();
    } else if (esChanged) {
      // El ES cambió y no hay corrección manual — retradducir
      const translated = await translateNotice({
        title: body.title,
        description: body.description,
        content: body.content,
      });
      titleEn = translated.titleEn;
      descriptionEn = translated.descriptionEn;
      contentEn = translated.contentEn;
    }
    // Si no cambió nada y no hay manual → conserva el EN existente (ya asignado arriba)

    notice.title = { es: body.title, en: titleEn };
    notice.description = { es: body.description, en: descriptionEn };
    notice.content = { es: body.content, en: contentEn };
    notice.category = body.category;
    notice.isActive = body.isActive;
    notice.images = body.images?.length > 0 ? body.images : notice.images;

    const updatedNotice = await notice.save();
    revalidatePath("/");
    revalidatePath("/notices");
    revalidatePath(`/notices/${id}`);
    return NextResponse.json(updatedNotice);
  } catch (error: any) {
    console.error("Error updating notice:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await connectToDatabase();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }

    const deletedNotice = await NoticeModel.findByIdAndDelete(id);

    if (!deletedNotice) {
      return NextResponse.json(
        { message: "Noticia no encontrada" },
        { status: 404 },
      );
    }

    // Eliminar todas las imágenes de Cloudinary
    if (deletedNotice.images && deletedNotice.images.length > 0) {
      for (const img of deletedNotice.images) {
        try {
          await deleteImage(img.public_id);
          console.log(`Deleted image with id: ${img.public_id}`);
        } catch (error: any) {
          console.error(
            `Failed to delete image ${img.public_id}: ${error.message}`,
          );
        }
      }
    }
    revalidatePath("/");
    revalidatePath("/notices");
    revalidatePath(`/notices/${id}`);
    return NextResponse.json({
      message: "Noticia eliminada correctamente",
      notice: deletedNotice,
    });
  } catch (error: any) {
    console.error("Error deleting notice:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
