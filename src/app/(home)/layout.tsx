import { fontClassName } from "@/app/fonts";
import { rootMetadata } from "@/lib/root-metadata";
import "../globals.css";

export const metadata = rootMetadata;

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={fontClassName}>
      <body className="flex min-h-full flex-col bg-ink text-paper">{children}</body>
    </html>
  );
}
