import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
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
  metadataBase: new URL("https://transportmar.ca"),
  title: "Transport M-A Roy",
  description:
    "Vente et location de conteneurs maritimes 20' et 40' en Estrie.",
  openGraph: {
    type: "website",
    siteName: "Transport M-A Roy",
    locale: "fr_CA",
    images: [
      {
        url: "/og/transport-ma-roy-partage-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Conteneur maritime 40 pieds vert sur remorque, Transport M-A Roy, conteneurs à vendre et à louer en Estrie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/transport-ma-roy-partage-1200x630.jpg"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-paper">{children}</body>
    </html>
  );
}
