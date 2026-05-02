import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Courier_Prime } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crude Academy: Oil Refinery Education",
  description:
    "Plain-English education on oil refinery operations and technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${courierPrime.variable}`}
    >
      <body>
        <Nav />
        <main className="min-h-screen pt-[66px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
