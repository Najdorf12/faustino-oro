import Image from "next/image";
import icon3 from "@/assets/images/iconKnight.svg";
import { TournamentImage } from "@/types/tournament";

interface CardContent {
  title: string;
  date: string;
  description: string;
  location: string;
  images: TournamentImage[];
}

interface CardProps {
  card: CardContent; 
  index: number;
}

export default function CardTournament({ card, index }: CardProps) {
  const { title, date, description } = card;

  const isFirst = index === 0;

  return (
    <div
      className={`text-balance w-46 h-80 border border-zinc-400 z-100 relative cursor-pointer  
      rounded-3xl p-3 flex flex-col justify-between duration-300 group 
      hover:scale-105 md:p-4 md:w-56 md:h-82 lg:p-5 lg:h-87 2xl:h-100 2xl:w-62
      ${isFirst ? "bg-sky-600/60" : "bg-zinc-800/40"}
    `}
    >
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
      <div
        className={`
           w-9 h-9 relative flex items-center justify-center rounded-sm group-hover:rotate-45 duration-500
           ${isFirst ? "bg-zinc-100" : "bg-sky-900"}
          `}
      >
        <Image
          src={icon3}
          alt="icon-tournament"
          className="w-7 absolute group-hover:-rotate-45 duration-500"
        />
      </div>

      <article className="text-sm flex flex-col gap-1 md:min-h-25 leading-4.5 relative z-100 2xl:text-base 2xl:min-h-29 2xl:leading-6">
        <div className="text-base leading-5 md:text-lg font-medium text-zinc-100 2xl:text-xl">
          {title}
        </div>
        <div className="border-t pt-3 mt-1 border-zinc-400 text-zinc-300">
          {date}
        </div>
        <div className="text-zinc-300">
          {description}
        </div>
      </article>
    </div>
  );
}