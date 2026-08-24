import type { Metadata } from "next";
import "@fontsource/ibm-plex-serif/400.css";
import "@fontsource/ibm-plex-serif/400-italic.css";
import "@fontsource/ibm-plex-serif/500.css";
import "@fontsource/ibm-plex-serif/600.css";
import "@fontsource/ibm-plex-serif/600-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Information Design — Rune Pettersson",
  description:
    "Een interactieve verkenning van 'Information Design' door Rune Pettersson.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
