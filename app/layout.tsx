import "./globals.css" with { type: "module" };
import { Albert_Sans, Montserrat_Alternates } from "next/font/google";
import Navbar from "@/app/components/Navbar";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={`${albertSans.className} ${montserratAlternates.variable}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
