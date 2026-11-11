import { SITE_URL } from "@/components/config";

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/cv.pdf`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];
}
