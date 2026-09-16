import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./extended.css";
import "./content.css";
import "./media.css";
import "./music.css";
import { SiteShell } from "./_components/SiteShell";

const sans = localFont({
  src: "../public/Bebas_Neue,Big_Shoulders,Google_Sans_Flex,Urbanist/Google_Sans_Flex/GoogleSansFlex-VariableFont_GRAD,ROND,opsz,slnt,wdth,wght.ttf",
  variable: "--font-main",
  weight: "100 1000",
  display: "swap",
});
const cursive = localFont({ src: "../public/bacalisties/Bacalisties.ttf", variable: "--font-cursive", display: "swap" });

export const metadata: Metadata = { title: "Elton John Morden — Software Engineer", description: "Software engineer, product builder and founder based in Ghana." };
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="en" className={`${sans.variable} ${cursive.variable}`}><body><SiteShell>{children}</SiteShell></body></html>; }
