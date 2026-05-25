import Link from "next/link";

export default function NoticeNotFound() {
  return (
    <div className="w-full min-h-screen bg-zinc-900 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-zinc-200 mb-4">404</h1>
        <p className="text-2xl text-zinc-400 mb-8">Noticia no encontrada</p>
        <Link
          href="/notices"
          className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Ver todas las noticias
        </Link>
      </div>
    </div>
  );
}