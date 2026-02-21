"use client";
import Image from "next/image";
import { Tournament } from "@/types/tournament";
import iconCard from "@/assets/images/iconKnight.svg";

interface TournamentCardProps {
  tournament: Tournament;
  onEdit: (tournament: Tournament) => void;
  onDelete: (id: string) => void;
}

const TournamentCard = ({
  tournament,
  onEdit,
  onDelete,
}: TournamentCardProps) => {
  // Formatear fecha para mostrar
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="text-balance w-full max-w-95 border border-zinc-400 z-100 relative cursor-pointer  
      rounded-3xl p-4 flex flex-col justify-between  duration-300 group 
      hover:scale-105 md:p-4 lg:h-125 lg:p-5"
    >
      <div className="flex justify-between items-center ">
        <div
          className={`
           w-9 h-9  relative flex items-center justify-center rounded-sm bg-zinc-200 group-hover: group-hover:rotate-45 duration-500
           ${tournament.isActive ? "" : ""}
          `}
        >
          <Image
            src={iconCard}
            alt="icon-tournament"
            className="w-7 absolute group-hover:-rotate-45 duration-500"
          ></Image>
        </div>
        <div
          className={`text-sm h-6 flex items-center px-6 font-medium text-zinc-100 rounded-xl ${tournament.isActive ? "bg-green-500" : "bg-zinc-700"}`}
        >
          {`${tournament.isActive ? "Activo" : "Inactivo"}`}
        </div>
      </div>
      <article className="text-sm flex mt-4 flex-col gap-1  relative z-100 lg:mt-5">
        <h6 className="text-xl text-zinc-100 lg:line-clamp-2 lg:text-2xl">
          {tournament.title}
        </h6>
        {tournament.description && (
          <p className="text-zinc-400 text-base font-medium italic">
            {tournament.description}
          </p>
        )}
        <p className="text-zinc-300 mt-1 text-base">{tournament.location}</p>
        <p className="border-t pt-3 mt-2 border-zinc-400 text-zinc-300 text-base">
          Inicio : {formatDate(tournament.startDate)} <br /> Fin :{" "}
          {formatDate(tournament.endDate)}
        </p>

          <p className="text-zinc-400 text-sm mt-1">
            ID Lichess: <span className="text-zinc-100">{tournament.tournament_id_lichess}</span>
          </p>
        {tournament.images && tournament.images.length > 0 && (
          <div className="flex gap-2 mt-4">
            {tournament.images.map((img) => (
              <Image
                key={img.public_id}
                src={img.secure_url}
                alt="Thumbnail"
                width={50}
                height={50}
                className="w-30 h-full object-contain rounded"
              />
            ))}
          </div>
        )}
      </article>
      <div className="flex flex-col gap-2 relative z-50 text-sm font-medium mt-7">
        <button
          onClick={() => onEdit(tournament)}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md whitespace-nowrap cursor-pointer"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(tournament._id!)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md whitespace-nowrap cursor-pointer"
        >
          Eliminar
        </button>
      </div>
      <div
        className="absolute inset-0 z-0 rounded-3xl"
        style={{
          backgroundImage: `
          radial-gradient(circle at 50% 100%, #00598a 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, #00598a 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, #27272a 0%, transparent 80%)
        `,
        }}
      />
    </div>
  );
};

export default TournamentCard;
