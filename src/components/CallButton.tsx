type CallButtonProps = { variant?: "solid" | "light"; size?: "md" | "sm"; className?: string };

export const PHONE_DISPLAY = "819 578-3441";
export const PHONE_TEL = "tel:+18195783441";

export function CallButton({ variant = "solid", size = "md", className = "" }: CallButtonProps) {
  const sizing = size === "sm" ? "min-h-11 px-4 text-[0.85rem]" : "min-h-12 px-6 text-base";
  const styles =
    variant === "solid"
      ? "bg-corten text-white hover:bg-corten-deep"
      : "border border-white/60 text-white hover:border-white hover:bg-white/10";
  return (
    <a
      href={PHONE_TEL}
      className={`btn-motion inline-flex items-center justify-center gap-2 font-semibold tracking-[0.04em] whitespace-nowrap ${sizing} ${styles} ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.1em] w-[1.1em]" fill="currentColor">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
      </svg>
      {PHONE_DISPLAY}
    </a>
  );
}
