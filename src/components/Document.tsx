import { fontClassName } from "@/lib/fonts";

export function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} suppressHydrationWarning className={fontClassName}>
      <body className="flex min-h-full flex-col bg-ink text-paper">{children}</body>
    </html>
  );
}
