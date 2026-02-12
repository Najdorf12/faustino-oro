import { Metadata } from "next";
import NavbarLanding from "@/components/landing/ui/NavbarLanding";
import Home from "@/components/landing/Home";
import About from "@/components/landing/About";
import Achievements from "@/components/landing/Achievements";
import Tournaments from "@/components/landing/Tournaments";
import ClientWrapper from "@/components/landing/ClientWrapper";
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
    console.log('🔄 Connecting to database...');
    await connectToDatabase();
    console.log('✅ Database connected');
    
    const [achievements, tournaments, notices] = await Promise.all([
      AchievementModel.find().sort({ createdAt: -1 }).lean(),
      TournamentModel.find().sort({ startDate: -1 }).lean(),
      NoticeModel.find().sort({ createdAt: -1 }).lean(),
    ]);

    console.log('📊 Data fetched:', {
      achievements: achievements.length,
      tournaments: tournaments.length,
      notices: notices.length
    });

    const serialized = {
      achievements: JSON.parse(JSON.stringify(achievements)),
      tournaments: JSON.parse(JSON.stringify(tournaments)),
      notices: JSON.parse(JSON.stringify(notices)),
    };

    console.log('✅ Data serialized successfully');
    return serialized;
  } catch (error) {
    console.error('❌ Error in getLandingData:', error);
    // Retornar arrays vacíos en caso de error
    return {
      achievements: [],
      tournaments: [],
      notices: []
    };
  }
}

export default async function HomePage() {
  const { achievements, tournaments, notices } = await getLandingData();

  console.log('🎨 Rendering HomePage with data:', {
    achievementsCount: achievements.length,
    tournamentsCount: tournaments.length,
    noticesCount: notices.length
  });

  return (
    <section className="bg-zinc-800 text-balance overflow-hidden">
      <NavbarLanding />
      <Home />
      <About />
      <Achievements data={achievements} />
      <Tournaments data={tournaments} />
      <ClientWrapper noticesData={notices} />
    </section>
  );
}