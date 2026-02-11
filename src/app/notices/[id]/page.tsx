import { Suspense } from "react";
import { Metadata } from "next";
import { getNoticeById, getNotices } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notice = await getNoticeById(id);

  if (!notice) {
    return {
      title: "Noticia no encontrada",
    };
  }

  return {
    title: `${notice.title} - Faustino Oro`,
    description: notice.description,
    openGraph: {
      title: notice.title,
      description: notice.description,
      images: notice.images?.[0]?.secure_url ? [notice.images[0].secure_url] : [],
    },
  };
}

export async function generateStaticParams() {
  const notices = await getNotices();
  return notices
    .filter((notice: any) => notice.isActive)
    .map((notice: any) => ({
      id: notice._id.toString(),
    }));
}

function NoticeSkeleton() {
  return (
    <div className="w-full min-h-screen bg-zinc-900 py-20 px-6">
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="h-96 bg-zinc-700 rounded-xl mb-8"></div>
        <div className="h-12 bg-zinc-700 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-zinc-700 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-zinc-700 rounded"></div>
          <div className="h-4 bg-zinc-700 rounded"></div>
          <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

async function NoticeContent({ id }: { id: string }) {
  const notice = await getNoticeById(id);

  if (!notice || !notice.isActive) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/notices"
          className="text-sky-400 hover:text-sky-300 mb-8 inline-flex items-center gap-2 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a noticias
        </Link>

        <article className="bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          {notice.images &&
            notice.images.length > 0 &&
            notice.images[0].secure_url && (
              <div className="relative h-96 w-full">
                <Image
                  src={notice.images[0].secure_url}
                  alt={notice.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            )}

          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-sky-400 bg-sky-400/10 px-4 py-2 rounded-full">
                {notice.category}
              </span>
              <span className="text-zinc-500">
                {new Date(notice.createdAt).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-medium text-zinc-200 mb-6 leading-tight">
              {notice.title}
            </h1>

            <p className="text-xl text-zinc-400 mb-8 leading-relaxed border-l-4 border-sky-600 pl-6">
              {notice.description}
            </p>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-zinc-300 leading-relaxed whitespace-pre-line">
                {notice.content}
              </div>
            </div>

            {/* Galería de imágenes adicionales */}
            {notice.images && notice.images.length > 1 && (
              <div className="mt-12">
                <h3 className="text-2xl font-medium text-zinc-200 mb-6">
                  Más imágenes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {notice.images.slice(1).map((img: any, index: number) => (
                    <div
                      key={index}
                      className="relative h-48 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img.secure_url}
                        alt={`${notice.title} - imagen ${index + 2}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default async function NoticePage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<NoticeSkeleton />}>
      <NoticeContent id={id} />
    </Suspense>
  );
}