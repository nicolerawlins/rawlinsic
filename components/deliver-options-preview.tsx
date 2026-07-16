"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* DRAFT ONLY — three interactive treatments of the "What we deliver" section,
   stacked so they can be compared side by side. Whichever wins gets lifted into
   automation-page.tsx and the other two deleted. Nothing here is merged as-is.

   All five deliverables use the approved copy verbatim; the only thing that
   changes between options is how it is presented. */

const DG = (
  <Link href="/capabilities#data-governance" className="dlv-link">data governance</Link>
);
const OCM = (
  <Link href="/capabilities#organizational-change-management" className="dlv-link">organizational change</Link>
);

type Item = {
  n: string;
  short: string;
  verb: string;
  tail: React.ReactNode;
  img: string;
  alt: string;
};

const ITEMS: Item[] = [
  { n: "01", short: "Data governance", verb: "establish", tail: <>effective {DG} practices.</>,
    img: "/images/pages/auto-data.webp", alt: "Structured, trusted data" },
  { n: "02", short: "Digital solutions", verb: "design", tail: <>and implement digital solutions that help people work smarter and more creatively.</>,
    img: "/images/pages/auto-optimize.webp", alt: "Designing digital solutions" },
  { n: "03", short: "Connected workflows", verb: "streamline", tail: <>and connect workflows to reduce manual effort and improve efficiency.</>,
    img: "/images/pages/auto-workflow.webp", alt: "Connected workflows" },
  { n: "04", short: "AI adoption", verb: "develop", tail: <>high-value AI use cases and a roadmap for adoption and scaling.</>,
    img: "/images/pages/auto-ai.webp", alt: "AI use cases and roadmap" },
  { n: "05", short: "Organizational change", verb: "guide", tail: <>{OCM} by cultivating the culture required for new ways of working.</>,
    img: "/images/pages/auto-team.webp", alt: "Teams adopting new ways of working" },
];

function Header({ tag, note }: { tag: string; note: string }) {
  return (
    <div className="dlv-tag-wrap">
      <span className="dlv-tag">{tag}</span>
      <span className="dlv-note">{note}</span>
    </div>
  );
}

function SectionHead() {
  return (
    <div className="aam-section-header">
      <p className="section-label"><span className="gold-text">Driving Transformation</span></p>
      <h2 className="section-title">What we <em>deliver</em></h2>
    </div>
  );
}

/* ── A. Verb index ─────────────────────────────────────────────────────────
   The five sentences all start "We ___". That parallel is the design: the verb
   is set big in the same gold italic the section titles use, the rest reads
   underneath. Hover/focus raises the row. */
