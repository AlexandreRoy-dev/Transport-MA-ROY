import { getTranslations } from "next-intl/server";
import { CtaLink } from "@/components/CtaLink";

export default async function NotFound() {
  const t = await getTranslations("nav");

  return (
    <section className="site-grid py-28">
      <h1 className="text-[clamp(3rem,8vw,6rem)] uppercase">404</h1>
      <p className="mt-4 text-dust">{t("home")}</p>
      <div className="mt-8">
        <CtaLink href="/">{t("home")}</CtaLink>
      </div>
    </section>
  );
}
