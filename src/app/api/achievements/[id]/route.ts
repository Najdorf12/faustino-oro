import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AchievementModel from '@/models/achievement';
import mongoose from 'mongoose';
import { translateText } from '@/lib/translate';

// GET one achievement by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID inválido' },
        { status: 400 }
      );
    }
    
    const achievement = await AchievementModel.findById(id);
    
    if (!achievement) {
      return NextResponse.json(
        { message: 'Logro no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(achievement);
  } catch (error: any) {
    console.error('Error fetching achievement:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();
    const achievement = await AchievementModel.findById(id);

    if (!achievement) {
      return NextResponse.json({ message: "Logro no encontrado" }, { status: 404 });
    }

    const title_es = body.title?.es?.trim();
    const title_en_manual = body.title?.en?.trim();

    if (!title_es) {
      return NextResponse.json({ message: "El título ES es requerido" }, { status: 400 });
    }

    // Si el admin corrigió el EN manualmente, usarlo — si no, retraduce
    const esChanged = title_es !== achievement.title.es;
    const title_en = title_en_manual || (esChanged
      ? await translateText(title_es, "es", "en")
      : achievement.title.en);

    const updated = await AchievementModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title: { es: title_es, en: title_en },
          category: body.category,
        },
      },
      { new: true, runValidators: true },
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Error updating achievement:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE achievement
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID inválido' },
        { status: 400 }
      );
    }
    
    const deletedAchievement = await AchievementModel.findByIdAndDelete(id);
    
    if (!deletedAchievement) {
      return NextResponse.json(
        { message: 'Logro no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Logro eliminado correctamente',
      achievement: deletedAchievement 
    });
  } catch (error: any) {
    console.error('Error deleting achievement:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}