import { Link } from "@/i18n/navigation";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "light";
};

export const ctaBase =
  "inline-flex min-h-12 items-center justify-center px-6 text-[0.8rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-200";
export const ctaStyles = {
  solid: "bg-corten text-white hover:bg-corten-deep",
  ghost: "border border-paper/30 text-paper hover:border-paper",
  light: "border border-white/60 text-white hover:border-white hover:bg-white/10",
};

export function CtaLink({ href, children, variant = "solid" }: CtaLinkProps) {
  return (
    <Link href={href} className={`${ctaBase} ${ctaStyles[variant]}`}>
      {children}
    </Link>
  );
}
