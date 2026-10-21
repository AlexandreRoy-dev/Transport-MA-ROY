import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import { homeGallery } from "@/lib/gallery";

export async function PhotoGrid() {
  const t = await getTranslations("gallery");

  return (
    <section className="bg-ink">
      <div className="site-grid pt-16 pb-8 md:pt-24">
        <Reveal>
          <h2 className="max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] uppercase">
            {t("title")}
          </h2>
          <p className="measure mt-5 text-dust">{t("lead")}</p>
        </Reveal>
      </div>
      <div className="grid grid-cols-2 gap-1 lg:grid-cols-4">
          {homeGallery.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={(index % 4) * 0.12}
              className="photo-tile relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={photo.src}
                alt={t(photo.altKey)}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </Reveal>
          ))}
      </div>
    </section>
  );
}
