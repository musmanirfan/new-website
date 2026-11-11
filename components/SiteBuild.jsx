"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

// Recreates the "swarm rebuild" look from the screen recordings:
// blank page + agent cursors -> blue wireframe boxes with tag labels ->
// each element fills in with the real site -> full page, then loops.

const COLORS = ["#ef4444", "#f59e0b", "#22c55e", "#06b6d4", "#3b82f6", "#a855f7", "#ec4899", "#14b8a6", "#eab308", "#6366f1", "#f97316", "#10b981"];
const TICK = 100;
const T_BOX = 10; // wireframes start (ticks)
const T_FILL = 34; // content starts
const T_FULL = 64; // full page
const T_END = 92; // loop

const FALLBACK = [
  { t: "nav", k: "text", x: 4, y: 3, w: 92, h: 7 },
  { t: "img", k: "media", x: 5, y: 3.5, w: 10, h: 6 },
  { t: "h1", k: "heading", x: 8, y: 22, w: 55, h: 16 },
  { t: "p", k: "text", x: 8, y: 41, w: 45, h: 8 },
  { t: "a", k: "button", x: 8, y: 53, w: 14, h: 6 },
  { t: "img", k: "media", x: 62, y: 18, w: 32, h: 42 },
  { t: "img", k: "media", x: 5, y: 68, w: 28, h: 28 },
  { t: "img", k: "media", x: 36, y: 68, w: 28, h: 28 },
  { t: "img", k: "media", x: 67, y: 68, w: 28, h: 28 },
];

function bg(src, b) {
  const w = Math.max(b.w, 0.5);
  const h = Math.max(b.h, 0.5);
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: `${10000 / w}% ${10000 / h}%`,
    backgroundPosition: `${w >= 100 ? 0 : (b.x / (100 - w)) * 100}% ${h >= 100 ? 0 : (b.y / (100 - h)) * 100}%`,
  };
}

function rnd(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function SiteBuild({ src, boxes, seed = 0, agents = 10 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [t, setT] = useState(-(seed % 5) * 4);

  // boxes in reading order (top to bottom, left to right)
  const list = useMemo(() => {
    const b = (boxes && boxes.length ? boxes : FALLBACK).filter((x) => x.y < 98);
    return [...b].sort((a, c) => a.y - c.y || a.x - c.x);
  }, [boxes]);
  const N = list.length;
  const layers = useMemo(() => N * 4 + 40 + ((seed * 7) % 60), [N, seed]);

  // stable jitter for cursors
  const jit = useMemo(() => {
    const r = rnd(seed + 11);
    return Array.from({ length: agents }, () => [r() * 2 - 1, r() * 2 - 1, r()]);
  }, [agents, seed]);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setT((v) => (v + 1 > T_END ? 0 : v + 1)), TICK);
    return () => clearInterval(id);
  }, [inView]);

  const boxCount = t < T_BOX ? 0 : Math.min(N, Math.ceil(((t - T_BOX) / (T_FILL - T_BOX - 2)) * N));
  const fillCount = t < T_FILL ? 0 : Math.min(N, Math.ceil(((t - T_FILL) / (T_FULL - T_FILL - 2)) * N));
  const full = t >= T_FULL;
  const tinted = t >= T_BOX + 6;
  const built = full ? layers : Math.round((fillCount / N) * layers * 0.85 + (boxCount / N) * layers * 0.15);

  // where each agent is
  const pos = jit.map(([jx, jy, k], i) => {
    if (t < T_BOX) {
      // swarm cluster in the middle, slowly spreading
      const spread = 6 + Math.max(0, t) * 2.2;
      return { x: 50 + jx * spread, y: 46 + jy * spread * 0.8 };
    }
    if (full) return { x: 10 + ((jx + 1) / 2) * 80 + Math.sin(t / 6 + i) * 4, y: 10 + ((jy + 1) / 2) * 80 + Math.cos(t / 7 + i) * 4 };
    const idx = t < T_FILL ? boxCount - 1 - (i % 4) : fillCount - 1 - (i % 4);
    const b = list[Math.max(0, Math.min(N - 1, idx + Math.floor(k * 3)))];
    return { x: b.x + b.w * (0.2 + k * 0.6), y: b.y + b.h * (0.3 + ((jy + 1) / 2) * 0.5) };
  });

  return (
    <div className="stb" ref={ref}>
      <div className="stb-scene">
        <div className={`stb-page ${tinted ? "is-tinted" : ""}`} style={tinted ? { backgroundImage: `url(${src})` } : undefined} />
        {list.map((b, i) => {
          const hasBox = i < boxCount && !full;
          const filled = i < fillCount;
          if (!hasBox && !filled) return null;
          return (
            <div key={i} className={`stb-box k-${b.k} ${hasBox && !filled ? "is-wire" : ""}`} style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}>
              {filled && <motion.div className="stb-fill" style={bg(src, b)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} />}
              {hasBox && !filled && b.w > 6 && <span className="stb-tag">{b.t}</span>}
            </div>
          );
        })}
        <motion.div className="stb-full" style={{ backgroundImage: `url(${src})` }} initial={false} animate={{ opacity: full ? 1 : 0 }} transition={{ duration: full ? 0.6 : 0.2 }} />
        {pos.map((p, i) => (
          <motion.svg
            key={i}
            className="stb-agent"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            initial={false}
            animate={{ left: `${p.x}%`, top: `${p.y}%` }}
            transition={{ type: "spring", stiffness: 70 + (i % 4) * 20, damping: 14 }}
            aria-hidden
          >
            <path d="M3 2l7 19 2.6-7.4L20 11z" fill={COLORS[i % COLORS.length]} />
          </motion.svg>
        ))}
      </div>
      <div className="stb-hud">
        <span className="stb-dots">{COLORS.slice(0, 4).map((c) => <i key={c} style={{ background: c }} />)}</span>
        {agents} agents · {Math.max(0, built)}/{layers} layers
      </div>
    </div>
  );
}

// Real screen recording, played only while visible
export function VideoPreview({ src, poster }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React does not always set the muted attribute, and browsers block unmuted autoplay
    v.muted = true;
    v.defaultMuted = true;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);
  return <video ref={ref} className="stb-video" src={src} poster={poster} muted loop playsInline preload="none" aria-label="Project demo video" />;
}
