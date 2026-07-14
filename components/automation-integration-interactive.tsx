"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Rawlins · Automation & Integration — interactive infographic.
   The 3D hub illustration is the centerpiece; each of the six
   nodes has a clickable hotspot that opens its real case study.
   Self-contained: all styles scoped under `.rai-root`.
   Content sourced from "Real-World A&I Examples" (anonymized).
   ────────────────────────────────────────────────────────────── */

const HUB_IMG = "/images/dev/ai-hub.png"; // 846 x 600

type Node = {
  id: string;
  title: string;
  accent: string;
  /* hotspot box + pulse-badge position, as % of the image */
  box: { left: number; top: number; width: number; height: number };
  badge: { x: number; y: number };
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

const NODES: Node[] = [
  {
    id: "reporting",
    title: "Reporting",
    accent: "#2f6fb5",
    box: { left: 13, top: 3, width: 37, height: 26 },
    badge: { x: 68, y: 50 },
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
    accent: "#d99a2b",
    box: { left: 57, top: 3, width: 39, height: 26 },
    badge: { x: 23, y: 46 },
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
    accent: "#2e9e6a",
    box: { left: 70, top: 38, width: 29, height: 28 },
    badge: { x: 34, y: 48 },
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
    accent: "#3a4d7a",
    box: { left: 62, top: 71, width: 37, height: 27 },
    badge: { x: 24, y: 50 },
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
    accent: "#d9702f",
    box: { left: 8, top: 68, width: 38, height: 29 },
    badge: { x: 72, y: 47 },
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
    accent: "#2a9d9d",
    box: { left: 2, top: 32, width: 33, height: 30 },
    badge: { x: 64, y: 47 },
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
  if (n.includes("tracket")) return "#2fbfbf";
  if (n.includes("looker")) return "#4d9fff";
  if (n.includes("google")) return "#4285f4";
  if (n.includes("sharepoint") || n.includes("teams") || n.includes("outlook")) return "#2f6fb5";
  return "#d99a2b";
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

      <main className="rai-canvas">
        {/* ── Header ── */}
        <header className="rai-header">
          <span className="rai-brand">R A W L I N S</span>
          <h1 className="rai-title">Automation <span className="rai-amp">&amp;</span> Integration</h1>
          <p className="rai-sub">One connected system. Full visibility. Smarter decisions.</p>
          <p className="rai-hint"><span className="rai-hint-dot" />Click a capability to see a real example</p>
        </header>

        {/* ── Interactive image ── */}
        <div className="rai-stage">
          <div className="rai-imgwrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HUB_IMG} alt="Rawlins Automation & Integration — one connected system" className="rai-img" width={846} height={600} />
            {NODES.map((n, i) => (
              <button
                key={n.id}
                className="rai-hotspot"
                style={{
                  left: `${n.box.left}%`, top: `${n.box.top}%`,
                  width: `${n.box.width}%`, height: `${n.box.height}%`,
                  ["--acc" as string]: n.accent,
                }}
                onClick={() => open(i)}
                aria-label={`${n.title} — view example`}
                aria-haspopup="dialog"
              >
                <span className="rai-badge" style={{ left: `${n.badge.x}%`, top: `${n.badge.y}%` }}>
                  <span className="rai-badge-ring" />
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
                <span className="rai-hotspot-chip">View example →</span>
              </button>
            ))}
          </div>
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
              <div className="rai-modal-head">
                <span className="rai-example">{active.example}</span>
                <h2 id="rai-modal-title" className="rai-modal-title">{active.popupTitle}</h2>
                <p className="rai-modal-subtitle">{active.popupSubtitle}</p>
              </div>

              <div className="rai-ba">
                <div className="rai-ba-card rai-ba-before">
                  <div className="rai-ba-label"><span className="rai-badge2 rai-badge-x"><XMark color="#fff" /></span>Before</div>
                  <p className="rai-ba-cap">{active.before}</p>
                  <div className="rai-ba-art rai-art-messy" aria-hidden="true">
                    <span className="rai-note n1" /><span className="rai-note n2" /><span className="rai-note n3" />
                    <span className="rai-note n4" /><span className="rai-note n5" />
                  </div>
                </div>
                <div className="rai-ba-arrow" aria-hidden="true">→</div>
                <div className="rai-ba-card rai-ba-after">
                  <div className="rai-ba-label"><span className="rai-badge2 rai-badge-check"><CheckMark color="#fff" /></span>After</div>
                  <p className="rai-ba-cap">{active.after}</p>
                  <div className="rai-ba-art rai-art-clean" aria-hidden="true">
                    <span className="rai-gantt g1" /><span className="rai-gantt g2" /><span className="rai-gantt g3" /><span className="rai-gantt g4" />
                  </div>
                </div>
              </div>

              <div className="rai-cols">
                <section className="rai-col rai-col-problem">
                  <h3 className="rai-col-head">
                    <span className="rai-col-ic">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L2 20h20L12 3z" /><path d="M12 10v4M12 17.5v.01" /></svg>
                    </span>The Problem
                  </h3>
                  <ul>{active.problem.map((t, i) => (<li key={i}><XMark color="#e05656" /><span>{t}</span></li>))}</ul>
                </section>
                <section className="rai-col rai-col-built">
                  <h3 className="rai-col-head">
                    <span className="rai-col-ic">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l3-1 9.5-9.5-2-2L4 18l-1 3z" /><path d="M14.5 6.5l3 3 2.2-2.2a1.6 1.6 0 0 0 0-2.3l-.7-.7a1.6 1.6 0 0 0-2.3 0z" /></svg>
                    </span>What We Built
                  </h3>
                  <ul>{active.built.map((t, i) => (<li key={i}><CheckMark color="#2f6fb5" /><span>{t}</span></li>))}</ul>
                </section>
                <section className="rai-col rai-col-result">
                  <h3 className="rai-col-head">
                    <span className="rai-col-ic">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h16" /><path d="M8 15l3.5-4 3 2.5L20 7" /><path d="M16 7h4v4" /></svg>
                    </span>The Result
                  </h3>
                  <ul>{active.result.map((t, i) => (<li key={i}><CheckMark color="#2e9e6a" /><span>{t}</span></li>))}</ul>
                </section>
              </div>

              <blockquote className="rai-quote">{active.quote}</blockquote>

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
  --navy:#1e2d4d; --gold:#d99a2b; --ink:#3a4661; --muted:#7b869b; --line:#e6eaf1;
  position:relative; min-height:100vh;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  color:var(--ink);
  background:radial-gradient(1200px 700px at 50% -8%, #ffffff 0%, #f2f5fa 55%, #eef2f8 100%);
}
.rai-root *{box-sizing:border-box}
.rai-canvas{position:relative;z-index:1;max-width:980px;margin:0 auto;padding:44px 24px 44px}

/* header */
.rai-header{text-align:center;margin-bottom:14px}
.rai-brand{font-size:12px;letter-spacing:6px;font-weight:700;color:var(--gold)}
.rai-title{font-size:clamp(28px,5.4vw,46px);line-height:1.05;font-weight:800;letter-spacing:-.5px;margin:10px 0 0;text-transform:uppercase;color:var(--navy)}
.rai-amp{color:var(--gold)}
.rai-sub{margin:12px 0 0;font-size:clamp(14px,2vw,18px);color:var(--muted);font-weight:500}
.rai-hint{display:inline-flex;align-items:center;gap:8px;margin:16px 0 0;font-size:12.5px;font-weight:700;
  letter-spacing:.4px;text-transform:uppercase;color:var(--navy);
  background:#fff;border:1px solid var(--line);border-radius:999px;padding:7px 15px;
  box-shadow:0 6px 16px -10px rgba(30,45,77,.4)}
.rai-hint-dot{width:8px;height:8px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 0 rgba(217,154,43,.55);animation:rai-ping 2s ease-out infinite}
@keyframes rai-ping{0%{box-shadow:0 0 0 0 rgba(217,154,43,.5)}70%,100%{box-shadow:0 0 0 8px rgba(217,154,43,0)}}

/* interactive image */
.rai-stage{margin:20px 0 30px}
.rai-imgwrap{position:relative;width:100%;max-width:846px;margin:0 auto;aspect-ratio:846/600}
.rai-img{display:block;width:100%;height:auto;user-select:none;-webkit-user-drag:none}

.rai-hotspot{position:absolute;margin:0;padding:0;border:0;background:transparent;cursor:pointer;
  border-radius:18px;transition:background .2s, box-shadow .2s;outline:none}
.rai-hotspot:hover,.rai-hotspot:focus-visible{
  background:color-mix(in srgb, var(--acc) 9%, transparent);
  box-shadow:0 0 0 1.5px color-mix(in srgb,var(--acc) 45%,transparent), 0 14px 30px -16px color-mix(in srgb,var(--acc) 70%,transparent)}
.rai-badge{position:absolute;transform:translate(-50%,-50%);width:26px;height:26px;border-radius:50%;
  background:var(--acc);display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 12px -2px color-mix(in srgb,var(--acc) 75%,transparent);transition:transform .2s}
.rai-badge-ring{position:absolute;inset:0;border-radius:50%;border:2px solid var(--acc);
  animation:rai-badgepulse 2.2s ease-out infinite}
@keyframes rai-badgepulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.1);opacity:0}}
.rai-hotspot:hover .rai-badge,.rai-hotspot:focus-visible .rai-badge{transform:translate(-50%,-50%) scale(1.15)}
.rai-hotspot-chip{position:absolute;left:50%;top:-14px;transform:translate(-50%,-6px);
  background:var(--navy);color:#fff;font-size:11px;font-weight:700;letter-spacing:.3px;white-space:nowrap;
  padding:5px 10px;border-radius:8px;opacity:0;pointer-events:none;transition:opacity .18s,transform .18s;z-index:4}
