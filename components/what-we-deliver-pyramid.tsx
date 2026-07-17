"use client";

import { useState } from "react";
import Link from "next/link";

/* "What we deliver" as an expanding pyramid. 01 sits at the top (widest) and the
   layers narrow down to 05; hovering a layer opens its line. Same blue ramp and
   number/icon language as the Ecosystem bars, stepped over the middle of the ramp
   so black-on-light and white-on-dark both stay readable.

   Copy is the approved "What we deliver" wording, verbatim, with the two internal
   capability links preserved. */

type Ink = "black" | "white";

type Layer = {
  n: string;
  short: string;
  line: React.ReactNode;
  from: string;
  to: string;
  ink: Ink;
  glyph: React.ReactNode;
};

const Glyph = ({ g }: { g: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {g}
  </svg>
);

const LAYERS: Layer[] = [
  {
    n: "01", short: "Data governance",
    line: <>We establish effective <Link href="/capabilities#data-governance" className="wwd-link">data governance</Link> practices.</>,
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
    line: <>We guide <Link href="/capabilities#organizational-change-management" className="wwd-link">organizational change</Link> by cultivating the culture required for new ways of working.</>,
    from: "#294264", to: "#1D3759", ink: "white",
    glyph: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9.5" r="2.2" /><path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5M15 14.5c2.3 0 4 1.8 4 4.5" /></>,
  },
];

export default function WhatWeDeliverPyramid() {
  const [open, setOpen] = useState(0);
  return (
    <section className="aam-section wwd-sec">
      <style>{CSS}</style>
      <div className="aam-container">
        <div className="aam-section-header reveal">
          <p className="section-label"><span className="gold-text">Driving Transformation</span></p>
          <h2 className="section-title">What we <em>deliver</em></h2>
        </div>
        <div className="wwd">
          {LAYERS.map((s, i) => (
            <button
              key={s.n}
              type="button"
              className={`wwd-l ink-${s.ink}${i === open ? " on" : ""}`}
              style={{
                background: `linear-gradient(100deg, ${s.from} 0%, ${s.to} 100%)`,
                /* 01 is first (top) and widest; each layer below is narrower */
                width: i === open ? "100%" : `${100 - i * 11}%`,
              }}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
              aria-expanded={i === open}
            >
              <span className="wwd-head">
                <span className="wwd-ic"><Glyph g={s.glyph} /></span>
                <span className="wwd-n">{s.n}</span>
                <span className="wwd-name">{s.short}</span>
              </span>
              <span className="wwd-body"><span className="wwd-p">{s.line}</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const CSS = `
.wwd-sec .ink-black{--w-fg:#0D0D0D;--w-body:#16233a;--w-soft:rgba(29,55,89,.55);--w-edge:rgba(29,55,89,.28)}
.wwd-sec .ink-white{--w-fg:#fff;--w-body:#e6edf6;--w-soft:rgba(255,255,255,.6);--w-edge:rgba(196,216,242,.22)}
.wwd-link{color:#e8d5a0;text-decoration:underline;text-underline-offset:4px}

.wwd{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:48px}
.wwd-l{border:1px solid var(--w-edge);border-radius:10px;cursor:pointer;font:inherit;text-align:left;
  color:var(--w-fg);padding:0;overflow:hidden;min-height:70px;
  transition:width .45s cubic-bezier(.2,.7,.2,1),min-height .45s,filter .35s,box-shadow .35s;
  filter:saturate(.85) brightness(.93)}
.wwd-l.on{min-height:134px;filter:none;box-shadow:0 14px 40px rgba(0,0,0,.3)}
.wwd-l:focus-visible{outline:2px solid #E6CD86;outline-offset:3px}
.wwd-head{display:flex;align-items:center;gap:18px;padding:22px 28px 0}
.wwd-ic{width:28px;height:28px;flex:0 0 auto;color:var(--w-fg);opacity:.8}
.wwd-ic svg{width:100%;height:100%}
.wwd-n{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-size:28px;line-height:1;color:var(--w-soft)}
.wwd-name{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-size:31px;line-height:1.1;color:var(--w-fg)}
.wwd-body{display:block;max-height:0;opacity:0;overflow:hidden;transition:max-height .45s,opacity .35s}
.wwd-l.on .wwd-body{max-height:130px;opacity:1}
.wwd-p{display:block;font-size:16px;line-height:1.65;color:var(--w-body);padding:12px 28px 22px;max-width:760px}

@media (max-width:900px){
  .wwd-l{width:100% !important}
}
@media (max-width:560px){
  .wwd-head{gap:14px;padding:18px 20px 0}
  .wwd-n{font-size:24px}
  .wwd-name{font-size:25px}
  .wwd-p{padding:10px 20px 18px}
}
`;
