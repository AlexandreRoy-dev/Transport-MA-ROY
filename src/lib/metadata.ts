import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { pageUrl, type PageKey } from "@/lib/seo";

const OG_IMAGE = "/og/transport-ma-roy-partage-1200x630.jpg";

export async function pageMeta(key: PageKey) {
  const t = await getTranslations("meta");
  const locale = (await getLocale()) as AppLocale;
  const isEn = locale === "en";
  const canonical = pageUrl(locale, key);
  const title = t(`${key}Title`);
  const description = t(`${key}Description`);
  const imageAlt = t("ogImageAlt");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "fr-CA": pageUrl("fr", key),
        "en-CA": pageUrl("en", key),
        "x-default": pageUrl("fr", key),
      },
    },
    openGraph: {
      type: "website" as const,
      url: canonical,
      title,
      description,
      siteName: "Transport M-A Roy",
      locale: isEn ? "en_CA" : "fr_CA",
      alternateLocale: isEn ? ["fr_CA"] : ["en_CA"],
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
