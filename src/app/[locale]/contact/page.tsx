import { getTranslations, setRequestLocale } from "next-intl/server";
import { QuoteForm } from "@/components/QuoteForm";
import type { AppLocale } from "@/i18n/routing";
import { pageMeta } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMeta("contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="site-grid grid gap-12 py-20 md:grid-cols-12 md:py-28">
      <div className="md:col-span-5">
        <h1 className="text-[clamp(2.6rem,6vw,4.8rem)] uppercase">{t("title")}</h1>
        <p className="measure mt-5 text-dust">{t("lead")}</p>
        <dl className="mt-10 space-y-5">
          <div>
            <dt className="text-[0.72rem] tracking-[0.16em] uppercase text-steel">
              {t("phoneLabel")}
            </dt>
            <dd className="mt-1 text-xl text-paper">
              <a href={`tel:${t("phone").replace(/\s/g, "")}`}>{t("phone")}</a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.72rem] tracking-[0.16em] uppercase text-steel">
              {t("emailLabel")}
            </dt>
            <dd className="mt-1 text-xl text-paper">
              <a href={`mailto:${t("email")}`}>{t("email")}</a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.72rem] tracking-[0.16em] uppercase text-steel">
              {t("regionLabel")}
            </dt>
            <dd className="mt-1 text-paper">{t("region")}</dd>
          </div>
          <div>
            <dt className="text-[0.72rem] tracking-[0.16em] uppercase text-steel">
              {t("hoursLabel")}
            </dt>
            <dd className="mt-1 text-paper">{t("hours")}</dd>
          </div>
        </dl>
        <p className="mt-8 text-sm text-steel">{t("placeholderNote")}</p>
      </div>
      <div className="md:col-span-7">
        <QuoteForm />
      </div>
    </section>
  );
}
