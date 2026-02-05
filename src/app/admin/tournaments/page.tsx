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
      setTournaments((prev) => [...prev, tournament]);
    }
    setTournamentSelected(null);
  };

  const deleteTournament = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este torneo?")) return;

    await fetch(`/api/tournaments/${id}`, { method: "DELETE" });
    setTournaments((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <>
      <TournamentsForm
        tournamentSelected={tournamentSelected}
        onSaved={handleSaved}
        onCancel={() => setTournamentSelected(null)}
      />

      <Tournaments
        tournaments={tournaments}
        onEdit={setTournamentSelected}
        onDelete={deleteTournament}
      />
    </>
  );
}