"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Rawlins · Automation & Integration — interactive hub-and-spoke.
   Dark, high-tech take on the connected-system map.
   Click a node → modal with that capability's real case study.
   Self-contained: all styles scoped under `.rai-root`.
   Content sourced from "Real-World A&I Examples" (anonymized).
   ────────────────────────────────────────────────────────────── */

type Node = {
  id: string;
  title: string;
  tagline: string;
  accent: string;
  icon: JSX.Element;
  example: string;
  popupTitle: string;
  popupSubtitle: string;
  before: string;
  after: string;
  problem: string[];
  built: string[];
  result: string[];
  stack: string[];
  quote: string;
};

/* ── Icons (line marks) ── */
const iChart = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20V4M4 20h16" /><rect x="7" y="12" width="3" height="5" /><rect x="12" y="8" width="3" height="9" /><rect x="17" y="10" width="3" height="7" />
  </svg>
);
const iGauge = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15a8 8 0 0 1 16 0" /><path d="M12 15l4-3" /><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);
const iDatabase = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </svg>
);
const iFlow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="7" r="2.5" /><circle cx="6" cy="17" r="2.5" /><path d="M8.5 7H15l3.5 5-3.5 5H8.5" /><path d="M18.5 12H15" />
  </svg>
);
const iPin = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="3" width="12" height="18" rx="2.5" /><path d="M12 8.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /><path d="M12 12.5V17" />
  </svg>
);
const iHandoff = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8h13l-3-3M20 16H7l3 3" />
  </svg>
);

