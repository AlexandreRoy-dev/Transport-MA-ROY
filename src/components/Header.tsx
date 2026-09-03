"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "./Wordmark";

const links = [
  { href: "/", key: "home" as const },
  { href: "/services", key: "services" as const },
  { href: "/produits", key: "products" as const },
  { href: "/a-propos", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ink/92 backdrop-blur-sm">
      <div className="site-grid flex items-center justify-between gap-4 py-3">
        <Link href="/" className="shrink-0" aria-label="Transport M-A Roy">
          <Wordmark compact />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-11 inline-flex items-center px-3 text-[0.82rem] tracking-[0.12em] uppercase ${
                  active ? "text-paper" : "text-dust hover:text-paper"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center bg-corten px-4 text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-paper-hot transition-colors duration-200 hover:bg-corten-deep"
          >
            {t("quote")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-paper lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span className={`block h-px w-6 bg-paper ${open ? "translate-y-2 rotate-45" : ""} transition-transform`} />
            <span className={`block h-px w-6 bg-paper ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-paper ${open ? "-translate-y-2 -rotate-45" : ""} transition-transform`} />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-line bg-ink px-5 py-6 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-12 inline-flex items-center text-lg tracking-[0.08em] uppercase text-paper"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center bg-corten px-4 text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-paper-hot"
            >
              {t("quote")}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
