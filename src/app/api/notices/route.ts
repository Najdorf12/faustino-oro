import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import NoticeModel from '@/models/notice';

export async function GET() {
  try {
    await connectToDatabase();
    const notices = await NoticeModel.find().sort({ createdAt: -1 });
    return NextResponse.json(notices);
  } catch (error: any) {
    console.error('Error fetching notices:', error);
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
    
    const newNotice = new NoticeModel({
      title: body.title,
      description: body.description,
      content: body.content,
      category: body.category,
      isActive: body.isActive ?? true,
      images: body.images || [], // Por ahora array vacío
    });
    
    const savedNotice = await newNotice.save();
    
    return NextResponse.json(savedNotice, { status: 201 });
  } catch (error: any) {
    console.error('Error creating notice:', error);
    
    // Manejo específico de error de duplicado
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'Ya existe una noticia con ese título' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