/* ── Node data + real case studies ── */
const NODES: Node[] = [
  {
    id: "reporting",
    title: "Reporting",
    tagline: "Real-time insights that drive action.",
    accent: "#4d9fff", icon: iChart,
    example: "Example 01",
    popupTitle: "Project Accounting & Reporting",
    popupSubtitle: "Project-based technical services firm",
    before: "Data everywhere, no operating picture",
    after: "One view, drill-down on demand",
    problem: [
      "Project, accounting, CRM, time & reporting data lived in separate systems",
      "Teams manually pushed data into spreadsheets to get usable views",
      "Leaders needed both high-level and department-level visibility",
      "Field staff had no easy mobile access to site maps, photos & docs",
    ],
    built: [
      "Migrated core data from Zoho into Monday.com",
      "Connected platforms with Make.com so data moved reliably",
      "Built dashboards that drill from high-level to project detail",
      "Shipped a mobile micro-app for project files from the field",
    ],
    result: [
      "Leaders got a clean operating view without rebuilding reports",
      "Project teams reached records and files from the field",
      "Reliable data flow cut manual handling and lifted confidence",
    ],
    stack: ["Monday.com", "Make.com", "QuickBooks", "QuickBooks Time", "Looker Studio", "Google Drive"],
    quote: "We already had the information — it was just spread across too many places. Once the systems were connected, we could finally see the project picture without rebuilding it every time.",
  },
  {
    id: "capacity",
    title: "Capacity",
    tagline: "See capacity before it becomes a bottleneck.",
    accent: "#f0b83f", icon: iGauge,
    example: "Example 04",
    popupTitle: "Capacity Planning",
    popupSubtitle: "Field services / drilling organization",
    before: "Capacity run on guesswork",
    after: "Capacity you can actually see",
    problem: [
      "Capacity depended on scattered updates and local knowledge",
      "No view of equipment location, booking length or downtime",
      "People & equipment constraints managed inconsistently",
      "Service windows — PTO for machines — were invisible in the plan",
    ],
    built: [
      "Built one capacity system in Monday.com + Make.com",
      "Templatized it to manage people and equipment together",
      "Tracked locations, booking windows, utilization & downtime",
      "Made unavailable equipment visible before it caused conflicts",
    ],
    result: [
      "See capacity before bottlenecks become emergencies",
      "Know what's booked, available or out of service",
      "Specialized assets scheduled right alongside people",
    ],
    stack: ["Monday.com", "Make.com"],
    quote: "We stopped relying on scattered updates to understand capacity. We could finally see what was available, what was booked, and where the constraint was coming from.",
  },
  {
    id: "single-source",
    title: "Single Source",
    tagline: "One source of truth across your team.",
    accent: "#35d08a", icon: iDatabase,
    example: "Example 05",
    popupTitle: "Single Source of Truth",
    popupSubtitle: "100+ employee manufacturing firm",
    before: "Workshops siloed, data unused",
    after: "One system, full-company view",
    problem: [
      "Manufacturing spread across workshops with poor office↔floor comms",
      "No reliable way to record time against a specific item built",
      "Data sat unused — no dashboards on production, staffing or capacity",
      "Heavy manual entry to match materials, time and cost",
    ],
    built: [
      "Rebuilt everything around a core Monday.com board structure",
      "One source of truth with per-workshop permission levels",
      "Formulas + Make.com auto-calculate cost, materials, hours & assignment",
      "Added Tracket time tracking and DocuSign work orders inside Monday.com",
    ],
    result: [
      "Estimated time, actual time, team, cost & price all in one place",
      "Leaders track workshop speed, profitability, staffing & capacity",
      "Quotes and invoices automated; jobs assigned by capacity, not phone calls",
    ],
    stack: ["Monday.com", "Make.com", "Tracket", "DocuSign"],
    quote: "Transformed from multiple software solutions into a streamlined, easy-to-use single source of truth — full visibility over what's happening across the entire company.",
  },
  {
    id: "sales-project",
    title: "Sales → Project",
    tagline: "From opportunity to execution — connected.",
    accent: "#a78bfa", icon: iFlow,
    example: "Example 06",
    popupTitle: "BD → Project Handover",
    popupSubtitle: "130-person professional services firm",
    before: "Closed-won ran on memory",
    after: "Billing-ready in days, not weeks",
    problem: [
      "Handoff from BD to delivery & finance ran on email and memory",
      "Scope, fee, billing terms & owner moved late or incomplete",
      "Finance and PMs chased BD for info that should be settled at close",
      "Project setup dragged on for one to two weeks",
    ],
    built: [
      "Locked the few fields required before an opportunity can close-won",
      "Required scope, fee, terms, owner & kickoff date in Salesforce",
      "Automation pushes the project record into Monday.com at close",
      "Notified finance & delivery instantly with a standardized kickoff checklist",
    ],
    result: [
      "Setup went from 1–2 weeks of back-and-forth to billing-ready in days",
      "Finance stopped chasing BD for basic setup information",
      "PMs walked into kickoffs with everything they needed",
    ],
    stack: ["Salesforce", "Monday.com", "Make.com", "QuickBooks", "SharePoint", "Teams"],
    quote: "Project setup went from one to two weeks of back-and-forth to billing-ready in a few business days. Finance stopped chasing BD, and PMs walked into kickoffs with what they needed.",
  },
  {
    id: "field-reporting",
    title: "Field Reporting",
    tagline: "Capture field data that fuels better decisions.",
    accent: "#ff8a5c", icon: iPin,
    example: "Example 03",
    popupTitle: "Field Reporting",
    popupSubtitle: "Field-service / project delivery firm",
    before: "Records that vanished after the visit",
    after: "Captured on site, filed automatically",
    problem: [
      "Site-visit info existed but wasn't structured for later use",
      "Attachments and field details were hard to retrieve afterward",
      "Office staff had to chase individuals to see what happened",
    ],
    built: [
      "Added form links directly into Google Calendar events",
      "Monday.com forms create board items the moment field staff submit",
      "Attachments auto-file into the right Google Drive structure",
      "Connected field capture back into the project record",
    ],
    result: [
      "Field information became easy to find, reuse and report on",
      "Attachments landed in the right place automatically",
      "The office gained clean visibility into every site visit",
    ],
    stack: ["Monday.com", "Make.com", "Google Calendar", "Google Drive"],
    quote: "Our team was already capturing the information. The value came from making sure it landed somewhere useful without another person having to chase it down.",
  },
  {
    id: "service-handoff",
    title: "Service Handoff",
    tagline: "Seamless transitions. No dropped information.",
    accent: "#2fd4d4", icon: iHandoff,
    example: "Example 02",
    popupTitle: "Project → Service Handoff",
    popupSubtitle: "Install & service / maintenance firm",
    before: "Service teams starting from zero",
    after: "History follows the work",
    problem: [
      "Completed projects moved to service, but the handoff was siloed",
      "Service teams had limited insight into what install had done",
      "Staff often started from scratch to understand project history",
      "PMs had no time to walk service through each project",
    ],
    built: [
      "Moved the workflow into Monday.com + Google Suite",
      "Tracked every client visit against the project history",
      "Google Calendar sync & on-site forms captured what was done",
      "Filed attachments and records into a supporting Drive structure",
    ],
    result: [
      "Service teams stopped starting from zero",
      "Project knowledge followed the work, not one PM's memory",
      "Delivery → service handoff became cleaner and faster",
    ],
    stack: ["Monday.com", "Make.com", "Google Suite", "Google Calendar"],
    quote: "The biggest change was that our service team stopped starting from zero. They could see the history, understand the work, and get to the issue faster.",
  },
];

