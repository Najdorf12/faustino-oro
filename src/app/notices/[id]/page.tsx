import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import imgNotices from "@/assets/images/chess/16.jpg";
import connectToDatabase from "@/lib/mongodb";
import NoticeModel from "@/models/notice";
import NavbarLanding from "@/components/landing/ui/layout/NavbarLanding";

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
    <div className="min-h-screen  relative ">
      <NavbarLanding />
      <article className="max-w-4xl mx-auto px-4 py-20 lg:max-w-5xl lg:py-28 3xl:max-w-6xl">
        {notice.images &&
          notice.images.length > 0 &&
          notice.images[0].secure_url && (
            <div className="relative z-50 h-96 w-full mb-8 rounded-xl overflow-hidden lg:h-120 border-2 border-zinc-700 shadow-xl shadow-zinc-900 3xl:h-150">
              <Image
                src={notice.images[0].secure_url}
                alt={notice.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

        <div className="flex items-center justify-between mb-6 relative text-balance xl:mb-8">
          <span className="text-sm font-medium text-zinc-200 bg-sky-700 px-8 py-0.5 rounded-sm lg:text-base 3xl:text-lg">
            {notice.category}
          </span>
          <span className="text-zinc-500 text-sm lg:text-base 3xl:text-lg">
            {new Date(notice.createdAt).toLocaleDateString("es-AR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h6 className="text-2xl md:text-3xl text-balance text-zinc-100 mb-6 lg:text-4xl relative 3xl:text-5xl xl:mb-8">
          {notice.title}
        </h6>

        <p className="text-base text-zinc-400 mb-8 text-balance relative z-100 lg:text-lg 3xl:text-xl">
          {notice.description}
        </p>

        <div className="prose prose-invert prose-lg max-w-none text-balance text-zinc-300 text-base lg:text-lg relative z-100 3xl:text-xl">
          <div dangerouslySetInnerHTML={{ __html: notice.content }} />
        </div>
      </article>
      <div
        className="absolute inset-0 z-0 min-h-screen"
        style={{
          backgroundImage: `
        linear-gradient(to right, #3f3f46 1px, transparent 1px),
        linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
      `,
          backgroundSize: "150px 150px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />
      
      <div className="absolute z-200 bottom-0.5 text-zinc-600 font-medium w-full flex items-center justify-center text-sm md:text-base 2xl:text-lg">
        © Faustino Oro
      </div>
    </div>
  );
}
