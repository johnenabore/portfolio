import type { Metadata } from "next";
import { UiClickSound } from "./_components/ui-click-sound";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A personal portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased motion-safe:snap-y motion-safe:snap-proximity motion-safe:scroll-smooth motion-safe:[@media(pointer:coarse)]:snap-mandatory">
      <body>
        <UiClickSound />
        {children}
      </body>
    </html>
  );
}
