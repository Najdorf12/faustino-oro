import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TournamentModel from '@/models/tournament';
import mongoose from 'mongoose';
import { deleteImage } from '@/lib/cloudinary';

// GET one tournament by ID
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
    
    const tournament = await TournamentModel.findById(id);
    
    if (!tournament) {
      return NextResponse.json(
        { message: 'Torneo no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tournament);
  } catch (error: any) {
    console.error('Error fetching tournament:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// PUT update tournament
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
    
    const tournament = await TournamentModel.findById(id);
    
    if (!tournament) {
      return NextResponse.json(
        { message: 'Torneo no encontrado' },
        { status: 404 }
      );
    }
    
    // Actualizar campos
    tournament.title = body.title;
    tournament.location = body.location;
    tournament.startDate = body.startDate;
    tournament.endDate = body.endDate;
    tournament.description = body.description || '';
    
    // Conservar imágenes anteriores si no hay nuevas
    tournament.images = body.images && body.images.length > 0 ? body.images : tournament.images;
    
    const updatedTournament = await tournament.save();
    
    return NextResponse.json(updatedTournament);
  } catch (error: any) {
    console.error('Error updating tournament:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'Ya existe un torneo con ese título' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// DELETE tournament
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
    
    const deletedTournament = await TournamentModel.findByIdAndDelete(id);
    
    if (!deletedTournament) {
      return NextResponse.json(
        { message: 'Torneo no encontrado' },
        { status: 404 }
      );
    }
    
    // Eliminar todas las imágenes de Cloudinary
    if (deletedTournament.images && deletedTournament.images.length > 0) {
      for (const img of deletedTournament.images) {
        try {
          await deleteImage(img.public_id);
          console.log(`Deleted image with id: ${img.public_id}`);
        } catch (error: any) {
          console.error(
            `Failed to delete image ${img.public_id}: ${error.message}`
          );
        }
      }
    }
    
    return NextResponse.json({ 
      message: 'Torneo eliminado correctamente',
      tournament: deletedTournament 
    });
  } catch (error: any) {
    console.error('Error deleting tournament:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}