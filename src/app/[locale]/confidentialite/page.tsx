import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { pageMeta } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMeta("privacy");
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <article className="site-grid max-w-3xl py-20 md:py-28">
      <h1 className="text-[clamp(2.8rem,6vw,4.8rem)] uppercase">{t("title")}</h1>
      <p className="mt-4 text-sm text-steel">{t("updated")}</p>
      <div className="mt-10 space-y-8 text-dust">
        <p>{t("intro")}</p>
        <section>
          <h2 className="font-display text-3xl uppercase text-paper">{t("useTitle")}</h2>
          <p className="mt-3">{t("useBody")}</p>
        </section>
        <section>
          <h2 className="font-display text-3xl uppercase text-paper">{t("keepTitle")}</h2>
          <p className="mt-3">{t("keepBody")}</p>
        </section>
        <section>
          <h2 className="font-display text-3xl uppercase text-paper">{t("rightsTitle")}</h2>
          <p className="mt-3">{t("rightsBody")}</p>
        </section>
        <section>
          <h2 className="font-display text-3xl uppercase text-paper">{t("thirdTitle")}</h2>
          <p className="mt-3">{t("thirdBody")}</p>
        </section>
      </div>
    </article>
  );
}
