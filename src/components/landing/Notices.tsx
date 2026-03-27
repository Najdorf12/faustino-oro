"use client";

import { Canvas } from "@react-three/fiber";
import { useState, Suspense, lazy, useEffect } from "react";
import { NoticeModal } from "./ui/layout/NoticeModal";
import Button from "./ui/layout/ButtonNotices";
import CardNotice from "./ui/layout/CardNotice";
import type { Notice } from "@/types/notice";
import { usePathname } from "next/navigation";
import imgFaustiCaruana from "@/assets/images/chess/img21.jpg";
import Image from "next/image";
import bg1 from "@/assets/images/icons/bg1.svg";

const ChessKnightExperience = lazy(() =>
  import("./ui/models3D/ChessKnightExperience").then((mod) => ({
    default: mod.ChessKnightExperience,
  })),
);

interface NoticesProps {
  data: Notice[];
}

function CanvasLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-zinc-400">Cargando...</div>
    </div>
  );
}

export default function Notices({ data }: NoticesProps) {
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Esperar a que el DOM esté completamente listo
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
      className="w-full flex flex-col relative bg-zinc-200  pb-9"
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
        <h6 className="w-full text-3xl sm:text-4xl lg:text-6xl  relative z-100 max-w-280 px-3 text-center text-zinc-500 xl:text-[3.95rem] 2xl:text-7xl 2xl:max-w-275">
          Explora actualizaciones sobre sus avances y eventos especiales
        </h6>
        <p className="text-zinc-400 max-w-93 text-center text-sm px-1  md:text-lg xl:text-xl md:max-w-200 3xl:max-w-300 3xl:text-xl">
          Aquí podrás conocer no solo sus logros más recientes, sino también el
          arduo camino de entrenamiento y preparación que los hace posibles
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
        <div className="self-center mt-9 lg:hidden">
          <Button />
        </div>
      </ul>

      <section className="w-full h-fit">
        {activeNotice && (
          <NoticeModal
            notice={activeNotice}
            onClose={() => setActiveNotice(null)}
          />
        )}
      </section>
{/*       <div className="h-16 mt-9 lg:mt-0 lg:h-24 w-full flex gap-2 lg:gap-9 items-center justify-center  ">
        <div className="flex gap-1 lg:gap-3">
          <span className="w-5 h-5 lg:h-10 lg:w-10 border border-zinc-400 bg-zinc-400 rounded-sm "></span>
          <span className="w-5 h-5  lg:h-10 lg:w-10 border border-zinc-300 bg-sky-700 rounded-sm"></span>
          <span className="w-5 h-5 lg:h-10 lg:w-10 border border-zinc-400 bg-zinc-400 rounded-sm  "></span>
        </div>

        <p className="text-[1.2rem] text-zinc-400 font-superlarky lg:text-4xl">
          CHESSI IS COMING{" "}
        </p>
        <div className="flex gap-1 lg:gap-3">
          <span className="w-5 h-5 lg:h-10 lg:w-10 border border-zinc-400 bg-zinc-400 rounded-sm"></span>
          <span className="w-5 h-5 lg:h-10 lg:w-10 border border-zinc-300 bg-sky-700 rounded-sm"></span>
          <span className="w-5 h-5 lg:h-10 lg:w-10 border border-zinc-400 bg-zinc-400 rounded-sm"></span>
        </div>
      </div> */}
    </section>
  );
}
