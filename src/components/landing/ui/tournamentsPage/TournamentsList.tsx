import type { Tournament } from "@/types/tournament";
import CardTournament from "./CardTournament";

interface TournamentsListProps {
  tournaments: Tournament[];
}

export default function TournamentsList({ tournaments }: TournamentsListProps) {
  if (!tournaments || tournaments.length === 0) {
    return (
      <section className="w-full max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-zinc-500 text-lg xl:text-4xl">
          No hay torneos disponibles por el momento.
        </p>
      </section>
    );
  }

  const active = tournaments.filter((t) => t.isActive);
  const historical = tournaments.filter((t) => !t.isActive);

  return (
    <section
      aria-label="Torneos de Faustino Oro"
      className="w-full max-w-250 mx-auto px-4 pt-10 lg:pt-20  "
    >
      {active.length > 0 && (
        <section>
          <div className="flex items-end py-2 gap-3 mb-9 pl-3 lg:gap-12 lg:pl-12 lg:mb-16 border-l-3 border-sky-600">
            <h6 className="text-zinc-200 text-4xl lg:text-6xl ">
              Torneos activos
            </h6>
            <div className="text-zinc-600 text-xl lg:text-4xl">
              - {active.length} torneo{active.length !== 1 ? "s" : ""} -
            </div>
          </div>
          <ul className="flex flex-col gap-9 lg:gap-14" role="list">
            {active.map((tournament) => (
              <li key={tournament._id}>
                <CardTournament tournament={tournament} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {historical.length > 0 && (
        <section>
        <div className="flex items-end py-2 mt-12 gap-3 mb-9 pl-3 lg:mt-20 lg:gap-12 lg:pl-12 lg:mb-16 border-l-3 border-sky-600">
            <h6 className="text-zinc-200 text-4xl lg:text-6xl ">
              Historial
            </h6>
            <div className="text-zinc-600 text-xl lg:text-4xl">
              - {historical.length} torneo{historical.length !== 1 ? "s" : ""} -
            </div>
          </div>
          <ul className="flex flex-col gap-12" role="list">
            {historical.map((tournament) => (
              <li key={tournament._id}>
                <CardTournament tournament={tournament} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
