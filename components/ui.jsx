"use client";
import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";

// Spring measured from the original site's appear animation
// (critically damped, ~1.2s settle, no overshoot).
export const appearSpring = { type: "spring", stiffness: 80, damping: 18, mass: 1 };

// Headings: translateY(30) + fade.  Cards: translateY(30|60) + scale(.8) + fade.
export function Reveal({ children, y = 30, scale = 1, delay = 0.1, className, style, as = "div", amount = 0.15 }) {
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ ...appearSpring, delay }}
    >
      {children}
    </M>
  );
}

// Text that rolls up on hover (duplicated text, like the original buttons/links)
export function Roll({ children, className = "" }) {
  return (
    <span className={`roll ${className}`}>
      <span className="roll-inner">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  );
}

export function Label({ children }) {
  return (
    <p className="label">
      <Spark /> {children}
    </p>
  );
}

export function Spark({ color = "var(--accent)", size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill={color} aria-hidden>
      <path d="M6 0c.3 3 1.6 4.7 6 6-4.4 1.3-5.7 3-6 6-.3-3-1.6-4.7-6-6 4.4-1.3 5.7-3 6-6z" />
    </svg>
  );
}

export function Arrow({ rotate = 0, size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden>
      <path d="M7 17L17 7M17 7H8M17 7v9" />
    </svg>
  );
}

export function Button({ children, variant = "accent", href = "#contact", full = false, onClick }) {
  return (
    <a href={href} onClick={onClick} className={`btn btn-${variant} ${full ? "btn-full" : ""}`}>
      <span className="btn-text">
        <Roll>{children}</Roll>
      </span>
      {!full && (
        <span className="btn-icon">
          <span className="btn-icon-roll">
            <Arrow />
            <Arrow />
          </span>
        </span>
      )}
    </a>
  );
}

// Scales a one-line word so it exactly fills its container's width (like the hero wordmark)
export function FitText({ children, className = "" }) {
  const box = useRef(null);
  const txt = useRef(null);
  useLayoutEffect(() => {
    const fit = () => {
      if (!box.current || !txt.current) return;
      txt.current.style.fontSize = "100px";
      const w = txt.current.scrollWidth;
      txt.current.style.fontSize = `${(100 * box.current.clientWidth) / w}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box.current);
    return () => ro.disconnect();
  }, [children]);
  return (
    <div ref={box} className="fit-box">
      <span ref={txt} className={`fit-text ${className}`}>{children}</span>
    </div>
  );
}

// Image slot: real image if provided, otherwise an on-brand gradient placeholder
export function Media({ src, tone = "a", className = "", style, label = "Image", children }) {
  return (
    <div className={`media ${className}`} style={style}>
      {src ? <img src={src} alt="" /> : <div className={`ph ph-${tone}`}><span>{label}</span></div>}
      {children}
    </div>
  );
}
