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
  display: "swap",
  subsets: ["latin"],
  variable: "--font-albert-sans",
});

const montserrat = Montserrat({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  authors: [{ name: "PrintForge Team" }],
  creator: "PrintForge",
  description:
    "Discover and share 3D printing models with the PrintForge community. Browse thousands of user-submitted STL files for 3D printing.",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  keywords: [
    "3D printing",
    "STL files",
    "3D models",
    "makers",
    "community",
    "printforge",
  ],
  metadataBase: new URL(ENV.NEXT_PUBLIC_SITE_URL),
  openGraph: {
    description:
      "Discover and share 3D printing models with the PrintForge community.",
    images: [
      {
        alt: "PrintForge - 3D Printing Community",
        height: HERO_IMAGE_SQUARE_HEIGHT,
        url: HERO_IMAGE_SQUARE_SRC,
        width: HERO_IMAGE_SQUARE_WIDTH,
      },
    ],
    locale: "en_US",
    siteName: "PrintForge",
    title: "PrintForge - 3D Printing Community",
    type: "website",
  },
  publisher: "PrintForge",
  title: {
    default: "PrintForge - 3D Printing Community",
    template: "%s | PrintForge",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
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
          gridTemplateRows: "1fr 5.35rem",
          minBlockSize: {
            _supportsScroll: "calc(100dvh - 4.8125rem)",
            base: "calc(100dvh - 4.6875rem)",
          },
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
