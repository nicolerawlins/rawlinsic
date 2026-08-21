"use client";

import { useState } from "react";

/* DRAFT: an alternative treatment of "The Ecosystem" — the same four stages and
   the same header, drawn as expanding bars instead of a four-up grid.
   Self-contained so it can be dropped without touching the existing section.

   The four backgrounds walk a ramp from #C4D8F2 to #1D3759, each bar picking up
   near where the last left off, so the row reads as one gradient. It steps over
   the middle of that ramp on purpose: around 50% luminance neither black nor
   white text clears 4.5:1, so bars 2 and 3 sit either side of it. The two light
   bars take black text, the two dark ones white. */

type Ink = "black" | "white";

type Stage = {
  num: string;
  label: string;
  desc: string;
  from: string;
  to: string;
  ink: Ink;
  icon: React.ReactNode;
};

const ic = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const STAGES: Stage[] = [
  {
    num: "01",
    label: "Data Governance",
    desc: "People bring trust to data through data governance.",
    from: "#C4D8F2", to: "#ADC1DD", ink: "black",
    icon: ic(<><path d="M12 3l8 3v5c0 4.6-3.2 8.2-8 10-4.8-1.8-8-5.4-8-10V6z" /><path d="M9 12l2 2 4-4" /></>),
  },
  {
    num: "02",
    label: "Automation",
    desc: "Automation transforms workflows using clean, structured data.",
    from: "#A6BBD6", to: "#8FA4C1", ink: "black",
    icon: ic(<>{/* a loop that runs itself */}<path d="M21 12a9 9 0 0 0-9-9 9.7 9.7 0 0 0-6.7 2.7L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.7 9.7 0 0 0 6.7-2.7L21 16" /><path d="M21 21v-5h-5" /><path d="M12.9 8.3 9.8 12.9h2.3l-.7 2.9 3-4.4h-2.3z" /></>),
  },
  {
    num: "03",
    label: "AI",
    desc: "AI recognizes patterns, makes predictions, evaluates alternatives, picks the best option, and updates its internal model, adapting outputs over time.",
    from: "#4F6787", to: "#38506E", ink: "white",
    icon: ic(<><rect x="8" y="8" width="8" height="8" rx="1.5" /><path d="M10 8V5M14 8V5M10 19v-3M14 19v-3M8 10H5M8 14H5M19 10h-3M19 14h-3" /></>),
  },
  {
    num: "04",
    label: "Human Verification",
    desc: "People validate AI results by applying context and judgment, then turn AI outputs into actionable insights.",
    from: "#38506E", to: "#1D3759", ink: "white",
    icon: ic(<><circle cx="9.5" cy="7.5" r="3.2" /><path d="M3.5 19c0-3.3 2.7-6 6-6h.6" /><path d="M13.5 16.6l2.4 2.4 4.6-5" /></>),
  },
];

