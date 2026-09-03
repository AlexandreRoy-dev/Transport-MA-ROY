import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "./Wordmark";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const contact = await getTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink">
      <div className="site-grid grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="measure mt-5 text-[0.98rem] text-dust">{t("blurb")}</p>
          <p className="mt-4 text-sm text-steel">
            {contact("phone")} · {contact("email")}
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-steel">
            {t("nav")}
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Link href="/" className="text-paper hover:text-dust">
                {nav("home")}
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-paper hover:text-dust">
                {nav("services")}
              </Link>
            </li>
            <li>
              <Link href="/produits" className="text-paper hover:text-dust">
                {nav("products")}
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="text-paper hover:text-dust">
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-paper hover:text-dust">
                {nav("contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-steel">
            {t("legal")}
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Link href="/confidentialite" className="text-paper hover:text-dust">
                {t("privacy")}
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-sm text-steel">{t("replace")}</p>
        </div>
      </div>
      <div className="site-grid border-t border-line py-5 text-sm text-steel">
        © {year} Transport M-A Roy inc. {t("rights")}
      </div>
    </footer>
  );
}
