"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "mar-consentement-temoins";

export type CookieChoice = "accepte" | "refuse";

export function getCookieChoice(): CookieChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepte" || value === "refuse" ? value : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieChoice() === null) setVisible(true);
  }, []);

  function choose(choice: CookieChoice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* stockage indisponible, on ferme quand meme */
    }
    window.dispatchEvent(new CustomEvent("mar-consentement", { detail: choice }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("label")}
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:left-4 sm:bottom-4 sm:max-w-[26rem]"
    >
      <div className="rounded-lg border border-line bg-ink-soft p-4 text-paper shadow-[0_10px_30px_rgba(23,21,15,0.18)]">
        <p className="text-[0.9rem] leading-snug">
          {t("text")}{" "}
          <Link href="/confidentialite" className="underline underline-offset-2 hover:text-corten">
            {t("more")}
          </Link>
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => choose("accepte")}
            className="rounded-md bg-corten px-4 py-2 text-[0.88rem] font-bold text-white hover:bg-corten-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-corten"
          >
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={() => choose("refuse")}
            className="rounded-md border border-line px-4 py-2 text-[0.88rem] font-bold text-paper hover:border-steel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-corten"
          >
            {t("refuse")}
          </button>
        </div>
      </div>
    </div>
  );
}
