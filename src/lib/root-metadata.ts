import type { Metadata } from "next";

export const rootMetadata: Metadata = {
  metadataBase: new URL("https://transportmar.ca"),
  title: "Vente et location de conteneurs maritimes en Estrie | Transport M-A Roy",
  description:
    "Transport M-A Roy vend des conteneurs maritimes 20' et 40' depuis Cookshire-Eaton. Location aussi offerte. Spécialiste Estrie, livraison partout au Québec.",
  openGraph: {
    type: "website",
    siteName: "Transport M-A Roy",
    locale: "fr_CA",
    images: [
      {
        url: "/og/transport-ma-roy-partage-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Conteneur maritime de 40 pieds sur une remorque, avec le texte Conteneurs maritimes à vendre et à louer de Transport M-A Roy.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/transport-ma-roy-partage-1200x630.jpg"],
  },
};