.rai-hotspot-chip:after{content:"";position:absolute;left:50%;bottom:-4px;transform:translateX(-50%);
  border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid var(--navy)}
.rai-hotspot:hover .rai-hotspot-chip,.rai-hotspot:focus-visible .rai-hotspot-chip{opacity:1;transform:translate(-50%,0)}

/* stat bar */
.rai-statbar{display:grid;grid-template-columns:repeat(4,1fr);background:var(--navy);
  border-radius:18px;padding:24px 10px;box-shadow:0 22px 44px -26px rgba(30,45,77,.6)}
.rai-stat{display:flex;flex-direction:column;align-items:center;text-align:center;padding:4px 14px;
  border-left:1px solid rgba(255,255,255,.14)}
.rai-stat:first-child{border-left:none}
.rai-stat-big{font-size:clamp(18px,2.6vw,26px);font-weight:800;color:#fff}
.rai-stat-sub{font-size:12px;color:#a9b6d2;margin-top:3px;letter-spacing:.5px}

/* ── modal (light) ── */
.rai-overlay{position:fixed;inset:0;z-index:1000;background:rgba(20,28,45,.55);
  display:flex;align-items:flex-start;justify-content:center;padding:32px 18px;overflow-y:auto;
  animation:rai-fade .18s ease}
@keyframes rai-fade{from{opacity:0}to{opacity:1}}
.rai-modal{position:relative;width:100%;max-width:960px;background:#fff;border-radius:22px;
  box-shadow:0 50px 100px -30px rgba(20,28,45,.55);
  overflow:hidden;border-top:4px solid var(--acc)}
.rai-modal-scroll{padding:32px clamp(20px,4vw,44px) 36px}
.rai-close{position:absolute;top:14px;right:14px;z-index:5;width:38px;height:38px;border-radius:50%;
  border:1px solid var(--line);background:#fff;color:var(--navy);cursor:pointer;display:flex;
  align-items:center;justify-content:center;transition:background .15s,transform .15s}
.rai-close:hover{background:#f1f4f9;transform:rotate(90deg)}
.rai-modal-head{margin-bottom:22px;padding-right:40px}
.rai-example{display:inline-block;background:var(--navy);color:#fff;font-size:11px;font-weight:700;
  letter-spacing:2.5px;text-transform:uppercase;padding:6px 13px;border-radius:20px}
.rai-modal-title{font-size:clamp(24px,4.2vw,36px);font-weight:800;color:var(--navy);margin:14px 0 4px;letter-spacing:-.3px}
.rai-modal-subtitle{font-size:15px;color:var(--muted);font-style:italic;margin:0}

.rai-ba{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:stretch;margin-bottom:24px}
.rai-ba-card{border-radius:16px;padding:16px 16px 18px;border:1px solid var(--line)}
.rai-ba-before{background:#fbf1f1;border-color:#f2dede}
.rai-ba-after{background:#eef7f1;border-color:#d9ecdf}
.rai-ba-label{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--navy)}
.rai-badge2{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.rai-badge-x{background:#e05656}
.rai-badge-check{background:#2e9e6a}
.rai-ba-cap{margin:8px 0 12px;font-size:14px;color:var(--ink);font-weight:600}
.rai-ba-art{position:relative;height:96px;border-radius:10px;overflow:hidden}
.rai-art-messy{background:repeating-linear-gradient(0deg,#fff,#fff 15px,#f4e9e9 15px,#f4e9e9 16px)}
.rai-note{position:absolute;width:32px;height:28px;border-radius:3px;box-shadow:0 4px 8px rgba(0,0,0,.12)}
.rai-note.n1{left:10px;top:12px;background:#f6c9c9;transform:rotate(-8deg)}
.rai-note.n2{left:50px;top:22px;background:#fbe4a6;transform:rotate(5deg)}
.rai-note.n3{left:94px;top:10px;background:#bcd8f2;transform:rotate(-4deg)}
.rai-note.n4{left:136px;top:24px;background:#c9e9d3;transform:rotate(7deg)}
.rai-note.n5{left:74px;top:54px;background:#f6c9c9;transform:rotate(3deg)}
.rai-art-clean{background:#fff;border:1px solid #dcecdf;display:flex;flex-direction:column;justify-content:center;gap:9px;padding:0 14px}
.rai-gantt{height:10px;border-radius:6px}
.rai-gantt.g1{width:60%;background:#2f6fb5;margin-left:6%}
.rai-gantt.g2{width:44%;background:#d99a2b;margin-left:26%}
.rai-gantt.g3{width:52%;background:#2e9e6a;margin-left:14%}
.rai-gantt.g4{width:38%;background:#3a4d7a;margin-left:40%}
.rai-ba-arrow{align-self:center;color:var(--acc);font-size:26px;font-weight:700}

.rai-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px}
.rai-col{border-radius:16px;padding:18px 17px}
.rai-col-problem{background:#fbf1f1}.rai-col-built{background:#eef4fb}.rai-col-result{background:#edf7f1}
.rai-col-head{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:var(--navy);margin:0 0 14px}
.rai-col-ic{width:26px;height:26px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.08)}
.rai-col-problem .rai-col-ic{color:#e05656}.rai-col-built .rai-col-ic{color:#2f6fb5}.rai-col-result .rai-col-ic{color:#2e9e6a}
.rai-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.rai-col li{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;line-height:1.5;color:var(--ink)}
.rai-col li svg{flex:0 0 auto;margin-top:2px}

.rai-quote{margin:0 0 24px;padding:14px 20px;border-left:3px solid var(--acc);background:#f7f9fc;
  border-radius:0 12px 12px 0;font-family:Georgia,serif;font-style:italic;font-size:15.5px;line-height:1.6;color:var(--navy)}

.rai-stack{border-top:1px solid var(--line);padding-top:22px}
.rai-stack-head{display:flex;align-items:center;justify-content:center;gap:14px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--navy)}
.rai-stack-line{height:1px;width:56px;background:var(--line)}
.rai-stack-items{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin-top:18px}
.rai-chip{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--navy);background:#fff;border:1px solid var(--line);border-radius:11px;padding:8px 14px;box-shadow:0 6px 16px -12px rgba(30,45,77,.35)}
.rai-chip-dot{width:9px;height:9px;border-radius:50%}

@media (max-width:760px){
  .rai-ba{grid-template-columns:1fr}
  .rai-ba-arrow{transform:rotate(90deg)}
  .rai-cols{grid-template-columns:1fr}
  .rai-hotspot-chip{display:none}
}
@media (max-width:520px){
  .rai-canvas{padding:32px 14px 30px}
  .rai-statbar{grid-template-columns:repeat(2,1fr);gap:18px 0}
  .rai-stat:nth-child(odd){border-left:none}
  .rai-badge{width:22px;height:22px}
}
@media (prefers-reduced-motion:reduce){
  .rai-hint-dot,.rai-badge-ring{animation:none}
}
`;
