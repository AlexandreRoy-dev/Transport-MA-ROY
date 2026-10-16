import { CARD_40_IMG, CARD_40_IMG_WIDE } from "@/lib/images";

// 40' card photo: wide crop on desktop, tighter crop on mobile. Same alt for both.
export function Card40Picture({ alt }: { alt: string }) {
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={CARD_40_IMG_WIDE} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CARD_40_IMG} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    </picture>
  );
}
