// lib/api.ts

function getBaseUrl() {
  // En el servidor (build time o runtime)
  if (typeof window === 'undefined') {
    // En Vercel (producción o preview)
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    // En desarrollo local
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }
  // En el cliente (browser)
  return '';
}

export async function getAchievements() {
  try {
    const baseURL = getBaseUrl(); // ← Calcular aquí
    const url = baseURL ? `${baseURL}/api/achievements` : '/api/achievements';
    
    console.log('Fetching achievements from:', url); // ← Debug
    
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch achievements:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

export async function getTournaments() {
  try {
    const baseURL = getBaseUrl(); // ← Calcular aquí
    const url = baseURL ? `${baseURL}/api/tournaments` : '/api/tournaments';
    
    console.log('Fetching tournaments from:', url); // ← Debug
    
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch tournaments:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return [];
  }
}

export async function getTournamentById(id: string) {
  try {
    const baseURL = getBaseUrl(); // ← Calcular aquí
    const url = baseURL ? `${baseURL}/api/tournaments/${id}` : `/api/tournaments/${id}`;
    
    console.log('Fetching tournament from:', url); // ← Debug
    
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch tournament:', res.status, res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching tournament:', error);
    return null;
  }
}

export async function getNotices() {
  try {
    const baseURL = getBaseUrl(); // ← Calcular aquí
    const url = baseURL ? `${baseURL}/api/notices` : '/api/notices';
    
    console.log('Fetching notices from:', url); // ← Debug
    
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch notices:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
}

export async function getNoticeById(id: string) {
  try {
    const baseURL = getBaseUrl(); // ← Calcular aquí
    const url = baseURL ? `${baseURL}/api/notices/${id}` : `/api/notices/${id}`;
    
    console.log('Fetching notice from:', url); // ← Debug
    
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch notice:', res.status, res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching notice:', error);
    return null;
  }
}

export async function getLandingData() {
  console.log('=== Starting getLandingData ===');
  console.log('VERCEL_URL:', process.env.VERCEL_URL);
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  
  const [achievements, tournaments, notices] = await Promise.all([
    getAchievements(),
    getTournaments(),
    getNotices(),
  ]);
  
  console.log('Results:', {
    achievements: achievements.length,
    tournaments: tournaments.length,
    notices: notices.length
  });
  
  return {
    achievements,
    tournaments,
    notices,
  };
}