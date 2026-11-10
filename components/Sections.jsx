"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { site, about, partners, services, process, projects, pricing, showreel, testimonials, nav, socials } from "./data";
import { Reveal, Label, Button, Media, Arrow, Roll, FitText } from "./ui";

const ease = [0.22, 1, 0.36, 1];

function SectionHead({ label, title, meta, center = false, sticky = false }) {
  return (
    <Reveal className={`sec-head ${center ? "is-center" : ""} ${sticky ? "is-sticky" : ""}`}>
      <Label>{label}</Label>
      <h2 className="display">{title}</h2>
      {meta && <p className="muted sec-meta">{meta}</p>}
    </Reveal>
  );
}

/* ───────────── ABOUT (with skewed overlap over the hero) ───────────── */
export function About() {
  const { scrollY } = useScroll();
  // measured: translateY 0→-220, skewY 0→7deg over the first ~834px of scroll
  const fy = useTransform(scrollY, [0, 834], [0, -220]);
  const skew = useTransform(scrollY, [0, 834], [0, 7]);
  return (
    <section id="about" className="sec about">
      <motion.div className="overlap" style={{ y: fy, skewY: skew }} />
      <div className="container about-grid">
        <Reveal y={60} scale={0.8} className="about-img">
          <Media src={about.image} tone="b" label="About image" />
        </Reveal>
        <div className="about-copy">
          <Reveal><Label>{about.label}</Label></Reveal>
          <Reveal as="h2" className="about-text">
            {about.text[0]}<span className="accent">{about.text[1]}</span>{about.text[2]}
          </Reveal>
          <div className="stats">
            {about.stats.map((s, k) => (
              <Reveal key={k} className="stat" delay={0.1 + k * 0.1}>
                <span className="stat-val display-sm">{s.value}</span>
                <span className="stat-label">{s.label}</span>
                <span className="stat-arrow"><Arrow rotate={135} size={16} /></span>
              </Reveal>
            ))}
          </div>
          <Reveal className="about-foot">
            <p className="lead">{about.body}</p>
            <Button>Contact Us</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────── PARTNERS (infinite logo marquee) ───────────── */
export function Partners() {
  return (
    <section className="sec partners">
      <div className="container">
        <Reveal className="partners-head">
          <Label>Valuable Partners</Label>
          <p className="partners-sub">Who Trust Us!</p>
        </Reveal>
        <div className="marquee fade-edges">
          <div className="marquee-track" style={{ "--dur": "35s" }}>
            {[...partners, ...partners].map((p, k) => (
              <div className="logo-card" key={k}>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── SERVICES (accordion) ───────────── */
function ServiceRow({ s, idx, open, onToggle }) {
  return (
    <Reveal y={30} className={`svc ${open ? "is-open" : ""}`} delay={0.05 * idx}>
      <button className="svc-head" onClick={onToggle} onMouseEnter={() => window.matchMedia("(hover:hover)").matches && onToggle(true)}>
        <h3 className="svc-num">{String(idx + 1).padStart(2, "0")}.</h3>
        <h3 className="svc-title">{s.title}</h3>
        <motion.span className="svc-plus" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.5, ease }}>
          <svg width="20" height="20" viewBox="0 0 20 20" stroke="#fff" strokeWidth="2"><path d="M10 3v14M3 10h14" /></svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="svc-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.6, ease }, opacity: { duration: 0.4 } }}
          >
            <div className="svc-inner">
              <p className="muted svc-desc">{s.desc}</p>
              <motion.div className="svc-img" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease, delay: 0.1 }}>
                <Media src={s.image} tone={["a", "b", "c", "d"][idx % 4]} label="" />
              </motion.div>
              <ul className="svc-list">
                {s.items.map((it, k) => (
                  <motion.li key={it + k} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease, delay: 0.15 + k * 0.06 }}>
                    <span className="bullet" />
                    {it}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export function Services() {
  const [open, setOpen] = useState(-1);
  return (
    <section id="services" className="sec services">
      <div className="container">
        <SectionHead label="Services" title={<>Strategic<br />Creative Services</>} meta={`${services.length} Services`} />
        <div className="svc-list-wrap" onMouseLeave={() => window.matchMedia("(hover:hover)").matches && setOpen(-1)}>
          {services.map((s, k) => (
            <ServiceRow key={k} s={s} idx={k} open={open === k} onToggle={(force) => setOpen(force === true ? k : open === k ? -1 : k)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── WORK PROCESS (staggered sticky cards) ───────────── */
export function Process() {
  // cards start at different heights and stick at the same top → they line up into one row
  const offsets = [0, 473, 1010, 1457];
  return (
    <section className="sec process">
      <div className="container">
        <SectionHead label="Work Process" title="From Vision To Reality" center sticky />
        <div className="process-wrap">
          {process.map((p, k) => (
            <div className="process-col" key={k} style={{ "--off": `${offsets[k]}px` }}>
              <Reveal y={60} scale={0.8} className="process-card" style={{ height: p.h }}>
                <div className="pc-top">
                  <span className="pc-bar" />
                  <p className="pc-num">//{String(k + 1).padStart(2, "0")}</p>
                  <p className="pc-title">{p.title}</p>
                </div>
                <div className="pc-body">
                  <span className="pc-dots"><i /><i /><i /></span>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── PROJECTS (zig-zag cards, parallax image) ───────────── */
function ProjectCard({ p, idx }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const iy = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const right = idx % 2 === 1;
  return (
    <div className={`proj ${right ? "is-right" : ""}`}>
      <Reveal className="proj-year display-sm" delay={0.2}>{p.year}</Reveal>
      <Reveal y={30} scale={0.8} className="proj-card">
        <a href="#" ref={ref} className="proj-link">
          <div className="proj-tags">
            {p.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
          <div className="proj-img">
            <motion.div style={{ y: iy }} className="proj-img-inner">
              <Media src={p.image} tone={["c", "a", "d"][idx % 3]} label="Project image" />
            </motion.div>
            <span className="proj-view"><Arrow size={22} /></span>
          </div>
          <div className="proj-foot">
            <p className="proj-title">{p.title}</p>
            <p className="muted">{p.desc}</p>
          </div>
        </a>
      </Reveal>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="sec projects">
      <div className="container">
        <SectionHead label="Projects" title={<>Trusted By<br />Clients Worldwide</>} meta={`${projects.length} Projects`} />
        <div className="proj-list">
          {projects.map((p, k) => (
            <ProjectCard key={k} p={p} idx={k} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── PRICING ───────────── */
export function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section className="sec pricing">
      <div className="container narrow">
        <Reveal className="sec-head is-center">
          <Label>Pricing</Label>
          <h2 className="display">Collaboration Options</h2>
        </Reveal>
        <Reveal y={30} scale={0.8} className="price-box">
          {pricing.map((p, k) => (
            <div className={`price ${k === 1 ? "is-alt" : ""}`} key={k}>
              <p className="price-name">{p.name}</p>
              <p className="muted">{p.desc}</p>
              <div className="price-row">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={p.fixed || (yearly ? "y" : "m")}
                    className="display-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    {p.fixed || (yearly ? p.yearly : p.monthly)}
                  </motion.p>
                </AnimatePresence>
                {p.toggle && (
                  <div className="toggle">
                    <span className={!yearly ? "on" : ""}>Monthly</span>
                    <button className={`switch ${yearly ? "is-on" : ""}`} onClick={() => setYearly((y) => !y)} aria-label="Toggle billing">
                      <motion.i layout transition={{ type: "spring", stiffness: 500, damping: 32 }} />
                    </button>
                    <span className={yearly ? "on" : ""}>Annually</span>
                  </div>
                )}
              </div>
              <p className="incl">What's included:</p>
              <ul className="feat">
                {p.features.map((f) => (
                  <li key={f}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M5 12l5 5L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.button}>Start a Project</Button>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── SHOWREEL (sticky zoom) ───────────── */
export function Showreel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.6 });
  // measured: holder scale .2→1, inner image 1.8→1, titles ±1200px → 0
  const hs = useTransform(p, [0.3, 0.98], [0.2, 1], { clamp: true });
  const is = useTransform(p, [0.3, 0.98], [1.8, 1], { clamp: true });
  const lx = useTransform(p, [0.3, 0.98], [-1200, 0], { clamp: true });
  const rx = useTransform(p, [0.3, 0.98], [1200, 0], { clamp: true });
  const br = useTransform(p, [0.3, 0.98], [20, 16]);
  return (
    <section className="showreel" ref={ref}>
      <div className="showreel-sticky">
        <motion.div className="showreel-holder" style={{ scale: hs, borderRadius: br }}>
          <motion.div className="showreel-inner" style={{ scale: is }}>
            {showreel.video ? (
              <video src={showreel.video} autoPlay muted loop playsInline />
            ) : (
              <Media src={showreel.image} tone="d" label="Showreel video" />
            )}
          </motion.div>
        </motion.div>
        <motion.p className="showreel-t left display" style={{ x: lx }}>{showreel.left}</motion.p>
        <motion.p className="showreel-t right display" style={{ x: rx }}>{showreel.right}</motion.p>
      </div>
    </section>
  );
}

/* ───────────── TESTIMONIALS (slider) ───────────── */
export function Testimonials() {
  const [[i, dir], set] = useState([0, 0]);
  const n = testimonials.length;
  const go = (d) => set(([c]) => [(c + d + n) % n, d]);
  const t = testimonials[i];
  return (
    <section className="sec testi">
      <div className="container">
        <SectionHead label="Testimonials" title={<>Trusted By<br />Clients Worldwide</>} meta="000 Clients" />
        <Reveal y={30} scale={0.8} className="testi-card">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={i}
              className="testi-slide"
              custom={dir}
              initial={{ x: dir >= 0 ? 120 : -120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir >= 0 ? -120 : 120, opacity: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="testi-img">
                <Media src={t.image} tone={["a", "c", "b"][i % 3]} label="Client photo" />
              </div>
              <div className="testi-copy">
                <h3 className="testi-quote">{t.quote}</h3>
                <div className="testi-who">
                  <div>
                    <p className="testi-name">{t.name}</p>
                    <p className="muted small">{t.role}</p>
                  </div>
                  <div className="stars">
                    <span>★★★★★</span>
                    <p>{t.rating}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
        <Reveal className="testi-nav">
          <button onClick={() => go(-1)}><Roll>Previous</Roll></button>
          <button onClick={() => go(1)}><Roll>Next</Roll></button>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── CTA / CONTACT ───────────── */
export function CTA() {
  return (
    <section id="contact" className="sec cta">
      <Reveal y={30} scale={0.8} className="cta-box">
        <div className="cta-bg">
          <Media tone="hero-a" label="" />
        </div>
        <form className="cta-form glass" onSubmit={(e) => e.preventDefault()}>
          <Label>Contact Us</Label>
          <h3 className="cta-title">Let's Talk</h3>
          <div className="cta-row">
            <label><span>First Name</span><input placeholder="Jane" /></label>
            <label><span>Last Name</span><input placeholder="Smith" /></label>
          </div>
          <label><span>Email Address</span><input type="email" placeholder="jane@mail.com" /></label>
          <button className="btn btn-accent btn-full" type="submit">
            <span className="btn-text"><Roll>Start a Project</Roll></span>
          </button>
        </form>
      </Reveal>
    </section>
  );
}

/* ───────────── FOOTER ───────────── */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-grid">
        <div className="footer-left">
          <div className="logo">
            <span className="logo-mark">{site.brand[0]}</span>
            <span className="logo-word">{site.brand}</span>
          </div>
          <p className="muted">Newsletter</p>
          <p className="lead">Stay updated with our latest projects and insights.</p>
          <form className="news" onSubmit={(e) => e.preventDefault()}>
            <input placeholder={site.email} />
            <button className="btn btn-accent btn-sm"><span className="btn-text"><Roll>Subscribe</Roll></span></button>
          </form>
          <div className="footer-contacts">
            <div>
              <p className="muted">For New Project</p>
              <a href={`mailto:${site.email}`}><Roll>{site.email}</Roll></a>
              <a href="#"><Roll>{site.phone}</Roll></a>
            </div>
            <div>
              <p className="muted">For General Inquiries</p>
              <a href={`mailto:${site.email}`}><Roll>{site.email}</Roll></a>
            </div>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <p className="muted">Menu</p>
            {nav.slice(0, 4).map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`}><Roll>{n}</Roll></a>
            ))}
          </div>
          <div>
            <p className="muted">Social Media</p>
            {socials.map((s) => (
              <a key={s} href="#"><Roll>{s}</Roll></a>
            ))}
          </div>
          <div>
            <p className="muted">Location</p>
            <p>{site.address}</p>
          </div>
          <p className="footer-copy">© {site.brand}. All rights reserved.</p>
        </div>
      </div>
      <motion.div className="footer-word-mask" initial="hide" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <motion.div
          className="footer-word"
          variants={{ hide: { y: "60%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
        >
          <FitText>{site.brand}<sup>®</sup></FitText>
        </motion.div>
      </motion.div>
    </footer>
  );
}
