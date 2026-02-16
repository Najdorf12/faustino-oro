import iconKnight from "@/assets/images/iconKnight.svg";
import Image from "next/image";
import type { Notice } from "@/types/notice";

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
    <li className="flex flex-col gap-2 relative py-2 lg:p-2  ">
      <div className="text-balance bg-linear-to-br from-zinc-700 to-zinc-900/60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50 lg:flex lg:items-stretch lg:w-270 lg:min-h-75 lg:px-4 ">
        {/* Image Section */}
        {notice.images?.length > 0 && (
          <div className="relative w-full h-46 pl-3 lg:h-66 lg:w-1/3 self-center">
            <Image
              src={notice.images[0].secure_url}
              fill
              alt={notice.title}
              className="object-cover w-full h-full lg:rounded-lg"
            />
            {notice.images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
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

        <div className="p-5 md:p-6 lg:w-2/3 flex flex-col justify-center lg:gap-2">
          <div className="mb-3 lg:mb-4">
            <span className="inline-block bg-zinc-700 text-zinc-300 text-sm font-medium px-6 py-0.5 rounded-full lg:px-9 2xl:text-base">
              {notice.category}
            </span>
          </div>

          <h6 className="text-lg md:text-xl text-zinc-100 mb-3 line-clamp-2 leading-tight lg:text-2xl">
            {notice.title}
          </h6>

          <p className="text-zinc-400 text-sm mb-2 leading-relaxed md:text-base">
            {truncateToFirstSentence(notice.description, 120)}
          </p>

          {notice.content && (
            <p className="text-zinc-500 text-sm mb-4 leading-relaxed italic line-clamp-2">
              {truncateToFirstSentence(notice.content, 100)}
            </p>
          )}

          {notice.createdAt && (
            <p className="text-zinc-200 text-sm mb-1">
              {new Date(notice.createdAt).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
