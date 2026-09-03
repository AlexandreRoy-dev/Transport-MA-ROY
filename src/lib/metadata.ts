import { getTranslations } from "next-intl/server";

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

  return {
    title: t(titleKey),
    description: t(descriptionKey),
  };
}
