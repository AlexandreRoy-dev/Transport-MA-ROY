import type { Metadata } from "next";
import { headers } from "next/headers";
import { Atkinson_Hyperlegible, Big_Shoulders_Display } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Transport M-A Roy",
  description:
    "Vente et location de conteneurs maritimes 20' et 40' en Estrie.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = (await headers()).get("x-next-intl-locale") ?? "fr";

  return (
    <html
      lang={locale}
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-paper">{children}</body>
    </html>
  );
}
