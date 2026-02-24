import Image from "next/image";
import icon3 from "@/assets/images/iconKnight.svg";
import { TournamentImage } from "@/types/tournament";

interface CardContent {
  title: string;
  tournament_id_lichess: any;
  isActive: boolean;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  images: TournamentImage[];
}

interface CardProps {
  card: CardContent;
  index: number;
}

export default function CardTournament({ card, index }: CardProps) {
  const {
    title,
    startDate,
    endDate,
    location,
    description,
    isActive,
    images,
    tournament_id_lichess,
  } = card;

  const isFirst = index === 0;

  return (
    <div
      className={`text-balance w-[48%] sm:w-47 h-80 border border-zinc-400 z-100 relative cursor-pointer shadow-2xl shadow-sky-700 
      rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between duration-300 group hover:border-white 
      hover:scale-105 md:p-4 md:w-56 md:h-82 lg:p-4 lg:h-87 xl:w-60 xl:h-90 2xl:h-100 2xl:w-62
      ${isFirst ? "bg-sky-600/60" : "bg-zinc-800/40"}
    `}
    >
      <div
        className="absolute inset-0 z-0 rounded-2xl"
        style={{
          backgroundImage: `
          radial-gradient(circle at 50% 100%, #00598a 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, #00598a 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, #27272a 0%, transparent 80%)
        `,
        }}
      />
      <div
        className={`
           w-9 h-9 relative flex items-center justify-center rounded-sm group-hover:rotate-45 duration-500 bg-zinc-100  `}
      >
        <Image
          src={icon3}
          alt="icon-tournament"
          className="w-7 absolute group-hover:-rotate-45 duration-500"
        />
      </div>
      <div
        className={`px-3 absolute top-3 right-2 self-end mt-3 w-fit border-b border-zinc-300 text-sm lg:text-base ${isActive ? "bg-sky-00 text-zinc-200" : "bg-sky-00 text-zinc-100"} `}
      >
        {isActive ? "Activo" : "Finalizado"}
      </div>
      <article className="text-sm flex flex-col gap-1 md:min-h-25 leading-4.5 relative z-100 xl:text-base 2xl:min-h-29 2xl:leading-6">
        <div className="text-lg leading-5 text-zinc-100 2xl:text-xl">
          {title}
        </div>
        <div className="text-zinc-100 italic border-t mt-2 pt-2">
          {description}
        </div>
        <div className="text-zinc-300 ">{location}</div>
        <div className="text-zinc-300  ">
          Inicio : <span className="text-zinc-100">{startDate}</span>{" "}
        </div>
        <div className="border-zinc-400 text-zinc-300 ">
          Fin : <span className="text-zinc-100"> {endDate}</span>
        </div>
        {/*   <Image
            width={100}
            height={100}
            className="w-26  mt-4"
            src={images[0].secure_url}
            alt="image-tournament"
          ></Image> */}
      </article>
    </div>
  );
}
