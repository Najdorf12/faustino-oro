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

const baseURL = getBaseUrl();

export async function getAchievements() {
  try {
    const url = baseURL ? `${baseURL}/api/achievements` : '/api/achievements';
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch achievements:', res.status);
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
    const url = baseURL ? `${baseURL}/api/tournaments` : '/api/tournaments';
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch tournaments:', res.status);
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
    const url = baseURL ? `${baseURL}/api/tournaments/${id}` : `/api/tournaments/${id}`;
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch tournament:', res.status);
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
    const url = baseURL ? `${baseURL}/api/notices` : '/api/notices';
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch notices:', res.status);
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
    const url = baseURL ? `${baseURL}/api/notices/${id}` : `/api/notices/${id}`;
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch notice:', res.status);
      return null;
    }
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