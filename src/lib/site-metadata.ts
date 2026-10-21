import type { Metadata } from "next";

export const rootMetadata: Metadata = {
  metadataBase: new URL("https://transportmar.ca"),
  title: {
    default: "Transport M-A Roy",
    template: "%s",
  },
  robots: {
    index: true,
    follow: true,
  },
};
