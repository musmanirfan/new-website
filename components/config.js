// Kept in its own file: Sections.jsx imports the "process" steps from data.js, which shadows Node's process.env there.
// Web3Forms access key. It is a public key by design (Web3Forms docs: safe to use in client-side code),
// so it is kept here as the default; NEXT_PUBLIC_WEB3FORMS_KEY in .env.local overrides it if you ever rotate it.
export const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "ddac257a-96fc-4e84-84ff-105ca156dcc5";

// Live domain of the portfolio (used for canonical URL, sitemap, Open Graph).
// Set NEXT_PUBLIC_SITE_URL on the host (Netlify/Vercel) when the domain changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://usmanfolio.netlify.app").replace(/\/$/, "");
