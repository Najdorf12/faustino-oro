"use client";
import { Tournament } from "@/types/tournament";
import TournamentCard from "./TournamentCard";

interface TournamentsProps {
  tournaments: Tournament[];
  onEdit: (tournament: Tournament) => void;
  onDelete: (id: string) => void;
}

const Tournaments = ({ tournaments, onEdit, onDelete }: TournamentsProps) => {
  return (
    <section className="relative w-full z-100 self-center flex flex-col justify-center items-center px-3 sm:px-4 mt-2 lg:mt-6 lg:px-0 pb-20 lg:pb-32">
      <div className="w-full flex flex-col justify-center items-center gap-9 lg:gap-14  max-w-7xl">
        <h6 className=" border-l-2 border-sky-700 pl-3 py-2 text-3xl md:text-4xl text-zinc-200 lg:ml-5 xl:text-5xl  self-start">
          Torneos existentes
        </h6>
        <div className="flex flex-wrap max-w-7xl items-center justify-center gap-y-6 w-full items md:gap-x-12 md:gap-y-9">
          {[...tournaments].map((tournament) => (
            <TournamentCard
              key={tournament._id}
              tournament={tournament}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tournaments;
