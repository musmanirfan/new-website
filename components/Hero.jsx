"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { site, hero, nav } from "./data";
import { Media, Roll, Arrow, FitText } from "./ui";
import { scrollToId } from "./SmoothScroll";

const ease = [0.22, 1, 0.36, 1];

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString("en-US", { timeZone: site.timeZone, hour: "numeric", minute: "2-digit", second: "2-digit" }));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}

function Logo() {
  return (
    <a href="#home" className="logo" onClick={(e) => (e.preventDefault(), scrollToId("home"))}>
      <span className="logo-mark">{site.brand[0]}</span>
      <span className="logo-word">{site.brand}</span>
    </a>
  );
}

function TopBar({ open, onToggle }) {
  return (
    <div className="topbar">
      <Logo />
      <div className="topbar-loc">
        <p>{site.city}</p>
        <p className="mono"><Clock /></p>
      </div>
      <a className="topbar-mail" href={`mailto:${site.email}`}>
        <span className="dot" />
        <Roll>{site.email}</Roll>
      </a>
      <button className="menu-btn" onClick={onToggle} aria-expanded={open}>
        <span className={`burger ${open ? "is-open" : ""}`}>
          <i /><i /><i />
        </span>
        <Roll>{open ? "Close" : "Menu"}</Roll>
      </button>
    </div>
  );
}

export function MenuOverlay({ open, onClose }) {
  useEffect(() => {
    if (!window.__lenis) return;
    open ? window.__lenis.stop() : window.__lenis.start();
  }, [open]);
  const go = (id) => {
    onClose();
    setTimeout(() => scrollToId(id.toLowerCase()), 350);
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 0.25, duration: 0.3 } }}>
          <motion.div className="menu-blur" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />
          <motion.aside
            className="menu-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="menu-links">
              {nav.map((n, i) => (
                <div key={n} className="menu-link-mask">
                  <motion.a
                    href={`#${n.toLowerCase()}`}
                    onClick={(e) => (e.preventDefault(), go(n))}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.06 }}
                  >
                    <Roll>{n}</Roll>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div className="menu-foot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
              <div>
                <p className="muted">Contact</p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <a href="#">{site.phone}</a>
              </div>
              <div>
                <p className="muted">Socials</p>
                <a href="#">Youtube</a>
                <a href="#">Instagram</a>
                <a href="#">Twitter / X</a>
              </div>
            </motion.div>
          </motion.aside>
          <div className="menu-topbar">
            <TopBar open onToggle={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Hero() {
  const [i, setI] = useState(0);
  const [menu, setMenu] = useState(false);
  const n = hero.slides.length;
  const { scrollY } = useScroll();

  // Values measured on the original (1440x900): scale 1→0.7 over 0–630px,
  // translateY 0→-170 over 0–750px, then a slow -0.1px/px drift.
  const scale = useTransform(scrollY, [0, 630], [1, 0.7], { clamp: true });
  const y = useTransform(scrollY, (v) => (v <= 750 ? -v * 0.2267 : v <= 900 ? -170 : -170 - (v - 900) * 0.1));

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % n), 6000);
    return () => clearInterval(id);
  }, [n, i]);

  const next = (i + 1) % n;

  return (
    <>
      <motion.section id="home" className="hero" style={{ scale, y }}>
        {/* Background slides (crossfade + slow zoom) */}
        <div className="hero-bg">
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="hero-bg-slide"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.1, ease: "easeInOut" }, scale: { duration: 2.4, ease } }}
            >
              <Media src={hero.slides[i].image} tone={`hero-${hero.slides[i].tone}`} label="" />
            </motion.div>
          </AnimatePresence>
          {/* Loader: image fades up from black */}
          <motion.div className="hero-loader" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }} />
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.7 }}>
          <TopBar open={menu} onToggle={() => setMenu((m) => !m)} />
        </motion.div>

        <motion.div className="hero-heading" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.9 }}>
          <svg className="hero-pixel" width="20" height="20" viewBox="0 0 20 20" fill="#fff" aria-hidden>
            <rect x="7" y="0" width="6" height="6" /><rect x="0" y="7" width="6" height="6" /><rect x="14" y="7" width="6" height="6" /><rect x="7" y="14" width="6" height="6" />
          </svg>
          <h1>{hero.heading}</h1>
        </motion.div>

        <motion.div className="hero-thumb" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease, delay: 1 }}>
          <div className="hero-thumb-row">
            <button className="hero-thumb-img" onClick={() => setI(next)} aria-label="Next slide">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div key={next} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.8, ease }} style={{ position: "absolute", inset: 0 }}>
                  <Media src={hero.slides[next].image} tone={`hero-${hero.slides[next].tone}`} label="" />
                </motion.div>
              </AnimatePresence>
            </button>
            <button className="hero-thumb-arrow glass" onClick={() => setI(next)} aria-label="Next slide">
              <Arrow rotate={45} size={14} />
            </button>
          </div>
          <p className="hero-count">
            {String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}
          </p>
        </motion.div>

        <div className="hero-bottom">
          <div className="hero-word-mask">
            <motion.h2 className="hero-word" initial={{ y: "100%", opacity: 0.2 }} animate={{ y: "0%", opacity: 1 }} transition={{ duration: 1.4, ease, delay: 0.35 }}>
              <FitText>
                {site.brand}
                <sup>®</sup>
              </FitText>
            </motion.h2>
          </div>
          <motion.div className="hero-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 1.1 }}>
            <p className="hero-intro">{hero.intro}</p>
            <div className="hero-chips">
              <div className="marquee-track" style={{ "--dur": "22s" }}>
                {[...hero.chips, ...hero.chips].map((c, k) => (
                  <span className="chip glass" key={k}>{c}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <MenuOverlay open={menu} onClose={() => setMenu(false)} />
    </>
  );
}
