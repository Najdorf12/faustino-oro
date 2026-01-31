import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AchievementModel from '@/models/achievement';
import mongoose from 'mongoose';

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

// PUT update achievement
export async function PUT(
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
    
    const body = await request.json();
    
    const achievement = await AchievementModel.findById(id);
    
    if (!achievement) {
      return NextResponse.json(
        { message: 'Logro no encontrado' },
        { status: 404 }
      );
    }
    
    // Actualizar campo
    achievement.title = body.title;
    
    const updatedAchievement = await achievement.save();
    
    return NextResponse.json(updatedAchievement);
  } catch (error: any) {
    console.error('Error updating achievement:', error);
    
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
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