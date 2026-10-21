import type { MetadataRoute } from "next";
import { PAGE_SLUGS, pageUrl, type PageKey } from "@/lib/urls";

export const dynamic = "force-static";

const LAST_MOD = new Date("2026-10-21");

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PAGE_SLUGS) as PageKey[]).flatMap((key) => {
    const fr = pageUrl("fr", key);
    const en = pageUrl("en", key);
    const languages = {
      "fr-CA": fr,
      "en-CA": en,
      "x-default": fr,
    };
    return [
      { url: fr, lastModified: LAST_MOD, alternates: { languages } },
      { url: en, lastModified: LAST_MOD, alternates: { languages } },
    ];
  });
}
