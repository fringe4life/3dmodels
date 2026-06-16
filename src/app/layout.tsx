import type { Metadata, Viewport } from "next";
import "./index.css";
import { RscBoundaryProvider } from "@rsc-boundary/next";
import { grid, gridItem } from "@styled-system/patterns";
import { Albert_Sans, Montserrat } from "next/font/google";
import { ENV } from "varlock/env";
import { ScrollProgress } from "@/components/scroll-progress";
import { TopLink } from "@/components/top-link";
import {
  HERO_IMAGE_SQUARE_HEIGHT,
  HERO_IMAGE_SQUARE_SRC,
  HERO_IMAGE_SQUARE_WIDTH,
} from "@/lib/hero-image";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-albert-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(ENV.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "PrintForge - 3D Printing Community",
    template: "%s | PrintForge",
  },
  description:
    "Discover and share 3D printing models with the PrintForge community. Browse thousands of user-submitted STL files for 3D printing.",
  keywords: [
    "3D printing",
    "STL files",
    "3D models",
    "makers",
    "community",
    "printforge",
  ],
  authors: [{ name: "PrintForge Team" }],
  creator: "PrintForge",
  publisher: "PrintForge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "PrintForge - 3D Printing Community",
    description:
      "Discover and share 3D printing models with the PrintForge community.",
    siteName: "PrintForge",
    images: [
      {
        url: HERO_IMAGE_SQUARE_SRC,
        width: HERO_IMAGE_SQUARE_WIDTH,
        height: HERO_IMAGE_SQUARE_HEIGHT,
        alt: "PrintForge - 3D Printing Community",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout = ({ children, navbar, footer }: LayoutProps<"/">) => (
  <html
    className={`${albertSans.variable} ${montserrat.variable}`}
    data-scroll-behavior="smooth"
    lang="en"
  >
    <body id="top">
      <ScrollProgress />
      {navbar}
      <div
        className={grid({
          blockSize: "full",
          minBlockSize: {
            base: "calc(100dvh - 4.6875rem)",
            _supportsScroll: "calc(100dvh - 4.8125rem)",
          },
          gridTemplateRows: "1fr 5.35rem",
          rowGap: { md: 10 },
        })}
      >
        <main className={gridItem({ blockSize: "full" })}>
          <RscBoundaryProvider>{children}</RscBoundaryProvider>
        </main>
        {footer}
      </div>
      <TopLink />
    </body>
  </html>
);

export default RootLayout;
