import type { AppLocale } from "@/i18n/routing";

export const SITE_URL = "https://transportmar.ca";

export const pagePaths = {
  home: "",
  services: "/services",
  products: "/produits",
  about: "/a-propos",
  contact: "/contact",
  privacy: "/confidentialite",
} as const;

export type PageKey = keyof typeof pagePaths;

export function pageUrl(locale: AppLocale, key: PageKey) {
  return `${SITE_URL}/${locale}${pagePaths[key]}/`;
}

/**
 * Facts below are already published on the site (name, phone, email, Route 108,
 * Cookshire-Eaton, Estrie, delivery across Quebec).
 *
 * TODO(Alexandre): add postalCode, civic number, openingHours, geo and sameAs
 * only after they are confirmed. Do not invent them. Product JSON-LD stays
 * blocked on confirmed dimensions (see the produits page).
 */
export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#entreprise`,
  name: "Transport M-A Roy inc.",
  url: SITE_URL,
  image: `${SITE_URL}/og/transport-ma-roy-partage-1200x630.jpg`,
  telephone: "+1-819-578-3441",
  email: "info@transportmar.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Route 108",
    addressLocality: "Cookshire-Eaton",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Estrie" },
    { "@type": "AdministrativeArea", name: "Québec" },
  ],
  description:
    "Vente et location de conteneurs maritimes 20' et 40', neufs ou usagés. Cour sur la route 108 à Cookshire-Eaton. Livraison au Québec.",
};
