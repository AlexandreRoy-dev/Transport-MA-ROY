import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CallButton } from "@/components/CallButton";
import { Reveal } from "@/components/Reveal";
import type { AppLocale } from "@/i18n/routing";
import { pageMeta } from "@/lib/metadata";
import { CARD_40_IMG } from "@/lib/images";
import { Card40Picture } from "@/components/Card40Picture";

export async function generateMetadata() {
  return pageMeta("products");
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");

  const sizes = [
    {
      title: t("size20Title"),
      body: t("size20Body"),
      spec: t("size20Spec"),
      mark: "20'",
      image: "/media/conteneurs-20-pieds-cour-entreposage-800.webp",
    },
    {
      title: t("size40Title"),
      body: t("size40Body"),
      spec: t("size40Spec"),
      mark: "40'",
      image: CARD_40_IMG,
    },
    {
      title: t("sizeSideTitle"),
      body: t("sizeSideBody"),
      spec: t("sizeSideSpec"),
      mark: "40'",
      image: "/media/conteneur-40-pieds-portes-laterales-noir-1600.webp",
    },
    {
      title: t("sizeReeferTitle"),
      body: t("sizeReeferBody"),
      spec: t("sizeReeferSpec"),
      mark: "RF",
      image: "/media/conteneur-refrigere-40-pieds-remorque-800.webp",
    },
  ];

  return (
    <>
      <section className="hero-enter site-grid py-20 md:py-28">
        <h1 className="max-w-[12ch] text-[clamp(2.6rem,6vw,4.4rem)] uppercase">
          {t("title")}
        </h1>
        <p className="measure mt-6 text-dust">{t("lead")}</p>
      </section>

      <section className="site-grid grid gap-6 pb-20 md:grid-cols-2">
        {sizes.map((size, index) => (
          <Reveal
            key={size.title}
            delay={(index % 2) * 0.3}
            className="plate flex flex-col"
          >
            <div className="relative aspect-[16/10]">
              {size.image === CARD_40_IMG ? <Card40Picture alt={size.title} /> : <Image
                src={size.image}
                alt={size.title}
                fill
                className={size.mark === "RF" ? "object-cover object-top" : "object-cover"}
                sizes="(min-width: 768px) 50vw, 100vw"
              />}
            </div>
            <div className="plate-body">
              <p className="stencil text-7xl text-corten">{size.mark}</p>
              <h2 className="mt-4 font-display text-3xl uppercase">{size.title}</h2>
              <p className="mt-3 text-dust">{size.body}</p>
              <p className="mt-6 text-sm tracking-[0.08em] uppercase text-steel">
                {size.spec}
              </p>
              {/* SPECS: confirmed dimensions go here. Product schema (JSON-LD) to be added with them. */}
              <div className="mt-6 flex flex-wrap gap-3">
                <CallButton />
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[300px]">
          <Image
            src="/media/yard-46.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <Reveal className="bg-paper px-6 py-16 text-ink md:px-12">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] uppercase">
            {t("conditionTitle")}
          </h2>
          <div className="mt-8 grid gap-8">
            <div>
              <h3 className="font-display text-2xl uppercase">{t("newTitle")}</h3>
              <p className="mt-2 text-ink-soft">{t("newBody")}</p>
            </div>
            <div>
              <h3 className="font-display text-2xl uppercase">{t("usedTitle")}</h3>
              <p className="mt-2 text-ink-soft">{t("usedBody")}</p>
            </div>
            <div>
              <h3 className="font-display text-2xl uppercase">{t("modifiedTitle")}</h3>
              <p className="mt-2 text-ink-soft">{t("modifiedBody")}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-[#0f0e0c] text-white">
        <div className="site-grid py-20">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] uppercase">
            {t("usesTitle")}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            <Reveal as="li" className="card-motion border-t-2 border-corten pt-4 text-white/80">{t("useStorage")}</Reveal>
            <Reveal as="li" delay={0.3} className="card-motion border-t-2 border-corten pt-4 text-white/80">{t("useSite")}</Reveal>
            <Reveal as="li" delay={0.6} className="card-motion border-t-2 border-corten pt-4 text-white/80">{t("useFarm")}</Reveal>
          </ul>
          <div className="mt-12">
            <CallButton />
          </div>
        </div>
      </section>
    </>
  );
}
