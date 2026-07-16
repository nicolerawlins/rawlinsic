"use client";

import { useState } from "react";

/* DRAFT ONLY — three infographic treatments of "What we deliver", in the same
   blue-panel language as the Ecosystem bars. Pick one; the rest get deleted.

   Same ramp discipline as the bars: the five backgrounds walk #C4D8F2 -> #1D3759
   but step over the middle of that ramp, where neither black nor white text
   clears 4.5:1. Two light cells take black text, three dark ones white.

   Copy is the approved "What we deliver" wording, verbatim. */

type Ink = "black" | "white";

type Cell = {
  n: string;
  short: string;
  line: string;
  from: string;
  to: string;
  ink: Ink;
  glyph: React.ReactNode;
};

/* the bare paths; each layout wraps them in its own <svg> */
const Glyph = ({ g }: { g: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {g}
  </svg>
);

const CELLS: Cell[] = [
  {
    n: "01", short: "Data governance",
    line: "We establish effective data governance practices.",
    from: "#C4D8F2", to: "#ADC1DD", ink: "black",
    glyph: <><path d="M12 3l8 3v5c0 4.6-3.2 8.2-8 10-4.8-1.8-8-5.4-8-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    n: "02", short: "Digital solutions",
    line: "We design and implement digital solutions that help people work smarter and more creatively.",
    from: "#A6BBD6", to: "#8FA4C1", ink: "black",
    glyph: <><path d="M5 3v4M3 5h4M19 15v4M17 17h4" /><path d="M12 4l2.2 5.8L20 12l-5.8 2.2L12 20l-2.2-5.8L4 12l5.8-2.2z" /></>,
  },
  {
    n: "03", short: "Connected workflows",
    line: "We streamline and connect workflows to reduce manual effort and improve efficiency.",
    from: "#4F6787", to: "#3E5778", ink: "white",
    glyph: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.5 6h7M17 8.2l-4 7.5M7 8.2l4 7.5" /></>,
  },
  {
    n: "04", short: "AI adoption",
    line: "We develop high-value AI use cases and a roadmap for adoption and scaling.",
    from: "#3B5475", to: "#2C4667", ink: "white",
    glyph: <><rect x="8" y="8" width="8" height="8" rx="1.5" /><path d="M10 8V5M14 8V5M10 19v-3M14 19v-3M8 10H5M8 14H5M19 10h-3M19 14h-3" /></>,
  },
  {
    n: "05", short: "Organizational change",
    line: "We guide organizational change by cultivating the culture required for new ways of working.",
    from: "#294264", to: "#1D3759", ink: "white",
    glyph: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9.5" r="2.2" /><path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5M15 14.5c2.3 0 4 1.8 4 4.5" /></>,
  },
];

function Tag({ tag, note }: { tag: string; note: string }) {
  return (
    <div className="ifg-tag-wrap">
      <span className="ifg-tag">{tag}</span>
      <span className="ifg-note">{note}</span>
    </div>
  );
}

function Head() {
  return (
    <div className="aam-section-header">
      <p className="section-label"><span className="gold-text">Driving Transformation</span></p>
      <h2 className="section-title">What we <em>deliver</em></h2>
    </div>
  );
}

/* ── 1. Honeycomb ────────────────────────────────────────────────────────
   Five equal cells — no order implied, which matches five services that
   aren't a sequence. Hover a cell, the panel beside it fills in. */
function Honeycomb() {
  const [a, setA] = useState(0);
  const c = CELLS[a];
  const hex = (i: number) => {
    const s = CELLS[i];
    return (
      <button
        key={s.n}
        type="button"
        className={`hx ink-${s.ink}${i === a ? " on" : ""}`}
        style={{ background: `linear-gradient(155deg, ${s.from} 0%, ${s.to} 100%)` }}
        onMouseEnter={() => setA(i)}
        onFocus={() => setA(i)}
        onClick={() => setA(i)}
        aria-label={s.short}
      >
        <span className="hx-in">
          <span className="hx-ic"><Glyph g={s.glyph} /></span>
          <span className="hx-n">{s.n}</span>
          <span className="hx-l">{s.short}</span>
        </span>
      </button>
    );
  };
  return (
    <section className="aam-section ifg-sec" id="comb" style={{ scrollMarginTop: "80px" }}>
      <div className="aam-container">
        <Tag tag="Option 1 — Honeycomb" note="Five equal cells. Hover one." />
        <Head />
        <div className="hx-wrap">
          <div className="hx-comb">
            <div className="hx-row">{[0, 1, 2].map(hex)}</div>
            <div className="hx-row hx-row2">{[3, 4].map(hex)}</div>
          </div>
          <div className="hx-detail">
            <span className="hx-d-n">{c.n}</span>
            <h3 className="hx-d-h">{c.short}</h3>
            <p className="hx-d-p">{c.line}</p>
            <span className="hx-d-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Wheel ────────────────────────────────────────────────────────────
   The five as segments of one ring — the "it's all one offer" read. Hover a
   segment: it lifts out, the hub names it, the line sits under the wheel. */
const CX = 200, CY = 200, R_OUT = 190, R_IN = 116;
const pol = (r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
};
const segPath = (i: number) => {
  const gap = 1.7;
  const a0 = i * 72 + gap, a1 = (i + 1) * 72 - gap;
  const [x0, y0] = pol(R_OUT, a0), [x1, y1] = pol(R_OUT, a1);
  const [x2, y2] = pol(R_IN, a1), [x3, y3] = pol(R_IN, a0);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${R_OUT} ${R_OUT} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)} A${R_IN} ${R_IN} 0 0 0 ${x3.toFixed(2)} ${y3.toFixed(2)} Z`;
};
const nudge = (i: number, d: number) => {
  const rad = ((i * 72 + 36 - 90) * Math.PI) / 180;
  return `translate(${(Math.cos(rad) * d).toFixed(2)} ${(Math.sin(rad) * d).toFixed(2)})`;
};

function Wheel() {
  const [a, setA] = useState(0);
  const c = CELLS[a];
  return (
    <section className="aam-section ifg-sec" id="wheel" style={{ scrollMarginTop: "80px" }}>
      <div className="aam-container">
        <Tag tag="Option 2 — Wheel" note="One ring, five segments. Hover a wedge." />
        <Head />
        <div className="wh-wrap">
          <svg className="wh-svg" viewBox="0 0 400 400" role="img" aria-label="What we deliver, five segments">
            <defs>
              {CELLS.map((s, i) => (
                <linearGradient key={s.n} id={`whg${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={s.from} />
                  <stop offset="100%" stopColor={s.to} />
                </linearGradient>
              ))}
            </defs>
            {CELLS.map((s, i) => {
              const [tx, ty] = pol((R_OUT + R_IN) / 2, i * 72 + 36);
              return (
                <g
                  key={s.n}
                  className={`wh-seg${i === a ? " on" : ""}`}
                  transform={nudge(i, i === a ? 10 : 0)}
                  onMouseEnter={() => setA(i)}
                  onClick={() => setA(i)}
                  tabIndex={0}
                  onFocus={() => setA(i)}
                >
                  <path d={segPath(i)} fill={`url(#whg${i})`} />
                  <text x={tx} y={ty + 9} textAnchor="middle" className={`wh-num ink-${s.ink}`}>{s.n}</text>
                </g>
              );
            })}
            <circle cx={CX} cy={CY} r={R_IN - 12} className="wh-hub" />
            <svg className="wh-hub-ic" x={CX - 26} y={CY - 62} width="52" height="52" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {c.glyph}
            </svg>
            <text x={CX} y={CY + 16} textAnchor="middle" className="wh-hub-n">{c.n}</text>
            <text x={CX} y={CY + 48} textAnchor="middle" className="wh-hub-l">{c.short}</text>
          </svg>
          <p className="wh-line">{c.line}</p>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Pyramid ──────────────────────────────────────────────────────────
   Layers, widest at the base. NOTE: unlike the other two this asserts an
   order — governance as the foundation, change management at the top. Only
   use it if that claim is one Rawlins actually wants to make. */
