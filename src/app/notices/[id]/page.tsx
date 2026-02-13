import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import connectToDatabase from "@/lib/mongodb";
import NoticeModel from "@/models/notice";
import NavbarLanding from "@/components/landing/ui/NavbarLanding";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 1800;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  await connectToDatabase();
  const notice = await NoticeModel.findById(id).lean();
  
  if (!notice) {
    return {
      title: "Noticia no encontrada",
    };
  }

  return {
    title: `${notice.title} - Faustino Oro`,
    description: notice.description,
  };
}

async function getNotice(id: string) {
  await connectToDatabase();
  const notice = await NoticeModel.findById(id).lean();
  
  if (!notice) {
    return null;
  }
  
  return JSON.parse(JSON.stringify(notice));
}

export default async function NoticePage({ params }: Props) {
  const { id } = await params;
  const notice = await getNotice(id);

  if (!notice) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <NavbarLanding />
      
      <article className="max-w-4xl mx-auto px-6 py-20">
        <Link
          href="/notices"
          className="text-sky-400 hover:text-sky-300 mb-8 inline-block"
        >
          ← Volver a noticias
        </Link>

        {notice.images && notice.images.length > 0 && notice.images[0].secure_url && (
          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={notice.images[0].secure_url}
              alt={notice.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

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

        <h1 className="text-5xl font-bold text-zinc-100 mb-6">
          {notice.title}
        </h1>

        <p className="text-xl text-zinc-400 mb-8">
          {notice.description}
        </p>

        <div className="prose prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: notice.content }} />
        </div>
      </article>
    </div>
  );
}