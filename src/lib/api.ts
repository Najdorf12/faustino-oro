const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getAchievements() {
  try {
    const res = await fetch(`${API_URL}/api/achievements`, {  // ← Paréntesis, no backticks
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
    const res = await fetch(`${API_URL}/api/tournaments`, {  // ← Corregido
      next: { revalidate: 1800 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch tournaments');
    return res.json();
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return [];
  }
}

export async function getTournamentById(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/tournaments/${id}`, {  // ← Corregido
      next: { revalidate: 1800 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch tournament');
    return res.json();
  } catch (error) {
    console.error('Error fetching tournament:', error);
    return null;
  }
}

export async function getNotices() {
  try {
    const res = await fetch(`${API_URL}/api/notices`, {  // ← Corregido
      next: { revalidate: 1800 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch notices');
    return res.json();
  } catch (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
}

export async function getNoticeById(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/notices/${id}`, {  // ← Corregido
      next: { revalidate: 1800 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch notice');
    return res.json();
  } catch (error) {
    console.error('Error fetching notice:', error);
    return null;
  }
}

export async function getLandingData() {
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