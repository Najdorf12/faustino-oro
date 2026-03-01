import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NavbarPages from "@/components/landing/ui/layout/NavbarPages";
import imgFaustiNotice from "@/assets/images/img1-11.jpeg";
import imgFaustiCaruana from "@/assets/images/chess/19.jpg";
import iconFaustiCaruana from "@/assets/images/icon5.svg";
import connectToDatabase from "@/lib/mongodb";
import NoticeModel from "@/models/notice";

export const metadata: Metadata = {
  title: "Noticias - Faustino Oro",
  description: "Últimas noticias y novedades de Faustino Oro",
};

export const revalidate = 1800; // Revalidar cada 30 minutos

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

// ✅ Acceso directo a MongoDB en Server Component
async function getNotices() {
  await connectToDatabase();
  const notices = await NoticeModel.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(notices));
}

export default function NoticesPage() {
  return (
    <>
      <section className="w-full min-h-screen bg-zinc-800 flex flex-col pt-26 sm:pt-30 gap-12 lg:gap-0 lg:pt-0 lg:flex-row text-balance">
        <NavbarPages />
        <article className="pl-4 relative w-full h-[24vh] flex flex-col items-start justify-center text-start md:border-b border-zinc-700 md:w-1/2 md:h-screen lg:pl-6 xl:pl-12 lg:pt-0">
          <h6 className="relative text-zinc-300 text-[3.5rem] sm:text-6xl lg:text-7xl xl:text-8xl font-medium 3xl:text-9xl">
            NOTICIAS
          </h6>
          <p className="relative pr-2 text-sm my-3 sm:my-6  text-zinc-400 flex justify-center items-center max-w-100 lg:max-w-175 xl:text-lg 3xl:text-xl">
            Bienvenidos a la sección de noticias de Fausti, donde compartimos
            sus logros, próximas competencias y momentos clave en su carrera de
            ajedrez.
          </p>
          <Link href={"/tournaments"}>
            <button className="relative text-zinc-300 text-lg mt-3 flex items-center gap-2 font-medium lg:ml-1 lg:text-xl 2xl:text-2xl group hover:text-sky-500 cursor-pointer duration-500">
              Torneos / Stats
              <span className="group-hover:translate-x-3 duration-500">
                <ArrowRight />
              </span>
            </button>
          </Link>
        </article>
        <div className="hidden md:flex justify-center absolute bottom-0 w-1/2">
          <p className="text-sm xl:text-base leading-5 pl-6 xl:pl-12 text-balance h-22 lg:h-26 3xl:h-28 text-zinc-400 flex justify-center items-center 3xl:text-lg xl:leading-normal">
            Mantente informado sobre sus próximas competencias, análisis de
            partidas y eventos destacados en el mundo del ajedrez.
          </p>
          <p className="text-base xl:text-lg 3xl:text-xl px-2 leading-5 text-center text-balance h-22 lg:h-26 3xl:h-28 bg-sky-700 rounded-tl text-zinc-300 flex justify-center items-center  border-t border-l border-zinc-600 font-medium">
            CHESSI IS COMING
          </p>
        </div>
        <section className="w-[90%] self-center h-[60vh] md:w-1/2 md:h-screen relative flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-800/40 z-100"></div>
          <Image
            src={imgFaustiNotice}
            alt="img-notice"
            loading="eager"
            className="w-full h-full object-cover absoluteinset-0 rounded-2xl border-2 border-zinc-600 lg:border-y-0 lg:border-r-0 lg:border-l-2 lg:rounded-bl-none lg:rounded-r-none"
          ></Image>
        </section>
      </section>
      <figure className="w-full relative md:w-full h-80 md:h-screen mt-9 md:mt-0">
        <div className="absolute inset-0 bg-zinc-900/80"></div>
        <Image
          src={imgFaustiCaruana}
          alt="imgFausti-Caruana"
          className="w-full h-full object-cover "
        ></Image>

        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #52525c 1px, transparent 1px),
        linear-gradient(to bottom, #52525c 1px, transparent 1px)
      `,
            backgroundSize: "300px 300px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
          }}
        />
        <article className="absolute inset-0 z-200 flex items-end pb-4 max-w-100 md:max-w-200 lg:max-w-260 md:items-end md:pb-10 3xl:pb-14">
          <h6 className="z-60 text-start text-zinc-300 font-medium text-balance text-lg leading-6 mt-3 md:leading-12 md:text-5xl ml-[8%] max-w-200  lg:ml-[12%] 3xl:text-6xl 3xl:max-w-280">
            Aquí encontrarás actualizaciones en tiempo real y la cobertura de
            los momentos más importantes de su trayectoria profesional
          </h6>
        </article>
        <figure>
          <Image
            src={iconFaustiCaruana}
            alt="icon"
            className="w-18 md:w-50 absolute bottom-9 left-[2%] md:bottom-12 3xl:w-60"
          ></Image>
        </figure>
      </figure>
      <Suspense fallback={<NoticesSkeleton />}>
        <NoticesContent />
      </Suspense>
    </>
  );
}

async function NoticesContent() {
  const notices = await getNotices();

  // Filtrar solo noticias activas
  const activeNotices = notices.filter((notice: any) => notice.isActive);

  return (
    <div
      id="allnotices"
      className="w-full min-h-screen bg-z py-10 px-4 relative lg:py-16 3xl:flex 3xl:justify-start "
    >
      <div className="absolute  z-200 bottom-0.5 left-0 text-zinc-600  w-full flex items-center justify-center text-sm md:text-base 2xl:text-lg">
        © Faustino Oro
      </div>

      <div className="max-w-7xl mx-auto  3xl:max-w-350 ">
        <h6 className="text-zinc-200 text-[2rem] sm:text-4xl lg:text-6xl border-l-3 border-sky-700 py-2 pl-4 lg:pl-6 mb-12 lg:mb-16 3xl:text-7xl">
          Todas las noticias
        </h6>
        {activeNotices.length === 0 ? (
          <p className="text-zinc-400 text-center py-20">
            No hay noticias disponibles en este momento
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {activeNotices.map((notice: any) => (
              <Link
                key={notice._id}
                href={`/notices/${notice._id}`}
                className="group border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-200 transition-all duration-500"
              >
                {notice.images &&
                  notice.images.length > 0 &&
                  notice.images[0].secure_url && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={notice.images[0].secure_url}
                        alt={notice.title}
                        fill
                        className="object-cover "
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

                  <p className="text-sm sm:text-base text-zinc-400 line-clamp-3">
                    {notice.description}
                  </p>
                </div>
                <div className="self-end mb-2 ml-3 bg-zinc-700/70 border border-sky-500 cursor-pointer z-100 w-48 rounded-lg h-9 relative text-zinc-100 md:font-medium flex items-center pl-3 group lg:w-50 lg:mb-3">
                  <p className="">Leer más</p>
                  <div className="bg-sky-600 cursor-pointer rounded-lg h-9 w-9 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500">
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
      </div>
    </div>
  );
}

export function ArrowRight() {
  return (
    <svg
      style={{
        filter: "drop-shadow(0 0 0 transparent)",
        stroke: "none",
      }}
      width="100px"
      height="35px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18L20.6464 12.3536C20.8417 12.1583 20.8417 11.8417 20.6464 11.6464L15 6"
        stroke="#00a6f4"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12L-12 12"
        stroke="#00a6f4"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
