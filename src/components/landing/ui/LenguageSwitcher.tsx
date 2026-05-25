"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation"
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className={`flex items-center gap-1 text-sm font-medium transition-opacity lg:text-lg 3xl:text-xl ${isPending ? "opacity-40" : "opacity-100"}`}>
      <button
        onClick={() => switchLocale("es")}
        className={`px-1 transition-colors duration-300 cursor-pointer ${
          locale === "es"
            ? "text-sky-600 underline underline-offset-4"
            : "text-zinc-500 hover:text-zinc-200"
        }`}
      >
        ES
      </button>
      <span className="text-zinc-600">|</span>
      <button
        onClick={() => switchLocale("en")}
        className={`px-1 transition-colors duration-300 cursor-pointer ${
          locale === "en"
            ? "text-sky-500 underline underline-offset-4"
            : "text-zinc-500 hover:text-zinc-200"
        }`}
      >
        EN
      </button>
    </div>
  );
}