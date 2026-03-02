"use client";

import { useState } from "react";
import { Tournament } from "@/types/tournament";
import { LichessPlayer } from "@/types/lichess";
import Image from "next/image";
import iconTournamentCard from "@/assets/images/icons/iconKnight.svg";
import imgAlternative from "@/assets/images/img10.webp";
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
    timeZone: "UTC", // 👈
  });
  const endDate = new Date(tournament.endDate).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC", // 👈
  });

  return (
    <>
      <section className="border-2 border-zinc-600 rounded-lg w-full relative">
        <div
          className="absolute inset-0 z-0 rounded-lg"
          style={{
            backgroundImage: `
          radial-gradient(circle at 50% 100%, #00598a 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, #00598a 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, #27272a 0%, transparent 80%)
        `,
          }}
        />
        {tournament.tournament_id_lichess && (
          <button
            onClick={fetchPlayer}
            disabled={loading}
            className="absolute bottom-3.5 left-4 lg:inset-auto lg:bottom-3 lg:right-2 bg-sky-700 cursor-pointer z-120 w-48 rounded-lg h-9 text-zinc-100 lg:font-medium text-sm sm:text-base flex items-center pl-3 group lg:w-50 "
          >
            {loading ? "Cargando..." : expanded ? "Ocultar" : "Ver performance"}

            <div className="bg-zinc-200 cursor-pointer rounded-lg h-9 w-9 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="w-[1.2em] transition-transform duration-300 text-zinc-500 group-hover:translate-x-[0.1em]"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </div>
          </button>
        )}
        <figure className="absolute inset-0 flex items-end mb-3 justify-end z-100 lg:z-10 md:justify-center md:items-center">
          <Image
            src={iconTournamentCard}
            alt="icon-tournament-card"
            className="w-14 lg:w-32"
          />
        </figure>

        {/* CABECERA */}
        <div className="relative  z-50 rounded-lg gap-4 pt-4.5 pb-17 px-4 lg:w-1/2 bg-zinc-800/40 lg:bg-zinc-800/70 lg:pt-5 lg:pb-5 lg:px-5">
          <div className="flex w-fit ">
            {tournament.isActive ? (
              <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-200 py-0.5 px-6 rounded-sm bg-sky-600 lg:text-base">
                Próximamente
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-medium  text-zinc-200 py-0.5 px-6 rounded-sm bg-sky-800 lg:text-base lg:px-10">
                Finalizado
              </span>
            )}
          </div>
          <ul className="flex flex-col text-zinc-400 text-base sm:text-lg text-balance">
            <h6 className="text-2xl lg:font-medium text-zinc-100 mt-4 lg:text-3xl">
              {tournament.title}
            </h6>
            <li className="text-zinc-400 mt-2 mb-12 italic lg:text-xl">
              {tournament.description}
            </li>
            {tournament.images.length > 0 ? (
              <figure className="w-34 lg:w-40 h-16 lg:h-20">
                <Image
                  src={tournament.images[0].secure_url}
                  width={100}
                  height={100}
                  alt="icon-tournament-card"
                  className="object-cover w-full h-full rounded-sm border border-zinc-700"
                />
              </figure>
            ) : (
              <figure className=" w-34 lg:w-40 h-16 lg:h-20">
                <div className="w-full h-full bg-zinc-700 rounded-sm text-zinc-500 text-xs p-2">
                  Image not found
                </div>
              </figure>
            )}

            <li className="mt-4 border-t pt-2 text-zinc-400">
              {tournament.location}
            </li>
            <li className="mt-1">
              Inicio : <span className="text-zinc-200">{startDate}</span>
            </li>
            <li className="mt-1">
              Fin : <span className="text-zinc-200">{endDate}</span>
            </li>
          </ul>
        </div>
      </section>
      {/* PANEL EXPANDIDO */}
      {expanded && (error || (!player && !loading)) && (
        <div className="mt-2 border rounded-lg border-zinc-700 px-4 py-3">
          <p className="text-zinc-500 text-sm text-balance flex gap-2 items-start justify-center">
           <span className="text-red-500 border rounded-full px-2">!</span> No hay datos disponibles en Lichess para este torneo.
          </p>
        </div>
      )}
      {player && expanded && (
        <>
          {/* STATS */}
          <div className="grid grid-cols-4 gap-2 text-center ">
            <Stat
              label="Rank"
              value={player.rank ? `#${player.rank}` : "N/A"}
            />
            <Stat label="Score" value={player.score ?? "N/A"} />
            <Stat label="Perf" value={player.performance ?? "N/A"} />
            <Stat
              label="Rating"
              value={
                player.ratingDiff == null
                  ? "N/A"
                  : player.ratingDiff >= 0
                    ? `+${player.ratingDiff}`
                    : player.ratingDiff
              }
              highlight={
                player.ratingDiff == null
                  ? undefined
                  : player.ratingDiff >= 0
                    ? "positive"
                    : "negative"
              }
            />
          </div>

          {/* PARTIDAS */}
          {player.games.length > 0 && (
            <div className="space-y-2 mt-6 border rounded-lg border-zinc-700 pt-3 px-2 lg:pt-4 lg:px-4">
              <p className="text-base text-zinc-500 uppercase tracking-wide font-medium lg:text-lg 3xl:text-xl">
                Partidas ({player.played})
              </p>
              {player.games.map((g) => (
                <div
                  key={g.id}
                  className="flex border-b border-zinc-700 justify-between items-center 
                       px-1  py-2 text-sm md:px-3 lg:text-base 3xl:text-lg"
                >
                  <span className="text-zinc-200 flex items-center gap-2">
                    {g.color === "white" ? "⚪" : "⚫"}
                    <span>
                      {g.opponent.title && (
                        <span className="text-yellow-400 mr-1">
                          {g.opponent.title}
                        </span>
                      )}
                      {g.opponent.name}
                    </span>
                    <span className="text-zinc-400">({g.opponent.rating})</span>
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
     rounded-lg p-2 bg-linear-to-br from-sky-600 border border-sky-600 to-zinc-900 mt-9"
    >
      <div className="text-base text-zinc-100  lg:text-xl">{label}</div>
      <div
        className={`text-base lg:text-xl ${
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
