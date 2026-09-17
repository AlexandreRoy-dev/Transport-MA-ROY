import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/CtaLink";
import { Reveal } from "@/components/Reveal";
import type { AppLocale } from "@/i18n/routing";
import { pageMeta } from "@/lib/metadata";

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
      image: "/media/yard-16.jpg",
    },
    {
      title: t("size40Title"),
      body: t("size40Body"),
      spec: t("size40Spec"),
      mark: "40'",
      image: "/media/yard-11.jpg",
    },
    {
      title: t("sizeHcTitle"),
      body: t("sizeHcBody"),
      spec: t("sizeHcSpec"),
      mark: "HC",
      image: "/media/yard-27.jpg",
    },
    {
      title: t("sizeReeferTitle"),
      body: t("sizeReeferBody"),
      spec: t("sizeReeferSpec"),
      mark: "RF",
      image: "/media/yard-13.jpg",
    },
  ];

  return (
    <>
      <section className="site-grid py-20 md:py-28">
        <h1 className="max-w-[12ch] text-[clamp(3rem,8vw,6.2rem)] uppercase">
          {t("title")}
        </h1>
        <p className="measure mt-6 text-dust">{t("lead")}</p>
      </section>

      <section className="site-grid grid gap-6 pb-16 md:grid-cols-2">
        {sizes.map((size, index) => (
          <Reveal
            key={size.title}
            delay={(index % 2) * 0.2}
            className="overflow-hidden border border-line bg-ink-soft"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={size.image}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-7">
              <p className="font-display text-6xl text-corten">{size.mark}</p>
              <h2 className="mt-4 font-display text-3xl uppercase">{size.title}</h2>
              <p className="mt-3 text-dust">{size.body}</p>
              <p className="mt-6 text-sm tracking-[0.08em] uppercase text-steel">
                {size.spec}
              </p>
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
        <div className="bg-paper px-6 py-16 text-ink md:px-12">
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] uppercase">
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
        </div>
      </section>

      <section className="bg-ink">
        <div className="site-grid py-20">
          <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] uppercase">
            {t("usesTitle")}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            <li className="border-t border-line pt-4 text-dust">{t("useStorage")}</li>
            <li className="border-t border-line pt-4 text-dust">{t("useSite")}</li>
            <li className="border-t border-line pt-4 text-dust">{t("useFarm")}</li>
          </ul>
          <div className="mt-12">
            <CtaLink href="/contact">{t("cta")}</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
