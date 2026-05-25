"use client";
import { Canvas } from "@react-three/fiber";
import { useState, Suspense, lazy, useEffect } from "react";
import { NoticeModal } from "./ui/layout/NoticeModal";
import Button from "./ui/layout/ButtonNotices";
import CardNotice from "./ui/layout/CardNotice";
import type { LocalizedNotice } from "@/types/notice";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const ChessKnightExperience = lazy(() =>
  import("./ui/models3D/ChessKnightExperience").then((mod) => ({
    default: mod.ChessKnightExperience,
  })),
);

interface NoticesProps {
  data: LocalizedNotice[];
}

function CanvasLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-zinc-400">Loading...</div>
    </div>
  );
}

export default function Notices({ data }: NoticesProps) {
  const t = useTranslations("notices");
  const [activeNotice, setActiveNotice] = useState<LocalizedNotice| null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Manejar pérdida de contexto WebGL
  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost, attempting recovery...");

      // Forzar recreación del Canvas
      setTimeout(() => {
        setCanvasKey((prev) => prev + 1);
      }, 100);
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored");
    };

    // Escuchar eventos de pérdida/recuperación de contexto
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener(
          "webglcontextrestored",
          handleContextRestored,
        );
      }
    };
  }, [isMounted]);

  return (
    <section
      id="notices"
      className="w-full flex flex-col relative bg-zinc-200 "
    >
      <div
        className="absolute inset-0 z-80 min-h-screen"
        style={{
          backgroundImage: `
        linear-gradient(to right, #d4d4d8 1px, transparent 1px),
        linear-gradient(to bottom, #d4d4d8 1px, transparent 1px)
      `,
          backgroundSize: "150px 150px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />

      <div
        className="hidden lg:block absolute inset-0 z-80 w-full h-full overflow-hidden"
        suppressHydrationWarning
      >
        {isMounted && (
          <Suspense fallback={<CanvasLoader />}>
            <Canvas
              key={`${pathname}-${canvasKey}`}
              dpr={[1, 2]}
              performance={{ min: 0.5 }}
              gl={{
                antialias: true,
                alpha: true,
                preserveDrawingBuffer: false,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false,
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
              }}
            >
              <ChessKnightExperience />
            </Canvas>
          </Suspense>
        )}
      </div>

      <article className="flex flex-col justify-center items-center gap-9 pt-14 relative z-100 lg:pt-24 lg:gap-10 ">
        <h6 className="w-full text-3xl sm:text-4xl lg:text-6xl relative z-100 max-w-280 px-3 text-center text-zinc-500 xl:text-[3.95rem] 2xl:text-7xl 2xl:max-w-275">
          {t("title")}
        </h6>
        <p className="text-zinc-400 max-w-93 text-center text-sm px-1  md:text-lg xl:text-xl md:max-w-200 3xl:max-w-300 3xl:text-xl">
          {t("description")}
        </p>
        <div className="self-center lg:mt-2 hidden lg:flex">
          <Button />
        </div>
      </article>

      <ul className="relative z-100 w-full flex flex-col justify-center px-6 items-center mt-12 gap-8 lg:mt-20 lg:pb-16 min-h-[80vh] lg:items-start">
        {/*    <div className="pl-12 text-3xl text-zinc-400">RECIENTES</div> */}
        {data && data.length > 0 ? (
          data.map((notice, i) => (
            <CardNotice
              key={notice._id || i}
              notice={notice}
              onClick={() => setActiveNotice(notice)}
            />
          ))
        ) : (
          <p className="text-zinc-500">No hay noticias disponibles</p>
        )}
        <div className="self-center mt-6 lg:hidden">
          <Button />
        </div>
      </ul>

      <section className="w-full h-fit">
   {/*      {activeNotice && (
          <NoticeModal
            notice={activeNotice}
            onClose={() => setActiveNotice(null)}
          />
        )} */}
      </section>
      <div className="h-20 mt-8 lg:h-28 bg-linear-to-tl from-zinc-900 to-sky-800  w-full flex justify-center items-center relative border-y border-sky-700 ">
        <p className="text-lg lg:text-3xl xl:text-[2rem] 3xl:text-4xl font-superlarky text-zinc-200 relative z-50">
          CHESSI IS COMING
        </p>
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.20) 19px, rgba(75, 85, 99, 0.20) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.20) 39px, rgba(75, 85, 99, 0.20) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.20) 19px, rgba(75, 85, 99, 0.20) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.20) 39px, rgba(75, 85, 99, 0.20) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.1) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.1) 2px, transparent 2px)
      `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
          }}
        />
      </div>
    </section>
  );
}
