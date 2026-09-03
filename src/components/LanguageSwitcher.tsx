"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={`inline-flex items-center gap-1 text-[0.78rem] font-semibold tracking-[0.14em] uppercase ${className}`}
      role="group"
      aria-label="Language"
    >
      <Link
        href={pathname}
        locale="fr"
        className={`min-h-11 min-w-11 inline-flex items-center justify-center px-2 ${
          locale === "fr" ? "text-paper" : "text-steel hover:text-paper"
        }`}
        aria-current={locale === "fr" ? "true" : undefined}
      >
        FR
      </Link>
      <span className="text-steel" aria-hidden>
        |
      </span>
      <Link
        href={pathname}
        locale="en"
        className={`min-h-11 min-w-11 inline-flex items-center justify-center px-2 ${
          locale === "en" ? "text-paper" : "text-steel hover:text-paper"
        }`}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
