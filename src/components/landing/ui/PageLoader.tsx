"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoader } from "@/lib/LoaderContext";

export default function PageLoader() {
  const { isLoading } = useLoader();
  const pathname = usePathname();

  // Reset loading en cada cambio de ruta
  useEffect(() => {
    // Este efecto no hace nada aquí, lo maneja cada componente
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-900/95 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-sky-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-sky-500 rounded-full animate-spin"></div>
        </div>
        
        <p className="text-zinc-300 text-lg font-medium animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
}