export default function AutomationEcosystemBars() {
  const [active, setActive] = useState(0);

  return (
    <section className="aam-section" id="benefits" style={{ scrollMarginTop: "80px" }}>
      <style>{CSS}</style>
      <div className="aam-container">
        <div className="aam-section-header reveal">
          <p className="section-label"><span className="gold-text">The Ecosystem</span></p>
          <h2 className="section-title">How data governance, automation, and <em>AI</em> work together</h2>
        </div>

        <p className="eco-hint">Hover or tap a panel to learn more</p>

        <div className="eco-bars">
          {STAGES.map((s, i) => (
            <button
              key={s.num}
              type="button"
              className={`eco-bar ink-${s.ink}${i === active ? " active" : ""}`}
              style={{ background: `linear-gradient(155deg, ${s.from} 0%, ${s.to} 100%)` }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={i === active}
            >
              <span className="eco-inner">
                <span className="eco-head">
                  <span className="eco-num">{s.num}</span>
                  {/* where this stage sits in the chain — the section's whole point
                      is that the four run in sequence */}
                  <span className="eco-rail" aria-hidden="true">
                    {STAGES.map((r, j) => (
                      <span key={r.num} className={`eco-pip${j === i ? " on" : ""}${j < i ? " past" : ""}`} />
                    ))}
                  </span>
                </span>

                {/* copy and artwork share the open bar's middle, so it fills
                    instead of leaving a hole under the number */}
                <span className="eco-body">
                  <span className="eco-content">
                    <span className="eco-h3">{s.label}</span>
                    <span className="eco-p">{s.desc}</span>
                    <span className="eco-accent" />
                  </span>
                  <span className="eco-art" aria-hidden="true">{s.icon}</span>
                </span>
              </span>
              <span className="eco-vlabel">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const CSS = `
.eco-hint{margin-top:8px;text-align:left;font-size:13px;letter-spacing:.6px;text-transform:uppercase;font-weight:600;color:#fff}

.eco-bars{display:flex;gap:12px;height:400px;margin-top:34px}
.eco-bar{position:relative;flex:1 1 0;min-width:96px;border-radius:16px;overflow:hidden;
  padding:0;font:inherit;text-align:left;color:inherit;cursor:pointer;
  border:1px solid var(--eco-edge);
  transition:flex .6s cubic-bezier(.2,.7,.2,1),box-shadow .4s,border-color .4s}
.eco-bar.active{flex:4 1 0;box-shadow:0 18px 50px rgba(0,0,0,.35)}
.eco-bar:focus-visible{outline:2px solid #E6CD86;outline-offset:3px}

/* one token set per ink, so nothing downstream has to know which bar it is */
.eco-bar.ink-black{--eco-fg:#0D0D0D;--eco-body:#16233a;--eco-accent:#1D3759;
  --eco-num:rgba(29,55,89,.5);--eco-num-on:#1D3759;--eco-art:rgba(29,55,89,.22);
  --eco-pip:rgba(29,55,89,.28);--eco-pip-on:#1D3759;--eco-edge:rgba(29,55,89,.22)}
.eco-bar.ink-white{--eco-fg:#fff;--eco-body:#e6edf6;--eco-accent:#c9a84c;
  --eco-num:rgba(255,255,255,.55);--eco-num-on:#fff;--eco-art:rgba(255,255,255,.18);
  --eco-pip:rgba(255,255,255,.3);--eco-pip-on:#E6CD86;--eco-edge:rgba(196,216,242,.18)}
.eco-bar.active.ink-black{border-color:rgba(29,55,89,.45)}
.eco-bar.active.ink-white{border-color:rgba(200,162,76,.55)}

/* fixed width, so the copy never reflows while the bar is animating open */
.eco-inner{position:absolute;inset:0;min-width:520px;padding:30px 32px;
  display:flex;flex-direction:column;gap:18px}
/* copy left, artwork right, both centred in the space under the number */
.eco-body{flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:space-between;gap:30px}

.eco-head{display:flex;align-items:center;justify-content:space-between}
.eco-num{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;
  font-weight:600;font-size:46px;line-height:1;color:var(--eco-num);transition:color .4s}
.eco-bar.active .eco-num{color:var(--eco-num-on)}

.eco-rail{display:flex;align-items:center;gap:7px;opacity:0;transition:opacity .4s .15s}
.eco-bar.active .eco-rail{opacity:1}
.eco-pip{width:20px;height:3px;border-radius:2px;background:var(--eco-pip)}
.eco-pip.past{background:var(--eco-pip);opacity:.75}
.eco-pip.on{width:34px;background:var(--eco-pip-on)}

.eco-art{flex:0 0 auto;display:flex;align-items:center;color:var(--eco-art);
  opacity:0;transition:opacity .45s .12s}
.eco-bar.active .eco-art{opacity:1}
.eco-art svg{width:216px;height:216px;stroke-width:.9}

.eco-content{flex:1 1 auto;display:flex;flex-direction:column;max-width:430px;opacity:0;transition:opacity .4s .15s}
.eco-bar.active .eco-content{opacity:1}
.eco-h3{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;
  font-weight:600;font-size:32px;line-height:1.1;color:var(--eco-fg);margin-bottom:10px}
.eco-p{font-size:16px;line-height:1.6;color:var(--eco-body)}
.eco-accent{width:46px;height:2px;background:var(--eco-accent);margin-top:18px}

.eco-vlabel{position:absolute;bottom:28px;left:0;right:0;margin:0 auto;height:320px;
  writing-mode:vertical-rl;transform:rotate(180deg);text-align:center;
  font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;
  font-weight:600;font-size:30px;letter-spacing:.4px;color:var(--eco-fg);
  opacity:1;transition:opacity .3s}
.eco-bar.active .eco-vlabel{opacity:0}

@media (max-width:1100px){
  .eco-art svg{width:112px;height:112px}
  .eco-inner{min-width:400px;padding:26px 24px}
  .eco-h3{font-size:28px}
}

/* Stacked on a phone: the ramp runs top to bottom. Height comes from content, so
   a closed row has to drop its copy out of flow entirely, not just fade it. */
@media (max-width:860px){
  .eco-bars{flex-direction:column;height:auto;gap:10px;margin-top:26px}
  .eco-bar{flex:0 0 auto;min-width:0;min-height:74px;border-radius:14px}
  .eco-bar.active{flex:0 0 auto;min-height:0}
  .eco-inner{position:relative;inset:auto;min-width:0;padding:20px;gap:14px}
  .eco-num{font-size:30px}
  .eco-rail{opacity:0}
  .eco-bar.active .eco-rail{opacity:1}
  .eco-pip{width:14px}
  .eco-pip.on{width:24px}

  .eco-body{display:none}
  .eco-bar.active .eco-body{display:flex;align-items:center;gap:14px}
  .eco-content{max-width:none}
  .eco-h3{font-size:24px;margin-bottom:8px}
  .eco-p{font-size:15px}
  .eco-accent{margin-top:14px}
  .eco-art svg{width:58px;height:58px}

  /* the name reads across, beside the number, instead of running vertically */
  .eco-vlabel{position:absolute;top:24px;left:72px;right:20px;bottom:auto;height:auto;margin:0;
    writing-mode:horizontal-tb;transform:none;text-align:left;font-size:20px;line-height:1.2}
}
`;
