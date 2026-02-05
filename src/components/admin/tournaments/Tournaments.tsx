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
    <section className="w-full mt-10 px-4  relative z-50 pb-14 ">
      <h6 className="text-4xl text-center text-zinc-200 mb-12 xl:text-5xl lg:mb-16">
        Torneos existentes
      </h6>
      <div className="flex flex-wrap items-center justify-center gap-9">
        {[...tournaments].reverse().map((tournament) => (
          <TournamentCard
            key={tournament._id}
            tournament={tournament}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Tournaments;