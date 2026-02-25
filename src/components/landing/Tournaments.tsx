// components/landing/Tournaments.tsx
// NO debe tener "use client" al inicio
import CardTournament from "./ui/layout/CardTournament";
import { formatDate } from "@/lib/dateFormatter";
import { Tournament } from "@/types/tournament";
import ButtonTournaments from "./ui/layout/ButtonTournaments";

interface TournamentsProps {
  data: Tournament[];
}

export default function Tournaments({ data }: TournamentsProps) {
  return (
    <section
      id="tournaments"
      className="w-full min-h-screen flex flex-col gap-12 relative justify-center items-center mt-9 pt-9 pb-12 bg-sky-900 md:h-screen lg:mt-12 lg:pt-12 lg:gap-16 xl:gap-18 lg:px-12 2xl:px-16 2xl:gap-20 3xl:mt-14"
    >
      <div className="min-h-screen w-full absolute inset-0 z-50"></div>
      <article className="flex flex-col pl-4 gap-6 lg:flex-row lg:items-start  lg:px-9 lg:w-full ">
        <h6 className="text-zinc-200 text-[2.6rem] sm:text-5xl font-medium lg:text-7xl lg:leading-12 2xl:text-[5rem] 2xl:leading-11 3xl:text-[5.5rem] ">
          Torneos
        </h6>
        <p className="flex items-center text-zinc-300 max-w-130 text-start border-l-2 border-sky-600 text-sm font-medium pl-3 md:pl-6 py-1 md:leading-6 md:text-lg md:max-w-150 2xl:text-xl lg:py-2 ">
          Consulta aquí la lista de próximos torneos en los que participará.
          Sigue su calendario y mantente al día con su increíble recorrido
          competitivo
        </p>
      </article>

      <div className="w-full z-50 relative flex flex-wrap justify-center items-center gap-x-2 px-1 gap-y-5 max-w-150 sm:gap-x-4 lg:gap-12 lg:max-w-fit">
        {data && data.length > 0 ? (
          data.map((tournament, i) => (
            <CardTournament
              key={tournament._id}
              card={{
                tournament_id_lichess: tournament.tournament_id_lichess,
                title: tournament.title,
                isActive: tournament.isActive,
                startDate: formatDate(tournament.startDate),
                endDate: formatDate(tournament.endDate),
                description: tournament.description || "",
                location: tournament.location,
                images: tournament.images,
              }}
              index={i}
            />
          ))
        ) : (
          <p className="text-zinc-300">No hay torneos disponibles</p>
        )}
      </div>
      <div className=" xl:mt-2 3xl:mt-3">
        <ButtonTournaments />
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #9f9fa9 1px, transparent 1px),
            linear-gradient(to bottom, #9f9fa9 1px, transparent 1px)
          `,
          backgroundSize: "150px 150px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
        }}
      />
    </section>
  );
}
