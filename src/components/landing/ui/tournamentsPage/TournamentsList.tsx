import type { Tournament } from "@/types/tournament";
import CardTournament from "./CardTournament";

interface TournamentsListProps {
  tournaments: Tournament[];
}

export default function TournamentsList({ tournaments }: TournamentsListProps) {
  if (!tournaments || tournaments.length === 0) {
    return (
      <section className="w-full max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-zinc-500 text-lg xl:text-4xl">No hay torneos disponibles por el momento.</p>
      </section>
    );
  }

  const active = tournaments.filter((t) => t.isActive);
  const historical = tournaments.filter((t) => !t.isActive);

  return (
    <section
      aria-label="Torneos de Faustino Oro"
      className="w-full max-w-230 mx-auto px-4 sm:px-6 py-16 space-y-14 "
    >
      {active.length > 0 && (
        <section>
          <div className="flex flex-col justify-center items-center text-center gap-6 mb-9 lg:mb-12">
            <h6 className="text-zinc-200  text-xl lg:text-6xl ">
              Torneos activos
            </h6>
            <div className=" text-zinc-600 text-sm lg:text-3xl ">- {active.length} torneo{active.length !== 1 ? "s" : ""} -</div>
          </div>
          <ul className="flex flex-col gap-9" role="list">
            {active.map((tournament) => (
              <li key={tournament._id}>
                <CardTournament tournament={tournament} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {historical.length > 0 && (
        <div>
           <header className="flex items-end gap-6 mb-9 mt-14 lg:mb-12">
            <h6 className="text-zinc-200 text-xl lg:text-5xl ">
              Historial de Torneos
            </h6>
            <div className="ml-auto text-zinc-600 text-sm lg:text-2xl">- {historical.length} torneo{historical.length !== 1 ? "s" : ""} -</div>
          </header>
          <ul className="flex flex-col gap-12" role="list">
            {historical.map((tournament) => (
              <li key={tournament._id}>
                <CardTournament tournament={tournament} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}