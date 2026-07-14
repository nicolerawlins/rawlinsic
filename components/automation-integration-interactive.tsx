"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Rawlins · Automation & Integration — interactive infographic.
   The isometric hub is drawn entirely in code (SVG) — no image.
   Each node has a clickable hotspot that opens its real case study.
   Self-contained: all styles scoped under `.rai-root`.
   ────────────────────────────────────────────────────────────── */

type Node = {
  id: string;
  title: string;
  desc: string;
  accent: string;
  icon: keyof typeof ICONS;
  ped: { cx: number; cy: number };
  label: { l: number; t: number; w: number; align: "left" | "right" };
  box: { l: number; t: number; w: number; h: number };
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

const ICONS = {
  chart: '<path d="M4 20V4M4 20h16" stroke="#fff" stroke-width="1.7" fill="none" stroke-linecap="round"/><rect x="7" y="12" width="3" height="5" fill="#fff"/><rect x="12" y="8" width="3" height="9" fill="#fff"/><rect x="17" y="10" width="3" height="7" fill="#fff"/>',
  gauge: '<path d="M4 15a8 8 0 0 1 16 0" stroke="#fff" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M12 15l4-3" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="15" r="1.4" fill="#fff"/>',
  db: '<ellipse cx="12" cy="6" rx="7" ry="3" stroke="#fff" stroke-width="1.7" fill="none"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="#fff" stroke-width="1.7" fill="none"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="#fff" stroke-width="1.7" fill="none"/>',
  flow: '<circle cx="6" cy="7" r="2.4" stroke="#fff" stroke-width="1.7" fill="none"/><circle cx="6" cy="17" r="2.4" stroke="#fff" stroke-width="1.7" fill="none"/><path d="M8.5 7H15l3.5 5-3.5 5H8.5M18.5 12H15" stroke="#fff" stroke-width="1.7" fill="none" stroke-linecap="round"/>',
  pin: '<rect x="6" y="3" width="12" height="18" rx="2.5" stroke="#fff" stroke-width="1.7" fill="none"/><circle cx="12" cy="10.5" r="2" stroke="#fff" stroke-width="1.7" fill="none"/><path d="M12 12.5V17" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/>',
  handoff: '<path d="M4 8h13l-3-3M20 16H7l3 3" stroke="#fff" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
};

const NODES: Node[] = [
  {
    id: "reporting", title: "Reporting", desc: "Real-time insights that drive action.", accent: "#2f6fb5", icon: "chart",
    ped: { cx: 315, cy: 180 }, label: { l: 3, t: 9, w: 22, align: "right" }, box: { l: 28, t: 22, w: 15, h: 16 },
    example: "Example 01", popupTitle: "Project Accounting & Reporting", popupSubtitle: "Project-based technical services firm",
    before: "Data everywhere, no operating picture", after: "One view, drill-down on demand",
    problem: ["Project, accounting, CRM, time & reporting data lived in separate systems", "Teams manually pushed data into spreadsheets to get usable views", "Leaders needed both high-level and department-level visibility", "Field staff had no easy mobile access to site maps, photos & docs"],
    built: ["Migrated core data from Zoho into Monday.com", "Connected platforms with Make.com so data moved reliably", "Built dashboards that drill from high-level to project detail", "Shipped a mobile micro-app for project files from the field"],
    result: ["Leaders got a clean operating view without rebuilding reports", "Project teams reached records and files from the field", "Reliable data flow cut manual handling and lifted confidence"],
    stack: ["Monday.com", "Make.com", "QuickBooks", "QuickBooks Time", "Looker Studio", "Google Drive"],
    quote: "We already had the information — it was just spread across too many places. Once the systems were connected, we could finally see the project picture without rebuilding it every time.",
  },
  {
    id: "capacity", title: "Capacity", desc: "See capacity before it becomes a bottleneck.", accent: "#d99a2b", icon: "gauge",
    ped: { cx: 585, cy: 180 }, label: { l: 75, t: 9, w: 22, align: "left" }, box: { l: 57, t: 22, w: 15, h: 16 },
    example: "Example 04", popupTitle: "Capacity Planning", popupSubtitle: "Field services / drilling organization",
    before: "Capacity run on guesswork", after: "Capacity you can actually see",
    problem: ["Capacity depended on scattered updates and local knowledge", "No view of equipment location, booking length or downtime", "People & equipment constraints managed inconsistently", "Service windows — PTO for machines — were invisible in the plan"],
    built: ["Built one capacity system in Monday.com + Make.com", "Templatized it to manage people and equipment together", "Tracked locations, booking windows, utilization & downtime", "Made unavailable equipment visible before it caused conflicts"],
    result: ["See capacity before bottlenecks become emergencies", "Know what's booked, available or out of service", "Specialized assets scheduled right alongside people"],
    stack: ["Monday.com", "Make.com"],
    quote: "We stopped relying on scattered updates to understand capacity. We could finally see what was available, what was booked, and where the constraint was coming from.",
  },
  {
    id: "single-source", title: "Single Source", desc: "One source of truth across your team.", accent: "#2e9e6a", icon: "db",
    ped: { cx: 670, cy: 335 }, label: { l: 83, t: 42, w: 17, align: "left" }, box: { l: 67, t: 47, w: 15, h: 16 },
    example: "Example 05", popupTitle: "Single Source of Truth", popupSubtitle: "100+ employee manufacturing firm",
    before: "Workshops siloed, data unused", after: "One system, full-company view",
    problem: ["Manufacturing spread across workshops with poor office↔floor comms", "No reliable way to record time against a specific item built", "Data sat unused — no dashboards on production, staffing or capacity", "Heavy manual entry to match materials, time and cost"],
    built: ["Rebuilt everything around a core Monday.com board structure", "One source of truth with per-workshop permission levels", "Formulas + Make.com auto-calculate cost, materials, hours & assignment", "Added Tracket time tracking and DocuSign work orders inside Monday.com"],
    result: ["Estimated time, actual time, team, cost & price all in one place", "Leaders track workshop speed, profitability, staffing & capacity", "Quotes and invoices automated; jobs assigned by capacity, not phone calls"],
    stack: ["Monday.com", "Make.com", "Tracket", "DocuSign"],
    quote: "Transformed from multiple software solutions into a streamlined, easy-to-use single source of truth — full visibility over what's happening across the entire company.",
  },
  {
    id: "sales-project", title: "Sales → Project", desc: "From opportunity to execution — connected.", accent: "#4d6bbf", icon: "flow",
    ped: { cx: 585, cy: 500 }, label: { l: 76, t: 73, w: 22, align: "left" }, box: { l: 57, t: 72, w: 15, h: 16 },
    example: "Example 06", popupTitle: "BD → Project Handover", popupSubtitle: "130-person professional services firm",
    before: "Closed-won ran on memory", after: "Billing-ready in days, not weeks",
    problem: ["Handoff from BD to delivery & finance ran on email and memory", "Scope, fee, billing terms & owner moved late or incomplete", "Finance and PMs chased BD for info that should be settled at close", "Project setup dragged on for one to two weeks"],
    built: ["Locked the few fields required before an opportunity can close-won", "Required scope, fee, terms, owner & kickoff date in Salesforce", "Automation pushes the project record into Monday.com at close", "Notified finance & delivery instantly with a standardized kickoff checklist"],
    result: ["Setup went from 1–2 weeks of back-and-forth to billing-ready in days", "Finance stopped chasing BD for basic setup information", "PMs walked into kickoffs with everything they needed"],
    stack: ["Salesforce", "Monday.com", "Make.com", "QuickBooks", "SharePoint", "Teams"],
    quote: "Project setup went from one to two weeks of back-and-forth to billing-ready in a few business days. Finance stopped chasing BD, and PMs walked into kickoffs with what they needed.",
  },
  {
    id: "field-reporting", title: "Field Reporting", desc: "Capture field data that fuels better decisions.", accent: "#d9702f", icon: "pin",
    ped: { cx: 315, cy: 500 }, label: { l: 0, t: 73, w: 17, align: "right" }, box: { l: 28, t: 72, w: 15, h: 16 },
    example: "Example 03", popupTitle: "Field Reporting", popupSubtitle: "Field-service / project delivery firm",
    before: "Records that vanished after the visit", after: "Captured on site, filed automatically",
    problem: ["Site-visit info existed but wasn't structured for later use", "Attachments and field details were hard to retrieve afterward", "Office staff had to chase individuals to see what happened"],
    built: ["Added form links directly into Google Calendar events", "Monday.com forms create board items the moment field staff submit", "Attachments auto-file into the right Google Drive structure", "Connected field capture back into the project record"],
    result: ["Field information became easy to find, reuse and report on", "Attachments landed in the right place automatically", "The office gained clean visibility into every site visit"],
    stack: ["Monday.com", "Make.com", "Google Calendar", "Google Drive"],
    quote: "Our team was already capturing the information. The value came from making sure it landed somewhere useful without another person having to chase it down.",
  },
  {
    id: "service-handoff", title: "Service Handoff", desc: "Seamless transitions. No dropped information.", accent: "#2a9d9d", icon: "handoff",
    ped: { cx: 230, cy: 335 }, label: { l: 0, t: 42, w: 17, align: "right" }, box: { l: 18, t: 47, w: 15, h: 16 },
    example: "Example 02", popupTitle: "Project → Service Handoff", popupSubtitle: "Install & service / maintenance firm",
    before: "Service teams starting from zero", after: "History follows the work",
    problem: ["Completed projects moved to service, but the handoff was siloed", "Service teams had limited insight into what install had done", "Staff often started from scratch to understand project history", "PMs had no time to walk service through each project"],
    built: ["Moved the workflow into Monday.com + Google Suite", "Tracked every client visit against the project history", "Google Calendar sync & on-site forms captured what was done", "Filed attachments and records into a supporting Drive structure"],
    result: ["Service teams stopped starting from zero", "Project knowledge followed the work, not one PM's memory", "Delivery → service handoff became cleaner and faster"],
    stack: ["Monday.com", "Make.com", "Google Suite", "Google Calendar"],
    quote: "The biggest change was that our service team stopped starting from zero. They could see the history, understand the work, and get to the issue faster.",
  },
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

/* ── Build the isometric scene as an SVG string ── */
function pedestal(cx: number, cy: number, w: number, h: number, top: string, left: string, right: string): string {
  const d = w * 0.5;
  const T = `${cx},${cy - d} ${cx + w},${cy} ${cx},${cy + d} ${cx - w},${cy}`;
  const L = `${cx - w},${cy} ${cx},${cy + d} ${cx},${cy + d + h} ${cx - w},${cy + h}`;
  const R = `${cx + w},${cy} ${cx},${cy + d} ${cx},${cy + d + h} ${cx + w},${cy + h}`;
  return `<polygon points="${L}" fill="${left}"/><polygon points="${R}" fill="${right}"/><polygon points="${T}" fill="${top}" stroke="rgba(30,45,77,.10)" stroke-width="1"/>`;
}

function buildScene(): string {
  const HUBX = 450, HUBY = 330;
  let s = "";
  NODES.forEach((n) => {
    const c = n.icon === "gauge" || n.icon === "pin" ? "#e0a63c" : "#5b8bd6";
    s += `<line x1="${HUBX}" y1="${HUBY - 6}" x2="${n.ped.cx}" y2="${n.ped.cy}" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-dasharray="1 7" opacity=".55"/>`;
    s += `<circle cx="${n.ped.cx}" cy="${n.ped.cy}" r="3.2" fill="${c}"/>`;
  });
  s += pedestal(HUBX, HUBY + 34, 140, 16, "#22345c", "#162444", "#1a2a4d");
  s += pedestal(HUBX, HUBY + 14, 132, 16, "#e0a63c", "#b98321", "#c9902a");
  s += pedestal(HUBX, HUBY - 10, 124, 20, "#f5f8fc", "#c7d0e2", "#dbe3ef");
  s += `<defs><linearGradient id="raiR" x1="0" y1="0" x2="1" y2="0"><stop offset="52%" stop-color="#e0a63c"/><stop offset="52%" stop-color="#1e2d4d"/></linearGradient></defs>`;
  s += `<text x="${HUBX}" y="${HUBY - 2}" font-family="Georgia,'Times New Roman',serif" font-size="70" font-weight="700" fill="url(#raiR)" text-anchor="middle">R</text>`;
  NODES.forEach((n) => {
    const c = n.ped;
    s += pedestal(c.cx, c.cy, 64, 22, "#eef2f8", "#bcc7dc", "#d3dbe9");
    s += `<ellipse cx="${c.cx}" cy="${c.cy}" rx="26" ry="13" fill="rgba(30,45,77,.10)"/>`;
    s += `<circle cx="${c.cx}" cy="${c.cy - 10}" r="22" fill="${n.accent}"/>`;
    s += `<g transform="translate(${c.cx - 12},${c.cy - 22})">${ICONS[n.icon]}</g>`;
  });
  return `<svg viewBox="0 0 900 640" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible">${s}</svg>`;
}
const SCENE = buildScene();

export default function AutomationIntegrationInteractive() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const active = openIdx === null ? null : NODES[openIdx];

  const open = (idx: number) => { lastFocused.current = document.activeElement as HTMLElement; setOpenIdx(idx); };
  const close = () => { setOpenIdx(null); lastFocused.current?.focus?.(); };

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtnRef.current?.focus(), 40);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIdx]);

  return (
    <div className="rai-root">
      <style>{CSS}</style>
      <main className="rai-wrap">
        <div className="rai-scene">
          <div className="rai-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: SCENE }} />
          {NODES.map((n) => {
            const st: React.CSSProperties = { top: `${n.label.t}%`, width: `${n.label.w}%`, textAlign: n.label.align };
            if (n.label.align === "right") st.right = `${100 - n.label.l - n.label.w}%`; else st.left = `${n.label.l}%`;
            return (
              <div className="rai-label" key={n.id} style={st}>
                <div className="t">{n.title}</div>
                <div className="d" style={n.label.align === "right" ? { marginLeft: "auto" } : undefined}>{n.desc}</div>
              </div>
            );
          })}
          {NODES.map((n, i) => (
            <button
              key={n.id}
              className="rai-hot"
              style={{ left: `${n.box.l}%`, top: `${n.box.t}%`, width: `${n.box.w}%`, height: `${n.box.h}%`, ["--acc" as string]: n.accent }}
              onClick={() => open(i)}
              aria-label={`${n.title} — view example`}
              aria-haspopup="dialog"
            >
              <span className="rai-chip-hint">View example →</span>
            </button>
          ))}
        </div>
      </main>

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
                  <div className="rai-ba-label"><span className="rai-badge2 rai-badge-x"><CheckMark color="#fff" /></span>Before</div>
                  <p className="rai-ba-cap">{active.before}</p>
                  <div className="rai-ba-art rai-art-messy" aria-hidden="true"><span className="rai-note n1" /><span className="rai-note n2" /><span className="rai-note n3" /><span className="rai-note n4" /><span className="rai-note n5" /></div>
                </div>
                <div className="rai-ba-arrow" aria-hidden="true">→</div>
                <div className="rai-ba-card rai-ba-after">
                  <div className="rai-ba-label"><span className="rai-badge2 rai-badge-check"><CheckMark color="#fff" /></span>After</div>
                  <p className="rai-ba-cap">{active.after}</p>
                  <div className="rai-ba-art rai-art-clean" aria-hidden="true"><span className="rai-gantt g1" /><span className="rai-gantt g2" /><span className="rai-gantt g3" /><span className="rai-gantt g4" /></div>
                </div>
              </div>
              <div className="rai-cols">
                <section className="rai-col rai-col-problem">
                  <h3 className="rai-col-head"><span className="rai-col-ic"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L2 20h20L12 3z" /><path d="M12 10v4M12 17.5v.01" /></svg></span>The Problem</h3>
                  <ul>{active.problem.map((t, i) => (<li key={i}><XMark color="#e05656" /><span>{t}</span></li>))}</ul>
                </section>
                <section className="rai-col rai-col-built">
                  <h3 className="rai-col-head"><span className="rai-col-ic"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l3-1 9.5-9.5-2-2L4 18l-1 3z" /><path d="M14.5 6.5l3 3 2.2-2.2a1.6 1.6 0 0 0 0-2.3l-.7-.7a1.6 1.6 0 0 0-2.3 0z" /></svg></span>What We Built</h3>
                  <ul>{active.built.map((t, i) => (<li key={i}><CheckMark color="#2f6fb5" /><span>{t}</span></li>))}</ul>
                </section>
                <section className="rai-col rai-col-result">
                  <h3 className="rai-col-head"><span className="rai-col-ic"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h16" /><path d="M8 15l3.5-4 3 2.5L20 7" /><path d="M16 7h4v4" /></svg></span>The Result</h3>
                  <ul>{active.result.map((t, i) => (<li key={i}><CheckMark color="#2e9e6a" /><span>{t}</span></li>))}</ul>
                </section>
              </div>
              <blockquote className="rai-quote">{active.quote}</blockquote>
              <div className="rai-stack">
                <div className="rai-stack-head"><span className="rai-stack-line" />The Stack We Connect<span className="rai-stack-line" /></div>
                <div className="rai-stack-items">
                  {active.stack.map((tool) => (<span className="rai-chip" key={tool}><span className="rai-chip-dot" style={{ background: toolDot(tool) }} />{tool}</span>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CSS = `
.rai-root{--navy:#1e2d4d;--gold:#d99a2b;--ink:#3a4661;--muted:#7b869b;--line:#e6eaf1;position:relative;min-height:100vh;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#eaf0fb;
  background:radial-gradient(1100px 760px at 50% 8%, #17264a 0%, #0d1730 52%, #080e1e 100%)}
.rai-root *{box-sizing:border-box}
.rai-wrap{max-width:960px;margin:0 auto;padding:34px 20px 44px;min-height:100vh;display:flex;align-items:center;justify-content:center}
.rai-scene{position:relative;width:100%;max-width:900px;margin:0 auto;aspect-ratio:900/640}
.rai-svg{position:absolute;inset:0}
.rai-label{position:absolute;pointer-events:none}
.rai-label .t{font-size:15px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:#fff;line-height:1.15}
.rai-label .d{font-size:12.5px;line-height:1.4;color:#9fabc6;margin-top:5px;max-width:170px}
.rai-hot{position:absolute;margin:0;padding:0;border:0;background:transparent;cursor:pointer;border-radius:16px;transition:background .18s,box-shadow .18s;outline:none}
.rai-hot:hover,.rai-hot:focus-visible{background:color-mix(in srgb,var(--acc) 12%,transparent);box-shadow:0 0 0 1.5px color-mix(in srgb,var(--acc) 55%,transparent),0 16px 34px -18px color-mix(in srgb,var(--acc) 80%,transparent)}
.rai-chip-hint{position:absolute;top:-12px;left:50%;transform:translate(-50%,-6px);background:var(--navy);color:#fff;font-size:11px;font-weight:700;white-space:nowrap;padding:5px 10px;border-radius:8px;opacity:0;transition:opacity .18s,transform .18s;pointer-events:none}
.rai-hot:hover .rai-chip-hint,.rai-hot:focus-visible .rai-chip-hint{opacity:1;transform:translate(-50%,0)}
/* modal (light) */
.rai-overlay{position:fixed;inset:0;z-index:1000;background:rgba(6,12,26,.66);display:flex;align-items:flex-start;justify-content:center;padding:32px 18px;overflow-y:auto}
.rai-modal{position:relative;width:100%;max-width:960px;background:#fff;border-radius:22px;box-shadow:0 50px 100px -30px rgba(0,0,0,.7);overflow:hidden;border-top:4px solid var(--acc)}
.rai-modal-scroll{padding:32px clamp(20px,4vw,44px) 36px}
.rai-close{position:absolute;top:14px;right:14px;z-index:5;width:38px;height:38px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--navy);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,transform .15s}
.rai-close:hover{background:#f1f4f9;transform:rotate(90deg)}
.rai-modal-head{margin-bottom:22px;padding-right:40px}
.rai-example{display:inline-block;background:var(--navy);color:#fff;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;padding:6px 13px;border-radius:20px}
.rai-modal-title{font-size:clamp(24px,4.2vw,36px);font-weight:800;color:var(--navy);margin:14px 0 4px;letter-spacing:-.3px}
.rai-modal-subtitle{font-size:15px;color:var(--muted);font-style:italic;margin:0}
.rai-ba{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:stretch;margin-bottom:24px}
.rai-ba-card{border-radius:16px;padding:16px 16px 18px;border:1px solid var(--line)}
.rai-ba-before{background:#fbf1f1;border-color:#f2dede}
.rai-ba-after{background:#eef7f1;border-color:#d9ecdf}
.rai-ba-label{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--navy)}
.rai-badge2{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.rai-badge-x{background:#e05656}.rai-badge-check{background:#2e9e6a}
.rai-ba-cap{margin:8px 0 12px;font-size:14px;color:var(--ink);font-weight:600}
.rai-ba-art{position:relative;height:96px;border-radius:10px;overflow:hidden}
.rai-art-messy{background:repeating-linear-gradient(0deg,#fff,#fff 15px,#f4e9e9 15px,#f4e9e9 16px)}
.rai-note{position:absolute;width:32px;height:28px;border-radius:3px;box-shadow:0 4px 8px rgba(0,0,0,.12)}
.rai-note.n1{left:10px;top:12px;background:#f6c9c9;transform:rotate(-8deg)}.rai-note.n2{left:50px;top:22px;background:#fbe4a6;transform:rotate(5deg)}.rai-note.n3{left:94px;top:10px;background:#bcd8f2;transform:rotate(-4deg)}.rai-note.n4{left:136px;top:24px;background:#c9e9d3;transform:rotate(7deg)}.rai-note.n5{left:74px;top:54px;background:#f6c9c9;transform:rotate(3deg)}
.rai-art-clean{background:#fff;border:1px solid #dcecdf;display:flex;flex-direction:column;justify-content:center;gap:9px;padding:0 14px}
.rai-gantt{height:10px;border-radius:6px}
.rai-gantt.g1{width:60%;background:#2f6fb5;margin-left:6%}.rai-gantt.g2{width:44%;background:#d99a2b;margin-left:26%}.rai-gantt.g3{width:52%;background:#2e9e6a;margin-left:14%}.rai-gantt.g4{width:38%;background:#3a4d7a;margin-left:40%}
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
.rai-quote{margin:0 0 24px;padding:14px 20px;border-left:3px solid var(--acc);background:#f7f9fc;border-radius:0 12px 12px 0;font-family:Georgia,serif;font-style:italic;font-size:15.5px;line-height:1.6;color:var(--navy)}
.rai-stack{border-top:1px solid var(--line);padding-top:22px}
.rai-stack-head{display:flex;align-items:center;justify-content:center;gap:14px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--navy)}
.rai-stack-line{height:1px;width:56px;background:var(--line)}
.rai-stack-items{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin-top:18px}
.rai-chip{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--navy);background:#fff;border:1px solid var(--line);border-radius:11px;padding:8px 14px;box-shadow:0 6px 16px -12px rgba(30,45,77,.35)}
.rai-chip-dot{width:9px;height:9px;border-radius:50%}
@media (max-width:760px){.rai-ba{grid-template-columns:1fr}.rai-ba-arrow{transform:rotate(90deg)}.rai-cols{grid-template-columns:1fr}.rai-chip-hint{display:none}.rai-label .t{font-size:12px}.rai-label .d{font-size:10.5px}}
`;
