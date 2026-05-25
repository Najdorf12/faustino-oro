import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed", 
  // ↑ esto hace que /es no aparezca en la URL (solo /en para inglés)
});