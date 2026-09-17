import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { homeGallery } from "@/lib/gallery";

export async function PhotoGrid() {
  const t = await getTranslations("gallery");

  return (
    <section className="bg-ink">
      <div className="site-grid py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(2.4rem,5vw,4.2rem)] uppercase">
            {t("title")}
          </h2>
          <p className="measure mt-5 text-dust">{t("lead")}</p>
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {homeGallery.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={(index % 3) * 0.15}
              className="relative aspect-[4/3] overflow-hidden bg-ink-soft"
            >
              <Image
                src={photo.src}
                alt={t(photo.altKey)}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
