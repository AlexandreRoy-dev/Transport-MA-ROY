import { setRequestLocale } from "next-intl/server";
import { Document } from "@/components/Document";
import { SiteShell } from "@/components/SiteShell";
import { rootMetadata } from "@/lib/site-metadata";
import "../globals.css";

export const metadata = rootMetadata;

export default async function AccueilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale("fr");

  return (
    <Document locale="fr">
      <SiteShell locale="fr">{children}</SiteShell>
    </Document>
  );
}
