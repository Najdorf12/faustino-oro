"use client";
import imgStats2 from "@/assets/images/img6-2.jpg";
import iconRapid from "@/assets/images/icons/rapid.svg";
import iconBlitz from "@/assets/images/icons/blitz.svg";
import icon2 from "@/assets/images/icons/iconKnight.svg";
import iconStandar from "@/assets/images/icons/standar.svg";

import {
  ButtonStats,
  ButtonInfo,
  ButtonProgress,
} from "@/components/landing/ui/tournamentsPage/fideStats/ButtonStats";
import ProgressView from "./ProgressView";
import StatsView from "./StatsView";

import Image from "next/image";
import type { FideResponse } from "@/types/fidePlayer";
import type { FideStats } from "@/types/fideStats";
import { useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function FidePlayer({
  fide,
  stats,
}: {
  fide: FideResponse;
  stats: FideStats;
}) {
  type ViewMode = "info" | "progress" | "stats";
  const [view, setView] = useState<ViewMode>("info");

  return (
    <section className="w-full relative pt-12 flex flex-col md:pt-0 md:h-screen md:flex-row overflow-hidden ">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3f3f46 1px, transparent 1px),
            linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
          `,
          backgroundSize: "140px 140px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
        }}
      />

      {/* CONTAINER 25% */}
      <div className="relative z-50 w-full h-full flex flex-col-reverse items-center justify-start md:w-[25%] bg-zinc-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-zinc-800/70"></div>
          <Image
            src={imgStats2}
            alt="img-stats"
            className="w-full h-full object-cover lg:rounded-br-lg"
          />
        </div>
      </div>

      {/* CONTAINER 75% */}
      <div className="w-full flex flex-col items-center justify-between  px-3 md:w-[75%] md:px-6 md:pb-6 lg:pt-9 3xl:pt-12 3xl:px-10 ">
        <div className="flex flex-col gap-5 md:flex-row md:gap-12">
          <ButtonInfo
            active={view === "info"}
            onClick={() => setView("info")}
          />
          <ButtonProgress
            active={view === "progress"}
            onClick={() => setView("progress")}
          />
          <ButtonStats
            active={view === "stats"}
            onClick={() => setView("stats")}
          />
        </div>

        {/* CONTENIDO DINÁMICO */}
        {view === "info" && <InfoView fide={fide} stats={stats} />}
        {view === "progress" && <ProgressView history={fide.history} />}
        {view === "stats" && <StatsView stats={stats} />}
      </div>
    </section>
  );
}

function InfoView({ fide, stats }: { fide: FideResponse; stats: FideStats }) {
  return (
    <>
      {/* ELO */}
      <ul className="relative z-50 flex justify-center gap-4 mt-12 text-zinc-600 font-medium w-full text-xl md:mt-0 lg:text-2xl xl:gap-20  ">
        <li className="flex flex-col items-center justify-center gap-2 3xl:gap-3">
          <Image
            src={iconStandar}
            alt="icon-standar"
            className="w-8 lg:w-9 3xl:w-12"
          />
          <span className="border-9 rounded-full w-26 h-26 sm:w-28 sm:h-28 bg-zinc-800 md:w-32 md:h-32 flex justify-center items-center border-zinc-700 text-zinc-200 text-2xl md:text-4xl 3xl:text-5xl 3xl:w-40 3xl:h-40">
            {fide.classical_rating}
          </span>
          <div className="flex gap-2 self-center flex-col justify-center items-center">
            STANDAR
          </div>
        </li>
        <li className="flex flex-col items-center justify-center gap-2 3xl:gap-3">
          <Image
            src={iconRapid}
            alt="icon-standar"
            className="w-8 lg:w-9 3xl:w-12"
          />
          <span className="border-9 rounded-full w-26 h-26 sm:w-28 sm:h-28 bg-zinc-800 md:w-32 md:h-32 flex justify-center items-center border-zinc-700 text-zinc-200 text-2xl md:text-4xl 3xl:text-5xl 3xl:w-40 3xl:h-40">
            {fide.rapid_rating}
          </span>
          <div className="flex gap-2 self-center flex-col justify-center items-center">
            RAPID
          </div>
        </li>
        <li className="flex flex-col items-center justify-center gap-2 3xl:gap-3">
          <Image
            src={iconBlitz}
            alt="icon-standar"
            className="w-8 lg:w-9 3xl:w-12"
          />
          <span className="border-9 rounded-full w-26 h-26 sm:w-28 sm:h-28 bg-zinc-800 md:w-32 md:h-32 flex justify-center items-center border-zinc-700 text-zinc-200 text-2xl md:text-4xl 3xl:text-5xl 3xl:w-40 3xl:h-40">
            {fide.blitz_rating}
          </span>
          <div className="flex gap-2 self-center flex-col justify-center items-center">
            BLITZ
          </div>
        </li>
      </ul>

      {/* TITLES */}
      <div className="w-full flex flex-col mt-9 md:mt-0">
        <h6 className="text-zinc-600 text-xl font-medium lg:text-2xl">
          Títulos
        </h6>
        <ul className="flex flex-col gap-1 mt-2 lg:mt-3">
          {stats.titles.map((title, i) => (
            <li
              key={i}
              className="text-lg text-zinc-300 flex justify-between w-full md:w-90 lg:text-xl lg:w-100"
            >
              {title.name}
              <span className="text-zinc-200">{title.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* RANKS */}
      <ul className="flex flex-col lg:flex-row w-full gap-4 rounded-lg font-medium mt-12 md:mt-0">
        <div className="text-lg md:text-xl py-3 px-4 text-zinc-300 rounded-lg border border-sky-600 bg-linear-to-tl from-zinc-800 to-sky-700 w-full relative 3xl:py-5 3xl:text-2xl">
          <Image
            src={icon2}
            alt="icon-4"
            className="w-8 absolute top-3.5 right-1"
          />
          WORLD RANK
          <li className="mt-9 flex justify-between md:mt-12">
            Active players
            <span className="text-zinc-100">{fide.world_rank_active}</span>
          </li>
          <li className="flex justify-between">
            All players
            <span className="text-zinc-100">{fide.world_rank_all}</span>
          </li>
        </div>
        <div className="text-lg md:text-xl py-3 px-4 text-zinc-300 rounded-lg border border-sky-600 bg-linear-to-tl from-zinc-800 to-sky-700 w-full relative 3xl:py-5 3xl:text-2xl">
          <Image
            src={icon2}
            alt="icon-4"
            className="w-8 absolute top-3.5 right-1"
          />
          NATIONAL RANK
          <li className="mt-9 flex justify-between md:mt-12">
            Active players
            <span className="text-zinc-100">{fide.national_rank_active}</span>
          </li>
          <li className="flex justify-between">
            All players
            <span className="text-zinc-100">{fide.national_rank_all}</span>
          </li>
        </div>
        <div className="text-lg md:text-xl py-3 px-4 text-zinc-300 border border-sky-600 bg-linear-to-tl from-zinc-800 to-sky-700 w-full rounded-lg relative 3xl:py-5 3xl:text-2xl">
          <Image
            src={icon2}
            alt="icon-4"
            className="w-8 absolute top-3.5 right-1"
          />
          CONTINENTAL RANK
          <li className="mt-9 flex justify-between md:mt-12">
            Active players
            <span className="text-zinc-100">
              {fide.continental_rank_active}
            </span>
          </li>
          <li className="flex justify-between">
            All players
            <span className="text-zinc-100">{fide.continental_rank_all}</span>
          </li>
        </div>
      </ul>
    </>
  );
}
