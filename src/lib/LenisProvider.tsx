"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}