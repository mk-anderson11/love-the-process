import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F3EDE1",
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
      <head>
        {/* Explicit meta tags as defense in case Next.js's metadata export
            isn't generating them as expected for iOS Safari. */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#F3EDE1" />
      </head>
      <body>
        <div className="ios-safe-bar" aria-hidden="true" />
        <Nav />
        <main className="main-safe-top min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
