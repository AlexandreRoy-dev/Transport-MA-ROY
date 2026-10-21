import { getTranslations } from "next-intl/server";

const PHONE = "+1-819-578-3441";
const IMAGE = "https://transportmar.ca/og/transport-ma-roy-partage-1200x630.jpg";

/**
 * LocalBusiness from facts already published on the site.
 *
 * TODO(Alexandre): not on the site, so omitted on purpose:
 * - civic number and postal code for Route 108, Cookshire-Eaton
 * - opening hours
 * - map coordinates
 * - Google Business or social profile URLs (sameAs)
 * - price range, and Product JSON-LD (dimensions are still unconfirmed)
 */
export async function buildLocalBusiness(locale: string) {
  const meta = await getTranslations("meta");
  const contact = await getTranslations("contact");
  const estrie = locale === "en" ? "Eastern Townships" : "Estrie";
  const quebec = locale === "en" ? "Quebec" : "Québec";

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://transportmar.ca/#entreprise",
    name: "Transport M-A Roy inc.",
    url: "https://transportmar.ca/",
    image: IMAGE,
    telephone: PHONE,
    email: contact("email"),
    description: meta("homeDescription"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Route 108",
      addressLocality: "Cookshire-Eaton",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: estrie },
      { "@type": "AdministrativeArea", name: quebec },
    ],
    employee: {
      "@type": "Person",
      name: "Marc-André Roy",
      jobTitle: "dir.",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      email: contact("email"),
      contactType: "sales",
      areaServed: "CA",
      availableLanguage: ["fr-CA", "en-CA"],
    },
  };
}
