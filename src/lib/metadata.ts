import { getLocale, getTranslations } from "next-intl/server";

const OG_IMAGE = "/og/transport-ma-roy-partage-1200x630.jpg";
const OG_ALT = {
  fr: "Conteneur maritime de 40 pieds sur une remorque, avec le texte Conteneurs maritimes à vendre et à louer de Transport M-A Roy.",
  en: "A 40 foot shipping container on a trailer, with the Transport M-A Roy text Shipping containers for sale and rent.",
};

export async function pageMeta(
  key:
    | "home"
    | "services"
    | "products"
    | "about"
    | "contact"
    | "privacy",
) {
  const t = await getTranslations("meta");
  const titleKey = `${key}Title` as const;
  const descriptionKey = `${key}Description` as const;

  const locale = await getLocale();
  const isEn = locale === "en";

  return {
    title: t(titleKey),
    description: t(descriptionKey),
    openGraph: {
      type: "website",
      siteName: "Transport M-A Roy",
      locale: isEn ? "en_CA" : "fr_CA",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: isEn ? OG_ALT.en : OG_ALT.fr,
        },
      ],
    },
  };
}
