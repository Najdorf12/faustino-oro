// components/landing/Tournaments.tsx
// NO debe tener "use client" al inicio
import CardTournament from "./ui/CardTournament";
import { formatDate } from "@/lib/dateFormatter";
import { Tournament } from "@/types/tournament";
import ButtonTournaments from "./ui/ButtonTournaments";

interface TournamentsProps {
  data: Tournament[];
}

export default function Tournaments({ data }: TournamentsProps) {
  return (
    <section
      id="tournaments"
      className="w-full min-h-screen flex flex-col gap-12 relative justify-center items-center mt-12 py-10 bg-sky-900 md:h-screen lg:mt-0 lg:gap-16 lg:px-12 2xl:px-16 2xl:gap-20"
    >
      <div className="min-h-screen w-full absolute inset-0 z-50"></div>

      <article className="flex flex-col px-6 gap-7 lg:flex-row lg:justify-start lg:w-full">
        <h6 className="text-zinc-200 text-5xl font-medium lg:text-7xl 2xl:text-[5rem] 2xl:leading-11 3xl:text-[5.5rem]">
          Torneos
        </h6>
        <p className="flex items-center text-zinc-300 max-w-175 text-start border-l border-sky-500 text-sm font-medium pl-4 md:pl-6 py-1 md:leading-6 md:text-lg 2xl:text-xl lg:py-2">
          Consulta aquí la lista de próximos torneos en los que participará.
          Sigue su calendario y mantente al día con su increíble recorrido
          competitivo
        </p>
      </article>

      <div className="w-full z-50 relative flex flex-wrap justify-center items-center gap-y-4 gap-x-3 max-w-150 lg:gap-12 lg:max-w-fit">
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
      <div className="xl:mt-2 3xl:mt-3">
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