const FOOTER_STATS = [
  { big: "360°", sub: "Visibility" },
  { big: "Real-Time", sub: "Insights" },
  { big: "Smarter", sub: "Decisions" },
  { big: "Stronger", sub: "Outcomes" },
];

/* connector endpoints (%) — match .rai-pos-* below, in NODES order */
const SPOKES = [
  [26, 16], [74, 16], [90, 50], [74, 84], [26, 84], [10, 50],
];

const XMark = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round"><path d="M7 7l10 10M17 7L7 17" /></svg>
);
const CheckMark = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
);

function toolDot(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("monday")) return "#ff3d57";
  if (n.includes("make")) return "#8b5cf6";
  if (n.includes("salesforce")) return "#1798c1";
  if (n.includes("quickbook")) return "#2ca01c";
  if (n.includes("docusign")) return "#ffb300";
  if (n.includes("tracket")) return "#2fd4d4";
  if (n.includes("looker")) return "#4d9fff";
  if (n.includes("google")) return "#4d9fff";
  if (n.includes("sharepoint") || n.includes("teams") || n.includes("outlook")) return "#4d9fff";
  return "#f0b83f";
}

export default function AutomationIntegrationInteractive() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const active = openIdx === null ? null : NODES[openIdx];

  const open = (idx: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setOpenIdx(idx);
  };
  const close = () => {
    setOpenIdx(null);
    lastFocused.current?.focus?.();
  };

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtnRef.current?.focus(), 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIdx]);

  return (
    <div className="rai-root">
      <style>{CSS}</style>
      <div className="rai-bg" aria-hidden="true">
        <span className="rai-grid" />
        <span className="rai-glow rai-glow-a" />
        <span className="rai-glow rai-glow-b" />
        <span className="rai-orb rai-orb-1" />
        <span className="rai-orb rai-orb-2" />
        <span className="rai-orb rai-orb-3" />
      </div>

      <main className="rai-canvas">
        {/* ── Header ── */}
        <header className="rai-header">
          <span className="rai-brand">R A W L I N S</span>
          <h1 className="rai-title">
            Automation <span className="rai-amp">&amp;</span> Integration
          </h1>
          <p className="rai-sub">One connected system. Full visibility. Smarter decisions.</p>
        </header>

        {/* ── Hub + nodes ── */}
        <div className="rai-stage" role="group" aria-label="Connected capabilities">
          <svg className="rai-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {SPOKES.map(([x, y], i) => (
              <g key={i}>
                <line x1="50" y1="50" x2={x} y2={y} className="rai-line-base" />
                <line x1="50" y1="50" x2={x} y2={y} className="rai-line-pulse" pathLength={100} style={{ animationDelay: `${i * 0.5}s`, stroke: NODES[i].accent }} />
              </g>
            ))}
          </svg>

          <div className="rai-hub">
            <span className="rai-hub-ring r1" aria-hidden="true" />
            <span className="rai-hub-ring r2" aria-hidden="true" />
            <div className="rai-hub-tile">
              <span className="rai-hub-r">R</span>
              <span className="rai-hub-stripe" aria-hidden="true" />
            </div>
          </div>

          {NODES.map((n, i) => (
            <button
              key={n.id}
              className={`rai-node rai-pos-${i}`}
              style={{ ["--acc" as string]: n.accent }}
              onClick={() => open(i)}
              aria-haspopup="dialog"
            >
              <span className="rai-node-icon">{n.icon}</span>
              <span className="rai-node-text">
                <span className="rai-node-title">{n.title}</span>
                <span className="rai-node-tag">{n.tagline}</span>
              </span>
              <span className="rai-node-cue" aria-hidden="true">View example →</span>
            </button>
          ))}
        </div>

        {/* ── Footer stat bar ── */}
        <div className="rai-statbar">
          {FOOTER_STATS.map((s, i) => (
            <div className="rai-stat" key={i}>
              <span className="rai-stat-big">{s.big}</span>
              <span className="rai-stat-sub">{s.sub}</span>
            </div>
          ))}
        </div>
      </main>

      {/* ── Modal ── */}
      {active && (
        <div className="rai-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="rai-modal" role="dialog" aria-modal="true" aria-labelledby="rai-modal-title" style={{ ["--acc" as string]: active.accent }}>
            <button ref={closeBtnRef} className="rai-close" onClick={close} aria-label="Close">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>

            <div className="rai-modal-scroll">
              {/* header */}
              <div className="rai-modal-head">
                <span className="rai-example">{active.example}</span>
                <h2 id="rai-modal-title" className="rai-modal-title">{active.popupTitle}</h2>
                <p className="rai-modal-subtitle">{active.popupSubtitle}</p>
              </div>

              {/* before / after */}
              <div className="rai-ba">
                <div className="rai-ba-card rai-ba-before">
                  <div className="rai-ba-label"><span className="rai-badge rai-badge-x"><XMark color="#fff" /></span>Before</div>
                  <p className="rai-ba-cap">{active.before}</p>
                  <div className="rai-ba-art rai-art-messy" aria-hidden="true">
                    <span className="rai-note n1" /><span className="rai-note n2" /><span className="rai-note n3" />
                    <span className="rai-note n4" /><span className="rai-note n5" />
                  </div>
                </div>
                <div className="rai-ba-arrow" aria-hidden="true">→</div>
                <div className="rai-ba-card rai-ba-after">
                  <div className="rai-ba-label"><span className="rai-badge rai-badge-check"><CheckMark color="#fff" /></span>After</div>
                  <p className="rai-ba-cap">{active.after}</p>
                  <div className="rai-ba-art rai-art-clean" aria-hidden="true">
                    <span className="rai-gantt g1" /><span className="rai-gantt g2" /><span className="rai-gantt g3" /><span className="rai-gantt g4" />
                  </div>
                </div>
              </div>

              {/* three columns */}
              <div className="rai-cols">
                <section className="rai-col rai-col-problem">
                  <h3 className="rai-col-head">
                    <span className="rai-col-ic">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L2 20h20L12 3z" /><path d="M12 10v4M12 17.5v.01" /></svg>
                    </span>The Problem
                  </h3>
                  <ul>
                    {active.problem.map((t, i) => (
                      <li key={i}><XMark color="#ff6b6b" /><span>{t}</span></li>
                    ))}
                  </ul>
                </section>
                <section className="rai-col rai-col-built">
                  <h3 className="rai-col-head">
                    <span className="rai-col-ic">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l3-1 9.5-9.5-2-2L4 18l-1 3z" /><path d="M14.5 6.5l3 3 2.2-2.2a1.6 1.6 0 0 0 0-2.3l-.7-.7a1.6 1.6 0 0 0-2.3 0z" /></svg>
                    </span>What We Built
                  </h3>
                  <ul>
                    {active.built.map((t, i) => (
                      <li key={i}><CheckMark color="#4d9fff" /><span>{t}</span></li>
                    ))}
                  </ul>
                </section>
                <section className="rai-col rai-col-result">
                  <h3 className="rai-col-head">
                    <span className="rai-col-ic">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h16" /><path d="M8 15l3.5-4 3 2.5L20 7" /><path d="M16 7h4v4" /></svg>
                    </span>The Result
                  </h3>
                  <ul>
                    {active.result.map((t, i) => (
                      <li key={i}><CheckMark color="#35d08a" /><span>{t}</span></li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* takeaway quote */}
              <blockquote className="rai-quote">{active.quote}</blockquote>

              {/* stack */}
              <div className="rai-stack">
                <div className="rai-stack-head"><span className="rai-stack-line" />The Stack We Connect<span className="rai-stack-line" /></div>
                <div className="rai-stack-items">
                  {active.stack.map((tool) => (
                    <span className="rai-chip" key={tool}>
                      <span className="rai-chip-dot" style={{ background: toolDot(tool) }} />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────  Styles  ──────────────────────────── */
const CSS = `
.rai-root{
  --gold:#f0b83f; --text:#eaf0fb; --muted:#8f9cb5;
  --panel:rgba(255,255,255,.045); --panel-brd:rgba(255,255,255,.09);
  position:relative; min-height:100vh; overflow:hidden;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  color:var(--text);
  background:radial-gradient(1200px 800px at 15% -10%, #12203f 0%, #0a1226 45%, #070c18 100%);
}
.rai-root *{box-sizing:border-box}

/* background layers */
.rai-bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.rai-grid{position:absolute;inset:-2px;
  background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);
  background-size:46px 46px;
  -webkit-mask-image:radial-gradient(900px 620px at 50% 34%,#000 0%,transparent 78%);
  mask-image:radial-gradient(900px 620px at 50% 34%,#000 0%,transparent 78%)}
.rai-glow{position:absolute;border-radius:50%;filter:blur(70px);opacity:.5}
.rai-glow-a{width:520px;height:520px;left:-140px;top:-120px;background:radial-gradient(circle,rgba(240,184,63,.42),transparent 65%)}
.rai-glow-b{width:560px;height:560px;right:-160px;bottom:-160px;background:radial-gradient(circle,rgba(77,159,255,.34),transparent 65%)}
.rai-orb{position:absolute;border-radius:50%;filter:blur(46px);opacity:.35;animation:rai-drift 18s ease-in-out infinite}
.rai-orb-1{width:230px;height:230px;left:10%;top:52%;background:radial-gradient(circle,rgba(53,208,138,.5),transparent 70%)}
.rai-orb-2{width:200px;height:200px;right:14%;top:20%;background:radial-gradient(circle,rgba(167,139,250,.5),transparent 70%);animation-delay:-6s}
.rai-orb-3{width:180px;height:180px;left:46%;bottom:6%;background:radial-gradient(circle,rgba(47,212,212,.42),transparent 70%);animation-delay:-11s}
@keyframes rai-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(24px,-26px)}}

.rai-canvas{position:relative;z-index:1;max-width:940px;margin:0 auto;padding:52px 28px 44px}

/* header */
.rai-header{margin-bottom:22px}
.rai-brand{font-size:12px;letter-spacing:6px;font-weight:700;color:var(--gold);text-shadow:0 0 22px rgba(240,184,63,.5)}
.rai-title{font-size:clamp(30px,6vw,56px);line-height:1.02;font-weight:800;letter-spacing:-.5px;margin:10px 0 0;
  text-transform:uppercase;color:#fff}
.rai-amp{background:linear-gradient(120deg,#f0b83f,#ffd98a);-webkit-background-clip:text;background-clip:text;color:transparent}
.rai-title:after{content:"";display:block;width:56px;height:4px;border-radius:3px;margin-top:16px;
  background:linear-gradient(90deg,#f0b83f,#ffd98a);box-shadow:0 0 20px rgba(240,184,63,.6)}
.rai-sub{margin:16px 0 0;font-size:clamp(15px,2.2vw,19px);color:var(--muted);font-weight:500}

/* stage */
.rai-stage{position:relative;height:680px;margin:20px 0 34px}
.rai-connectors{position:absolute;inset:0;width:100%;height:100%;overflow:visible;z-index:0}
.rai-line-base{stroke:rgba(255,255,255,.1);stroke-width:1;vector-effect:non-scaling-stroke}
.rai-line-pulse{stroke-width:2;fill:none;vector-effect:non-scaling-stroke;stroke-linecap:round;
  stroke-dasharray:14 86;stroke-dashoffset:100;opacity:.9;
  filter:drop-shadow(0 0 4px currentColor);
  animation:rai-flow 3.2s linear infinite}
@keyframes rai-flow{to{stroke-dashoffset:0}}

/* hub */
.rai-hub{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2;
  width:160px;height:160px;display:flex;align-items:center;justify-content:center}
.rai-hub-ring{position:absolute;border-radius:50%;border:1px solid rgba(240,184,63,.4)}
.rai-hub-ring.r1{width:100%;height:100%;animation:rai-pulse 3.4s ease-out infinite}
.rai-hub-ring.r2{width:100%;height:100%;animation:rai-pulse 3.4s ease-out infinite;animation-delay:1.7s}
@keyframes rai-pulse{0%{transform:scale(.78);opacity:.7}100%{transform:scale(1.5);opacity:0}}
.rai-hub-tile{position:relative;width:132px;height:132px;border-radius:26px;
  background:linear-gradient(155deg,rgba(35,52,90,.9),rgba(12,20,40,.92));
  border:1px solid rgba(255,255,255,.12);overflow:hidden;
  box-shadow:0 0 0 1px rgba(240,184,63,.18),0 24px 60px -18px rgba(0,0,0,.8),
    inset 0 1px 0 rgba(255,255,255,.14),0 0 60px rgba(240,184,63,.22);
  display:flex;align-items:center;justify-content:center}
.rai-hub-r{font-family:Georgia,"Times New Roman",serif;font-weight:700;font-size:72px;line-height:1;
  color:#fff;transform:translateY(-3px);position:relative;text-shadow:0 2px 18px rgba(0,0,0,.5)}
.rai-hub-r:after{content:"";position:absolute;left:-6px;bottom:14px;width:13px;height:40px;background:var(--gold);
  border-radius:3px;z-index:-1;box-shadow:0 0 16px rgba(240,184,63,.8)}
.rai-hub-stripe{position:absolute;left:0;right:0;bottom:0;height:5px;
  background:linear-gradient(90deg,#4d9fff,#f0b83f 55%,#35d08a);opacity:.9}

/* nodes */
.rai-node{position:absolute;transform:translate(-50%,-50%);z-index:3;
  width:238px;display:flex;align-items:center;gap:13px;text-align:left;cursor:pointer;
  background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.028));
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
  border:1px solid var(--panel-brd);border-radius:16px;padding:14px 15px 30px;
  box-shadow:0 20px 40px -22px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.06);
  transition:transform .24s cubic-bezier(.2,.8,.25,1),box-shadow .24s,border-color .24s,background .24s}
.rai-node:hover,.rai-node:focus-visible{transform:translate(-50%,-50%) translateY(-5px);
  border-color:color-mix(in srgb,var(--acc) 70%,transparent);
  box-shadow:0 26px 46px -20px rgba(0,0,0,.9),0 0 30px -6px var(--acc),inset 0 1px 0 rgba(255,255,255,.09);
  outline:none}
.rai-node-icon{flex:0 0 auto;width:44px;height:44px;border-radius:12px;
  background:color-mix(in srgb,var(--acc) 16%,transparent);
  border:1px solid color-mix(in srgb,var(--acc) 34%,transparent);
  color:var(--acc);display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 18px -4px var(--acc)}
.rai-node-icon svg{width:24px;height:24px;filter:drop-shadow(0 0 5px color-mix(in srgb,var(--acc) 60%,transparent))}
.rai-node-text{display:flex;flex-direction:column;gap:3px;min-width:0}
.rai-node-title{font-size:13px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:#fff}
.rai-node-tag{font-size:12px;line-height:1.35;color:var(--muted)}
.rai-node-cue{position:absolute;left:15px;bottom:9px;font-size:10.5px;font-weight:700;letter-spacing:.4px;
  text-transform:uppercase;color:var(--acc);opacity:0;transform:translateY(3px);transition:opacity .2s,transform .2s}
.rai-node:hover .rai-node-cue,.rai-node:focus-visible .rai-node-cue{opacity:1;transform:none}

/* desktop positions */
.rai-pos-0{left:26%;top:16%}
.rai-pos-1{left:74%;top:16%}
.rai-pos-2{left:90%;top:50%}
.rai-pos-3{left:74%;top:84%}
.rai-pos-4{left:26%;top:84%}
.rai-pos-5{left:10%;top:50%}

/* stat bar */
.rai-statbar{display:grid;grid-template-columns:repeat(4,1fr);
  background:linear-gradient(120deg,rgba(255,255,255,.06),rgba(255,255,255,.02));
  -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);
  border:1px solid var(--panel-brd);border-radius:20px;padding:26px 10px;
  box-shadow:0 24px 50px -26px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.06)}
.rai-stat{display:flex;flex-direction:column;align-items:center;text-align:center;padding:4px 14px;
  border-left:1px solid rgba(255,255,255,.1)}
.rai-stat:first-child{border-left:none}
.rai-stat-big{font-size:clamp(18px,2.6vw,26px);font-weight:800;color:#fff}
.rai-stat-sub{font-size:12px;color:var(--muted);margin-top:3px;letter-spacing:.5px}

/* ── modal ── */
.rai-overlay{position:fixed;inset:0;z-index:1000;background:rgba(4,8,18,.84);
  display:flex;align-items:flex-start;justify-content:center;padding:32px 18px;overflow-y:auto;
  animation:rai-fade .18s ease}
@keyframes rai-fade{from{opacity:0}to{opacity:1}}
.rai-modal{position:relative;width:100%;max-width:960px;
  background:linear-gradient(180deg,#101a33,#0b1428);
  border:1px solid rgba(255,255,255,.1);border-radius:22px;
  box-shadow:0 50px 110px -30px rgba(0,0,0,.9),0 0 0 1px rgba(255,255,255,.04),0 0 60px -10px var(--acc);
  animation:rai-pop .26s cubic-bezier(.2,.8,.25,1);overflow:hidden}
.rai-modal:before{content:"";position:absolute;left:0;right:0;top:0;height:3px;
  background:linear-gradient(90deg,transparent,var(--acc),transparent);box-shadow:0 0 18px var(--acc)}
@keyframes rai-pop{from{opacity:0;transform:translateY(16px) scale(.985)}to{opacity:1;transform:none}}
.rai-modal-scroll{padding:32px clamp(20px,4vw,44px) 36px}
.rai-close{position:absolute;top:14px;right:14px;z-index:5;width:38px;height:38px;border-radius:50%;
  border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#fff;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:background .15s,transform .15s}
.rai-close:hover{background:rgba(255,255,255,.14);transform:rotate(90deg)}

.rai-modal-head{margin-bottom:22px;padding-right:40px}
.rai-example{display:inline-block;color:var(--acc);font-size:11px;font-weight:800;letter-spacing:2.5px;
  text-transform:uppercase;padding:6px 13px;border-radius:20px;
  background:color-mix(in srgb,var(--acc) 14%,transparent);
  border:1px solid color-mix(in srgb,var(--acc) 40%,transparent)}
.rai-modal-title{font-size:clamp(25px,4.4vw,38px);font-weight:800;color:#fff;margin:14px 0 4px;letter-spacing:-.3px}
.rai-modal-subtitle{font-size:15px;color:var(--muted);font-style:italic;margin:0}

/* before / after */
.rai-ba{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:stretch;margin-bottom:24px}
.rai-ba-card{border-radius:16px;padding:16px 16px 18px;border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.03)}
.rai-ba-before{background:rgba(255,90,90,.07);border-color:rgba(255,90,90,.22)}
.rai-ba-after{background:rgba(53,208,138,.08);border-color:rgba(53,208,138,.24)}
.rai-ba-label{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:800;letter-spacing:1.5px;
  text-transform:uppercase;color:#fff}
.rai-badge{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.rai-badge-x{background:#e05656;box-shadow:0 0 14px rgba(224,86,86,.6)}
.rai-badge-check{background:#2e9e6a;box-shadow:0 0 14px rgba(46,158,106,.6)}
.rai-ba-cap{margin:8px 0 12px;font-size:14px;color:#eef2fb;font-weight:600}
.rai-ba-art{position:relative;height:98px;border-radius:10px;overflow:hidden}
.rai-art-messy{background:repeating-linear-gradient(0deg,rgba(255,255,255,.03),rgba(255,255,255,.03) 14px,rgba(255,90,90,.06) 14px,rgba(255,90,90,.06) 15px)}
.rai-note{position:absolute;width:32px;height:28px;border-radius:3px;box-shadow:0 5px 10px rgba(0,0,0,.4)}
.rai-note.n1{left:10px;top:12px;background:#f0a0a0;transform:rotate(-8deg)}
.rai-note.n2{left:50px;top:22px;background:#f3d488;transform:rotate(5deg)}
.rai-note.n3{left:94px;top:10px;background:#9ec5ef;transform:rotate(-4deg)}
.rai-note.n4{left:136px;top:24px;background:#a4e0b7;transform:rotate(7deg)}
.rai-note.n5{left:74px;top:54px;background:#f0a0a0;transform:rotate(3deg)}
.rai-art-clean{background:rgba(255,255,255,.03);border:1px solid rgba(53,208,138,.2);
  display:flex;flex-direction:column;justify-content:center;gap:9px;padding:0 14px}
.rai-gantt{height:10px;border-radius:6px}
.rai-gantt.g1{width:60%;background:#4d9fff;margin-left:6%;box-shadow:0 0 10px -2px #4d9fff}
.rai-gantt.g2{width:44%;background:#f0b83f;margin-left:26%;box-shadow:0 0 10px -2px #f0b83f}
.rai-gantt.g3{width:52%;background:#35d08a;margin-left:14%;box-shadow:0 0 10px -2px #35d08a}
.rai-gantt.g4{width:38%;background:#a78bfa;margin-left:40%;box-shadow:0 0 10px -2px #a78bfa}
.rai-ba-arrow{align-self:center;color:var(--acc);font-size:26px;font-weight:700;filter:drop-shadow(0 0 8px var(--acc))}

/* three columns */
.rai-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px}
.rai-col{border-radius:16px;padding:18px 17px;border:1px solid rgba(255,255,255,.07)}
.rai-col-problem{background:rgba(255,90,90,.06)}
.rai-col-built{background:rgba(77,159,255,.06)}
.rai-col-result{background:rgba(53,208,138,.06)}
.rai-col-head{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:800;letter-spacing:.6px;
  text-transform:uppercase;color:#fff;margin:0 0 14px}
.rai-col-ic{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;
  align-items:center;justify-content:center}
.rai-col-problem .rai-col-ic{color:#ff6b6b}
.rai-col-built .rai-col-ic{color:#4d9fff}
.rai-col-result .rai-col-ic{color:#35d08a}
.rai-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.rai-col li{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;line-height:1.5;color:#d8dfec}
.rai-col li svg{flex:0 0 auto;margin-top:2px}

/* quote */
.rai-quote{margin:0 0 24px;padding:14px 20px;border-left:3px solid var(--acc);
  background:rgba(255,255,255,.03);border-radius:0 12px 12px 0;
  font-family:Georgia,serif;font-style:italic;font-size:15.5px;line-height:1.6;color:#e7ecf6}

/* stack */
.rai-stack{border-top:1px solid rgba(255,255,255,.08);padding-top:22px}
.rai-stack-head{display:flex;align-items:center;justify-content:center;gap:14px;font-size:12px;font-weight:800;
  letter-spacing:2px;text-transform:uppercase;color:#fff}
.rai-stack-line{height:1px;width:56px;background:rgba(255,255,255,.16)}
.rai-stack-items{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin-top:18px}
.rai-chip{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#e7ecf6;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:11px;padding:8px 14px}
.rai-chip-dot{width:9px;height:9px;border-radius:50%;box-shadow:0 0 8px currentColor}

/* ── responsive ── */
@media (max-width:880px){
  .rai-connectors{display:none}
  .rai-stage{height:auto;display:flex;flex-direction:column;align-items:center;gap:16px;margin:22px 0}
  .rai-hub{position:static;transform:none;order:-1;width:auto;height:auto;margin-bottom:4px}
  .rai-hub-ring{display:none}
  .rai-hub-tile{width:104px;height:104px;border-radius:22px}
  .rai-hub-r{font-size:54px}
  .rai-node{position:static;transform:none;width:100%;max-width:440px;padding:14px 15px}
  .rai-node:hover,.rai-node:focus-visible{transform:translateY(-3px)}
  .rai-node-cue{position:static;opacity:.85;transform:none;margin-left:auto;align-self:center}
  .rai-ba{grid-template-columns:1fr}
  .rai-ba-arrow{transform:rotate(90deg)}
  .rai-cols{grid-template-columns:1fr}
}
@media (max-width:520px){
  .rai-canvas{padding:36px 16px 30px}
  .rai-statbar{grid-template-columns:repeat(2,1fr);gap:18px 0}
  .rai-stat:nth-child(odd){border-left:none}
}
@media (prefers-reduced-motion:reduce){
  .rai-line-pulse,.rai-hub-ring,.rai-orb{animation:none}
  .rai-line-pulse{opacity:.5}
}
`;
