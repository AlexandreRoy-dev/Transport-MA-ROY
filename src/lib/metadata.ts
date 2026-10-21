import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { languageAlternates, pageUrl, type PageKey } from "@/lib/urls";

const OG_IMAGE = "https://transportmar.ca/og/transport-ma-roy-partage-1200x630.jpg";

export async function pageMeta(key: PageKey): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  const isEn = locale === "en";
  const title = t(`${key}Title`);
  const description = t(`${key}Description`);
  const url = pageUrl(locale, key);
  const imageAlt = t("ogImageAlt");

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: languageAlternates(key),
    },
    openGraph: {
      type: "website",
      url,
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
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
