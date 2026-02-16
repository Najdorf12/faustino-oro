"use client";

import { useEffect, useState } from "react";
import Achievements from "./Achievements";
import Tournaments from "./Tournaments";
import ClientWrapper from "./ClientWrapper";
import type { Notice } from "@/types/notice";
import type { Tournament } from "@/types/tournament";
import type { Achievement } from "@/types/achievement";


export default function LandingClient() {
  const [data, setData] = useState<{
    achievements: Achievement[];
    tournaments: Tournament[];
    notices: Notice[];
  }>({
    achievements: [],
    tournaments: [],
    notices: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [achievementsRes, tournamentsRes, noticesRes] = await Promise.all(
          [
            fetch("/api/achievements"),
            fetch("/api/tournaments"),
            fetch("/api/notices"),
          ],
        );

        const [achievements, tournaments, notices] = await Promise.all([
          achievementsRes.json(),
          tournamentsRes.json(),
          noticesRes.json(),
        ]);

        setData({ achievements, tournaments, notices });
      } catch (error) {
        console.error("Error fetching landing data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="w-full h-full mt-6 flex flex-col gap-10 items-center px-6 lg:px-12 animate-pulse">
          <div className="h-16 bg-zinc-700 rounded-lg w-3/4"></div>
          <div className="h-96 bg-zinc-700 rounded-3xl w-full"></div>
        </div>
        <div className="w-full min-h-screen flex flex-col gap-12 items-center py-10 bg-sky-900 animate-pulse">
          <div className="h-16 bg-sky-800 rounded-lg w-3/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-sky-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Achievements data={data.achievements} />
      <Tournaments data={data.tournaments} />
      <ClientWrapper noticesData={data.notices} />
    </>
  );
}
