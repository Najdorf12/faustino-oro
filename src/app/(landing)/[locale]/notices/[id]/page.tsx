import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import connectToDatabase from "@/lib/mongodb";
import NoticeModel from "@/models/notice";
import NavbarPages from "@/components/landing/ui/layout/NavbarPages";
import { getLocale, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = false;

const CATEGORY_MAP: Record<string, string> = {
  Todas: "all",
  Eventos: "events",
  Logros: "achievements",
  Clásicas: "classical",
  "Rápidas - Blitz": "rapid",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = (await getLocale()) as "es" | "en";
  await connectToDatabase();
  const notice = await NoticeModel.findById(id).lean();

  if (!notice) {
    return {
      title: "Noticia no encontrada",
    };
  }

  return {
    title: `${notice.title[locale]} - Faustino Oro`,
    description: notice.description[locale],
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
  const locale = (await getLocale()) as "es" | "en";
  const t = await getTranslations("noticesPage");

  if (!notice) {
    notFound();
  }
  const translatedCategory = CATEGORY_MAP[notice.category]
    ? t(`noticesGrid.categories.${CATEGORY_MAP[notice.category]}`)
    : notice.category;

  const formattedDate = new Date(notice.createdAt).toLocaleDateString(
    locale === "en" ? "en-US" : "es-AR",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="min-h-screen py-20 lg:py-28 relative lg:pb-32 3xl:pb-38 ">
      <NavbarPages />

      <article className="px-4 max-w-4xl  rounded-lg mx-auto lg:max-w-5xl  3xl:max-w-6xl ">
        {notice.images &&
          notice.images.length > 0 &&
          notice.images[0].secure_url && (
            <div className="relative z-50 h-96 w-full mb-8 rounded-xl overflow-hidden lg:h-132 border-2 border-zinc-700 shadow-xl shadow-zinc-900 3xl:h-150">
              <Image
                src={notice.images[0].secure_url}
                alt={notice.title[locale]}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

        <div className="flex items-center justify-between mb-4 rounded-lg relative text-balance border py-3 px-2 border-zinc-700 z-100 bg-zinc-900/50 md:py-6 md:px-3 ">
          <span className="text-sm font-medium text-zinc-200 bg-sky-700 px-8 py-0.5 rounded-sm lg:text-base 3xl:text-lg">
            {translatedCategory}
          </span>
          <span className="text-zinc-500 text-sm lg:text-base 3xl:text-lg ">
            {formattedDate}
          </span>
        </div>

        <h6 className="relative z-100 bg-zinc-900/50 rounded-lg border text-center text-2xl py-6 border-zinc-700 text-balance text-zinc-100 mb-4 md:text-3xl px-2 md:px-3 lg:px-6 lg:py-8 lg:text-4xl lg:mb-9 xl:text-5xl 3xl:text-6xl ">
          {notice.title[locale]}
        </h6>

        <p className="text-xl text-center  text-zinc-400 mb-8 text-balance relative z-100 px-2 md:px-3 lg:text-2xl lg:mb-9 3xl:text-3xl ">
          {notice.description[locale]}
        </p>

        <div className="prose prose-invert prose-lg max-w-none text-balance text-zinc-300 text-base px-2 md:px-3 lg:text-lg relative z-100 3xl:text-xl">
          <div dangerouslySetInnerHTML={{ __html: notice.content[locale] }} />
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
