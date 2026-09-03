import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/CtaLink";
import { Reveal } from "@/components/Reveal";
import type { AppLocale } from "@/i18n/routing";
import { pageMeta } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMeta("about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <section className="site-grid py-20 md:py-28">
        <h1 className="max-w-[16ch] text-[clamp(2.8rem,7vw,5.6rem)] uppercase">
          {t("title")}
        </h1>
        <p className="measure mt-6 text-lg text-dust">{t("lead")}</p>
      </section>

      <div className="relative h-[46vw] min-h-64 max-h-[480px]">
        <Image
          src="/media/hero-yard.jpg"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          priority
        />
      </div>

      <section className="site-grid grid gap-14 py-20 md:grid-cols-3">
        <Reveal>
          <h2 className="font-display text-3xl uppercase">{t("storyTitle")}</h2>
          <p className="mt-4 text-dust">{t("storyBody")}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="font-display text-3xl uppercase">{t("localTitle")}</h2>
          <p className="mt-4 text-dust">{t("localBody")}</p>
        </Reveal>
        <Reveal delay={0.6}>
          <h2 className="font-display text-3xl uppercase">{t("promiseTitle")}</h2>
          <p className="mt-4 text-dust">{t("promiseBody")}</p>
        </Reveal>
      </section>

      <section className="bg-corten">
        <div className="site-grid py-16">
          <CtaLink href="/contact">{t("cta")}</CtaLink>
        </div>
      </section>
    </>
  );
}