function Pyramid() {
  const [a, setA] = useState(0);
  return (
    <section className="aam-section ifg-sec" id="pyramid" style={{ scrollMarginTop: "80px" }}>
      <div className="aam-container">
        <Tag tag="Option 3 — Pyramid" note="Hover a layer — it opens. Implies governance is the foundation." />
        <Head />
        <div className="py">
          {CELLS.map((s, i) => (
            <button
              key={s.n}
              type="button"
              className={`py-l ink-${s.ink}${i === a ? " on" : ""}`}
              style={{
                background: `linear-gradient(100deg, ${s.from} 0%, ${s.to} 100%)`,
                width: i === a ? "100%" : `${100 - (4 - i) * 11}%`,
              }}
              onMouseEnter={() => setA(i)}
              onFocus={() => setA(i)}
              onClick={() => setA(i)}
              aria-expanded={i === a}
            >
              <span className="py-head">
                <span className="py-ic"><Glyph g={s.glyph} /></span>
                <span className="py-n">{s.n}</span>
                <span className="py-l-name">{s.short}</span>
              </span>
              <span className="py-body"><span className="py-p">{s.line}</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DeliverInfographicOptions() {
  return (
    <>
      <style>{CSS}</style>
      <div className="ifg-intro">
        <p className="section-label"><span className="gold-text">Draft — pick one</span></p>
        <h1 className="section-title">Three infographics for <em>What we deliver</em></h1>
        <p className="section-text">Same five deliverables, same words, same blue panels as the Ecosystem bars.</p>
      </div>
      <Honeycomb />
      <div className="section-divider"><div className="gold-line" /></div>
      <Wheel />
      <div className="section-divider"><div className="gold-line" /></div>
      <Pyramid />
    </>
  );
}

const CSS = `
.ifg-intro{max-width:1240px;margin:0 auto;padding:120px 60px 10px;text-align:center}
.ifg-intro .section-text{margin:14px auto 0}
.ifg-sec{padding-top:52px;padding-bottom:52px}
.ifg-tag-wrap{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:24px}
.ifg-tag{display:inline-block;background:rgba(220,230,242,.92);color:#0D0D0D;font-size:12px;font-weight:700;
  letter-spacing:.6px;text-transform:uppercase;border-radius:999px;padding:7px 14px}
.ifg-note{font-size:13px;color:rgba(196,216,242,.6)}

/* ink tokens, same idea as the bars — scoped, so they can't collide with the
   Ecosystem bars' own .ink-black / .ink-white if both land on one page */
.ifg-sec .ink-black{--i-fg:#0D0D0D;--i-body:#16233a;--i-accent:#1D3759;--i-soft:rgba(29,55,89,.55);--i-edge:rgba(29,55,89,.28)}
.ifg-sec .ink-white{--i-fg:#fff;--i-body:#e6edf6;--i-accent:#c9a84c;--i-soft:rgba(255,255,255,.6);--i-edge:rgba(196,216,242,.22)}

/* ── 1. honeycomb ───────────────────────────────────────────── */
.hx-wrap{display:grid;grid-template-columns:auto 1fr;gap:56px;align-items:center;margin-top:8px}
.hx-comb{display:flex;flex-direction:column}
.hx-row{display:flex;gap:9px}
.hx-row2{margin-top:-44px;margin-left:80px}
.hx{width:151px;height:174px;border:0;padding:0;cursor:pointer;font:inherit;color:var(--i-fg);
  clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
  transition:transform .35s cubic-bezier(.2,.7,.2,1),filter .35s;filter:saturate(.85) brightness(.92)}
.hx.on{transform:scale(1.06);filter:none}
.hx:focus-visible{outline:2px solid #E6CD86;outline-offset:2px}
.hx-in{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;height:100%;padding:0 20px}
.hx-ic{width:30px;height:30px;color:var(--i-fg);opacity:.75}
.hx-ic svg{width:100%;height:100%}
.hx-n{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-size:22px;line-height:1;color:var(--i-soft)}
.hx-l{font-size:11.5px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;text-align:center;line-height:1.3;color:var(--i-fg)}
.hx-detail{border-left:2px solid rgba(200,168,76,.5);padding-left:30px;max-width:460px}
.hx-d-n{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-size:40px;line-height:1;
  background:linear-gradient(145deg,#c9a84c,#e8d5a0,#d4b878);-webkit-background-clip:text;background-clip:text;color:transparent}
.hx-d-h{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:32px;
  line-height:1.1;color:#fff;margin:8px 0 10px}
.hx-d-p{font-size:17px;line-height:1.7;color:#e6edf6;margin:0}
.hx-d-bar{display:block;width:46px;height:2px;background:#c9a84c;margin-top:20px}

/* ── 2. wheel ───────────────────────────────────────────────── */
.wh-wrap{display:flex;flex-direction:column;align-items:center;gap:26px}
.wh-svg{width:min(430px,86vw);height:auto;overflow:visible}
.wh-seg{cursor:pointer;transition:transform .4s cubic-bezier(.2,.7,.2,1);outline:none}
.wh-seg path{transition:filter .35s;filter:saturate(.85) brightness(.9)}
.wh-seg.on path{filter:none}
.wh-seg:focus-visible path{stroke:#E6CD86;stroke-width:2}
.wh-num{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-size:23px;pointer-events:none}
.wh-num.ink-black{fill:rgba(29,55,89,.75)}
.wh-num.ink-white{fill:rgba(255,255,255,.75)}
.wh-seg.on .wh-num.ink-black{fill:#1D3759}
.wh-seg.on .wh-num.ink-white{fill:#fff}
.wh-hub{fill:rgba(13,22,38,.55);stroke:rgba(200,168,76,.45);stroke-width:1.5;pointer-events:none}
.wh-hub-ic{color:#e8d5a0;pointer-events:none}
.wh-hub-n{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-size:30px;fill:#e8d5a0;pointer-events:none}
.wh-hub-l{font-size:13px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;fill:#fff;pointer-events:none}
.wh-line{font-size:18px;line-height:1.7;color:#fff;text-align:center;max-width:680px;margin:0;min-height:62px}

/* ── 3. pyramid ─────────────────────────────────────────────── */
.py{display:flex;flex-direction:column-reverse;align-items:center;gap:8px;margin-top:8px}
.py-l{border:1px solid var(--i-edge);border-radius:10px;cursor:pointer;font:inherit;text-align:left;
  color:var(--i-fg);padding:0;overflow:hidden;min-height:66px;
  transition:width .45s cubic-bezier(.2,.7,.2,1),min-height .45s,filter .35s,box-shadow .35s;
  filter:saturate(.85) brightness(.93)}
.py-l.on{min-height:130px;filter:none;box-shadow:0 14px 40px rgba(0,0,0,.3)}
.py-l:focus-visible{outline:2px solid #E6CD86;outline-offset:3px}
.py-head{display:flex;align-items:center;gap:16px;padding:20px 26px 0}
.py-ic{width:26px;height:26px;flex:0 0 auto;color:var(--i-fg);opacity:.8}
.py-ic svg{width:100%;height:100%}
.py-n{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-size:26px;line-height:1;color:var(--i-soft)}
.py-l-name{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-size:25px;line-height:1.1;color:var(--i-fg)}
.py-body{display:block;max-height:0;opacity:0;overflow:hidden;transition:max-height .45s,opacity .35s}
.py-l.on .py-body{max-height:120px;opacity:1}
.py-p{display:block;font-size:16px;line-height:1.65;color:var(--i-body);padding:12px 26px 20px;max-width:760px}

@media (max-width:1003px){ .ifg-intro{padding:96px 24px 6px} }
@media (max-width:900px){
  .hx-wrap{grid-template-columns:1fr;gap:30px;justify-items:center}
  .hx-detail{border-left:0;border-top:2px solid rgba(200,168,76,.5);padding-left:0;padding-top:22px;max-width:none}
  .hx{width:124px;height:143px}
  .hx-row2{margin-top:-36px;margin-left:66px}
  .hx-l{font-size:10px}
  .hx-in{padding:0 12px;gap:3px}
  .hx-ic{width:24px;height:24px}
  .py-l{width:100% !important}
  .wh-line{font-size:16px}
}
@media (max-width:560px){
  .hx{width:96px;height:111px}
  .hx-row{gap:6px}
  .hx-row2{margin-top:-28px;margin-left:51px}
  .hx-l{font-size:8.5px;letter-spacing:0}
  .hx-n{font-size:16px}
  .hx-ic{width:18px;height:18px}
  .hx-d-h{font-size:26px}
  .py-l-name{font-size:21px}
}
`;
