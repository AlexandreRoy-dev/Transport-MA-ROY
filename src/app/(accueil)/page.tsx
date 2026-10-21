import { setRequestLocale } from "next-intl/server";
import { HomeContent } from "../[locale]/page";
import { pageMeta } from "@/lib/metadata";

// Static export of redirect("/fr/") shipped an empty HTML shell at `/`
// (about 17 characters, no h1). This route prerenders the French homepage
// in the document Google fetches. The canonical stays /fr/.
export async function generateMetadata() {
  setRequestLocale("fr");
  return pageMeta("home");
}

export default async function AccueilPage() {
  setRequestLocale("fr");
  return <HomeContent locale="fr" />;
}
