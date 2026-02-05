import Image from "next/image";
import { Notice } from "@/types/notice";

interface Props {
  notice: Notice;
  onEdit: () => void;
  onDelete: () => void;
}

const getTruncatedContent = (content: string): string => {
  const firstSentence = content.split(".")[0];
  return firstSentence ? `${firstSentence}.` : content;
};

export default function NoticeCard({ notice, onEdit, onDelete }: Props) {
  return (
    <div className="text-balance bg-linear-to-br from-zinc-700 to-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600/50 lg:flex lg:items-stretch lg:w-250 lg:min-h-75 lg:px-4">
      {/* Image Section */}
      {notice.images?.length > 0 && (
        <div className="relative w-full h-65  pl-3 lg:w-1/3 self-center ">
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

      <div className="p-5 md:p-6 lg:w-2/3 ">
        <div className="mb-3 lg:mb-4">
          <span className="inline-block bg-zinc-700 text-zinc-300 text-sm font-medium px-6 py-0.5 rounded-full lg:px-9 2xl:text-base">
            {notice.category}
          </span>
        </div>

        <h4 className="text-xl sm:text-2xl font-medium text-zinc-100 mb-3 line-clamp-2 leading-tight">
          {notice.title}
        </h4>
        <p className="text-zinc-400 text-sm sm:text-base mb-3 line-clamp-2 leading-relaxed">
          {notice.description}
        </p>

        {notice.content && (
          <p className="text-zinc-500 text-sm mb-3 leading-relaxed italic">
            {getTruncatedContent(notice.content)}
          </p>
        )}

        {notice.createdAt && (
          <p className="text-zinc-200 text-sm mb-4">
            {new Date(notice.createdAt).toLocaleDateString("es-AR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:mt-6">
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}