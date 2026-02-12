import { Metadata } from "next";
import NavbarLanding from "@/components/landing/ui/NavbarLanding";
import Home from "@/components/landing/Home";
import About from "@/components/landing/About";
import Achievements from "@/components/landing/Achievements";
import Tournaments from "@/components/landing/Tournaments";
import Notices from "@/components/landing/Notices";
import Contact from "@/components/landing/Contact";
import connectToDatabase from "@/lib/mongodb";
import NoticeModel from "@/models/notice";
import TournamentModel from "@/models/tournament";
import AchievementModel from "@/models/achievement";

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

export const revalidate = 1800;

async function getLandingData() {
  try {
    await connectToDatabase();
    
    const [achievements, tournaments, notices] = await Promise.all([
      AchievementModel.find().sort({ createdAt: -1 }).lean(),
      TournamentModel.find().sort({ startDate: -1 }).lean(),
      NoticeModel.find().sort({ createdAt: -1 }).lean(),
    ]);

    return {
      achievements: JSON.parse(JSON.stringify(achievements)),
      tournaments: JSON.parse(JSON.stringify(tournaments)),
      notices: JSON.parse(JSON.stringify(notices)),
    };
  } catch (error) {
    console.error('Error in getLandingData:', error);
    return {
      achievements: [],
      tournaments: [],
      notices: []
    };
  }
}

export default async function HomePage() {
  const { achievements, tournaments, notices } = await getLandingData();

  return (
    <section className="bg-zinc-800 text-balance overflow-hidden">
      <NavbarLanding />
      <Home />
      <About />
      <Achievements data={achievements} />
      <Tournaments data={tournaments} />
      <Notices data={notices} />
      <Contact />
    </section>
  );
}