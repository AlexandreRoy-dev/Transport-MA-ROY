import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/CtaLink";
import { Reveal } from "@/components/Reveal";
import type { AppLocale } from "@/i18n/routing";
import { pageMeta } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMeta("services");
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const blocks = [
    {
      title: t("saleTitle"),
      body: t("saleBody"),
      points: [t("salePoint1"), t("salePoint2"), t("salePoint3")],
    },
    {
      title: t("rentTitle"),
      body: t("rentBody"),
      points: [t("rentPoint1"), t("rentPoint2"), t("rentPoint3")],
    },
    {
      title: t("deliverTitle"),
      body: t("deliverBody"),
      points: [t("deliverPoint1"), t("deliverPoint2"), t("deliverPoint3")],
    },
  ];

  return (
    <>
      <section className="site-grid grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <h1 className="text-[clamp(3rem,8vw,6.2rem)] uppercase">{t("title")}</h1>
        </div>
        <p className="measure md:col-span-5 md:self-end text-dust">{t("lead")}</p>
      </section>

      <div className="relative h-[42vw] min-h-56 max-h-[420px]">
        <Image
          src="/media/delivery.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <section className="site-grid py-16 md:py-24">
        <div className="flex flex-col gap-16">
          {blocks.map((block, index) => (
            <Reveal key={block.title} delay={index * 0.15} className="grid gap-6 md:grid-cols-12">
              <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] uppercase md:col-span-5">
                {block.title}
              </h2>
              <div className="md:col-span-7">
                <p className="measure text-dust">{block.body}</p>
                <ul className="mt-5 flex flex-col gap-2 text-paper">
                  {block.points.map((point) => (
                    <li key={point} className="border-t border-line pt-2">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-16">
          <CtaLink href="/contact">{t("cta")}</CtaLink>
        </div>
      </section>
    </>
  );
}
