import type { Metadata } from "next";
import "./globals.css" with { type: "module" };
import { Albert_Sans, Montserrat_Alternates } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Navbar from "@/app/_navigation/Navbar";
import SessionProvider from "@/app/_providers/SessionProvider";

export const experimental_ppr = true;

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-alternates",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
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
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "PrintForge - 3D Printing Community",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={`${albertSans.className} ${montserratAlternates.variable} grid min-h-dvh grid-rows-[5.35rem_1fr_5.35rem] gap-10`}
      >
        <SessionProvider>
          <NuqsAdapter>
            <Navbar />
            <main>{children}</main>
            <footer>
              <p>&copy; {new Date().getFullYear()} PrintForge</p>
            </footer>
          </NuqsAdapter>
        </SessionProvider>
      </body>
    </html>
  );
}
