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
    <div className="min-h-screen py-20 lg:py-28 relative ">
      <NavbarLanding />

      <article className="px-4 max-w-4xl  rounded-lg mx-auto lg:max-w-5xl  3xl:max-w-6xl ">
        <Link href="/notices/#allnotices">
          <button
            type="button"
            className="flex items-center justify-center border bg-zinc-700/50 border-sky-700 cursor-pointer text-center z-100 w-50 sm:w-50 xl:w-60 rounded-lg h-9 relative text-zinc-200 text-sm md:text-lg group mb-4"
          >
            <div className="bg-sky-700 cursor-pointer rounded-lg h-9 w-9 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#e4e4e7"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                ></path>
                <path
                  fill="#e4e4e7"
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                ></path>
              </svg>
            </div>
            <p className="translate-x-4">Volver atrás</p>
          </button>
        </Link>
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

        <div className="flex items-center justify-between mb-6 rounded-lg relative text-balance border py-3 px-2 border-zinc-700 md:py-6 md:px-3 xl:mb-8">
          <span className="text-sm font-medium text-zinc-200 bg-sky-700 px-8 py-0.5 rounded-sm lg:text-base 3xl:text-lg">
            {notice.category}
          </span>
          <span className="text-zinc-500 text-sm lg:text-base 3xl:text-lg ">
            {new Date(notice.createdAt).toLocaleDateString("es-AR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h6 className="relative text-2xl border-b pb-6 border-zinc-700 text-balance text-zinc-100 mb-6 md:text-3xl px-2 md:px-3 lg:text-4xl xl:mb-8 3xl:text-5xl ">
          {notice.title}
        </h6>

        <p className="text-base text-zinc-400 mb-8 text-balance relative z-100 px-2 md:px-3 lg:text-lg 3xl:text-xl ">
          {notice.description}
        </p>

        <div className="prose prose-invert prose-lg max-w-none text-balance text-zinc-300 text-base px-2 md:px-3 lg:text-lg relative z-100 3xl:text-xl">
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
