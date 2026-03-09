"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  "Todas",
  "Eventos",
  "Logros",
  "Clásicas",
  "Rápidas - Blitz",
];

const NOTICES_PER_PAGE = 9;

export default function NoticesGrid({ notices }: { notices: any[] }) {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeCategory === "Todas") return notices;
    return notices.filter((n) => n.category === activeCategory);
  }, [notices, activeCategory]);

  const totalPages = Math.ceil(filtered.length / NOTICES_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * NOTICES_PER_PAGE;
    return filtered.slice(start, start + NOTICES_PER_PAGE);
  }, [filtered, currentPage]);

  function handleCategory(cat: string) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  function handlePage(page: number) {
    setCurrentPage(page);
    // Scroll suave hacia arriba del grid
    document
      .getElementById("allnotices")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      id="allnotices"
      className="w-full min-h-screen bg-zinc-800 py-10 px-4 relative pb-20 lg:py-16 lg:pb-32"
    >
      <div className="absolute z-200 bottom-0.5 left-0 text-zinc-600 w-full flex items-center justify-center text-sm md:text-base 2xl:text-lg">
        © Faustino Oro
      </div>

      <div className="max-w-7xl mx-auto 3xl:max-w-350">
        {/* Título */}
        <h6 className="text-zinc-200 text-[2rem] sm:text-4xl lg:text-6xl border-l-3 border-sky-700 py-2 pl-4 lg:pl-6 mb-8 lg:mb-12 3xl:text-7xl">
          Todas las noticias
        </h6>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-2 mb-9 max-w-70 md:max-w-max lg:mb-10 xl:mb-14 xl:gap-3 ">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`
                px-5 py-1.5 rounded-sm text-sm font-medium border transition-all duration-300 cursor-pointer lg:px-7 xl:px-9 lg:text-base 3xl:text-lg
                ${
                  activeCategory === cat
                    ? "bg-sky-700 border-sky-600 text-zinc-100"
                    : "bg-transparent border-zinc-600 text-zinc-400 hover:border-zinc-400 hover:text-zinc-200"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contador de resultados */}
   {/*       <p className="text-zinc-500 text-sm mb-4 flex w-full self-end justify-end ">
          {filtered.length === 0
            ? "Sin resultados"
            : `${(currentPage - 1) * NOTICES_PER_PAGE + 1} – ${Math.min(
                currentPage * NOTICES_PER_PAGE,
                filtered.length,
              )} de ${filtered.length} noticias`}
        </p>  */}

        {/* Grid */}
        {paginated.length === 0 ? (
          <p className="text-zinc-400 text-center py-20">
            No hay noticias en esta categoría
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((notice: any) => (
              <Link
                key={notice._id}
                href={`/notices/${notice._id}`}
                className="group border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-200 transition-all duration-500 flex flex-col"
              >
                {notice.images &&
                  notice.images.length > 0 &&
                  notice.images[0].secure_url && (
                    <div className="relative h-64 w-full ">
                      <Image
                        src={notice.images[0].secure_url}
                        alt={notice.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                <div className="py-6 px-3 text-balance">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-zinc-200 bg-sky-700 px-4 py-0.5 rounded-sm">
                      {notice.category}
                    </span>
                    <span className="text-zinc-500 text-sm">
                      {new Date(notice.createdAt).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
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
                </div>
                <div className="self-start mb-2 ml-3 bg-zinc-700/70 border border-sky-500 cursor-pointer z-100 w-48 rounded-lg h-8.5 relative text-zinc-100 md:font-medium flex items-center pl-3 group lg:w-50 lg:mb-3 lg:h-9.5">
                  <p className="">Leer más</p>
                  <div className="bg-sky-600 cursor-pointer rounded-lg h-[33px] w-8 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500 lg:w-9 lg:h-[37.5px]">
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
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14 lg:mt-16 lg:gap-6">
            {/* Botón anterior */}
            <button
              onClick={() => handlePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-sm border border-zinc-600 flex items-center justify-center text-zinc-400 hover:border-zinc-300 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer lg:w-14 lg:h-10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Números de página */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Mostrar siempre: primera, última, actual y sus vecinas
              const showPage =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;

              // Ellipsis
              const showLeftEllipsis = page === 2 && currentPage > 4;
              const showRightEllipsis =
                page === totalPages - 1 && currentPage < totalPages - 3;

              if (!showPage && !showLeftEllipsis && !showRightEllipsis) {
                return null;
              }

              if (showLeftEllipsis || showRightEllipsis) {
                return (
                  <span key={`ellipsis-${page}`} className="text-zinc-600 px-1">
                    …
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePage(page)}
                  className={`
                    w-9 h-9 rounded-sm border text-sm font-medium transition-all duration-200 cursor-pointer lg:w-14 lg:h-10
                    ${
                      currentPage === page
                        ? "bg-sky-700 border-sky-600 text-zinc-100"
                        : "border-zinc-600 text-zinc-400 hover:border-zinc-300 hover:text-zinc-200"
                    }
                  `}
                >
                  {page}
                </button>
              );
            })}

            {/* Botón siguiente */}
            <button
              onClick={() => handlePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-sm border border-zinc-600 flex items-center justify-center text-zinc-400 hover:border-zinc-300 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer lg:w-14 lg:h-10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
