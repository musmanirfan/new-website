# Portfolio (Next.js)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Content badalna
Saara text aur images `components/data.js` mein hain.
- Images `public/images/` mein rakhein aur `image: "/images/file.jpg"` likhein (`null` = gradient placeholder).
- Showreel video: `showreel.video: "/images/reel.mp4"`.
- Brand ka naam `site.brand` — hero aur footer ka bada wordmark khud-ba-khud width fit ho jata hai.

## Animations (original se measure ki hui values)
- Smooth scroll: Lenis (`lerp 0.1`) — `components/SmoothScroll.jsx`
- Appear: spring `stiffness 80 / damping 18` — headings `y:30`, cards `y:30–60 + scale .8`
- Hero: scroll 0→630px par `scale 1→0.7`, 0→750px par `y 0→-170`
- About overlap: `translateY 0→-220` + `skewY 0→7°` (0→834px)
- Process cards: staggered sticky (offsets 0 / 473 / 1010 / 1457px)
- Showreel: 3600px sticky, holder `scale .2→1`, inner `1.8→1`, titles `±1200px→0`
