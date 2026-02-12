import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import NoticeModel from '@/models/notice';
import mongoose from 'mongoose';
import { deleteImage } from '@/lib/cloudinary';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();
    
    const { id } = await context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID inválido' },
        { status: 400 }
      );
    }
    
    const notice = await NoticeModel.findById(id);
    
    if (!notice) {
      return NextResponse.json(
        { message: 'Noticia no encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(notice);
  } catch (error: any) {
    console.error('Error fetching notice:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();
    
    const { id } = await context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID inválido' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    const notice = await NoticeModel.findById(id);
    
    if (!notice) {
      return NextResponse.json(
        { message: 'Noticia no encontrada' },
        { status: 404 }
      );
    }
    
    // Actualizar campos
    notice.title = body.title;
    notice.description = body.description;
    notice.content = body.content;
    notice.category = body.category;
    notice.isActive = body.isActive;
    
    // Conservar imágenes anteriores si no hay nuevas
    notice.images = body.images && body.images.length > 0 ? body.images : notice.images;
    
    const updatedNotice = await notice.save();
    
    return NextResponse.json(updatedNotice);
  } catch (error: any) {
    console.error('Error updating notice:', error);
    
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

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();
    
    const { id } = await context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'ID inválido' },
        { status: 400 }
      );
    }
    
    const deletedNotice = await NoticeModel.findByIdAndDelete(id);
    
    if (!deletedNotice) {
      return NextResponse.json(
        { message: 'Noticia no encontrada' },
        { status: 404 }
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
            `Failed to delete image ${img.public_id}: ${error.message}`
          );
        }
      }
    }
    
    return NextResponse.json({ 
      message: 'Noticia eliminada correctamente',
      notice: deletedNotice 
    });
  } catch (error: any) {
    console.error('Error deleting notice:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}