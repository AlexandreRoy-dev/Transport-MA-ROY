import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Document } from "@/components/Document";
import { SiteShell } from "@/components/SiteShell";
import { routing, type AppLocale } from "@/i18n/routing";
import { rootMetadata } from "@/lib/site-metadata";
import "../globals.css";

export const metadata = rootMetadata;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <Document locale={locale}>
      <SiteShell locale={locale as AppLocale}>{children}</SiteShell>
    </Document>
  );
}
