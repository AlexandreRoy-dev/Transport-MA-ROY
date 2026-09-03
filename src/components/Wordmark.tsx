export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="font-display leading-none text-paper">
      <span className="block text-[0.62rem] tracking-[0.28em] uppercase text-dust">
        Transport
      </span>
      <span
        className={`block tracking-[0.04em] uppercase ${
          compact ? "text-[1.55rem]" : "text-[1.85rem] sm:text-[2.1rem]"
        }`}
      >
        M-A Roy
      </span>
    </span>
  );
}
