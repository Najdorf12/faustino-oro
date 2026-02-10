import { Suspense } from "react";
import { Metadata } from "next";
import NavbarLanding from "@/components/landing/ui/NavbarLanding";
import Home from "@/components/landing/Home";
import About from "@/components/landing/About";
import Achievements from "@/components/landing/Achievements";
import Tournaments from "@/components/landing/Tournaments";
import ClientWrapper from "@/components/landing/ClientWrapper";
import { getLandingData } from "@/lib/api";

export const metadata: Metadata = {
  title: "Faustino Oro",
  description:
    "Conoce a Faustino Oro, el jugador más joven en alcanzar 2500 de ELO FIDE. Campeón Argentino, Panamericano y número uno del mundo en su categoría.",
  keywords: [
    "Faustino Oro",
    "ajedrez",
    "prodigio",
    "gran maestro",
    "torneos",
    "campeón",
  ],
};

function AchievementsSkeleton() {
  return (
    <div className="w-full h-full mt-6 flex flex-col gap-10 items-center px-6 lg:px-12 animate-pulse">
      <div className="h-16 bg-zinc-700 rounded-lg w-3/4"></div>
      <div className="h-96 bg-zinc-700 rounded-3xl w-full"></div>
    </div>
  );
}

function TournamentsSkeleton() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-12 items-center py-10 bg-sky-900 animate-pulse">
      <div className="h-16 bg-sky-800 rounded-lg w-3/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 bg-sky-800 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

async function DynamicContent() {
  const { achievements, tournaments, notices } = await getLandingData();

  return (
    <>
      <Achievements data={achievements} />
      <Tournaments data={tournaments} />
      <ClientWrapper noticesData={notices} />
    </>
  );
}

export default function HomePage() {
  return (
    <section className="bg-zinc-800 text-balance">
      <NavbarLanding />
      <Home />
      <About />

      <Suspense
        fallback={
          <>
            <AchievementsSkeleton />
            <TournamentsSkeleton />
          </>
        }
      >
        <DynamicContent />
      </Suspense>
    </section>
  );
}