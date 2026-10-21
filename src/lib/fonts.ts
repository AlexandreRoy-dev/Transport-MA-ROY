import { Atkinson_Hyperlegible, Barlow_Condensed } from "next/font/google";

const display = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
});

export const fontClassName = `${display.variable} ${body.variable} h-full antialiased`;
