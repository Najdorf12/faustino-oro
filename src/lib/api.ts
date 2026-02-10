// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getAchievements() {
  try {
    const res = await fetch(`${API_URL}/api/achievements`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch achievements');
    return res.json();
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

export async function getTournaments() {
  try {
    const res = await fetch(`${API_URL}/api/tournaments`, {
      next: { revalidate: 1800 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch tournaments');
    return res.json();
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return [];
  }
}

export async function getNotices() {
  try {
    const res = await fetch(`${API_URL}/api/notices`, {
      next: { revalidate: 1800 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch notices');
    return res.json();
  } catch (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
}

// ✨ NUEVA FUNCIÓN: Parallel Fetching
export async function getLandingData() {
  // Ejecuta todas las peticiones en paralelo
  const [achievements, tournaments, notices] = await Promise.all([
    getAchievements(),
    getTournaments(),
    getNotices(),
  ]);

  return {
    achievements,
    tournaments,
    notices,
  };
}