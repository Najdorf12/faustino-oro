"use client";

import { useEffect, useState } from "react";
import { Tournament } from "@/types/tournament";
import TournamentsForm from "@/components/admin/tournaments/TournamentForm";
import Tournaments from "@/components/admin/tournaments/Tournaments";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentSelected, setTournamentSelected] =
    useState<Tournament | null>(null);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const res = await fetch("/api/tournaments");
    const data = await res.json();
    setTournaments(data);
  };

  const handleSaved = (tournament: Tournament, isEdit: boolean) => {
    if (isEdit) {
      setTournaments((prev) =>
        prev.map((t) => (t._id === tournament._id ? tournament : t)),
      );
    } else {
      setTournaments((prev) => [tournament, ...prev]);
    }
    setTournamentSelected(null);
  };

  const deleteTournament = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este torneo?")) return;

    await fetch(`/api/tournaments/${id}`, { method: "DELETE" });
    setTournaments((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <section>
      <div className="relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #3f3f46 1px, transparent 1px),
        linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
      `,
            backgroundSize: "150px 150px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <TournamentsForm
          tournamentSelected={tournamentSelected}
          onSaved={handleSaved}
          onCancel={() => setTournamentSelected(null)}
        />
      </div>

      <Tournaments
        tournaments={tournaments}
        onEdit={setTournamentSelected}
        onDelete={deleteTournament}
      />
    </section>
  );
}
