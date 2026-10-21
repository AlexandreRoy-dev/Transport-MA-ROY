import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HtmlLang } from "@/components/HtmlLang";
import type { AppLocale } from "@/i18n/routing";
import { localBusinessLd } from "@/lib/seo";

export async function SiteShell({
  locale,
  children,
}: {
  locale: AppLocale;
  children: React.ReactNode;
}) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HtmlLang locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
