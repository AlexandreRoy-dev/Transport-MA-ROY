import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/CtaLink";
import { CallButton } from "@/components/CallButton";
import { PhotoGrid } from "@/components/PhotoGrid";
import type { AppLocale } from "@/i18n/routing";
import { pageMeta } from "@/lib/metadata";
import { CARD_40_IMG } from "@/lib/images";
import { Card40Picture } from "@/components/Card40Picture";

export async function generateMetadata() {
  return pageMeta("home");
}

const HERO_IMG = "/media/hero-conteneur-40-pieds-vert-ovl-sans-logo-1284.webp";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const products = [
    { mark: "20'", title: t("stock20Title"), body: t("stock20Body"), image: "/media/conteneurs-20-pieds-cour-entreposage-800.webp", alt: t("alt20") },
    { mark: "40'", title: t("stock40Title"), body: t("stock40Body"), image: CARD_40_IMG, alt: t("alt40") },
    { mark: "40'", title: t("sideTitle"), body: t("sideBody"), image: "/media/conteneur-40-pieds-portes-laterales-noir-800.webp", alt: t("altSide") },
  ];


  return (
    <>
      {/* HERO: full-bleed photo, text on a gradient */}
      <section className="relative bg-[#0f0e0c] text-white">
        <div className="relative aspect-[971/929] w-full md:absolute md:inset-y-0 md:right-0 md:w-[58%] md:aspect-auto">
          <Image
            src={HERO_IMG}
            alt={t("altHero")}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c] via-[#0f0e0c]/10 to-transparent md:bg-gradient-to-r md:from-[#0f0e0c] md:via-[#0f0e0c]/0 md:via-25% md:to-transparent" />
        </div>
        <div className="site-grid relative -mt-24 pb-8 md:mt-0 md:flex md:min-h-[min(calc(58vw*0.957),820px)] md:items-center md:py-16">
          <div className="max-w-[34rem] md:max-w-[40%]">
            <p className="text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-[#e0875f]">{t("heroKicker")}</p>
            <h1 className="mt-2 text-[clamp(2.3rem,5.6vw,4.8rem)] uppercase">{t("heroTitle")}</h1>
            <p className="mt-3 max-w-[36rem] text-[0.98rem] leading-snug text-balance text-white/90">
              {t("heroPlace")}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 md:order-last">
              <CallButton />
            </div>
            <p className="mt-6 text-white/85">{t("heroLead")}</p>
            {t("heroRent") ? <p className="mt-2 text-xs tracking-[0.12em] uppercase text-white/60">{t("heroRent")}</p> : null}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-ink">
        <div className="site-grid py-16 md:py-24">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] uppercase">{t("productsTitle")}</h2>
          <p className="mt-3 text-dust">{t("productsLead")}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <article key={p.title} className="plate flex flex-col">
                <div className="relative aspect-[4/3]">
                  {p.image === CARD_40_IMG ? <Card40Picture alt={p.alt} /> : <Image src={p.image} alt={p.alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />}
                </div>
                <div className="plate-body flex flex-1 flex-col">
                  <p className="stencil text-6xl text-corten">{p.mark}</p>
                  <h3 className="mt-3 font-display text-2xl uppercase">{p.title}</h3>
                  <p className="mt-2 flex-1 text-dust">{p.body}</p>
                  {/* SPECS: dimensions and capacity go here once Marc-André confirms them. Product schema (JSON-LD) to be added with the specs. */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <CallButton />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <CtaLink href="/produits" variant="ghost">{t("productsMore")}</CtaLink>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="border-t border-line bg-ink-soft">
        <div className="site-grid grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] uppercase">{t("offerTitle")}</h2>
            <p className="mt-4 text-dust">{t("offerLead")}</p>
          </div>
          <div className="grid gap-10 md:col-span-8 md:grid-cols-3">
            {([["offerSaleTitle","offerSaleBody"],["offerRentTitle","offerRentBody"],["offerDeliverTitle","offerDeliverBody"]] as const).map(([a,b]) => (
              <div key={a} className="border-t-2 border-corten pt-4">
                <h3 className="font-display text-2xl uppercase">{t(a)}</h3>
                <p className="mt-3 text-dust">{t(b)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO BAND */}
      <div className="relative h-[52vw] max-h-[560px] min-h-[240px]">
        <Image src="/media/conteneurs-20-pieds-cour-entreposage-1600.webp" alt={t("alt20")} fill className="object-cover object-[50%_60%]" sizes="100vw" />
      </div>

      {/* PROCESS */}
      <section className="bg-ink">
        <div className="site-grid py-16 md:py-24">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] uppercase">{t("processTitle")}</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {([["step1Title","step1Body"],["step2Title","step2Body"],["step3Title","step3Body"]] as const).map(([a,b], i) => (
              <li key={a}>
                <p className="font-display text-4xl text-corten">0{i + 1}</p>
                <h3 className="mt-2 font-display text-2xl uppercase">{t(a)}</h3>
                <p className="mt-3 text-dust">{t(b)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TRUST: edge-to-edge split */}
      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px]">
          <Image src="/media/yard-45.jpg" alt={t("galleryAlt")} fill className="object-cover object-center" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="flex flex-col justify-center bg-corten px-6 py-16 text-white md:px-14">
          <h2 className="text-[clamp(2rem,3.6vw,3rem)] uppercase">{t("trustTitle")}</h2>
          <p className="measure mt-5 text-white/90">{t("trustBody")}</p>
          <ul className="mt-8 flex flex-col gap-2 text-[0.95rem]">
            <li>{t("trustLocal")}</li>
            <li>{t("trustStock")}</li>
            <li>{t("trustBoth")}</li>
          </ul>
        </div>
      </section>

      <PhotoGrid />

      {/* FINAL CTA */}
      <section className="bg-[#0f0e0c] text-white">
        <div className="site-grid py-16 md:py-24">
          <h2 className="max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] uppercase">{t("ctaTitle")}</h2>
          <p className="measure mt-5 text-white/80">{t("ctaBody")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
          </div>
        </div>
      </section>
    </>
  );
}
