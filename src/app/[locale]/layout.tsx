import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/SiteFrame";
import { fontClassName } from "@/app/fonts";
import { routing } from "@/i18n/routing";
import { rootMetadata } from "@/lib/root-metadata";
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
    <html lang={locale} suppressHydrationWarning className={fontClassName}>
      <body className="flex min-h-full flex-col bg-ink text-paper">
        <SiteFrame locale={locale}>{children}</SiteFrame>
      </body>
    </html>
  );
}
