export const SITE_ORIGIN = "https://transportmar.ca";

export const PAGE_SLUGS = {
  home: "",
  services: "services",
  products: "produits",
  about: "a-propos",
  contact: "contact",
  privacy: "confidentialite",
} as const;

export type PageKey = keyof typeof PAGE_SLUGS;

/** Absolute canonical URL. French home is the apex; other French pages stay under /fr/. */
export function pageUrl(locale: string, key: PageKey): string {
  const slug = PAGE_SLUGS[key];
  if (locale !== "en" && key === "home") {
    return `${SITE_ORIGIN}/`;
  }
  const prefix = locale === "en" ? "/en" : "/fr";
  return slug ? `${SITE_ORIGIN}${prefix}/${slug}/` : `${SITE_ORIGIN}${prefix}/`;
}

export function languageAlternates(key: PageKey): Record<string, string> {
  return {
    "fr-CA": pageUrl("fr", key),
    "en-CA": pageUrl("en", key),
    "x-default": pageUrl("fr", key),
  };
}
