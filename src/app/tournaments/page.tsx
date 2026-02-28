import { Metadata } from "next";
import Image from "next/image";
import imgTournamentPage from "@/assets/images/ai2.jpg";
import NavbarPages from "@/components/landing/ui/layout/NavbarPages";
import FidePlayer from "@/components/landing/ui/tournamentsPage/fideStats/FidePlayer";
import TournamentsList from "@/components/landing/ui/tournamentsPage/TournamentsList";
import { getTournaments, getFidePlayer, getFideStats } from "@/lib/api";
import { ArrowRight } from "../notices/page";
import connectToDatabase from "@/lib/mongodb";
import TournamentModel from "@/models/tournament";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Torneos - Faustino Oro",
  description:
    "Información sobre torneos, estadísticas FIDE y progreso de Faustino Oro",
};

export const revalidate = 3600;

export default async function TournamentsPage() {
  await connectToDatabase();

  const [tournamentsRaw, fidePlayer, fideStats] = await Promise.all([
    TournamentModel.find().sort({ startDate: -1 }).lean(),
    getFidePlayer(),
    getFideStats(),
  ]);
  const tournaments = JSON.parse(JSON.stringify(tournamentsRaw));

  return (
    <section className="w-full pb-32">
      <section className="w-full min-h-screen bg-zinc-800 flex flex-col pt-24 sm:pt-30 gap-12 lg:gap-0 lg:pt-0 lg:flex-row text-balance">
        <NavbarPages />
        <article className="pl-4 relative w-full h-[24vh] flex flex-col items-start justify-center text-start md:border-b border-zinc-700 md:w-1/2 md:h-screen lg:pl-6 xl:pl-12 lg:pt-0">
          <h6 className="relative text-zinc-300 text-[3.5rem] sm:text-6xl lg:text-7xl xl:text-8xl font-medium 3xl:text-9xl">
            TORNEOS
          </h6>
          <p className="relative pr-2 text-sm my-3 sm:my-6  text-zinc-400 flex justify-center items-center max-w-100 lg:max-w-175 xl:text-lg 3xl:text-xl">
            Consulta aquí la lista de próximos torneos en los que participará.
            Sigue su calendario y mantente al día con su increíble recorrido
            competitivo.
          </p>
          <Link href={"/notices"}>
            <button className="relative text-zinc-300 text-lg mt-3 flex items-center gap-2 font-medium  lg:ml-1 xl:text-xl 2xl:text-2xl group hover:text-sky-500 cursor-pointer duration-500">
              Ir a Noticias
              <span className="group-hover:translate-x-3 duration-500">
                <ArrowRight />
              </span>
            </button>
          </Link>
        </article>
        <div className="hidden md:flex justify-center absolute bottom-0 w-1/2">
          <p className="text-sm xl:text-base leading-5 pl-6 xl:pl-12 text-balance h-22 lg:h-24 3xl:h-26 text-zinc-400 flex justify-center items-center 3xl:text-lg xl:leading-normal">
            Mantente informado sobre sus próximas competencias, análisis de
            partidas y eventos destacados en el mundo del ajedrez.
          </p>
          <p className="text-lg leading-5 text-center text-balance h-25 bg-sky-700 rounded-tl text-zinc-300 flex justify-center items-center">
            CHESSI IS COMING
          </p>
        </div>
        <section className="w-[90%] self-center h-[60vh] md:w-1/2 md:h-screen relative flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-800/20 z-100"></div>
          <Image
            src={imgTournamentPage}
            alt="img-tournament"
            loading="eager"
            className="w-full h-full object-cover absolute inset-0 rounded-2xl border-2 border-zinc-600 lg:border-none lg:rounded-bl-none"
          ></Image>
        </section>
      </section>
      {fidePlayer ? (
        <FidePlayer fide={fidePlayer} stats={fideStats} />
      ) : (
        <div className="w-full py-12 text-center text-zinc-500">
          No se pudieron cargar las estadísticas FIDE en este momento.
        </div>
      )}
      <TournamentsList tournaments={tournaments} />
    </section>
  );
}
