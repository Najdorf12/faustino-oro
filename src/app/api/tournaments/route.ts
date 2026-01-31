import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TournamentModel from '@/models/tournament';

export async function GET() {
  try {
    await connectToDatabase();
    const tournaments = await TournamentModel.find().sort({ startDate: -1 });
    return NextResponse.json(tournaments);
  } catch (error: any) {
    console.error('Error fetching tournaments:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const newTournament = new TournamentModel({
      title: body.title,
      location: body.location,
      startDate: body.startDate,
      endDate: body.endDate,
      description: body.description || '',
      images: body.images || [],
    });
    
    const savedTournament = await newTournament.save();
    
    return NextResponse.json(savedTournament, { status: 201 });
  } catch (error: any) {
    console.error('Error creating tournament:', error);
    
    // Manejo específico de error de duplicado
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