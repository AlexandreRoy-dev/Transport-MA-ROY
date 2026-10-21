import { setRequestLocale } from "next-intl/server";
import HomePage from "../[locale]/page";
import { SiteFrame } from "@/components/SiteFrame";
import { pageMeta } from "@/lib/metadata";

// The apex URL is the French homepage. A client redirect left that HTML
// empty, so this route prerenders the same page into static markup.
export async function generateMetadata() {
  setRequestLocale("fr");
  return pageMeta("home");
}

export default async function RootPage() {
  setRequestLocale("fr");
  const params = Promise.resolve({ locale: "fr" as const });

  return (
    <SiteFrame locale="fr">
      <HomePage params={params} />
    </SiteFrame>
  );
}
