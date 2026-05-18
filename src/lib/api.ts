import type { FideStats } from "@/types/fideStats";
import type { FideResponse } from "@/types/fidePlayer";
import statsData from "@/data/fideStats.json";

function getBaseUrl() {
  if (typeof window === "undefined") {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  }
  return "";
}

export async function getAchievements() {
  try {
    const baseURL = getBaseUrl();
    const url = baseURL ? `${baseURL}/api/achievements` : "/api/achievements";

    const res = await fetch(url, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch achievements:",
        res.status,
        res.statusText,
      );
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }
}

export async function getTournaments() {
  try {
    const baseURL = getBaseUrl();
    const url = baseURL ? `${baseURL}/api/tournaments` : "/api/tournaments";

    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("Failed to fetch tournaments:", res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return [];
  }
}

export async function getTournamentById(id: string) {
  try {
    const baseURL = getBaseUrl();
    const url = baseURL
      ? `${baseURL}/api/tournaments/${id}`
      : `/api/tournaments/${id}`;

    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("Failed to fetch tournament:", res.status, res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return null;
  }
}

export async function getNotices() {
  try {
    const baseURL = getBaseUrl();
    const url = baseURL ? `${baseURL}/api/notices` : "/api/notices";

    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("Failed to fetch notices:", res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
}

export async function getNoticeById(id: string) {
  try {
    const baseURL = getBaseUrl();
    const url = baseURL ? `${baseURL}/api/notices/${id}` : `/api/notices/${id}`;

    const res = await fetch(url, {
      next: { revalidate: 1800 },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("Failed to fetch notice:", res.status, res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching notice:", error);
    return null;
  }
}

/* FIDE */

export async function getFideStats(): Promise<FideStats> {
  return statsData as FideStats;
}

export async function getFidePlayer(): Promise<FideResponse | null> {
  try {
    const baseURL = getBaseUrl();
    const url = baseURL
      ? `${baseURL}/api/fide-player`
      : "/api/fide-player";

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching FIDE player:", error);
    return null;
  }
}

export async function getLandingData() {
  console.log("=== Starting getLandingData ===");
  console.log("VERCEL_URL:", process.env.VERCEL_URL);
  console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

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
/* 
_id
6a09c57bf1edef08352c373e
title
"Fausti jugó el V Open Chess Menorca"
description
"Ha participado en abril por tercera vez consecutiva en el Open de Meno…"
content
"Fausti participó en el mes de abril en el V Open Chess Menorca 2026, o…"
category
"Clásicas"
isActive
true

images
Array (1)
date
2026-05-17T13:41:15.887+00:00
createdAt
2026-05-17T13:41:15.891+00:00
updatedAt
2026-05-17T13:41:30.866+00:00
__v
0 



_id
6a044317d1e10023e1c1b8bc
title
"Fausti culmina el "Sardinia World Chess Festival" en Italia"
description
"Obtiene su tercera norma de GM!"
content
"Fausti participó en el “Sardinia World Chess Festival 2026”, disputado…"
category
"Clásicas"
isActive
true

images
Array (1)
date
2026-05-13T09:23:35.855+00:00
createdAt
2026-05-13T09:23:35.855+00:00
updatedAt
2026-05-13T09:23:35.855+00:00
__v
0



_id
6a043fa185ace54c964798d7
title
"Fausti gana el "Freestyle Friday" en Week 9"
description
"Logra ser hasta ahora  el campeón más joven del evento en la historia"
content
"Fausti el viernes 17/04/2026 ganó el torneo on-line "Freestyle Friday"…"
category
"Eventos"
isActive
true

images
Array (1)
date
2026-05-13T09:08:49.415+00:00
createdAt
2026-05-13T09:08:49.419+00:00
updatedAt
2026-05-13T09:18:02.192+00:00
__v
1

_id
69ad9e1e4e1680a284952e61
title
"Finaliza el Abierto de Aeroflot 2026 luego de una semana muy intensa"
description
"Buen desempeño de Fausti en este fuerte torneo en Moscú"
content
"Finalizó una semana de ajedrez de alto nivel en el Aeroflot Open Moscú…"
category
"Clásicas"
isActive
true

images
Array (1)
date
2026-03-08T16:04:47.004+00:00
createdAt
2026-03-08T16:04:47.008+00:00
updatedAt
2026-03-08T16:06:25.467+00:00
__v
0*/