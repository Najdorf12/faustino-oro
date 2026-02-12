import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/cloudinary';

type RouteContext = {
  params: Promise<{ publicId: string }>;
};

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { publicId } = await context.params;
    
    const decodedPublicId = decodeURIComponent(publicId);
    
    if (!decodedPublicId) {
      return NextResponse.json(
        { message: 'Falta el public_id de la imagen' },
        { status: 400 }
      );
    }
    
    await deleteImage(decodedPublicId);
    
    return NextResponse.json({ 
      message: 'Imagen eliminada correctamente' 
    });
  } catch (error: any) {
    console.error('Error al eliminar imagen:', error);
    return NextResponse.json(
      { message: 'Error al eliminar la imagen' },
      { status: 500 }
    );
  }
}