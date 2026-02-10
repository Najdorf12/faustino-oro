"use client";

import dynamic from "next/dynamic";

const Contact = dynamic(() => import("@/components/landing/Contact"), {
  ssr: false,
  loading: () => <ContactSkeleton />,
});

const Notices = dynamic(() => import("@/components/landing/Notices"), {
  ssr: false,
  loading: () => <NoticesSkeleton />,
});

function ContactSkeleton() {
  return (
    <div className="w-full h-screen bg-zinc-950 flex items-center justify-center animate-pulse">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #000309 100%)",
        }}
      />
      <div className="relative z-10 text-zinc-400 text-2xl">Cargando...</div>
    </div>
  );
}

function NoticesSkeleton() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-10 items-center py-10 animate-pulse">
      <div className="h-16 bg-zinc-700 rounded-lg w-3/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-80 bg-zinc-700 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

interface ClientWrapperProps {
  noticesData: any[];
}

export default function ClientWrapper({ noticesData }: ClientWrapperProps) {
  return (
    <>
      <Notices data={noticesData} />
      <Contact />
    </>
  );
}