function OptionVerbIndex() {
  return (
    <section className="aam-section dlv-sec">
      <div className="aam-container">
        <Header tag="Option A — Verb index" note="Editorial. Hover a row. No new copy, no images." />
        <SectionHead />
        <ol className="dlv-a">
          {ITEMS.map((it) => (
            <li key={it.n} className="dlv-a-row" tabIndex={0}>
              <span className="dlv-a-num">{it.n}</span>
              <span className="dlv-a-body">
                <span className="dlv-a-head">
                  <span className="dlv-a-we">We</span>
                  <span className="dlv-a-verb">{it.verb}</span>
                </span>
                <span className="dlv-a-tail">{it.tail}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── B. Scroll-fill spine ──────────────────────────────────────────────────
   The gold rule the section already has, made continuous and tied to scroll:
   it fills as the list passes through the viewport and each deliverable lifts
   as the fill reaches it. No clicking at all. */
function OptionSpine() {
  const listRef = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);
  const [lit, setLit] = useState<number>(-1);

  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const el = listRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      /* the fill line tracks a point 55% down the viewport */
      const mark = window.innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
      setFill(p);
      const rows = Array.from(el.querySelectorAll<HTMLElement>(".dlv-b-row"));
      let last = -1;
      rows.forEach((row, i) => {
        const rr = row.getBoundingClientRect();
        if (rr.top + rr.height * 0.5 <= mark) last = i;
      });
      setLit(last);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="aam-section dlv-sec">
      <div className="aam-container">
        <Header tag="Option B — Scroll-fill spine" note="Scroll it. Nothing to click. No new copy, no images." />
        <SectionHead />
        <ol className="dlv-b" ref={listRef}>
          <span className="dlv-b-rail" aria-hidden="true">
            <span className="dlv-b-fill" style={{ height: `${fill * 100}%` }} />
          </span>
          {ITEMS.map((it, i) => (
            <li key={it.n} className={`dlv-b-row${i <= lit ? " lit" : ""}`}>
              <span className="dlv-b-dot" aria-hidden="true" />
              <span className="dlv-b-num">{it.n}</span>
              <span className="dlv-b-text">We {it.verb} {it.tail}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── C. Photo-swap rail ────────────────────────────────────────────────────
   Keeps the section's existing two-column shape, but the photo stops being
   decoration: hover a deliverable and the image cross-fades to match it. */
function OptionPhotoRail() {
  const [active, setActive] = useState(0);
  return (
    <section className="aam-section dlv-sec">
      <div className="aam-container">
        <Header tag="Option C — Photo-swap rail" note="Hover a line — the photo follows. Uses 5 existing images." />
        <SectionHead />
        <div className="dlv-c">
          <div className="dlv-c-stage">
            {ITEMS.map((it, i) => (
              <div key={it.n} className={`dlv-c-shot${i === active ? " on" : ""}`}>
                <Image src={it.img} alt={it.alt} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
            ))}
            <div className="dlv-c-scrim" />
            <span className="dlv-c-cap">{ITEMS[active].short}</span>
          </div>
          <ul className="dlv-c-list">
            {ITEMS.map((it, i) => (
              <li key={it.n}>
                <button
                  type="button"
                  className={`dlv-c-row${i === active ? " on" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="dlv-c-num">{it.n}</span>
                  <span className="dlv-c-text">We {it.verb} {it.tail}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function DeliverOptionsPreview() {
  return (
    <>
      <style>{CSS}</style>
      <div className="dlv-intro">
        <p className="section-label"><span className="gold-text">Draft — pick one</span></p>
        <h1 className="section-title">Three ways to do <em>What we deliver</em></h1>
        <p className="section-text">Same five deliverables, same words. Only the presentation changes.</p>
      </div>
      <OptionVerbIndex />
      <div className="section-divider"><div className="gold-line" /></div>
      <OptionSpine />
      <div className="section-divider"><div className="gold-line" /></div>
      <OptionPhotoRail />
    </>
  );
}

const CSS = `
.dlv-intro{max-width:1240px;margin:0 auto;padding:120px 60px 10px;text-align:center}
.dlv-intro .section-text{margin:14px auto 0}
.dlv-sec{padding-top:56px;padding-bottom:56px}
.dlv-tag-wrap{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:26px}
.dlv-tag{display:inline-block;background:rgba(220,230,242,.92);color:#0D0D0D;font-size:12px;font-weight:700;
  letter-spacing:.6px;text-transform:uppercase;border-radius:999px;padding:7px 14px}
.dlv-note{font-size:13px;color:rgba(196,216,242,.6)}
.dlv-link{color:#e8d5a0;text-decoration:underline;text-underline-offset:4px}

/* ── A. verb index ─────────────────────────────────────────────── */
.dlv-a{list-style:none;margin:44px 0 0;padding:0;border-top:1px solid rgba(196,216,242,.14)}
.dlv-a-row{display:flex;gap:26px;align-items:baseline;padding:26px 8px 26px 0;
  border-bottom:1px solid rgba(196,216,242,.14);cursor:default;
  transition:background .35s,padding-left .35s;outline:none}
.dlv-a-row:hover,.dlv-a-row:focus-visible{background:rgba(196,216,242,.05);padding-left:16px}
.dlv-a-num{flex:0 0 auto;width:44px;font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;
  font-size:20px;color:rgba(196,216,242,.4);transition:color .35s}
.dlv-a-row:hover .dlv-a-num,.dlv-a-row:focus-visible .dlv-a-num{color:#e8d5a0}
.dlv-a-body{display:flex;flex-direction:column;gap:6px}
.dlv-a-head{display:flex;align-items:baseline;gap:14px}
.dlv-a-we{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;
  font-size:clamp(1.5rem,2vw,1.9rem);color:rgba(255,255,255,.5)}
.dlv-a-verb{font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;font-style:italic;
  font-size:clamp(2.3rem,3.7vw,3.3rem);line-height:1;
  background:linear-gradient(145deg,#c9a84c,#e8d5a0,#d4b878);-webkit-background-clip:text;background-clip:text;color:transparent}
.dlv-a-tail{font-size:17px;line-height:1.7;color:#fff;max-width:760px}

/* ── B. scroll-fill spine ──────────────────────────────────────── */
.dlv-b{position:relative;list-style:none;margin:48px 0 0;padding:0 0 0 46px}
.dlv-b-rail{position:absolute;left:8px;top:6px;bottom:6px;width:2px;background:rgba(196,216,242,.16);border-radius:2px}
.dlv-b-fill{display:block;width:100%;border-radius:2px;background:linear-gradient(180deg,#c9a84c,#e8d5a0)}
.dlv-b-row{position:relative;padding:22px 0;display:flex;align-items:baseline;gap:20px;
  opacity:.4;transform:translateY(6px);transition:opacity .5s,transform .5s}
.dlv-b-row.lit{opacity:1;transform:none}
.dlv-b-dot{position:absolute;left:-42px;top:30px;width:10px;height:10px;border-radius:50%;
  background:#1A3251;border:2px solid rgba(196,216,242,.3);transition:background .4s,border-color .4s,box-shadow .4s}
.dlv-b-row.lit .dlv-b-dot{background:#e8d5a0;border-color:#e8d5a0;box-shadow:0 0 0 5px rgba(232,213,160,.15)}
.dlv-b-num{flex:0 0 auto;font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;
  font-size:26px;color:rgba(196,216,242,.45);transition:color .4s}
.dlv-b-row.lit .dlv-b-num{color:#e8d5a0}
.dlv-b-text{font-size:18px;line-height:1.75;color:#fff;max-width:820px}

/* ── C. photo-swap rail ────────────────────────────────────────── */
.dlv-c{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;margin-top:48px}
.dlv-c-stage{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:4/3}
.dlv-c-shot{position:absolute;inset:0;opacity:0;transition:opacity .6s ease,transform 6s ease;transform:scale(1.04)}
.dlv-c-shot.on{opacity:1;transform:scale(1)}
.dlv-c-scrim{position:absolute;inset:0;background:linear-gradient(135deg,rgba(19,36,58,.15),rgba(19,36,58,.55))}
.dlv-c-cap{position:absolute;left:20px;bottom:18px;font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;
  font-size:26px;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.5)}
.dlv-c-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}
.dlv-c-row{display:flex;gap:18px;align-items:baseline;width:100%;text-align:left;background:none;border:0;
  font:inherit;color:inherit;cursor:pointer;padding:16px 14px 16px 20px;border-radius:8px;
  border-left:2px solid rgba(196,216,242,.18);transition:border-color .35s,background .35s,transform .35s}
.dlv-c-row.on{border-left-color:#e8d5a0;background:rgba(196,216,242,.06);transform:translateX(5px)}
.dlv-c-row:focus-visible{outline:2px solid #E6CD86;outline-offset:2px}
.dlv-c-num{flex:0 0 auto;font-family:var(--font-cormorant),'Cormorant Garamond',Georgia,serif;
  font-size:19px;color:rgba(196,216,242,.4);transition:color .35s}
.dlv-c-row.on .dlv-c-num{color:#e8d5a0}
.dlv-c-text{font-size:16px;line-height:1.7;color:#fff}

@media (max-width:1003px){
  .dlv-intro{padding:96px 24px 6px}
}
@media (max-width:900px){
  .dlv-c{grid-template-columns:1fr;gap:26px}
}
@media (max-width:760px){
  .dlv-a-row{gap:14px;padding:20px 0}
  .dlv-a-num{width:28px;font-size:16px}
  .dlv-a-row:hover,.dlv-a-row:focus-visible{padding-left:6px}
  .dlv-a-tail{font-size:16px}
  .dlv-b{padding-left:36px}
  .dlv-b-dot{left:-34px;top:28px}
  .dlv-b-text{font-size:16px}
  .dlv-b-num{font-size:22px}
}
`;
