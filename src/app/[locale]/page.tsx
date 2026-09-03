import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/CtaLink";
import { Reveal } from "@/components/Reveal";
import type { AppLocale } from "@/i18n/routing";
import { pageMeta } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMeta("home");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden">
        <Image
          src="/media/hero-yard.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/25" />
        <div className="relative site-grid flex min-h-[88vh] flex-col justify-end pb-16 pt-28 md:pb-24">
          <h1 className="max-w-[14ch] text-[clamp(3.4rem,11vw,7.4rem)] uppercase text-paper">
            {t("heroTitle")}
          </h1>
          <p className="measure mt-6 text-lg text-paper/90">{t("heroLead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="/contact">{t("heroPrimary")}</CtaLink>
            <CtaLink href="/produits" variant="ghost">
              {t("heroSecondary")}
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="bg-paper-hot text-ink">
        <div className="site-grid grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-4">
            <h2 className="text-[clamp(2.4rem,5vw,4rem)] uppercase">{t("offerTitle")}</h2>
          </Reveal>
          <div className="grid gap-10 md:col-span-8 md:grid-cols-3">
            <Reveal delay={0.1}>
              <h3 className="font-display text-3xl uppercase">{t("offerSaleTitle")}</h3>
              <p className="mt-3 text-[1.02rem] text-ink-soft">{t("offerSaleBody")}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <h3 className="font-display text-3xl uppercase">{t("offerRentTitle")}</h3>
              <p className="mt-3 text-[1.02rem] text-ink-soft">{t("offerRentBody")}</p>
            </Reveal>
            <Reveal delay={0.6}>
              <h3 className="font-display text-3xl uppercase">{t("offerDeliverTitle")}</h3>
              <p className="mt-3 text-[1.02rem] text-ink-soft">{t("offerDeliverBody")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image
          src="/media/steel-rib.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative site-grid py-20 md:py-28">
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(2.4rem,5vw,4.2rem)] uppercase">
              {t("stockTitle")}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <Reveal delay={0.15} className="border border-line bg-ink/70 p-7">
              <p className="font-display text-[4.5rem] leading-none text-corten">20'</p>
              <h3 className="mt-3 font-display text-3xl uppercase">{t("stock20Title")}</h3>
              <p className="mt-3 text-dust">{t("stock20Body")}</p>
            </Reveal>
            <Reveal delay={0.45} className="border border-line bg-ink/70 p-7">
              <p className="font-display text-[4.5rem] leading-none text-corten">40'</p>
              <h3 className="mt-3 font-display text-3xl uppercase">{t("stock40Title")}</h3>
              <p className="mt-3 text-dust">{t("stock40Body")}</p>
            </Reveal>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal delay={0.15}>
              <h3 className="font-display text-2xl uppercase text-paper">{t("stockNew")}</h3>
              <p className="mt-2 text-dust">{t("stockNewBody")}</p>
            </Reveal>
            <Reveal delay={0.45}>
              <h3 className="font-display text-2xl uppercase text-paper">{t("stockUsed")}</h3>
              <p className="mt-2 text-dust">{t("stockUsedBody")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="site-grid py-20 md:py-28">
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(2.4rem,5vw,4.2rem)] uppercase">
              {t("processTitle")}
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-12 md:grid-cols-3">
            <Reveal as="li" delay={0}>
              <h3 className="font-display text-3xl uppercase">{t("step1Title")}</h3>
              <p className="mt-3 text-dust">{t("step1Body")}</p>
            </Reveal>
            <Reveal as="li" delay={0.3}>
              <h3 className="font-display text-3xl uppercase">{t("step2Title")}</h3>
              <p className="mt-3 text-dust">{t("step2Body")}</p>
            </Reveal>
            <Reveal as="li" delay={0.6}>
              <h3 className="font-display text-3xl uppercase">{t("step3Title")}</h3>
              <p className="mt-3 text-dust">{t("step3Body")}</p>
            </Reveal>
          </ol>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[320px]">
          <Image
            src="/media/delivery.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center bg-corten px-6 py-16 text-paper-hot md:px-14">
          <Reveal>
            <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] uppercase">{t("trustTitle")}</h2>
            <p className="measure mt-5 text-paper-hot/90">{t("trustBody")}</p>
            <ul className="mt-8 flex flex-col gap-2 text-[0.95rem]">
              <li>{t("trustLocal")}</li>
              <li>{t("trustStock")}</li>
              <li>{t("trustBoth")}</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="site-grid flex flex-col items-start gap-6 py-20 md:py-28">
          <Reveal>
            <h2 className="max-w-[14ch] text-[clamp(2.6rem,6vw,5rem)] uppercase">
              {t("ctaTitle")}
            </h2>
            <p className="measure mt-5 text-ink-soft">{t("ctaBody")}</p>
            <div className="mt-8">
              <CtaLink href="/contact">{t("ctaButton")}</CtaLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
