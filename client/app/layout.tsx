import type { Metadata } from "next";
import { preferenceScript } from "@/lib/preferences";
import { Delights } from "./_components/delights";
import { ProjectTransitionProvider } from "./_components/projects/project-transition";
import { ViewerProvider } from "./_components/viewer-provider";
import { UiClickSound } from "./_components/ui-click-sound";
import "./globals.css";

const title = "John Enabore | Developer Portfolio";
const description = "John Enabore’s portfolio. Explore web development and computer vision projects, view his résumé, or get in touch.";
const siteUrl = process.env.PORTFOLIO_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: new URL(siteUrl) }),
  title,
  description,
  openGraph: { type: "website", siteName: "John Enabore Portfolio", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script may add data-reduce-motion to <html> before hydration.
    <html lang="en" className="antialiased site-motion:scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
      </head>
      <body>
        <UiClickSound />
        <Delights />
        <ViewerProvider>
          <ProjectTransitionProvider>{children}</ProjectTransitionProvider>
        </ViewerProvider>
      </body>
    </html>
  );
}
