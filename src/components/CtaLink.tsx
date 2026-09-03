import { Link } from "@/i18n/navigation";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
};

export function CtaLink({ href, children, variant = "solid" }: CtaLinkProps) {
  const base =
    "inline-flex min-h-12 items-center px-6 text-[0.8rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-200";
  const styles =
    variant === "solid"
      ? "bg-corten text-paper-hot hover:bg-corten-deep"
      : "border border-paper/40 text-paper hover:border-paper hover:bg-ink-soft";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
