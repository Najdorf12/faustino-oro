import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/mongodb';
import NoticeModel from '@/models/notice';
import TournamentModel from '@/models/tournament';

export const revalidate = 86400; // 24 horas

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.orofaustino.com';
  
  try {
    await connectToDatabase();
    
    // Solo traemos _id y updatedAt (mínima carga en BD)
    const [notices, tournaments] = await Promise.all([
      NoticeModel.find({ isActive: true })
        .select('_id updatedAt')  // Solo estos 2 campos
        .lean(),  // No crear instancias de Mongoose (más rápido)
      
      TournamentModel.find({ isActive: true })
        .select('_id updatedAt')
        .lean(),
    ]);

    // Mapear a formato sitemap
    const noticeUrls = notices.map((notice) => ({
      url: `${baseUrl}/notices/${notice._id}`,
      lastModified: new Date(notice.updatedAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const tournamentUrls = tournaments.map((tournament) => ({
      url: `${baseUrl}/tournaments/${tournament._id}`,
      lastModified: new Date(tournament.updatedAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [
      // URLs estáticas (siempre las mismas)
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/notices`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      // URLs dinámicas (de la BD)
      ...noticeUrls,
      ...tournamentUrls,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Si falla la BD, al menos devuelve las páginas estáticas
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}