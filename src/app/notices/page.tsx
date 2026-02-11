import { Suspense } from "react";
import { Metadata } from "next";
import { getNotices } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Noticias - Faustino Oro",
  description: "Últimas noticias y novedades de Faustino Oro",
};

function NoticesSkeleton() {
  return (
    <div className="w-full min-h-screen bg-zinc-900 py-20 px-6">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="h-16 bg-zinc-700 rounded-lg w-1/3 mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 bg-zinc-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function NoticesContent() {
  const notices = await getNotices();

  // Filtrar solo noticias activas
  const activeNotices = notices.filter((notice: any) => notice.isActive);

  return (
    <div className="w-full min-h-screen bg-zinc-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-sky-400 hover:text-sky-300 mb-8 inline-block"
        >
          ← Volver al inicio
        </Link>

        <h1 className="text-5xl lg:text-7xl font-medium text-zinc-200 mb-12">
          Noticias
        </h1>

        {activeNotices.length === 0 ? (
          <p className="text-zinc-400 text-center py-20">
            No hay noticias disponibles en este momento
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeNotices.map((notice: any) => (
              <Link
                key={notice._id}
                href={`/notices/${notice._id}`}
                className="group bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-750 transition-all duration-300 hover:scale-105"
              >
                {notice.images && notice.images.length > 0 && notice.images[0].secure_url && (
                  <div className="relative h-64 w-full">
                    <Image
                      src={notice.images[0].secure_url}
                      alt={notice.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full">
                      {notice.category}
                    </span>
                    <span className="text-zinc-500 text-sm">
                      {new Date(notice.createdAt).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-medium text-zinc-200 mb-2 group-hover:text-sky-400 transition-colors line-clamp-2">
                    {notice.title}
                  </h2>
                  
                  <p className="text-zinc-400 line-clamp-3">
                    {notice.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function NoticesPage() {
  return (
    <Suspense fallback={<NoticesSkeleton />}>
      <NoticesContent />
    </Suspense>
  );
}