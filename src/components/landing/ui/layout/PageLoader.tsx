"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Mostrar loader en cada cambio de ruta
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Ajusta este tiempo según necesites

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-600 flex items-center justify-center bg-zinc-900/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Chess piece animation */}
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