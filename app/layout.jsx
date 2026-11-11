import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { site, socials } from "@/components/data";
import { SITE_URL } from "@/components/config";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"], variable: "--font-inter", display: "swap" });

const title = "Muhammad Usman | AI Automation Developer & WordPress Developer in Karachi";
const description =
  "Muhammad Usman is an AI Automation and CMS Developer in Karachi, Pakistan. He builds GoHighLevel CRM systems, n8n workflows, AI agents and fast, SEO-friendly websites on WordPress, Shopify, Webflow and Wix.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Muhammad Usman" },
  description,
  applicationName: "Muhammad Usman Portfolio",
  authors: [{ name: site.fullName, url: SITE_URL }],
  creator: site.fullName,
  keywords: [
    "Muhammad Usman",
    "Muhammad Usman developer",
    "Muhammad Usman Karachi",
    "musmanirfan",
    "AI automation developer",
    "AI automation expert Pakistan",
    "n8n developer",
    "GoHighLevel developer",
    "GoHighLevel automation",
    "CRM automation",
    "AI agents developer",
    "WordPress developer Karachi",
    "Shopify developer",
    "Webflow developer",
    "Wix developer",
    "website developer Pakistan",
    "SEO-friendly website",
    "Next.js developer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Muhammad Usman",
    title,
    description,
    locale: "en_US",
    firstName: "Muhammad",
    lastName: "Usman",
    username: "musmanirfan",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 } },
  category: "technology",
};

export const viewport = {
  themeColor: "#060a17",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Structured data so Google can connect the name, the job and the social profiles (LinkedIn, GitHub...)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: site.fullName,
      alternateName: ["Usman", "musmanirfan"],
      url: SITE_URL,
      image: `${SITE_URL}/images/usman-cutout.png`,
      jobTitle: "AI Automation & CMS Developer",
      description,
      email: `mailto:${site.email}`,
      telephone: "+923352309390",
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressRegion: "Sindh", addressCountry: "PK" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Federal Urdu University of Arts, Science & Technology (FUUAST)" },
        { "@type": "EducationalOrganization", name: "Saylani Mass IT Training (SMIT)" },
      ],
      worksFor: { "@type": "Organization", name: "StepTech" },
      knowsAbout: ["AI automation", "n8n", "GoHighLevel", "CRM automation", "AI agents", "Prompt engineering", "Webhooks", "REST APIs", "WordPress", "WooCommerce", "Shopify", "Webflow", "Wix", "Squarespace", "React.js", "Next.js", "JavaScript", "TypeScript"],
      sameAs: socials.filter((s) => !s.url.includes("wa.me")).map((s) => s.url),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Muhammad Usman | AI Automation Developer",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: title,
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Clash Display (free, Fontshare) */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
