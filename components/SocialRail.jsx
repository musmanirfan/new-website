"use client";
import { motion } from "motion/react";
import { socials, site } from "./data";
import { Icon } from "./ui";

// Fixed social rail on the left edge of every screen.
// Slides in after the intro, each icon expands to show its name on hover / keyboard focus.
const ITEMS = [...socials, { name: "Mail", url: `mailto:${site.email}`, label: "Email" }];

export default function SocialRail() {
  return (
    <motion.nav
      className="rail"
      aria-label="Social media"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay: 1.6 }}
    >
      <ul>
        {ITEMS.map((s, i) => (
          <motion.li key={s.name} initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.8 + i * 0.08, type: "spring", stiffness: 140, damping: 16 }}>
            <a href={s.url} target={s.url.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={s.url.startsWith("mailto:") ? `Email ${site.email}` : `${s.name} (opens in a new tab)`}>
              <span className="rail-ic"><Icon name={s.name} size={17} /></span>
              <span className="rail-txt">{s.label || s.name}</span>
            </a>
          </motion.li>
        ))}
      </ul>
      <span className="rail-line" aria-hidden />
    </motion.nav>
  );
}
