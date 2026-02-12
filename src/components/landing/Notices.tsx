"use client";

import { Canvas } from "@react-three/fiber";
import { useState, Suspense, lazy, useEffect } from "react";
import { NoticeModal } from "./ui/NoticeModal";
import Button from "./ui/ButtonNotices";
import CardNotice from "./ui/CardNotice";
import type { Notice } from "@/types/notice";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="notices"
      className="w-full flex flex-col relative bg-zinc-200 pb-12"
    >
      <div
        className="absolute inset-0 z-80 h-screen"
        style={{
          backgroundImage: `
        linear-gradient(to right, #9f9fa9 1px, transparent 1px),
        linear-gradient(to bottom, #9f9fa9 1px, transparent 1px)
      `,
          backgroundSize: "150px 150px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />

      {/* ✅ Solo renderizar Canvas después de montar en el cliente */}
      {isMounted && (
        <div className="hidden lg:block absolute inset-0 z-80 w-full h-full overflow-hidden">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas
              key={pathname}
              dpr={[1, 2]}
              performance={{ min: 0.5 }}
            >
              <ChessKnightExperience />
            </Canvas>
          </Suspense>
        </div>
      )}

      <article className="flex flex-col justify-center items-center gap-9 pt-14 relative z-100 lg:pt-20">
        <h6 className="w-full text-4xl lg:text-6xl relative z-100 max-w-[900px] px-3 text-center text-zinc-500 2xl:text-7xl 2xl:max-w-[1100px]">
          Explora actualizaciones sobre sus avances y eventos especiales
        </h6>
        <p className="text-zinc-400 max-w-[370px] text-center text-sm px-1 md:text-base 2xl:text-lg md:max-w-[500px] 2xl:max-w-[600px]">
          Aquí podrás conocer no solo sus logros más recientes, sino también el
          arduo camino de entrenamiento y preparación que los hace posibles
        </p>
      </article>

      <ul className="text-balance flex flex-col gap-5 mt-14 px-3 md:gap-6 lg:pl-12 relative z-100 lg:w-fit">
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
        <div className="self-center mt-9">
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
    </section>
  );
}