import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NavbarLanding from "@/components/landing/ui/layout/NavbarLanding";
import imgFaustiNotice from "@/assets/images/ai1.png";
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
      <section className="w-full min-h-screen bg-zinc-800 flex flex-col pt-30 gap-12 lg:gap-0 lg:pt-0 lg:flex-row text-balance">
        <NavbarLanding />
        <article className=" pl-6 relative w-full  h-[24vh] flex flex-col items-start justify-center text-start md:border-b border-zinc-700 md:w-1/2 md:h-screen md:pl-12 lg:pt-6 ">
          <h6 className="relative text-zinc-300 text-6xl md:text-8xl font-medium 3xl:text-9xl">
            NOTICIAS
          </h6>
          <p className="relative text-sm md:text-lg text-zinc-400 flex justify-center items-center max-w-175 my-6 3xl:text-xl">
            Bienvenidos a la sección de noticias de Faustino Oro, donde
            compartimos sus logros, próximas competencias y momentos clave en su
            carrera de ajedrez.
          </p>
          <button className="relative text-zinc-300 text-lg mt-5 flex items-center gap-2 font-medium  lg:ml-1 xl:text-xl 2xl:text-2xl group hover:text-sky-700 cursor-pointer duration-500">
            Ir a Torneos
            <span className="group-hover:translate-x-3 duration-500">
              <ArrowRight />
            </span>
          </button>
        </article>
        <div className="hidden md:flex justify-center absolute bottom-0 w-1/2">
          <p className="text-base leading-5 pl-12 text-balance h-25 text-zinc-400 flex justify-center items-center">
            Mantente informado sobre sus próximas competencias, análisis de
            partidas y eventos destacados en el mundo del ajedrez.
          </p>
          <p className="text-lg leading-5 text-center text-balance h-25 bg-sky-700 rounded-tl text-zinc-300 flex justify-center items-center">
            CHESSI IS COMING
          </p>
        </div>
        <section className="w-[90%] self-center h-[60vh] md:w-1/2 md:h-screen relative flex items-center justify-center">
          <div className="absolute inset-0  z-100"></div>
          <Image
            src={imgFaustiNotice}
            alt="img-notice"
            loading="eager"
            className="w-full h-full object-cover absolute inset-0 rounded-2xl lg:rounded-bl-none"
          ></Image>
        </section>
      </section>
      <figure className="w-full relative md:w-full h-100 md:h-screen ">
        <div className="absolute inset-0 bg-zinc-900/80"></div>
        <Image
          src={imgFaustiCaruana}
          alt="imgFooter"
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
        <article className="absolute inset-0 z-200 flex items-start pb-14 md:items-end ">
          <h6 className="z-60 text-start text-zinc-300 font-medium  text-balance text-lg mt-1 md:text-5xl ml-[9%] max-w-200 3xl:text-6xl">
            Aquí encontrarás actualizaciones en tiempo real y la cobertura de
            los momentos más importantes de su trayectoria profesional
          </h6>
        </article>
        <figure>
          <Image
            src={iconFaustiCaruana}
            alt="icon"
            className="w-14 lg:w-60 absolute top-2 left-[2%] md:top-auto md:bottom-6"
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
    <div className="w-full min-h-screen bg-zinc-800 py-20 px-6">
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
                {notice.images &&
                  notice.images.length > 0 &&
                  notice.images[0].secure_url && (
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
                      {new Date(notice.createdAt).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
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
