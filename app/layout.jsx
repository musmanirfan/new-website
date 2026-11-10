import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/components/data";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"], variable: "--font-inter" });

export const metadata = {
  title: `${site.brand} - Portfolio`,
  description: site.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Clash Display (free, Fontshare) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
