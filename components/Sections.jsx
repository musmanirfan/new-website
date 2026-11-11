"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { site, about, partners, services, process, projects, websites, pricing, showreel, testimonials, nav, socials } from "./data";
import { Reveal, Label, Button, Media, Arrow, Roll, FitText, Icon, SocialLinks } from "./ui";
import Swarm from "./Swarm";
import SiteBuild, { VideoPreview } from "./SiteBuild";
import siteBoxes from "./siteBoxes.json";

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
        <Reveal y={60} scale={0.8} className="about-img portrait">
          <span className="pt-word" aria-hidden>AI</span>
          <span className="pt-ring" aria-hidden />
          <img className="pt-photo" src={about.image} alt="Muhammad Usman, AI Automation and CMS Developer in Karachi" width="621" height="801" loading="lazy" decoding="async" />
          {["tl", "tr", "bl", "br"].map((c) => <span key={c} className={`pt-corner ${c}`} aria-hidden />)}
          <span className="pt-status"><i /> Open to work</span>
          <span className="pt-chip c1" aria-hidden>n8n</span>
          <span className="pt-chip c2" aria-hidden>GoHighLevel</span>
          <span className="pt-chip c3" aria-hidden>Claude Code</span>
          <div className="pt-card">
            <b>Muhammad Usman</b>
            <small>AI Automation &amp; CMS Developer · Karachi</small>
          </div>
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
            <div className="about-body">
              <p className="lead">{about.body}</p>
              <SocialLinks items={socials} />
            </div>
            <Button>Let's Talk</Button>
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
          <Label>Where I've Worked</Label>
          <p className="partners-sub">Teams & Companies</p>
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
          <svg width="20" height="20" viewBox="0 0 20 20" stroke="var(--on-accent)" strokeWidth="2"><path d="M10 3v14M3 10h14" /></svg>
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
                {s.video ? <VideoPreview src={s.video} poster={s.poster} /> : <Media src={s.image} tone={["a", "b", "c", "d"][idx % 4]} label="" />}
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
        <SectionHead label="Services" title={<>What I<br />Build</>} meta={`${services.length} Services`} />
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
        <SectionHead label="Work Process" title="From Idea To Live System" center sticky />
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
  // AI case studies have no public link: render a plain card (no arrow, no click)
  const Tag = p.url ? "a" : "div";
  const linkProps = p.url ? { href: p.url, target: "_blank", rel: "noreferrer" } : {};
  return (
    <div className={`proj ${right ? "is-right" : ""}`}>
      <Reveal className="proj-year display-sm" delay={0.2}>{p.year}</Reveal>
      <Reveal y={30} scale={0.8} className="proj-card">
        <Tag {...linkProps} ref={ref} className={`proj-link ${p.url ? "" : "no-link"}`}>
          <div className="proj-tags">
            {p.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
          <div className="proj-img">
            <motion.div style={{ y: iy }} className="proj-img-inner">
              {p.video ? <VideoPreview src={p.video} poster={p.poster} /> : <Media src={p.image} tone={["c", "a", "d"][idx % 3]} label={p.image ? "" : "Demo video coming soon"} />}
            </motion.div>
            {p.url && <span className="proj-view"><Arrow size={22} /></span>}
          </div>
          <div className="proj-foot">
            <p className="proj-title">{p.title}</p>
            <p className="muted">{p.desc}</p>
          </div>
        </Tag>
      </Reveal>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="sec projects">
      <div className="container">
        <SectionHead label="Projects" title={<>AI Agents &<br />Automation</>} meta={`${projects.length} Systems`} />
        <div className="proj-list">
          {projects.map((p, k) => (
            <ProjectCard key={k} p={p} idx={k} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── WEBSITES (live web projects grid) ───────────── */
// One of each platform first, the rest behind "Load more"
const FEATURED = ["Aceestar Services", "Koma", "Streamline Pet Solutions", "HiiClub Social", "Janice Greenwald", "Gravy Work"];
const ORDERED = [...FEATURED.map((t) => websites.find((w) => w.title === t)).filter(Boolean), ...websites.filter((w) => !FEATURED.includes(w.title))];
const STEP = 6;

export function Websites() {
  const [shown, setShown] = useState(STEP);
  const list = ORDERED.slice(0, shown);
  const more = ORDERED.length - shown;
  const showLess = () => {
    setShown(STEP);
    const el = document.getElementById("websites");
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1 });
    else el.scrollIntoView();
  };
  return (
    <section id="websites" className="sec websites">
      <div className="container">
        <SectionHead label="Web Projects" title={<>Live Websites<br />I've Built</>} meta={`${websites.length} Live Sites`} />
        <div className="web-grid">
          {list.map((w, k) => (
            <Reveal key={w.url} y={30} scale={0.8} delay={0.05 * (k % 3)} className="web-card">
              <a href={w.url} target="_blank" rel="noopener noreferrer" className="web-link" aria-label={w.title + ", live website (opens in a new tab)"}>
                <div className="web-img">
                  {w.video ? (
                    <VideoPreview src={w.video} poster={w.poster} />
                  ) : w.image ? (
                    <SiteBuild src={w.image} boxes={siteBoxes[w.image.split("/").pop().replace(".jpg", "")]} seed={k} />
                  ) : (
                    <Media src={w.image} tone={["c", "a", "d"][k % 3]} label="" />
                  )}
                  <span className="proj-view"><Arrow size={22} /></span>
                </div>
                <div className="web-tags">
                  {w.stack.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                  {w.ai && <span className="tag tag-ai">AI-assisted</span>}
                </div>
                <h3 className="proj-title">{w.title}</h3>
                <p className="muted small">{w.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="web-more">
          <p className="muted small">Showing {list.length} of {ORDERED.length} live websites</p>
          {more > 0 ? (
            <button type="button" className="btn btn-light" onClick={() => setShown((n) => n + STEP)}>
              <span className="btn-text"><Roll>{"Load more (+" + Math.min(STEP, more) + ")"}</Roll></span>
              <span className="btn-icon"><span className="btn-icon-roll"><Arrow rotate={135} /><Arrow rotate={135} /></span></span>
            </button>
          ) : (
            <button type="button" className="btn btn-light" onClick={showLess}>
              <span className="btn-text"><Roll>Show less</Roll></span>
              <span className="btn-icon"><span className="btn-icon-roll"><Arrow rotate={-45} /><Arrow rotate={-45} /></span></span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────── PRICING ───────────── */
export function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="skills" className="sec pricing">
      <div className="container narrow">
        <Reveal className="sec-head is-center">
          <Label>Skills</Label>
          <h2 className="display">Skills & Tools</h2>
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
              <p className="incl">{p.incl || "What's included:"}</p>
              <ul className="feat">
                {p.features.map((f) => (
                  <li key={f}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M5 12l5 5L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.button}>{p.cta || "Start a Project"}</Button>
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
  // holder scale .2→1 (same zoom feel, shorter scroll), inner 1.15→1 so nothing gets cropped,
  // titles fly in, then fade out so they never sit on top of the swarm scene
  const hs = useTransform(p, [0.08, 0.75], [0.2, 1], { clamp: true });
  const is = useTransform(p, [0.08, 0.75], [1.15, 1], { clamp: true });
  const lx = useTransform(p, [0.08, 0.5], [-1200, 0], { clamp: true });
  const rx = useTransform(p, [0.08, 0.5], [1200, 0], { clamp: true });
  const to = useTransform(p, [0.5, 0.7], [1, 0], { clamp: true });
  const br = useTransform(p, [0.08, 0.75], [20, 16]);
  return (
    <section className="showreel" ref={ref}>
      <div className="showreel-sticky">
        <motion.div className="showreel-holder" style={{ scale: hs, borderRadius: br }}>
          <motion.div className="showreel-inner" style={{ scale: is }}>
            {showreel.video ? (
              <video src={showreel.video} autoPlay muted loop playsInline />
            ) : showreel.swarm ? (
              <Swarm />
            ) : (
              <Media src={showreel.image} tone="d" label="Showreel video" />
            )}
          </motion.div>
        </motion.div>
        <motion.p className="showreel-t left display" style={{ x: lx, opacity: to }}>{showreel.left}</motion.p>
        <motion.p className="showreel-t right display" style={{ x: rx, opacity: to }}>{showreel.right}</motion.p>
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
    <section id="experience" className="sec testi">
      <div className="container">
        <SectionHead label="Experience" title={<>Where I've<br />Worked</>} meta={`${testimonials.length} Roles`} />
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
                <Media src={t.image} tone={["a", "c", "b"][i % 3]} label="">
                  <div className="testi-logo">
                    {t.logo ? <img src={t.logo} alt={t.name} /> : <span className="display-sm">{t.name}</span>}
                  </div>
                </Media>
              </div>
              <div className="testi-copy">
                <h3 className="testi-quote">{t.quote}</h3>
                <div className="testi-who">
                  <div>
                    <p className="testi-name">{t.name}</p>
                    <p className="muted small">{t.role}</p>
                  </div>
                  <div className="stars">
                    <span>{t.tag}</span>
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
// Contact form: sends through Web3Forms when NEXT_PUBLIC_WEB3FORMS_KEY is set (free, delivers to your inbox),
// otherwise falls back to opening the visitor's email app with the message filled in.
import { FORM_KEY } from "./config";

export function CTA() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const label = { idle: "Send Message", sending: "Sending…", sent: "✓ Message sent", error: "Failed, try WhatsApp" }[status];
  async function submit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const f = new FormData(formEl);
    if (f.get("botcheck")) return; // spam bots fill hidden fields
    const name = `${f.get("first") || ""} ${f.get("last") || ""}`.trim();
    const subject = `Portfolio enquiry${name ? " from " + name : ""}`;
    if (!FORM_KEY) {
      const body = encodeURIComponent(`${f.get("message") || ""}\n\n${name}\n${f.get("email") || ""}`);
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: FORM_KEY, subject, from_name: "Portfolio website", name, email: f.get("email"), message: f.get("message") || "(no message)" }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus("sent");
      formEl.reset();
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  }
  return (
    <section id="contact" className="sec cta">
      <Reveal y={30} scale={0.8} className="cta-box">
        <div className="cta-bg">
          <Media tone="hero-a" label="" />
        </div>
        <form className="cta-form glass" onSubmit={submit}>
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
          <Label>Contact</Label>
          <h3 className="cta-title">Let's Talk</h3>
          <div className="cta-row">
            <label><span>First Name</span><input name="first" placeholder="Jane" required /></label>
            <label><span>Last Name</span><input name="last" placeholder="Smith" /></label>
          </div>
          <label><span>Email Address</span><input name="email" type="email" placeholder="jane@mail.com" required /></label>
          <label><span>Message</span><input name="message" placeholder="Tell me about your project or role" /></label>
          <button className="btn btn-accent btn-full" type="submit" disabled={status === "sending"}>
            <span className="btn-text"><Roll>{label}</Roll></span>
          </button>
          <div className="cta-social"><span className="muted small">Or reach me on</span><SocialLinks items={socials} size={16} /></div>
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
          <p className="muted">Resume</p>
          <p className="lead">Open to AI automation roles. Grab my CV or reach out directly.</p>
          <div className="cv-card">
            <span className="cv-file"><Icon name="File" size={22} /></span>
            <span className="cv-meta">
              <b>Muhammad_Usman_CV.pdf</b>
              <small className="muted">2 pages · AI Automation</small>
            </span>
            <a className="btn btn-accent cv-btn" href={site.cv} download="Muhammad_Usman_CV.pdf">
              <span className="btn-text"><Roll>Download CV</Roll></span>
              <span className="btn-icon">
                <span className="btn-icon-roll btn-icon-roll-y"><Icon name="Download" /><Icon name="Download" /></span>
              </span>
            </a>
          </div>
          <div className="footer-contacts">
            <a className="fc-item" href={`mailto:${site.email}`}><span className="fc-ic"><Icon name="Mail" /></span><span><small className="muted">Email</small><Roll>{site.email}</Roll></span></a>
            <a className="fc-item" href={site.phoneHref}><span className="fc-ic"><Icon name="Phone" /></span><span><small className="muted">Phone</small><Roll>{site.phone}</Roll></span></a>
            <a className="fc-item" href={site.whatsapp} target="_blank" rel="noreferrer"><span className="fc-ic"><Icon name="WhatsApp" /></span><span><small className="muted">WhatsApp</small><Roll>Chat with me</Roll></span></a>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <p className="muted">Menu</p>
            {nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`}><Roll>{n}</Roll></a>
            ))}
          </div>
          <div>
            <p className="muted">Social Media</p>
            {socials.map((s) => (
              <a key={s.name} className="soc" href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} (opens in a new tab)`}>
                <span className="soc-ic"><Icon name={s.name} size={17} /></span>
                <Roll>{s.name}</Roll>
              </a>
            ))}
          </div>
          <div>
            <p className="muted">Location</p>
            <p className="loc"><span className="soc-ic"><Icon name="Pin" size={17} /></span>{site.address}</p>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
        </div>
      </div>
      <motion.div className="footer-word-mask" initial="hide" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <motion.div
          className="footer-word"
          variants={{ hide: { y: "60%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
        >
          <FitText>{site.brand}</FitText>
        </motion.div>
      </motion.div>
    </footer>
  );
}
