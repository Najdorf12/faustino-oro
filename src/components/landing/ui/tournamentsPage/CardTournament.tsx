"use client";

import { useState } from "react";
import { Tournament } from "@/types/tournament";
import { LichessPlayer } from "@/types/lichess";
import Image from "next/image";
import iconTournamentCard from "@/assets/images/icons/iconKnight.svg";
interface Props {
  tournament: Tournament;
}

export default function CardTournament({ tournament }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<LichessPlayer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  const fetchPlayer = async () => {
    if (!tournament.tournament_id_lichess) return;

    if (fetched) {
      setExpanded((prev) => !prev);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/lichess-player/${tournament.tournament_id_lichess}`,
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al obtener datos");
      } else {
        setPlayer(data);
      }
    } catch {
      setError("Error de red al conectar con Lichess");
    } finally {
      setFetched(true);
      setExpanded(true);
      setLoading(false);
    }
  };

  const startDate = new Date(tournament.startDate).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const endDate = new Date(tournament.endDate).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <section className="border-2 shadow-xl shadow-zinc-700 border-zinc-600 rounded-xl  bg-zinc-700 relative">
        <button
          onClick={fetchPlayer}
          disabled={loading}
          className="absolute bottom-3 left-2 lg:inset-auto lg:bottom-3 lg:right-2 bg-sky-600 cursor-pointer z-100 w-48 rounded-lg h-9 text-zinc-100 font-medium flex items-center pl-3 group lg:w-50 "
        >
          {loading ? "Cargando..." : expanded ? "Ocultar" : "Ver performance"}

          <div className="bg-zinc-200 cursor-pointer rounded-lg h-9 w-9 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="w-[1.2em] transition-transform duration-300 text-zinc-600 group-hover:translate-x-[0.1em]"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              ></path>
            </svg>
          </div>
        </button>

        <figure className="absolute inset-0 flex items-end mb-3 justify-end z-10 md:justify-center md:items-center">
          <Image
            src={iconTournamentCard}
            alt="icon-tournament-card"
            className="w-16 lg:w-32"
          />
        </figure>
        {/* CABECERA */}
        <div className="relative  z-50 rounded-l-lg  gap-4 pt-6 pb-16 px-3 lg:w-1/2 bg-zinc-800/70 lg:pt-5 lg:pb-5 lg:px-4.5">
          <div className="flex w-fit px-3 rounded-sm bg-sky-600">
            {tournament.isActive && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-200 lg:text-base">
                Próximamente
              </span>
            )}
          </div>
          <ul className="flex flex-col text-zinc-400 xl:text-lg">
            <h6 className="text-2xl font-medium text-zinc-100 mt-3 lg:text-3xl">
              {tournament.title}
            </h6>
            <li className="text-zinc-400 mt-2 mb-10">
              {tournament.description}
            </li>
            <figure className=" ">
              <Image
                src={tournament.images[0].secure_url}
                width={100}
                height={100}
                alt="icon-tournament-card"
                className="object-contain lg:w-40 lg:h-20 "
              />
            </figure>
            <li className="mt-3 text-zinc-400">{tournament.location}</li>
            <li className="mt-2">
              Inicio : <span className="text-zinc-200">{startDate}</span>
            </li>
            <li>
              Fin : <span className="text-zinc-200">{endDate}</span>
            </li>
          </ul>
        </div>

        {/* PANEL EXPANDIDO */}
        {expanded && (
          <div className="border-t border-zinc-700  space-y-4 ">
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {!player && !error && !loading && (
              <p className="text-zinc-500 text-sm">
                No hay datos disponibles en Lichess para este torneo.
              </p>
            )}
          </div>
        )}
      </section>
      {player && (
        <>
          {/* STATS */}
          <div className="grid grid-cols-4 gap-3 text-center ">
            <Stat label="Rank" value={`#${player.rank}`} />
            <Stat label="Score" value={player.score} />
            <Stat label="Perf" value={player.performance} />
            <Stat
              label="Δ Rating"
              value={
                player.ratingDiff >= 0
                  ? `+${player.ratingDiff}`
                  : player.ratingDiff
              }
              highlight={player.ratingDiff >= 0 ? "positive" : "negative"}
            />
          </div>

          {/* PARTIDAS */}
          {player.games.length > 0 && (
            <div className="space-y-2 bg-zinc-800">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium">
                Partidas ({player.played})
              </p>
              {player.games.map((g) => (
                <div
                  key={g.id}
                  className="flex justify-between items-center 
                       px-3 py-2 rounded-lg text-sm"
                >
                  <span className="text-zinc-300 flex items-center gap-2">
                    {g.color === "white" ? "⚪" : "⚫"}
                    <span>
                      {g.opponent.title && (
                        <span className="text-yellow-400 mr-1">
                          {g.opponent.title}
                        </span>
                      )}
                      {g.opponent.name}
                    </span>
                    <span className="text-zinc-500">({g.opponent.rating})</span>
                  </span>
                  <span
                    className={
                      g.points === "1"
                        ? "text-emerald-400 font-semibold"
                        : g.points === "0"
                          ? "text-red-400 font-semibold"
                          : "text-zinc-300 font-semibold"
                    }
                  >
                    {g.points === "1"
                      ? "Ganó"
                      : g.points === "0"
                        ? "Perdió"
                        : "½"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: any;
  highlight?: "positive" | "negative";
}) {
  return (
    <div
      className="
     rounded-lg p-2 bg-sky-500 mt-6"
    >
      <div className="text-lg text-zinc-100 mb-0.5 lg:text-xl">{label}</div>
      <div
        className={`text-lg font-semibold lg:text-xl ${
          highlight === "positive"
            ? "text-emerald-400"
            : highlight === "negative"
              ? "text-red-400"
              : "text-zinc-100"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
