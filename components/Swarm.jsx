"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { site, hero, websites } from "./data";

// "Agent swarm" scene: colored AI-agent cursors assemble a mini version of the
// portfolio block by block, with a live build log. Loops while in view.

const AGENTS = [
  { id: "A1", name: "agent-layout", color: "#2fe56f", home: [-8, -10] },
  { id: "A2", name: "agent-content", color: "#22d3ee", home: [108, -10] },
  { id: "A3", name: "agent-media", color: "#f472b6", home: [-8, 112] },
  { id: "A4", name: "agent-deploy", color: "#fbbf24", home: [108, 112] },
];

// x, y, w, h in % of the browser mock
const BLOCKS = [
  { key: "nav", agent: 0, box: [3, 4, 94, 8], log: "scaffolding navbar" },
  { key: "title", agent: 1, box: [5, 17, 60, 22], log: "writing hero headline" },
  { key: "sub", agent: 1, box: [5, 42, 52, 8], log: "adding intro copy" },
  { key: "chips", agent: 3, box: [5, 53, 58, 6], log: "wiring skill chips" },
  { key: "photo", agent: 2, box: [70, 17, 25, 42], log: "placing profile photo" },
  { key: "p1", agent: 2, box: [5, 65, 28, 30], log: "rendering", shot: 0 },
  { key: "p2", agent: 0, box: [36, 65, 28, 30], log: "rendering", shot: 1 },
  { key: "p3", agent: 3, box: [67, 65, 28, 30], log: "rendering", shot: 2 },
];
const HOLD = 6; // steps to hold the finished build before looping
const TOTAL = BLOCKS.length + 1 + HOLD;
const all = websites.filter((w) => w.image);

function Cursor({ color, label }) {
  return (
    <div className="sw-cursor">
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <path d="M3 2l7 19 2.6-7.4L20 11z" fill={color} stroke="#06101f" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span style={{ background: color }}>{label}</span>
    </div>
  );
}

function Block({ b, state, children }) {
  const [x, y, w, h] = b.box;
  return (
    <div className={`sw-block is-${state}`} style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, "--c": AGENTS[b.agent].color }}>
      <AnimatePresence>
        {state === "done" && (
          <motion.div
            className="sw-fill"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Swarm() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [step, setStep] = useState(-1);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1 >= TOTAL ? -1 : s + 1)), 750);
    return () => clearInterval(id);
  }, [inView]);

  // every new build round assembles the next 3 projects, so all of them get shown
  useEffect(() => {
    if (step === -1) setRound((r) => r + 1);
  }, [step]);
  const shots = [0, 1, 2].map((i) => all[(((round - 1) * 3 + i) % all.length + all.length) % all.length]);

  const state = (k) => (step > k ? "done" : step === k ? "building" : "idle");
  const deployed = step >= BLOCKS.length;

  // each agent goes to the block it is building / last built, else waits at home
  const target = AGENTS.map((a, ai) => {
    let t = null;
    BLOCKS.forEach((b, k) => {
      if (b.agent === ai && k <= step) t = b;
    });
    if (!t || step < 0) return a.home;
    if (deployed) return a.home;
    const [x, y, w, h] = t.box;
    return [x + w * 0.62, y + h * 0.55];
  });

  const logs = [];
  for (let k = Math.max(0, step - 3); k <= Math.min(step, BLOCKS.length - 1); k++) {
    const b = BLOCKS[k];
    const text = b.shot !== undefined ? `${b.log} ${shots[b.shot].title.toLowerCase()}` : b.log;
    logs.push({ k: `${round}-${k}`, agent: AGENTS[b.agent], text, done: step > k });
  }
  if (deployed) logs.push({ k: "dep", agent: AGENTS[3], text: "build passed, site deployed", done: true });

  return (
    <div className="swarm" ref={ref}>
      <div className="sw-hud sw-hud-tl">
        <span className="sw-dot" /> SWARM REBUILD // {AGENTS.length} AGENTS
      </div>
      <div className="sw-hud sw-hud-tr">{deployed ? "STATUS: LIVE" : step < 0 ? "STATUS: IDLE" : `BUILD ${String(step + 1).padStart(2, "0")}/${BLOCKS.length}`}</div>

      <div className="sw-mock">
        <div className="sw-bar">
          <i /><i /><i />
          <span>usman.dev</span>
        </div>
        <div className="sw-page">
          <Block b={BLOCKS[0]} state={state(0)}>
            <div className="sw-nav">
              <b><em>U</em> {site.brand}</b>
              <span>About · Projects · Contact</span>
            </div>
          </Block>
          <Block b={BLOCKS[1]} state={state(1)}>
            <div className="sw-title">AI AUTOMATION <em>DEVELOPER</em></div>
          </Block>
          <Block b={BLOCKS[2]} state={state(2)}>
            <p className="sw-sub">{hero.intro}</p>
          </Block>
          <Block b={BLOCKS[3]} state={state(3)}>
            <div className="sw-chips">
              {["n8n", "GoHighLevel", "AI Agents", "WordPress"].map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </Block>
          <Block b={BLOCKS[4]} state={state(4)}>
            <div className="sw-photo"><img src="/images/usman-cutout.png" alt="" /></div>
          </Block>
          {shots.map((s, i) => (
            <Block key={i} b={BLOCKS[5 + i]} state={state(5 + i)}>
              <div className="sw-card">
                <img src={s.image} alt="" />
                <span>{s.title}</span>
              </div>
            </Block>
          ))}

          {AGENTS.map((a, i) => (
            <motion.div
              key={a.id}
              className="sw-agent"
              animate={{ left: `${target[i][0]}%`, top: `${target[i][1]}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 14, mass: 0.8 }}
            >
              <Cursor color={a.color} label={a.name} />
            </motion.div>
          ))}

          <AnimatePresence>
            {deployed && (
              <motion.div className="sw-live" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 16 }}>
                ✓ Deployed
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="sw-log">
        <AnimatePresence initial={false}>
          {logs.map((l) => (
            <motion.p key={l.k} layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <b style={{ color: l.agent.color }}>{l.agent.name}</b> {l.text}
              <i>{l.done ? " ✓" : " …"}</i>
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
