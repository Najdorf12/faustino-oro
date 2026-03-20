import iconKnight from "@/assets/images/iconKnight.svg";
import Image from "next/image";
import type { Notice } from "@/types/notice";
import Link from "next/link";

interface CardNoticeProps {
  notice: Notice;
  onClick: () => void;
}

// Función auxiliar para truncar texto
function truncateToFirstSentence(
  text: string,
  maxLength: number = 150,
): string {
  if (!text) return "";

  // Buscar el primer punto seguido de espacio o fin de línea
  const firstPeriodIndex = text.search(/\.\s|\.$/);

  if (firstPeriodIndex !== -1) {
    // Si encontramos un punto, devolver hasta ahí (incluyendo el punto)
    return text.substring(0, firstPeriodIndex + 1);
  }

  // Si no hay punto, truncar por longitud máxima
  if (text.length > maxLength) {
    return text.substring(0, maxLength).trim() + "...";
  }

  return text;
}

export default function CardNoticeLayout({ notice, onClick }: CardNoticeProps) {
  return (
    <li className="flex flex-col gap-2 relative lg:pl-10">
      <div className="group cursor-pointer text-balance  border-b border-zinc-600 to-zinc rounded-lg overflow-hidden transition-all duration-300  hover:shadow-zinc-300 lg:flex lg:items-stretch max-w-90 lg:max-w-240 lg:w-270 lg:min-h-70 lg:px-4 3xl:w-300 3xl:max-w-300 3xl:min-h-90 ">
        {notice.images?.length > 0 && (
          <div className="relative w-full h-48 pl-3 lg:h-70 xl:h-72 lg:w-2/5 self-center 3xl:h-80">
            <Image
              src={notice.images[0].secure_url}
              fill
              alt={notice.title}
              className="object-cover w-full h-full lg:rounded-lg border-b-2 rounded-b-lg border-zinc-400 lg:border-2"
            />
            {notice.images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-zinc-800/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                +{notice.images.length - 1} más
              </div>
            )}
            {!notice.isActive && (
              <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                Inactiva
              </div>
            )}
          </div>
        )}

        <div className="p-4 md:p-6 lg:pr-0 lg:w-2/3 flex flex-col justify-center lg:gap-2 lg:pl-7 xl:pl-8 lg:justify-start ">
          <div className="mb-4 lg:mb-3">
            <span className="inline-block border border-sky-500 bg-sky-700 text-zinc-200 text-xs md:text-sm font-medium px-6 py-0.5 rounded-sm lg:px-9 2xl:text-base">
              {notice.category}
            </span>
          </div>

          <h6 className="text-lg md:text-xl text-zinc-500 mb-2 line-clamp-2 leading-tight lg:mb-3 lg:text-2xl xl:text-[1.7rem] 2xl:text-3xl 3xl:text-[2rem]">
            {notice.title}
          </h6>

          <p className="text-zinc-400 text-sm mb-1 leading-relaxed md:text-base lg:text-lg lg:leading-6">
            {truncateToFirstSentence(notice.description, 120)}
          </p>

          {notice.content && (
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed italic line-clamp-2 lg:text-base lg:leading-6">
              {truncateToFirstSentence(notice.content, 100)}
            </p>
          )}

          {notice.createdAt && (
            <p className="text-zinc-500 text-sm lg:text-base">
              {new Date(notice.createdAt).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
        <Link
          href={`/notices/${notice._id}`}
          className="self-end mb-3 ml-3 bg-sky-700 border border-sky-500 cursor-pointer z-100 w-48 rounded-lg h-8.75 relative text-zinc-100 md:font-medium flex items-center pl-3 group lg:w-54 lg:ml-0 lg:mb-3"
        >
          <p className="">Leer más</p>
          <div className="bg-sky-600 cursor-pointer rounded-lg h-8.5 w-8.5 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="w-[1.2em] transition-transform duration-300 text-zinc-100 group-hover:translate-x-[0.1em]"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              ></path>
            </svg>
          </div>
        </Link>
      </div>
    </li>
  );
}
