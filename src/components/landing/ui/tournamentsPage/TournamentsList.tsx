"use client";
import { useState, useMemo } from "react";
import type { Tournament } from "@/types/tournament";
import CardTournament from "./CardTournament";

interface TournamentsListProps {
  tournaments: Tournament[];
}

export default function TournamentsList({ tournaments }: TournamentsListProps) {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");

  // Años únicos extraídos de los datos, orden descendente
  const years = useMemo(() => {
    const set = new Set(
      tournaments.map((t) => new Date(t.startDate).getFullYear().toString()),
    );
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [tournaments]);

  // Filtrado en memoria
  const filtered = useMemo(() => {
    return tournaments.filter((t) => {
      const matchesYear =
        yearFilter === "all" ||
        new Date(t.startDate).getFullYear().toString() === yearFilter;
      const matchesSearch =
        search.trim() === "" ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.location?.toLowerCase().includes(search.toLowerCase());
      return matchesYear && matchesSearch;
    });
  }, [tournaments, search, yearFilter]);

  // Estas derivaciones ahora usan `filtered`, no `tournaments`
  const active = filtered.filter((t) => t.isActive);
  const historical = filtered.filter((t) => !t.isActive);
  const lastPlayed = historical[0] ?? null;
  const historicalList =
    active.length === 0 && lastPlayed ? historical.slice(1) : historical;

  const isFiltering = search.trim() !== "" || yearFilter !== "all";

  if (!tournaments || tournaments.length === 0) {
    return (
      <section className="w-full max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-zinc-500 text-lg xl:text-4xl">
          No hay torneos disponibles por el momento.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Torneos de Faustino Oro"
      className="w-full max-w-250 mx-auto px-4 pt-14 lg:pt-20 "
    >
      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-3 mb-10 px-3 lg:px-12 ">
        <input
          type="text"
          placeholder="Buscar torneo o ciudad..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-sky-600 flex-1"
        />
        <div className="relative">
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="appearance-none bg-sky-800 border border-sky-600 rounded-lg pl-4 lg:pl-6 lg:pr-14 py-2 text-zinc-200 focus:outline-none focus:border-sky-600 cursor-pointer w-full"
          >
            <option value="all">Todos los años</option>
            {years.map((y) => (
              <option
                className="bg-sky-900 cursor-pointer rounded-3xl"
                key={y}
                value={y}
              >
                {y}
              </option>
            ))}
          </select>

          {/* Flecha custom */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center ">
            <svg
              className="w-5 h-5 text-zinc-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* SIN RESULTADOS al filtrar */}
      {isFiltering && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-500 text-lg">
            No se encontraron torneos con ese criterio.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setYearFilter("all");
            }}
            className="mt-4 text-sky-500 hover:text-sky-400 text-sm cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* TORNEOS ACTIVOS o ÚLTIMO JUGADO — se oculta si hay filtros activos */}
      {!isFiltering &&
        (active.length > 0 ? (
          <section className="">
            <div className="flex items-end py-2 gap-3 mb-9 pl-3 lg:gap-12 lg:pl-12 lg:mb-14 border-l-3 border-sky-600">
              <h6 className="text-zinc-200 text-nowrap text-3xl sm:text-4xl lg:text-6xl">
                Torneos activos
              </h6>
              <div className="text-zinc-600 text-lg sm:text-xl lg:text-4xl">
                / {active.length} torneo{active.length !== 1 ? "s" : ""} /
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
        ) : lastPlayed ? (
          <section className="lg:py-6">
            <div className=" flex items-end py-2 gap-3 mb-9 pl-3 lg:gap-12 lg:pl-12 lg:mb-14 border-l-3 border-sky-600">
              <h6 className="text-zinc-200 text-nowrap text-3xl sm:text-4xl lg:text-6xl ">
                Último jugado
              </h6>
              <div className="text-zinc-600 text-lg sm:text-xl lg:text-4xl">
                / 1 torneo /
              </div>
            </div>
            <ul className="flex flex-col gap-9 lg:gap-14" role="list">
              <li key={lastPlayed._id}>
                <CardTournament tournament={lastPlayed} />
              </li>
            </ul>
          </section>
        ) : null)}

      {/* HISTORIAL — cuando hay filtros, muestra todos los resultados juntos */}
      {(isFiltering ? filtered : historicalList).length > 0 && (
        <section className="lg:py-4">
          <div className="flex items-end py-2 gap-3 mt-10 mb-9 pl-3 lg:gap-12 lg:pl-12 lg:mt-2 lg:mb-14 border-l-3 border-sky-600">
            <h6 className="text-zinc-200 text-3xl sm:text-4xl lg:text-6xl">
              {isFiltering ? "Resultados" : "Historial"}
            </h6>
            <div className="text-zinc-600 text-lg sm:text-xl lg:text-4xl">
              / {(isFiltering ? filtered : historicalList).length} torneo
              {(isFiltering ? filtered : historicalList).length !== 1
                ? "s"
                : ""}{" "}
              /
            </div>
          </div>
          <ul className="flex flex-col gap-9 lg:gap-14" role="list">
            {(isFiltering ? filtered : historicalList).map((tournament) => (
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
