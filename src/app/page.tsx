import { Metadata } from "next";
import asterisk from "@/assets/images/icons/asterisk.svg";
import Image from "next/image";
import NavbarLanding from "@/components/landing/ui/layout/NavbarLanding";
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
  title: "Faustino Oro - Página Oficial del Ajedrecista Argentino",
  description:
    "Página Oficial de Faustino Oro, el jugador más joven en alcanzar 2500 de ELO FIDE. Campeón Argentino, Panamericano y número uno del mundo en su categoría.",
};

export const revalidate = 1800;
async function getLandingData() {
  try {
    await connectToDatabase();

    const [achievements, tournaments, notices] = await Promise.all([
      AchievementModel.find().sort({ createdAt: -1 }).lean(),
      TournamentModel.find().sort({ startDate: -1 }).lean(),
      NoticeModel.find().sort({ createdAt: -1 }).limit(4).lean(),
    ]);

    return {
      achievements: JSON.parse(JSON.stringify(achievements)),
      tournaments: JSON.parse(JSON.stringify(tournaments)),
      notices: JSON.parse(JSON.stringify(notices)),
    };
  } catch (error) {
    console.error("Error in getLandingData:", error);
    return {
      achievements: [],
      tournaments: [],
      notices: [],
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
      <div className="w-full flex flex-col-reverse justify-center items-center px-6 gap-9 py-14 bg-zinc-200 font-light text-zinc-400 text-2xl md:flex-row md:justify-evenly md:px-0 lg:text-5xl lg:py-20 3xl:text-6xl">
        <div className="max-w-90 lg:max-w-200 text-balance flex flex-col 3xl:max-w-280">
          El Ajedrez, con toda su profundidad filosófica, es ante todo un juego
          en el que se ponen de manifiesto la imaginación, el carácter y la
          voluntad
          <div className="text-base lg:text-xl pt-6 3xl:text-2xl">
            Borís Spaski
          </div>
        </div>
        <Image
          src={asterisk}
          alt="Faustino Oro - Torneos"
          loading="eager"
          className="w-40 lg:w-60 3xl:w-70"
        />
      </div>
      <Notices data={notices} />
      <Contact />
    </section>
  );
}
