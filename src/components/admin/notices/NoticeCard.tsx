import Image from "next/image";
import { Notice } from "@/types/notice";
import Link from "next/link";
interface Props {
  notice: Notice;
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoticeCard({ notice, onEdit, onDelete }: Props) {
  return (
    <div className=" border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-200 transition-all duration-500 flex flex-col">
      {/* Imagen */}
      {notice.images &&
        notice.images.length > 0 &&
        notice.images[0].secure_url && (
          <div className="relative h-64 w-full">
            <Image
              src={notice.images[0].secure_url}
              alt={notice.title}
              fill
              className="object-cover"
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

      {/* Contenido */}
      <div className="py-6 px-3 text-balance flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-zinc-200 bg-sky-700 px-4 py-0.5 rounded-sm">
            {notice.category}
          </span>
          {notice.createdAt && (
            <span className="text-zinc-500 text-sm">
              {new Date(notice.createdAt).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <h2 className="text-xl sm:text-2xl sm:leading-8 text-zinc-200 mb-4 group-hover:text-sky-400 transition-colors line-clamp-2">
          {notice.title}
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 line-clamp-2 mb-2">
          {notice.description}
        </p>
        <p className="text-sm sm:text-base text-zinc-500 line-clamp-2">
          {notice.content}
        </p>

        {/* Botón "Leer más" — decorativo, igual al del sitio web */}
        
        <Link
          href={`/notices/${notice._id}`}
          className="self-start mt-6 mb-3 ml-3 bg-sky-700 border border-sky-500 cursor-pointer z-100 w-48 rounded-lg h-8.75 relative text-zinc-100 md:font-medium flex items-center pl-3 group lg:w-54 lg:ml-0 lg:mb-3"
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

        {/* Botones admin */}
        <div className="flex flex-col text-sm sm:flex-row gap-2 sm:gap-3 mt-auto border-t border-zinc-700 pt-4">
          <button
            onClick={onEdit}
            className="flex-1 bg-sky-800/80 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded-sm transition-colors duration-200 cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-700 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-sm transition-colors duration-200 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}