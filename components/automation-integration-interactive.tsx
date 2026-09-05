"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ──────────────────────────────────────────────────────────────
   Rawlins · Automation & Integration — interactive WebGL hub.
   Real-3D scene (Three.js): floating capability tiles each with a
   3D object, the Rawlins logo + orbiting halos at the center,
   drag to rotate. Click a node → its case study opens in an overlay.
   ────────────────────────────────────────────────────────────── */

type Node = {
  id: string; title: string; desc: string; accent: string;
  /* descLines: forced line breaks for the hub label (desc stays the plain
     string for the mobile list). labDy: nudge the label up/down in px. */
  descLines?: string[]; labDy?: number;
  icon: "chart" | "gauge" | "db" | "flow" | "pin" | "handoff" | "chevrons"; ang: number;
  example: string; popupTitle: string; popupSubtitle: string;
  before: string; after: string;
  problem: string[]; built: string[]; result: string[]; stack: string[]; quote: string;
};

const NODES: Node[] = [
  { id: "process-rebuild", title: "Process Rebuild", desc: "One connected workflow, end to end.", descLines: ["One connected workflow,", "end to end."], labDy: 34, accent: "#7a68cf", icon: "chevrons", ang: 0,
    example: "Example 01", popupTitle: "Rebuilding an Agency Process End to End", popupSubtitle: "Consultant contracting at a state DOT",
    before: "Eight steps, four divisions, email in between", after: "One intake, one path forward",
    problem: ["Consultant contracting ran across eight steps and four divisions — procurement, legal, engineering, and accounting", "Handoffs between steps relied on email, spreadsheets, and scanned paper", "The same information was re-entered at every stage, from entity agreement through closeout", "Status lived in calendar reminders, verbal follow-ups, and a manual log"],
    built: ["Mapped the process in working sessions with the staff who perform each step — not those who oversee it", "Rebuilt the first six steps as one connected workflow in Monday.com, with one intake form as the only place work enters", "A Make.com integration layer builds documents from the record, files them to storage, and sends notices — nothing crosses a boundary by hand", "Data governance decided before the build: the record keeps the consensus outcome, never an individual evaluator's score"],
    result: ["More than twenty agency staff across three divisions completed a full working walkthrough", "One working session per step, staffed with the people who perform it rather than with managers", "Chosen for maintainability — agency staff can be trained to run it with no prior knowledge of the system"],
    stack: ["Monday.com", "Make.com"],
    quote: "The platform choice is driven by maintainability, so someone at the agency with no prior knowledge of the system can be trained to run it. We expect the work to outlast our engagement." },
  { id: "reporting", title: "Reporting", desc: "Real-time insights that drive action.", descLines: ["Real-time insights", "that drive action."], labDy: -34, accent: "#3a83d6", icon: "chart", ang: 206,
    example: "Example 02", popupTitle: "Project Accounting & Reporting", popupSubtitle: "Project-based technical services firm",
    before: "Data everywhere, no operating picture", after: "One view, drill-down on demand",
    problem: ["Project, accounting, CRM, time & reporting data lived in separate systems", "Teams manually pushed data into spreadsheets to get usable views", "Leaders needed both high-level and department-level visibility", "Field staff had no easy mobile access to site maps, photos & docs"],
    built: ["Migrated core data from Zoho into Monday.com", "Connected platforms with Make.com so data moved reliably", "Built dashboards that drill from high-level to project detail", "Shipped a mobile micro-app for project files from the field"],
    result: ["Leaders got a clean operating view without rebuilding reports", "Project teams reached records and files from the field", "Reliable data flow cut manual handling and lifted confidence"],
    stack: ["Monday.com", "Make.com", "QuickBooks", "QuickBooks Time", "Looker Studio", "Google Drive"],
    quote: "We already had the information — it was just spread across too many places. Once the systems were connected, we could finally see the project picture without rebuilding it every time." },
  { id: "capacity", title: "Capacity", desc: "See capacity before it becomes a bottleneck.", descLines: ["See capacity before it", "becomes a bottleneck."], labDy: -34, accent: "#e0a63c", icon: "gauge", ang: 154,
    example: "Example 05", popupTitle: "Capacity Planning", popupSubtitle: "Field services / drilling organization",
    before: "Capacity run on guesswork", after: "Capacity you can actually see",
    problem: ["Capacity depended on scattered updates and local knowledge", "No view of equipment location, booking length or downtime", "People & equipment constraints managed inconsistently", "Service windows — PTO for machines — were invisible in the plan"],
    built: ["Built one capacity system in Monday.com + Make.com", "Templatized it to manage people and equipment together", "Tracked locations, booking windows, utilization & downtime", "Made unavailable equipment visible before it caused conflicts"],
    result: ["See capacity before bottlenecks become emergencies", "Know what's booked, available or out of service", "Specialized assets scheduled right alongside people"],
    stack: ["Monday.com", "Make.com"],
    quote: "We stopped relying on scattered updates to understand capacity. We could finally see what was available, what was booked, and where the constraint was coming from." },
  { id: "single-source", title: "Single Source", desc: "One source of truth across your team.", descLines: ["One source of truth", "across your team."], accent: "#33b07a", icon: "db", ang: 103,
    example: "Example 06", popupTitle: "Single Source of Truth", popupSubtitle: "100+ employee manufacturing firm",
    before: "Workshops siloed, data unused", after: "One system, full-company view",
    problem: ["Manufacturing spread across workshops with poor office↔floor comms", "No reliable way to record time against a specific item built", "Data sat unused — no dashboards on production, staffing or capacity", "Heavy manual entry to match materials, time and cost"],
    built: ["Rebuilt everything around a core Monday.com board structure", "One source of truth with per-workshop permission levels", "Formulas + Make.com auto-calculate cost, materials, hours & assignment", "Added Tracket time tracking and DocuSign work orders inside Monday.com"],
    result: ["Estimated time, actual time, team, cost & price all in one place", "Leaders track workshop speed, profitability, staffing & capacity", "Quotes and invoices automated; jobs assigned by capacity, not phone calls"],
    stack: ["Monday.com", "Make.com", "Tracket", "DocuSign"],
    quote: "Transformed from multiple software solutions into a streamlined, easy-to-use single source of truth — full visibility over what's happening across the entire company." },
  { id: "sales-project", title: "Sales → Project", desc: "From opportunity to execution — connected.", descLines: ["From opportunity to", "execution — connected."], labDy: 34, accent: "#8FB9E8", icon: "flow", ang: 51,
    example: "Example 07", popupTitle: "Business Development → Project Handover", popupSubtitle: "130-person professional services firm",
    before: "Closed-won ran on memory", after: "Billing-ready in days, not weeks",
    problem: ["Handoff from Business Development to delivery & finance ran on email and memory", "Scope, fee, billing terms & owner moved late or incomplete", "Finance and PMs chased Business Development for info that should be settled at close", "Project setup dragged on for one to two weeks"],
    built: ["Locked the few fields required before an opportunity can close-won", "Required scope, fee, terms, owner & kickoff date in Salesforce", "Automation pushes the project record into Monday.com at close", "Notified finance & delivery instantly with a standardized kickoff checklist"],
    result: ["Setup went from 1–2 weeks of back-and-forth to billing-ready in days", "Finance stopped chasing Business Development for basic setup information", "PMs walked into kickoffs with everything they needed"],
    stack: ["Salesforce", "Monday.com", "Make.com", "QuickBooks", "SharePoint", "Teams"],
    quote: "Project setup went from one to two weeks of back-and-forth to billing-ready in a few business days. Finance stopped chasing Business Development, and PMs walked into kickoffs with what they needed." },
  { id: "field-reporting", title: "Field Reporting", desc: "Capture field data that fuels better decisions.", descLines: ["Capture field data that", "fuels better decisions."], labDy: 34, accent: "#e07a3c", icon: "pin", ang: 309,
    example: "Example 04", popupTitle: "Field Reporting", popupSubtitle: "Field-service / project delivery firm",
    before: "Records that vanished after the visit", after: "Captured on site, filed automatically",
    problem: ["Site-visit info existed but wasn't structured for later use", "Attachments and field details were hard to retrieve afterward", "Office staff had to chase individuals to see what happened"],
    built: ["Added form links directly into Google Calendar events", "Monday.com forms create board items the moment field staff submit", "Attachments auto-file into the right Google Drive structure", "Connected field capture back into the project record"],
    result: ["Field information became easy to find, reuse and report on", "Attachments landed in the right place automatically", "The office gained clean visibility into every site visit"],
    stack: ["Monday.com", "Make.com", "Google Calendar", "Google Drive"],
    quote: "Our team was already capturing the information. The value came from making sure it landed somewhere useful without another person having to chase it down." },
  { id: "service-handoff", title: "Service Handoff", desc: "Seamless transitions. No dropped information.", descLines: ["Seamless transitions.", "No dropped information."], accent: "#2ab0ab", icon: "handoff", ang: 257,
    example: "Example 03", popupTitle: "Project → Service Handoff", popupSubtitle: "Install & service / maintenance firm",
    before: "Service teams starting from zero", after: "History follows the work",
    problem: ["Completed projects moved to service, but the handoff was siloed", "Service teams had limited insight into what install had done", "Staff often started from scratch to understand project history", "PMs had no time to walk service through each project"],
    built: ["Moved the workflow into Monday.com + Google Suite", "Tracked every client visit against the project history", "Google Calendar sync & on-site forms captured what was done", "Filed attachments and records into a supporting Drive structure"],
    result: ["Service teams stopped starting from zero", "Project knowledge followed the work, not one PM's memory", "Delivery → service handoff became cleaner and faster"],
    stack: ["Monday.com", "Make.com", "Google Suite", "Google Calendar"],
    quote: "The biggest change was that our service team stopped starting from zero. They could see the history, understand the work, and get to the issue faster." },
];

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
const XMark = ({ color }: { color: string }) => (<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round"><path d="M7 7l10 10M17 7L7 17" /></svg>);
const CheckMark = ({ color }: { color: string }) => (<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>);

/* build a small 3D object per capability (base at y=0) */
function bObj(kind: string, accent: string): THREE.Group {
  const g = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xf4f7fc, metalness: 0.1, roughness: 0.5 });
  const acc = new THREE.MeshStandardMaterial({ color: new THREE.Color(accent), metalness: 0.22, roughness: 0.34 });
  const navy = new THREE.MeshStandardMaterial({ color: 0x27395c, metalness: 0.2, roughness: 0.45 });
  const M = (geo: THREE.BufferGeometry, mat: THREE.Material) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; g.add(m); return m; };
  const P = (geo: THREE.BufferGeometry, mat: THREE.Material, par: THREE.Object3D) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; par.add(m); return m; };
  if (kind === "chart") {
    M(new RoundedBoxGeometry(1.0, 0.08, 0.66, 3, 0.03), white).position.y = 0.05;
    const sg = new THREE.Group(); sg.position.set(0, 0.07, -0.29); sg.rotation.x = -0.33; g.add(sg);
    P(new RoundedBoxGeometry(1.0, 0.62, 0.05, 3, 0.03), white, sg).position.y = 0.31;
    P(new THREE.BoxGeometry(0.82, 0.46, 0.012), navy, sg).position.set(0, 0.31, 0.035);
    ([[-0.2, 0.14], [0, 0.24], [0.2, 0.18]] as [number, number][]).forEach((b) => { P(new THREE.BoxGeometry(0.1, b[1], 0.02), acc, sg).position.set(b[0], 0.17 + b[1] / 2, 0.05); });
  } else if (kind === "gauge") {
    /* speedometer: navy track across the TOP (arc = PI, opening at the bottom) */
    const disc = M(new THREE.CylinderGeometry(0.54, 0.54, 0.16, 44), white); disc.rotation.x = Math.PI / 2; disc.position.y = 0.54;
    const track = M(new THREE.TorusGeometry(0.36, 0.062, 14, 48, Math.PI), navy); track.position.set(0, 0.54, 0.09);
    /* gold fill across the LEFT portion (90..180deg) */
    const fill = M(new THREE.TorusGeometry(0.36, 0.072, 14, 28, Math.PI * 0.5), acc); fill.position.set(0, 0.54, 0.1); fill.rotation.z = Math.PI * 0.5;
    /* needle from the hub pointing up/right into the arc */
    const nl = M(new THREE.BoxGeometry(0.042, 0.32, 0.03), navy); nl.rotation.z = -Math.PI / 4; nl.position.set(0.113, 0.653, 0.12);
    const hub = M(new THREE.CylinderGeometry(0.075, 0.075, 0.17, 20), navy); hub.rotation.x = Math.PI / 2; hub.position.set(0, 0.54, 0.12);
  } else if (kind === "db") {
    /* stacked layers merging into one source (rims lie FLAT around each layer) */
    ([0.14, 0.42, 0.7]).forEach((y) => { M(new THREE.CylinderGeometry(0.44, 0.44, 0.2, 40), white).position.y = y; const r = M(new THREE.TorusGeometry(0.44, 0.032, 12, 40), acc); r.rotation.x = Math.PI / 2; r.position.y = y + 0.1; });
  } else if (kind === "handoff") {
    const p1 = M(new RoundedBoxGeometry(0.6, 0.8, 0.04, 3, 0.03), white); p1.position.set(-0.16, 0.5, -0.02); p1.rotation.z = 0.1;
    const p2 = M(new RoundedBoxGeometry(0.6, 0.8, 0.04, 3, 0.03), white); p2.position.set(0.02, 0.52, 0.06); p2.rotation.z = -0.05;
    ([0.18, 0.02, -0.14]).forEach((y) => { P(new THREE.BoxGeometry(0.36, 0.04, 0.006), acc, p2).position.set(0, y, 0.025); });
    const ar = new THREE.Group(); ar.position.set(0.34, 0.34, 0.24); g.add(ar);
    P(new THREE.BoxGeometry(0.26, 0.09, 0.09), acc, ar).position.x = -0.02;
    const hd = P(new THREE.ConeGeometry(0.11, 0.2, 20), acc, ar); hd.rotation.z = -Math.PI / 2; hd.position.x = 0.2;
  } else if (kind === "pin") {
    M(new RoundedBoxGeometry(0.66, 0.92, 0.06, 3, 0.04), white).position.y = 0.52;
    M(new THREE.BoxGeometry(0.24, 0.1, 0.09), navy).position.set(0, 0.98, 0.02);
    ([0.72, 0.5, 0.28]).forEach((y) => { M(new THREE.BoxGeometry(0.13, 0.13, 0.03), acc).position.set(-0.16, y, 0.05); M(new THREE.BoxGeometry(0.26, 0.05, 0.02), navy).position.set(0.12, y, 0.05); });
  } else if (kind === "flow") {
    /* funnel (opportunity) -> arrow -> check (delivered).
       All three are extruded flat silhouettes on one baseline at a matched
       0.4 height. A solid cone read as a plain disc from the camera's high
       angle, which is why the funnel didn't look like a funnel. */
    const ex = { depth: 0.16, bevelEnabled: true, bevelThickness: 0.014, bevelSize: 0.014, bevelSegments: 2 };
    const fs = new THREE.Shape();
    fs.moveTo(-0.16, 0.29); fs.lineTo(0.16, 0.29); fs.lineTo(0.045, 0.02);
    fs.lineTo(0.045, -0.29); fs.lineTo(-0.045, -0.29); fs.lineTo(-0.045, 0.02); fs.closePath();
    const fn = M(new THREE.ExtrudeGeometry(fs, ex), acc); fn.position.set(-0.34, 0.5, -0.08);
    const as = new THREE.Shape();
    as.moveTo(-0.18, 0.075); as.lineTo(0, 0.075); as.lineTo(0, 0.21); as.lineTo(0.18, 0);
    as.lineTo(0, -0.21); as.lineTo(0, -0.075); as.lineTo(-0.18, -0.075); as.closePath();
    const ar = M(new THREE.ExtrudeGeometry(as, ex), navy); ar.position.set(0.04, 0.5, -0.08);
    /* compact check — a longer tail pushed the row past the platform edge */
    const ck = new THREE.Group(); ck.position.set(0.42, 0.38, 0); g.add(ck);
    const c1 = P(new THREE.BoxGeometry(0.1, 0.2, 0.16), acc, ck); c1.rotation.z = Math.PI / 4; c1.position.set(-0.06, 0, 0);
    const c2 = P(new THREE.BoxGeometry(0.1, 0.44, 0.16), acc, ck); c2.rotation.z = -0.58; c2.position.set(0.1, 0.13, 0);
  } else if (kind === "chevrons") {
    /* the process strip from the briefing: three chevrons marching forward,
       the last one accented — end-to-end, step by step */
    const ex = { depth: 0.14, bevelEnabled: true, bevelThickness: 0.014, bevelSize: 0.014, bevelSegments: 2 };
    const ch = new THREE.Shape();
    ch.moveTo(-0.16, 0.24); ch.lineTo(0.0, 0.24); ch.lineTo(0.17, 0);
    ch.lineTo(0.0, -0.24); ch.lineTo(-0.16, -0.24); ch.lineTo(0.01, 0); ch.closePath();
    ([-0.36, 0, 0.36]).forEach((x, k) => {
      const m = M(new THREE.ExtrudeGeometry(ch, ex), k === 2 ? acc : k === 1 ? navy : white);
      m.position.set(x, 0.52, -0.07);
    });
  }
  return g;
}

/* ──────────────────────────────────────────────────────────────
   Popup story tableaux — real 3D, same visual language as the
   node icons (white rounded bodies, navy structure, gold accents).
   Palette is brand-only: navy / slate / light blue / gold, with
   green reserved for the "result" step and red for problem states.
   ────────────────────────────────────────────────────────────── */
function storyScene(id: string, tone: string): THREE.Group {
  const g = new THREE.Group();
  const mk = (hex: number, m = 0.18, r = 0.44) => new THREE.MeshStandardMaterial({ color: hex, metalness: m, roughness: r });
  const white = mk(0xf4f7fc, 0.1, 0.5), navy = mk(0x1d3759, 0.22, 0.44), slate = mk(0x4d688c, 0.2, 0.45),
    lblue = mk(0xc4d8f2, 0.14, 0.46), pblue = mk(0xdce6f2, 0.12, 0.5), gold = mk(0xc9a84c, 0.6, 0.24),
    green = mk(0x2e9e6a, 0.3, 0.36), red = mk(0xd4696b, 0.25, 0.4);

  const A = (geo: THREE.BufferGeometry, mat: THREE.Material, par: THREE.Object3D = g) => {
    const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; par.add(m); return m; };
  const card = (w: number, h: number, d = 0.07, mat: THREE.Material = white) => A(new RoundedBoxGeometry(w, h, d, 3, 0.03), mat);
  /* a data row printed on the face of a card */
  const row = (par: THREE.Object3D, w: number, y: number, mat: THREE.Material, x = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.055, 0.014), mat); m.position.set(x, y, 0.045); m.castShadow = true; par.add(m); return m; };
  const pipe = (len: number, mat: THREE.Material = gold, t = 0.05) => A(new THREE.BoxGeometry(len, t, t), mat);
  const cyl = (r: number, h: number, mat: THREE.Material) => A(new THREE.CylinderGeometry(r, r, h, 40), mat);
  /* same extruded silhouette as the Sales -> Project node icon, so the motif
     matches between the hub and the story */
  const funnel = (mat: THREE.Material = slate, s = 1) => {
    const fs = new THREE.Shape();
    fs.moveTo(-0.19 * s, 0.2 * s); fs.lineTo(0.19 * s, 0.2 * s); fs.lineTo(0.05 * s, 0);
    fs.lineTo(0.05 * s, -0.2 * s); fs.lineTo(-0.05 * s, -0.2 * s); fs.lineTo(-0.05 * s, 0); fs.closePath();
    return A(new THREE.ExtrudeGeometry(fs, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 }), mat);
  };
  const tick = (mat: THREE.Material = gold, s = 1) => {
    const t = new THREE.Group(); g.add(t);
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.08 * s, 0.21 * s, 0.07 * s), mat); a.rotation.z = Math.PI / 4; a.position.set(-0.07 * s, -0.005 * s, 0); a.castShadow = true; t.add(a);
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.08 * s, 0.38 * s, 0.07 * s), mat); b.rotation.z = -0.58; b.position.set(0.095 * s, 0.105 * s, 0); b.castShadow = true; t.add(b);
    return t; };
  const cross = (mat: THREE.Material = red, s = 1) => {
    const t = new THREE.Group(); g.add(t);
    ([Math.PI / 4, -Math.PI / 4]).forEach((rz) => { const b = new THREE.Mesh(new THREE.BoxGeometry(0.075 * s, 0.36 * s, 0.075 * s), mat); b.rotation.z = rz; b.castShadow = true; t.add(b); });
    return t; };
  const arrow = (len: number, mat: THREE.Material = gold, t = 0.07) => {
    const a = new THREE.Group(); g.add(a);
    const sh = new THREE.Mesh(new THREE.BoxGeometry(len, t, t), mat); sh.position.x = len / 2; sh.castShadow = true; a.add(sh);
    const hd = new THREE.Mesh(new THREE.ConeGeometry(t * 1.8, t * 3.2, 20), mat); hd.rotation.z = -Math.PI / 2; hd.position.x = len + t * 1.6; hd.castShadow = true; a.add(hd);
    return a; };
  /* a broken / unreliable connection */
  const dashed = (len: number, mat: THREE.Material = red, n = 5) => {
    const d = new THREE.Group(); g.add(d);
    for (let i = 0; i < n; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(len / (n * 2), 0.055, 0.055), mat); b.position.x = (i + 0.5) * (len / n) - len / 2; b.castShadow = true; d.add(b); }
    return d; };
  /* Camera-facing structural label. Dark type on a white halo so it stays
     readable wherever it lands over the tableau's own shadows. */
  const label = (text: string, color = "#1D3759") => {
    const fs = 44, pad = 18;
    const probe = document.createElement("canvas").getContext("2d");
    const font = '800 ' + fs + 'px ui-sans-serif, system-ui, -apple-system, sans-serif';
    let w = 200; if (probe) { probe.font = font; w = Math.ceil(probe.measureText(text).width); }
    const c = document.createElement("canvas"); c.width = w + pad * 2; c.height = fs + pad * 2;
    const x = c.getContext("2d");
    if (x) {
      x.font = font; x.textBaseline = "middle"; x.textAlign = "center";
      x.fillStyle = color; x.fillText(text, c.width / 2, c.height / 2);
    }
    const tex = new THREE.CanvasTexture(c); tex.anisotropy = 4;
    /* toneMapped:false — ACES would otherwise wash the type out to near-invisible */
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, toneMapped: false }));
    const H = 0.22; sp.scale.set((c.width / c.height) * H, H, 1); g.add(sp);
    return sp; };
  /* a dashboard monitor — the reporting motif, reused */
  const monitor = (w: number, h: number, barVals: number[], barMat: THREE.Material = lblue) => {
    const m = new THREE.Group(); g.add(m);
    const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, 0.08, 3, 0.03), white); body.castShadow = true; body.receiveShadow = true; m.add(body);
    const scr = new THREE.Mesh(new THREE.BoxGeometry(w - 0.16, h - 0.16, 0.02), navy); scr.position.z = 0.05; m.add(scr);
    const bw = (w - 0.44) / barVals.length;
    barVals.forEach((v, k) => { const bh = (h - 0.34) * v;
      const b = new THREE.Mesh(new THREE.BoxGeometry(bw * 0.56, bh, 0.03), k === barVals.length - 1 ? gold : barMat);
      b.position.set(-(w - 0.44) / 2 + bw * (k + 0.5), -(h - 0.16) / 2 + 0.09 + bh / 2, 0.075); b.castShadow = true; m.add(b); });
    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.18, 16), white); st.position.y = -h / 2 - 0.09; m.add(st);
    const ft = new THREE.Mesh(new RoundedBoxGeometry(w * 0.42, 0.06, 0.24, 3, 0.02), white); ft.position.y = -h / 2 - 0.2; ft.castShadow = true; m.add(ft);
    return m; };
  /* a database cylinder — the single-source motif, reused */
  const stack = (r: number, layers: number, ringMat: THREE.Material = gold) => {
    const s = new THREE.Group(); g.add(s);
    for (let i = 0; i < layers; i++) { const y = i * 0.26;
      const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.19, 40), white); c.position.y = y; c.castShadow = true; c.receiveShadow = true; s.add(c);
      const rr = new THREE.Mesh(new THREE.TorusGeometry(r, 0.028, 12, 40), ringMat); rr.rotation.x = Math.PI / 2; rr.position.y = y + 0.095; rr.castShadow = true; s.add(rr); }
    return s; };

  if (id === "reporting") {
    if (tone === "problem") {
      /* four systems, four disconnected sheets, nothing lines up */
      ([[-1.28, 0.78, -0.18, -0.2], [-0.42, 1.02, 0.08, 0.1], [0.45, 0.72, -0.12, 0.22], [1.3, 0.98, 0.06, -0.12]] as [number, number, number, number][])
        .forEach(([x, y, z, rz], k) => { const c = card(0.66, 0.84); c.position.set(x, y, z); c.rotation.set(0.05, rz * 0.7, rz);
          [0.26, 0.1, -0.06, -0.22].forEach((ry, i) => row(c, 0.4 - i * 0.06, ry, i === 0 ? navy : k % 2 ? slate : lblue, -0.04)); });
      cross(red, 0.9).position.set(-0.86, 1.2, 0.34);
      cross(red, 0.9).position.set(0.02, 0.62, 0.34);
      cross(red, 0.9).position.set(0.9, 1.24, 0.34);
    } else if (tone === "built") {
      /* sources -> one reliable gold pipeline -> one dashboard */
      ([1.42, 0.86, 0.3] as number[]).forEach((y, k) => {
        const c = card(0.5, 0.42); c.position.set(-1.42, y, 0);
        row(c, 0.3, 0.07, navy, -0.04); row(c, 0.22, -0.05, lblue, -0.08);
        const p = pipe(0.62, gold, 0.045); p.position.set(-0.86, y, 0);
        if (k !== 1) { const j = pipe(0.045, gold, 0.045); j.scale.y = Math.abs(y - 0.86) / 0.045; j.position.set(-0.55, (y + 0.86) / 2, 0); } });
      const feed = arrow(0.42, gold, 0.06); feed.position.set(-0.5, 0.86, 0);
      monitor(1.5, 1.05, [0.5, 0.72, 0.44, 0.9]).position.set(0.78, 0.98, 0);
    } else {
      /* live dashboard + a drill-down card pulled out in front */
      monitor(1.66, 1.16, [0.46, 0.68, 0.5, 0.86]).position.set(-0.18, 1.16, -0.2);
      const d = card(0.92, 0.62); d.position.set(0.92, 0.5, 0.62); d.rotation.set(0.06, -0.24, 0);
      row(d, 0.5, 0.16, navy, -0.1); row(d, 0.36, 0.02, lblue, -0.17); row(d, 0.42, -0.12, lblue, -0.14);
      /* clear of the card's yawed front-right corner (x 1.358 / z 0.763), which
         was swallowing the tick */
      tick(green, 0.9).position.set(1.56, 0.5, 0.95);
    }
  } else if (id === "capacity") {
    if (tone === "problem") {
      /* three lanes, bookings landing on top of each other */
      ([0, 1, 2] as number[]).forEach((k) => { const y = 1.3 - k * 0.5;
        const ln = A(new RoundedBoxGeometry(2.9, 0.05, 0.42, 3, 0.02), lblue); ln.position.set(0, y - 0.16, 0); });
      ([[-0.72, 1.3, 1.1, slate], [0.32, 1.3, 0.86, red], [-0.5, 0.8, 1.24, slate], [0.62, 0.8, 0.7, red], [-0.86, 0.3, 0.8, slate], [0.1, 0.3, 1.0, red]] as [number, number, number, THREE.Material][])
        .forEach(([x, y, w, m]) => { const b = A(new RoundedBoxGeometry(w, 0.26, 0.34, 3, 0.03), m); b.position.set(x, y, 0); });
      cross(red, 0.8).position.set(-0.16, 1.3, 0.42);
      cross(red, 0.8).position.set(0.14, 0.8, 0.42);
      cross(red, 0.8).position.set(-0.3, 0.3, 0.42);
    } else if (tone === "built") {
      /* the same lanes, everything snapped into place, nothing overlapping */
      ([0, 1, 2] as number[]).forEach((k) => { const y = 1.3 - k * 0.5;
        const ln = A(new RoundedBoxGeometry(2.9, 0.05, 0.42, 3, 0.02), lblue); ln.position.set(0, y - 0.16, 0); });
      ([[-0.92, 1.3, 0.9, slate], [0.28, 1.3, 1.02, navy], [-0.82, 0.8, 1.1, navy], [0.62, 0.8, 0.72, slate], [-1.0, 0.3, 0.74, slate], [0.16, 0.3, 1.3, navy]] as [number, number, number, THREE.Material][])
        .forEach(([x, y, w, m]) => { const b = A(new RoundedBoxGeometry(w, 0.26, 0.34, 3, 0.03), m); b.position.set(x, y, 0); });
      ([1.3, 0.8, 0.3] as number[]).forEach((y) => { const t = tick(gold, 0.62); t.position.set(1.42, y, 0.3); });
    } else {
      /* the speedometer reading inside a safe band — same motif as the node icon */
      const disc = cyl(0.66, 0.16, white); disc.rotation.x = Math.PI / 2; disc.position.y = 0.78;
      const track = A(new THREE.TorusGeometry(0.46, 0.06, 16, 60, Math.PI), lblue); track.position.set(0, 0.78, 0.09);
      const band = A(new THREE.TorusGeometry(0.46, 0.072, 16, 22, Math.PI * 0.4), green); band.position.set(0, 0.78, 0.1); band.rotation.z = Math.PI * 0.6;
      const nl = A(new THREE.BoxGeometry(0.042, 0.4, 0.035), navy); nl.rotation.z = -Math.PI / 3.4; nl.position.set(0.13, 0.95, 0.13);
      const hub = cyl(0.082, 0.17, navy); hub.rotation.x = Math.PI / 2; hub.position.set(0, 0.78, 0.13);
      ([0.16, 0.5, 0.84] as number[]).forEach((t) => { const a = Math.PI * (1 - t);
        const p = A(new THREE.BoxGeometry(0.035, 0.1, 0.028), slate); p.position.set(Math.cos(a) * 0.58, 0.78 + Math.sin(a) * 0.58, 0.09); p.rotation.z = a - Math.PI / 2; });
      tick(green, 0.8).position.set(0.78, 0.3, 0.3);
    }
  } else if (id === "single-source") {
    if (tone === "problem") {
      /* the same record living in three places, none of them agreeing */
      ([-1.2, 0, 1.2] as number[]).forEach((x, k) => {
        stack(0.44, 2, slate).position.set(x, 0.24, 0);
        /* each silo's own copy of the record, and they disagree */
        const c = card(0.66, 0.54); c.position.set(x, 1.24, 0.04); c.rotation.z = (k - 1) * 0.05;
        row(c, 0.36, 0.12, navy, -0.07); row(c, 0.26, -0.04, k === 1 ? red : lblue, -0.12); });
      dashed(0.7, red, 3).position.set(-0.6, 1.24, 0.1);
      dashed(0.7, red, 3).position.set(0.6, 1.24, 0.1);
      cross(red, 0.78).position.set(-0.6, 1.24, 0.34);
      cross(red, 0.78).position.set(0.6, 1.24, 0.34);
    } else if (tone === "built") {
      /* silos merge down one gold spine into a single core */
      ([[-1.36, 1.5], [-1.36, 0.62]] as [number, number][]).forEach(([x, y]) => {
        const c = card(0.52, 0.46); c.position.set(x, y, 0);
        row(c, 0.3, 0.08, navy, -0.05); row(c, 0.22, -0.06, lblue, -0.09);
        const a = arrow(0.5, gold, 0.05); a.position.set(-1.02, y, 0); });
      const spine = pipe(0.05, gold, 0.05); spine.scale.y = 18; spine.position.set(-0.46, 1.06, 0);
      const join = arrow(0.4, gold, 0.06); join.position.set(-0.42, 1.06, 0);
      stack(0.56, 3, gold).position.set(0.72, 0.62, 0);
    } else {
      /* one core record; every consumer reconciled against it */
      stack(0.62, 3, gold).position.set(-0.86, 0.7, 0);
      const c = card(1.3, 1.08); c.position.set(0.86, 1.06, 0.1);
      ([0.34, 0.14, -0.06, -0.26] as number[]).forEach((y, k) => { row(c, 0.62 - k * 0.08, y, k === 0 ? navy : lblue, -0.22);
        const t = tick(gold, 0.5); t.position.set(1.3, 1.06 + y, 0.2); });
      const bridge = arrow(0.4, gold, 0.05); bridge.position.set(-0.2, 1.06, 0);
      tick(green, 0.8).position.set(-0.86, 1.62, 0.2);
    }
  } else if (id === "sales-project") {
    if (tone === "problem") {
      /* a closed deal that can't reach delivery — the bridge is out */
      const d = card(0.86, 0.78); d.position.set(-1.16, 1.0, 0); d.rotation.set(0.04, 0.16, 0);
      row(d, 0.5, 0.22, navy, -0.1); row(d, 0.38, 0.06, lblue, -0.16); row(d, 0.44, -0.1, lblue, -0.13);
      /* funnel sits on the deal card, opening down into it */
      funnel(slate, 1.05).position.set(-1.16, 1.62, -0.04);
      const p = card(0.86, 0.78, 0.07, lblue); p.position.set(1.16, 1.0, 0); p.rotation.set(0.04, -0.16, 0);
      dashed(1.24, red, 4).position.set(0, 1.0, 0);
      cross(red, 1.0).position.set(0, 1.0, 0.34);
      label("Deal won").position.set(-1.16, 0.42, 0.3);
      label("Delivery").position.set(1.16, 0.42, 0.3);
    } else if (tone === "built") {
      /* required fields lock, then the record crosses a solid gold bridge */
      const d = card(0.86, 0.78); d.position.set(-1.16, 1.0, 0);
      ([0.22, 0.06, -0.1] as number[]).forEach((y, k) => { row(d, 0.44 - k * 0.06, y, k === 0 ? navy : lblue, -0.14);
        const t = tick(gold, 0.42); t.position.set(-0.84, 1.0 + y, 0.1); });
      /* one solid rail carrying the record across — no legs, it's a link not a table */
      const bridge = pipe(1.5, gold, 0.06); bridge.position.set(0, 0.64, 0);
      const moving = card(0.5, 0.44); moving.position.set(-0.06, 0.98, 0.22); moving.rotation.z = -0.06;
      row(moving, 0.28, 0.06, navy, -0.05);
      const a = arrow(0.34, gold, 0.055); a.position.set(0.28, 0.98, 0.22);
      const p = card(0.86, 0.78); p.position.set(1.16, 1.0, 0);
      row(p, 0.46, 0.22, navy, -0.12); row(p, 0.36, 0.06, lblue, -0.17);
      label("Close-won").position.set(-1.16, 0.4, 0.3);
      label("Project").position.set(1.16, 0.4, 0.3);
    } else {
      /* a kickoff-ready project record, billing-ready */
      const c = card(1.5, 1.32); c.position.set(-0.34, 1.1, 0);
      ([0.42, 0.2, -0.02, -0.24, -0.46] as number[]).forEach((y, k) => { row(c, 0.66 - k * 0.06, y, k === 0 ? navy : lblue, -0.2);
        const t = tick(gold, 0.5); t.position.set(0.24, 1.1 + y, 0.1); });
      const base = A(new RoundedBoxGeometry(1.7, 0.14, 0.5, 3, 0.05), green); base.position.set(-0.34, 0.36, 0);
      const inv = card(0.68, 0.86); inv.position.set(0.98, 0.98, 0.34); inv.rotation.set(0.04, -0.3, 0.04);
      row(inv, 0.36, 0.26, navy, -0.08); row(inv, 0.28, 0.12, lblue, -0.12); row(inv, 0.32, -0.02, lblue, -0.1);
      tick(green, 0.8).position.set(1.24, 0.46, 0.5);
    }
  } else if (id === "field-reporting") {
    if (tone === "problem") {
      /* the visit happened — the record scattered and sank */
      ([[-1.3, 1.32, -0.18, -0.24], [-0.34, 0.86, 0.14, 0.3], [0.62, 1.44, -0.1, 0.18], [1.34, 0.72, 0.1, -0.34]] as [number, number, number, number][])
        .forEach(([x, y, z, rz], k) => { const c = card(0.6, 0.72); c.position.set(x, y, z); c.rotation.set(0.14 * k, rz * 0.8, rz);
          row(c, 0.34, 0.18, navy, -0.06); row(c, 0.26, 0.04, lblue, -0.1); });
      cross(red, 0.85).position.set(-0.82, 1.06, 0.34);
      cross(red, 0.85).position.set(1.0, 1.02, 0.34);
    } else if (tone === "built") {
      /* form on site -> submitted -> auto-filed into the right folders */
      const f = card(1.0, 0.86); f.position.set(0, 1.62, 0);
      ([0.24, 0.06, -0.12] as number[]).forEach((y, k) => row(f, 0.56 - k * 0.08, y, k === 0 ? navy : lblue, -0.14));
      const stem = pipe(0.05, gold, 0.05); stem.scale.y = 11; stem.position.set(0, 0.94, 0);
      const rail = pipe(2.3, gold, 0.05); rail.position.set(0, 0.66, 0);
      ([-1.1, 0, 1.1] as number[]).forEach((x) => { const drop = pipe(0.05, gold, 0.05); drop.scale.y = 4.4; drop.position.set(x, 0.55, 0);
        const fold = card(0.66, 0.5); fold.position.set(x, 0.22, 0);
        const tab = A(new RoundedBoxGeometry(0.26, 0.09, 0.06, 3, 0.02), lblue); tab.position.set(x - 0.18, 0.51, 0);
        const t = tick(gold, 0.4); t.position.set(x + 0.2, 0.22, 0.08); });
    } else {
      /* a clean, findable record list with its attachments */
      const c = card(1.62, 1.34); c.position.set(-0.28, 1.06, 0);
      ([0.42, 0.16, -0.1, -0.36] as number[]).forEach((y, k) => {
        const dot = A(new THREE.SphereGeometry(0.055, 20, 16), gold); dot.position.set(-0.94, 1.06 + y, 0.06);
        row(c, 0.72 - k * 0.06, y, k === 0 ? navy : lblue, -0.06);
        const t = tick(gold, 0.45); t.position.set(0.36, 1.06 + y, 0.08); });
      /* the attachments filed against the record — each one an actual doc */
      ([[1.12, 1.42, 0.3], [1.24, 0.98, 0.42], [1.08, 0.54, 0.34]] as [number, number, number][])
        .forEach(([x, y, z], k) => {
          const a = card(0.46, 0.54); a.position.set(x, y, z); a.rotation.set(0.05, -0.34, 0.06 * (k - 1));
          row(a, 0.24, 0.16, navy, -0.04); row(a, 0.18, 0.04, lblue, -0.07); row(a, 0.21, -0.08, lblue, -0.055);
        });
      tick(green, 0.8).position.set(-0.94, 1.86, 0.2);
    }
  } else {
    /* service-handoff */
    if (tone === "problem") {
      /* install finishes holding a thick project history; service opens the
         same record and finds it empty */
      ([[-1.5, 0.94, -0.18, 0.11], [-1.36, 0.98, -0.02, 0.06]] as [number, number, number, number][])
        .forEach(([x, y, z, rz]) => { const st = card(0.82, 0.98); st.position.set(x, y, z); st.rotation.z = rz; });
      const done = card(0.82, 0.98); done.position.set(-1.22, 1.02, 0.16);
      ([0.3, 0.14, -0.02, -0.18, -0.34] as number[]).forEach((y, k) => row(done, 0.46 - k * 0.05, y, k === 0 ? navy : lblue, -0.1));
      const blank = card(0.82, 0.98); blank.position.set(1.22, 1.02, 0.16);
      /* same record, ghosted out — nothing carried across */
      ([0.3, 0.14, -0.02, -0.18, -0.34] as number[]).forEach((y, k) => row(blank, 0.46 - k * 0.05, y, pblue, -0.1));
      dashed(1.36, red, 5).position.set(0, 1.02, 0.1);
      cross(red, 1.0).position.set(0, 1.02, 0.36);
      label("Install").position.set(-1.22, 0.3, 0.3);
      label("Service").position.set(1.22, 0.3, 0.3);
    } else if (tone === "built") {
      /* every visit logged onto one gold thread that links the two teams */
      ([-1.44, 1.44] as number[]).forEach((x) => {
        const c = card(0.7, 0.88); c.position.set(x, 0.62, 0);
        row(c, 0.4, 0.24, navy, -0.09); row(c, 0.3, 0.1, lblue, -0.14); row(c, 0.34, -0.04, lblue, -0.12);
      });
      const rail = pipe(2.18, gold, 0.055); rail.position.set(0, 0.62, 0);
      ([-0.66, 0, 0.66] as number[]).forEach((x) => {
        const bead = A(new THREE.SphereGeometry(0.1, 22, 18), gold); bead.position.set(x, 0.62, 0);
        const stem = pipe(0.04, gold, 0.04); stem.scale.y = 9; stem.position.set(x, 0.85, 0);
        const v = card(0.5, 0.44); v.position.set(x, 1.3, 0);
        row(v, 0.28, 0.06, navy, -0.05); row(v, 0.2, -0.06, lblue, -0.09);
      });
      label("Install").position.set(-1.44, 0.02, 0.3);
      label("Service").position.set(1.44, 0.02, 0.3);
    } else {
      /* the service tech opens the record and sees every visit, newest last */
      const c = card(2.0, 1.44); c.position.set(0, 1.16, 0);
      row(c, 0.78, 0.5, navy, -0.55);
      const rail = pipe(1.5, gold, 0.05); rail.position.set(-0.02, 1.34, 0.06);
      ([0, 1, 2, 3] as number[]).forEach((k) => { const x = -0.74 + k * 0.48;
        const d = A(new THREE.SphereGeometry(0.085, 22, 18), k === 3 ? green : navy); d.position.set(x, 1.34, 0.1);
        /* the visit each stop stands for */
        const s = card(0.34, 0.26); s.position.set(x, 0.86, 0.06);
        row(s, 0.18, 0.04, k === 3 ? green : lblue, -0.03); });
      ([0.62, 0.44] as number[]).forEach((y, k) => row(c, 1.0 - k * 0.3, y - 1.16, lblue, -0.44));
      tick(gold, 0.55).position.set(0.74, 0.56, 0.1);
    }
  }
  return g;
}

/* Renders one story tableau in its own WebGL view; rebuilds on step change. */


/* ──────────────────────────────────────────────────────────────
   Example 01 — "Rebuilding an Agency Process End to End".
   Same step-through popup as every other example, but with seven
   steps, and each step's figure recreates the graphic from that
   slide of the capability briefing (markup, not images). Steps
   whose graphic needs the full width stack figure over text.
   ────────────────────────────────────────────────────────────── */
const PRD_CHEV: { n: string; lines: string[]; fill: string; dashed?: boolean; dark?: boolean; fs?: number }[] = [
  { n: "01", lines: ["Entity-State", "Agreement"], fill: "#1F3864" },
  { n: "02", lines: ["Projected", "Advertisements"], fill: "#2E4A77", fs: 11.5 },
  { n: "03", lines: ["Advertisement"], fill: "#46618C" },
  { n: "04", lines: ["Selection"], fill: "#60779E" },
  { n: "05", lines: ["Contract Execution", "& Review"], fill: "#8FA6C0", fs: 11.5 },
  { n: "06", lines: ["Task Orders", "& POs"], fill: "#BDD0E9", dark: true },
  { n: "07", lines: ["Invoicing"], fill: "#E2ECF6", dashed: true, dark: true },
  { n: "08", lines: ["Closeout"], fill: "#E2ECF6", dashed: true, dark: true },
];

function PrdChevron({ c, first }: { c: (typeof PRD_CHEV)[number]; first: boolean }) {
  const d = first
    ? "M2 30 H124 L148 64 L124 98 H2 Z"
    : "M2 30 H124 L148 64 L124 98 H2 L26 64 Z";
  return (
    <svg className="prd-chev" viewBox="0 0 152 102" role="presentation">
      <path d={d} fill={c.fill} stroke={c.dashed ? "#E1524A" : "none"} strokeWidth={c.dashed ? 2.2 : 0} strokeDasharray={c.dashed ? "7 5" : undefined} />
      <circle cx="20" cy="15" r="13" fill={c.dashed ? "#fff" : "#1F3864"} stroke={c.dashed ? "#E1524A" : "#fff"} strokeWidth="2" strokeDasharray={c.dashed ? "4.5 3.5" : undefined} />
      <text x="20" y="19.5" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={c.dashed ? "#1F3864" : "#fff"}>{c.n}</text>
      {c.lines.map((l, k) => (
        <text key={l} x="80" y={c.lines.length === 1 ? 70 : 60 + k * 17} textAnchor="middle" fontSize={c.lines.length === 1 ? 14.5 : (c.fs ?? 14)} fontWeight="700" fill={c.dark ? "#16233A" : "#fff"}>{l}</text>
      ))}
    </svg>
  );
}

const PRD_TOOLS: { l: string; ic: React.ReactNode }[] = [
  { l: "Email", ic: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></> },
  { l: "Spreadsheets", ic: <><rect x="3" y="4" width="18" height="16" rx="1.5" /><path d="M3 9h18M3 14h18M9 4v16M15 4v16" /></> },
  { l: "Word Documents", ic: <><path d="M6 3h9l4 4v14H6z" /><path d="M9 11h7M9 14h7M9 17h5" /></> },
  { l: "PDF Forms", ic: <><path d="M6 3h9l4 4v14H6z" /><path d="M9 12h4M9 15h6" /><circle cx="10" cy="8" r="1.2" /></> },
  { l: "Shared Drive", ic: <><path d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></> },
  { l: "Scanned Paper", ic: <><path d="M7 4h8l3 3v13H7z" /><path d="M5 7h2M5 11h2M5 15h2" /><path d="M10 10h5M10 13h5" /></> },
  { l: "Calendar Reminders", ic: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><circle cx="12" cy="15" r="2" /></> },
  { l: "Verbal Follow Up", ic: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></> },
  { l: "Manual Status Log", ic: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v3H9z" /><path d="M9 11h6M9 15h6" /></> },
];

const PRD_CHAIN: { l: string; note?: string }[] = [
  { l: "Project Intake" },
  { l: "Projected Advertisements", note: "status carries the work forward" },
  { l: "Advertisement & Selection" },
  { l: "Contract Execution", note: "documents built from the record" },
  { l: "Task Orders & Purchase Orders" },
  { l: "Invoicing", note: "everything filed in one place" },
];

type PrdStep = { k: string; cap: string; items: string[]; tone: "problem" | "built" | "result"; fig: string; stacked?: boolean };

const PRD_STEPS: PrdStep[] = [
  { k: "The Problem", cap: "Eight steps, four divisions, email in between", tone: "problem", fig: "chevrons", stacked: true,
    items: ["Consultant contracting runs from the entity agreement through advertisement, selection, task orders, invoicing, and closeout", "Each step carries distinct ownership across procurement, legal, engineering, and accounting", "The handoffs between them rely on email, spreadsheets, and scanned paper", "Information is re-entered at every stage"] },
  { k: "How We Work", cap: "Mapped with the people who perform the work", tone: "built", fig: "vs", stacked: true,
    items: ["The process map was developed in working sessions with the staff who carry out each step — not those who oversee it", "That distinction separates a workflow that is adopted from one that is worked around", "It brings forward the undocumented exceptions that decide whether a process initiative succeeds"] },
  { k: "What We Built", cap: "One connected workflow instead of eight disconnected ones", tone: "built", fig: "built", stacked: true,
    items: ["One intake form — the only place work enters", "The first six steps rebuilt as one connected workflow", "Status carries the work forward; documents are built from the record", "Everything files to one place — nothing crosses a boundary by hand"] },
  { k: "The Architecture", cap: "Work management, integration layer, existing systems", tone: "built", fig: "arch", stacked: true, items: [] },
  { k: "Proof", cap: "Validated by the people who will operate it", tone: "result", fig: "proof",
    items: ["More than twenty agency staff across three divisions completed the full working walkthrough", "Contracting, research & technology transfer, and internal IT were all represented", "One working session per step, staffed with the people who perform it rather than with managers"] },
  { k: "Governance & Handover", cap: "Designed to be handed over — and to hold up to scrutiny", tone: "result", fig: "gov",
    items: ["How data is handled is decided before anything is built, not after", "The record retains the consensus outcome, never an individual evaluator's score", "The platform is chosen for maintainability — agency staff can be trained to run it", "We expect the work to outlast our engagement"] },
  { k: "Where This Applies", cap: "What we do", tone: "result", fig: "apply", stacked: true, items: [] },
];

function PrdFig({ fig }: { fig: string }) {
  if (fig === "chevrons") return (
    <div className="prd-panel">
      <div className="prd-chevrow">
        {PRD_CHEV.map((c, k) => <PrdChevron key={c.n} c={c} first={k === 0} />)}
      </div>
      <div className="prd-legend">
        <span className="prd-leg-item"><span className="prd-leg-pill">Steps 1-6</span><span className="prd-leg-t">Built</span></span>
        <span className="prd-leg-item"><span className="prd-leg-pill dashed">Steps 7-8</span><span className="prd-leg-t">Sequenced</span></span>
      </div>
    </div>
  );
  if (fig === "vs") return (
    <div className="prd-panel">
      <div className="prd-vs">
        <div className="prd-vs-col">
          <div className="prd-vs-banner light">
            <span className="prd-vs-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#1F3864" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="7" r="3" /><path d="M4 19c0-3 2.7-5 6-5" /><circle cx="16.5" cy="15.5" r="3" /><path d="M16.5 13.6v-1.1M16.5 18.5v-1.1M18.4 15.5h1.1M13.6 15.5h1.1" /></svg></span>
            <span>The Conventional Approach</span>
          </div>
          <ol className="prd-vs-list">
            <li><span className="prd-vs-n light">01</span><p>The process is described by those who manage it</p></li>
            <li><span className="prd-vs-n light">02</span><p>Only documented procedure enters the map</p></li>
            <li><span className="prd-vs-n light">03</span><p>Exceptions emerge after implementation</p></li>
          </ol>
        </div>
        <div className="prd-vs-mid">vs</div>
        <div className="prd-vs-col right">
          <div className="prd-vs-banner dark">
            <span>Our Approach</span>
            <span className="prd-vs-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#1F3864" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 16a5.5 5.5 0 1 1 6 0v2H9z" /><path d="M10 21h4" /><path d="M12 3v1M5 6l.8.8M19 6l-.8.8" /></svg></span>
          </div>
          <ol className="prd-vs-list right">
            <li><p>Working sessions with the staff who perform each step</p><span className="prd-vs-n dark">01</span></li>
            <li><p>Undocumented exceptions identified early, by design</p><span className="prd-vs-n dark">02</span></li>
            <li><p>A workflow that is adopted, not worked around</p><span className="prd-vs-n dark">03</span></li>
          </ol>
        </div>
      </div>
    </div>
  );
  if (fig === "built") return (
    <div className="prd-panel">
      <div className="prd-built">
        <div className="prd-built-col">
          <h4 className="prd-h4">Today</h4>
          <p className="prd-sub">Separate tools, stitched together by hand</p>
          <span className="prd-underline" />
          <div className="prd-scatter">
            <svg className="prd-web" viewBox="0 0 300 300" preserveAspectRatio="none" aria-hidden="true">
              {([[50, 50, 150, 150], [150, 50, 50, 150], [150, 50, 250, 150], [250, 50, 150, 150], [50, 50, 250, 50], [50, 150, 150, 250], [150, 150, 50, 250], [150, 150, 250, 250], [250, 150, 150, 250], [50, 150, 150, 50], [250, 150, 250, 50], [150, 150, 150, 50], [50, 250, 250, 150]] as [number, number, number, number][]).map(([x1, y1, x2, y2], k) => (
                <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a7b5c7" strokeWidth="1.6" strokeDasharray="5 6" opacity="0.9" />
              ))}
            </svg>
            {PRD_TOOLS.map((tool) => (
              <div className="prd-tool" key={tool.l}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#A98B5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{tool.ic}</svg>
                <span>{tool.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="prd-built-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="#1F3864" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></div>
        <div className="prd-built-col">
          <h4 className="prd-h4">In the system</h4>
          <p className="prd-sub">One intake, one path forward</p>
          <span className="prd-underline" />
          <div className="prd-chain">
            <div className="prd-chain-row">
              <div className="prd-box prd-box-intake">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1F3864" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h8l3 3v15H7z" /><path d="M10 9h5M10 12h5M10 15h3" /></svg>
                <span><b>ONE INTAKE FORM</b><em>the only place work enters</em></span>
              </div>
            </div>
            {PRD_CHAIN.map((s) => (
              <div className="prd-chain-row" key={s.l}>
                <svg className="prd-down" viewBox="0 0 20 14" aria-hidden="true"><path d="M10 14 L2 4 h5 V0 h6 v4 h5 Z" fill="#1F3864" /></svg>
                <div className="prd-box">{s.l}</div>
                {s.note ? <span className="prd-note">{s.note}</span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  if (fig === "arch") return (
    <div className="prd-panel">
      <div className="prd-arch-legend"><span className="prd-dash-glyph" />dashed = not yet connected, pending access approval</div>
      <div className="prd-arch">
        <div className="prd-arch-row">
          <span className="prd-arch-side">where the work is tracked</span>
          <div className="prd-band" style={{ background: "#D3E0F0" }}>
            <b>Work management &mdash; monday.com</b>
            <i>the record of where every project stands, and what moves it to the next stage</i>
            <div className="prd-chips">{["Intake forms", "Boards & pipeline status", "Automations & approvals", "Views & dashboards"].map((c) => <span key={c}>{c}</span>)}</div>
          </div>
        </div>
        <div className="prd-arch-arrows">{[0, 1, 2, 3].map((k) => <svg key={k} viewBox="0 0 12 22" aria-hidden="true"><path d="M6 1v20M6 1l-4 5M6 1l4 5M6 21l-4-5M6 21l4-5" stroke="#7d92ad" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>)}</div>
        <div className="prd-arch-row">
          <span className="prd-arch-side">where the platforms talk to each other</span>
          <div className="prd-band" style={{ background: "#A9C3E4" }}>
            <b>Integration layer &mdash; Make</b>
            <i>the only place the platforms hand work to one another; nothing crosses a boundary by hand</i>
            <div className="prd-chips">{["Document generation", "Filing to storage", "Notices & email", "System-to-system sync"].map((c) => <span key={c}>{c}</span>)}</div>
          </div>
        </div>
        <div className="prd-arch-arrows">{[0, 1, 2, 3].map((k) => <svg key={k} viewBox="0 0 12 22" aria-hidden="true"><path d="M6 1v20M6 1l-4 5M6 1l4 5M6 21l-4-5M6 21l4-5" stroke="#7d92ad" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>)}</div>
        <div className="prd-arch-row">
          <span className="prd-arch-side">where records already live</span>
          <div className="prd-band" style={{ background: "#EDEEF0" }}>
            <b>Systems already in place</b>
            <i>left where they are &mdash; the layers above reach into them rather than replacing them</i>
            <div className="prd-chips">
              {["Document storage", "Email", "Reporting exports", "Electronic signature"].map((c) => <span key={c}>{c}</span>)}
              <span className="dashed">Departmental systems <em>access pending</em></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  if (fig === "gov") return (
    <div className="prd-panel prd-gov">
      <svg viewBox="0 0 400 260" role="img" aria-label="A governed record, protected by design, handed over to be run by the agency">
        <rect x="42" y="52" width="132" height="132" rx="12" fill="#fff" stroke="#1F3864" strokeWidth="2" />
        <rect x="58" y="72" width="72" height="10" rx="5" fill="#1F3864" />
        <rect x="58" y="92" width="100" height="8" rx="4" fill="#C9D7EC" />
        <rect x="58" y="108" width="88" height="8" rx="4" fill="#C9D7EC" />
        <rect x="58" y="124" width="96" height="8" rx="4" fill="#C9D7EC" />
        <g transform="translate(136 128) scale(2.6)">
          <path d="M12 3l8 3v5c0 4.6-3.2 8.2-8 10-4.8-1.8-8-5.4-8-10V6z" fill="#1F3864" stroke="#fbfcfe" strokeWidth="1.4" />
          <path d="M9 12l2 2 4-4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <path d="M212 118 h52 M254 106 l14 12 -14 12" fill="none" stroke="#C9A85E" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="330" cy="118" r="46" fill="#D3E0F0" stroke="#1F3864" strokeWidth="2" />
        <g fill="none" stroke="#1F3864" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="330" cy="103" r="11" />
          <path d="M308 143 c0-12 10-19 22-19 s22 7 22 19" />
        </g>
        <circle cx="362" cy="86" r="13" fill="#C9A85E" />
        <path d="M356 86 l4 4 8-8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  if (fig === "proof") return (
    <div className="prd-panel">
      <div className="prd-tiles">
        <div className="prd-tile" style={{ background: "#1F3864" }}><b>20+</b><span>agency staff completed the full working walkthrough</span></div>
        <div className="prd-tile" style={{ background: "#46618C" }}><b>3</b><span>divisions represented, contracting through internal IT</span></div>
        <div className="prd-tile dark" style={{ background: "#BDD0E9" }}><b>1</b><span>working session per step, with the staff who perform it</span></div>
      </div>
    </div>
  );
  return (
    <div className="prd-panel prd-apply-img">
      {/* the actual graphic from the briefing, per Nicole */}
      <img src="/images/pages/where-this-applies.png" alt="Where this applies: process mapping, workflow rebuilds, integration, data governance, and training & handover" />
    </div>
  );
}

function StoryScene3D({ sceneId, tone }: { sceneId: string; tone: string }) {
  const host = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = host.current; if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.04;
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xc3d2e8, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.5); key.position.set(1.5, 6.6, 3.0);
    key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5; key.shadow.camera.far = 20;
    key.shadow.camera.left = -4; key.shadow.camera.right = 4; key.shadow.camera.top = 4; key.shadow.camera.bottom = -4;
    key.shadow.bias = -0.0012; scene.add(key);
    const fill = new THREE.DirectionalLight(0xdbe6f7, 0.85); fill.position.set(-3.4, 1.8, 2.4); scene.add(fill);

    const rig = new THREE.Group(); scene.add(rig);
    const tab = storyScene(sceneId, tone); rig.add(tab);

    /* centre the tableau on the origin */
    tab.updateMatrixWorld(true);
    const bb = new THREE.Box3().setFromObject(tab);
    const ctr = bb.getCenter(new THREE.Vector3()), size = bb.getSize(new THREE.Vector3());
    tab.position.set(-ctr.x, -ctr.y, -ctr.z);
    /* No ground plane: the key light threw long shadow smears across the
       bottom of every tableau, right where the labels sit. Objects still
       shadow each other, which is enough to read as solid. */

    /* Frame it against the view's real aspect and refit on every resize. This
       used to assume 16/9, so a narrower canvas (phone) cropped the sides. */
    const fit = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      const t = Math.tan((camera.fov * Math.PI) / 360);
      const distV = (size.y * 1.34) / 2 / t;
      const distH = (size.x * 1.14) / 2 / (t * Math.max(camera.aspect, 0.01));
      camera.position.set(0, size.y * 0.16, Math.max(distV, distH) + size.z * 0.6);
      camera.lookAt(0, 0, 0);
    };
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    fit();

    let raf = 0; const t0 = performance.now();
    const tick = () => {
      const t = (performance.now() - t0) / 1000;
      rig.rotation.y = Math.sin(t * 0.42) * 0.24;
      rig.rotation.x = Math.sin(t * 0.32) * 0.05 - 0.02;
      rig.position.y = Math.sin(t * 0.9) * 0.035;
      renderer.render(scene, camera); raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh & { material?: THREE.Material | THREE.Material[]; map?: THREE.Texture };
        if (m.geometry) m.geometry.dispose();
        const mat = m.material;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else if (mat) { const sm = mat as THREE.SpriteMaterial; if (sm.map) sm.map.dispose(); mat.dispose(); }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [sceneId, tone]);
  return <div className="rai-vis" ref={host} />;
}

type HubProps = { embedded?: boolean; eyebrow?: React.ReactNode; title?: React.ReactNode; intro?: React.ReactNode };
export default function AutomationIntegrationInteractive({ embedded = false, eyebrow, title, intro }: HubProps = {}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [introOpen, setIntroOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const labelEls = useRef<(HTMLDivElement | null)[]>([]);
  const labW = useRef<number[]>([]);
  /* A phone needs a tighter ring and a steeper look so the name tiles have
     room beside each icon. R is baked into the connector geometry, so the
     scene is rebuilt when this flips. */
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width:760px)");
    const sync = () => setNarrow(mq.matches);
    sync(); mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const openRef = useRef<(i: number) => void>(() => {});
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const openIdxRef = useRef<number | null>(null);
  const active = openIdx === null ? null : NODES[openIdx];
  openIdxRef.current = openIdx;

  const STEPS: { k: string; cap: string; items: string[]; tone: "problem" | "built" | "result"; fig?: string; stacked?: boolean }[] = active
    ? (active.id === "process-rebuild"
      ? PRD_STEPS
      : [
          { k: "The Problem", cap: active.before, items: active.problem, tone: "problem" },
          { k: "What We Built", cap: "", items: active.built, tone: "built" },
          { k: "The Result", cap: active.after, items: active.result, tone: "result" },
        ])
    : [];

  openRef.current = (i: number) => { lastFocused.current = document.activeElement as HTMLElement; setStep(0); setOpenIdx(i); };
  const close = () => { setOpenIdx(null); lastFocused.current?.focus?.(); };

  /* modal a11y */
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtnRef.current?.focus(), 40);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIdx]);

  /* three.js scene */
  useEffect(() => {
    const canvas = canvasRef.current, stage = sceneRef.current;
    if (!canvas || !stage) return;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.08; renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100); camera.position.set(0, narrow ? 11.0 : 7.8, 14.6);
    const camTarget = new THREE.Vector3(0, 0.05, 0);
    /* A node's visible silhouette in its own space: the platform (wide but low)
       plus the icon (tall but narrow). Used for label placement — a plain box
       would include corners at icon height where nothing is drawn. */
    const NODE_SIL: THREE.Vector3[] = [];
    for (let c = 0; c < 4; c++) NODE_SIL.push(new THREE.Vector3(c & 1 ? 0.78 : -0.78, 0.3, c & 2 ? 0.78 : -0.78));
    NODE_SIL.push(new THREE.Vector3(0, 1.75, 0), new THREE.Vector3(-0.5, 1.55, 0), new THREE.Vector3(0.5, 1.55, 0));
    const cv = new THREE.Vector3();
    scene.add(new THREE.HemisphereLight(0x6f92c8, 0x0a1224, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.9); key.position.set(6, 11, 7); key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048); key.shadow.camera.near = 1; key.shadow.camera.far = 40;
    key.shadow.camera.left = -10; key.shadow.camera.right = 10; key.shadow.camera.top = 10; key.shadow.camera.bottom = -10;
    key.shadow.bias = -0.0004; key.shadow.radius = 6; scene.add(key);
    const fill = new THREE.DirectionalLight(0x88a0d0, 0.4); fill.position.set(-7, 4, -3); scene.add(fill);
    scene.add(new THREE.PointLight(0xe0a63c, 20, 16, 2).translateY(1.4));
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: 0.34 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -1.15; ground.receiveShadow = true; scene.add(ground);

    const rig = new THREE.Group(); scene.add(rig);
    const R = narrow ? 3.0 : 4.6; const hitMeshes: THREE.Object3D[] = [];
    const disposables: { dispose: () => void }[] = [];

    const center = new THREE.Group(); rig.add(center);
    const rTex = new THREE.TextureLoader().load("/images/dev/r-icon.png"); rTex.colorSpace = THREE.SRGBColorSpace; rTex.anisotropy = 8;
    const rk = narrow ? 0.88 : 1; /* R core a touch smaller on a phone */
    const rGeo = new THREE.PlaneGeometry(2.15 * rk, 2.08 * rk); const rMat = new THREE.MeshBasicMaterial({ map: rTex, transparent: true, depthWrite: false, depthTest: false });
    const rPlane = new THREE.Mesh(rGeo, rMat); rPlane.renderOrder = 20; scene.add(rPlane); disposables.push(rTex, rGeo, rMat);

    const pedGeo = new RoundedBoxGeometry(1.5, 0.4, 1.5, 4, 0.13); disposables.push(pedGeo);
    const nodeGroups: { g: THREE.Group; spin: THREE.Group; phase: number }[] = [];
    /* Sample points the camera fit has to keep on screen. These are the nodes'
       own footprints, NOT the hub's bounding box: the hub is a ring, so its box
       corners jut out to ~1.4x the ring radius into empty space and fitting
       them shrinks everything for nothing. */
    const fitPts: THREE.Vector3[] = [];
    NODES.forEach((n, i) => {
      const a = (n.ang * Math.PI) / 180, px = Math.sin(a) * R, pz = Math.cos(a) * R;
      /* Follow the node's real silhouette, not a box around it. A box puts a
         corner at icon-top height where nothing exists, so the fit reserved a
         band of empty air above the hub. The platform is wide but low; only the
         icon's middle is tall.
         Sampled across a 60deg sweep as well: with seven nodes the hub repeats
         every ~51deg, so that covers every angle you can drag it to. Fitting only the rest pose
         let nodes swing outside the frame and clip once you started rotating. */
      for (let s = 0; s < 6; s++) {
        const th = (s * 10 * Math.PI) / 180, sx = Math.sin(a + th) * R, sz = Math.cos(a + th) * R;
        for (let c = 0; c < 4; c++) fitPts.push(new THREE.Vector3(sx + (c & 1 ? 0.78 : -0.78), 0.3, sz + (c & 2 ? 0.78 : -0.78)));
        fitPts.push(new THREE.Vector3(sx, 1.75, sz));
        fitPts.push(new THREE.Vector3(sx - 0.5, 1.55, sz), new THREE.Vector3(sx + 0.5, 1.55, sz));
      }
      const g = new THREE.Group(); g.position.set(px, 0, pz); rig.add(g);
      const pedMat = new THREE.MeshStandardMaterial({ color: 0xeef2f8, metalness: 0.05, roughness: 0.55 }); disposables.push(pedMat);
      const ped = new THREE.Mesh(pedGeo, pedMat); ped.castShadow = true; ped.receiveShadow = true; ped.userData.i = i; g.add(ped); hitMeshes.push(ped);
      /* bigger icons, auto-centred on their platform and resting on its face.
         The icon hangs off a `spin` pivot placed on the platform's own axis, so
         billboarding it turns it on the spot instead of swinging it in a circle
         (bObj builds each icon around its own origin, not its visual centre). */
      const obj = bObj(n.icon, n.accent);
      obj.scale.setScalar(1.28); obj.updateMatrixWorld(true);
      const bb = new THREE.Box3().setFromObject(obj); const bc = bb.getCenter(new THREE.Vector3());
      const spin = new THREE.Group(); spin.position.y = 0.2 - bb.min.y; g.add(spin);
      obj.position.set(-bc.x, 0, -bc.z);
      spin.add(obj);
      obj.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) { m.userData.i = i; hitMeshes.push(m); disposables.push(m.geometry as THREE.BufferGeometry, m.material as THREE.Material); } });
      const gl = new THREE.PointLight(new THREE.Color(n.accent).getHex(), 3.2, 4.5, 2); gl.position.set(0, 1.0, 0.3); g.add(gl);
      nodeGroups.push({ g, spin, phase: i * 1.1 });
    });

    /* connectors: each node -> the R core (navy->gold, gently curved) */
    const cNavy = new THREE.Color(0x24406e), cGold = new THREE.Color(0xe0a63c);
    NODES.forEach((n, i) => {
      const a = (n.ang * Math.PI) / 180, dx = Math.sin(a), dz = Math.cos(a);
      const start = new THREE.Vector3(dx * R * 0.82, -0.30, dz * R * 0.82);
      const end = new THREE.Vector3(dx * 1.15 * rk, -0.27, dz * 1.15 * rk);
      const mid = start.clone().lerp(end, 0.5);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const tg = new THREE.TubeGeometry(curve, 44, 0.009, 8, false);
      const uvA = tg.attributes.uv, col = new Float32Array(uvA.count * 3), tmp = new THREE.Color();
      for (let k = 0; k < uvA.count; k++) { const u = uvA.getX(k); tmp.copy(cNavy).lerp(cGold, Math.pow(u, 0.55)); col[k * 3] = tmp.r; col[k * 3 + 1] = tmp.g; col[k * 3 + 2] = tmp.b; }
      tg.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const tm = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.8 });
      rig.add(new THREE.Mesh(tg, tm)); disposables.push(tg, tm);
    });

    /* interaction */
    const ray = new THREE.Raycaster(), pointer = new THREE.Vector2(); let hover = -1;
    let drag = false, px0 = 0, rotY = 0, rotVel = 0, lastX = 0;
    const onDown = (e: PointerEvent) => { drag = true; lastX = e.clientX; px0 = e.clientX; canvas.setPointerCapture(e.pointerId); };
    const onUp = (e: PointerEvent) => { drag = false; if (Math.abs(e.clientX - px0) < 5) clickAt(e); };
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1; pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1; if (drag) { rotVel = (e.clientX - lastX) * 0.005; rotY += rotVel; lastX = e.clientX; } };
    const clickAt = (e: PointerEvent) => { if (openIdxRef.current !== null) return; const r = canvas.getBoundingClientRect(); pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1; pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1; ray.setFromCamera(pointer, camera); const hit = ray.intersectObjects(hitMeshes, false); if (hit.length) openRef.current(hit[0].object.userData.i as number); };
    canvas.addEventListener("pointerdown", onDown); canvas.addEventListener("pointerup", onUp); canvas.addEventListener("pointermove", onMove);

    const BASE_Z = 14.6, BASE_Y = narrow ? 11.0 : 7.8;
    const TILT = Math.atan(BASE_Y / BASE_Z);
    /* Just a sanity floor now. The old desktop floor (hypot(BASE_Y, BASE_Z) =
       16.55) was tuned when the hub owned the whole viewport; with the intro
       above it the stage is shorter, and the floor pinned the camera at 16.6
       when the fit wanted ~11.7 — which is why the hub looked shrunken. */
    const D_MIN = 5;
    let camZ = BASE_Z, camY = BASE_Y;

    /* Fit numerically: project the hub and scale the distance until it just
       fits. Solving this in closed form is easy to get subtly wrong (it already
       was), and this self-corrects for tilt, aspect and fov.
       It also recentres vertically: the camera looks down, so the ring's near
       side falls further below the origin than the far side rises above it.
       Centring on the origin therefore fills to the bottom and leaves a band of
       dead air at the top — which is the gap under the intro. */
    /* Width and height are budgeted separately. Desktop keeps the hub off the
       side labels (0.70 => ~200px clear each side at 1360); a phone has no side
       labels so it can use the full width. */
    const FILL_X = narrow ? 0.98 : 0.63, FILL_Y = narrow ? 0.96 : 0.86;
    const q = new THREE.Vector3();
    const solveFit = () => {
      let d = Math.max(D_MIN, 12), ty = 0;
      const t = Math.tan((camera.fov * Math.PI) / 360);
      for (let it = 0; it < 30; it++) {
        camera.position.set(0, ty + Math.sin(TILT) * d, Math.cos(TILT) * d);
        camera.lookAt(0, ty, 0); camera.updateMatrixWorld(true);
        let mx = 0, minY = Infinity, maxY = -Infinity;
        for (const p of fitPts) {
          q.copy(p).project(camera);
          mx = Math.max(mx, Math.abs(q.x)); minY = Math.min(minY, q.y); maxY = Math.max(maxY, q.y);
        }
        const k = Math.max(mx / FILL_X, ((maxY - minY) / 2) / FILL_Y);
        /* pull the projected centre onto the screen centre, damped */
        ty += ((maxY + minY) / 2) * t * d * 0.9;
        d *= k;
        if (Math.abs(k - 1) < 0.004 && Math.abs(maxY + minY) < 0.01) break;
      }
      return { d: Math.min(Math.max(d, D_MIN), 40), ty };
    };

    const resize = () => {
      const w = stage.clientWidth || window.innerWidth, h = stage.clientHeight || window.innerHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      const fit = solveFit();
      camTarget.set(0, fit.ty, 0);
      camZ = Math.cos(TILT) * fit.d; camY = fit.ty + Math.sin(TILT) * fit.d;
      /* label boxes are shrink-to-fit; cache widths for edge clamping */
      labelEls.current.forEach((el, i) => { labW.current[i] = el ? el.offsetWidth : 0; });
    };
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize); ro.observe(stage);
    resize();

    let raf = 0;
    const animate = (now: number) => {
      const t = now * 0.001;
      if (!drag) { rotVel *= 0.92; rotY += rotVel; }
      rig.rotation.y = rotY + Math.sin(t * 0.18) * 0.14;
      center.position.y = 0.35 + Math.sin(t * 0.9) * 0.12;
      nodeGroups.forEach((nd, i) => {
        nd.g.position.y = Math.sin(t * 0.9 + nd.phase) * 0.14;
        const sc = hover === i ? 1.07 : 1; nd.g.scale.setScalar(THREE.MathUtils.lerp(nd.g.scale.x, sc, 0.15));
        /* keep each icon turned toward the viewer as the hub rotates, so you
           never see its back. rig only yaws, so cancelling rig.rotation.y is
           enough to pin the icon's world yaw at the camera. */
        const wp = new THREE.Vector3(); nd.spin.getWorldPosition(wp);
        nd.spin.rotation.y = Math.atan2(camera.position.x - wp.x, camera.position.z - wp.z) - rig.rotation.y;
      });
      { const cw = new THREE.Vector3(); center.getWorldPosition(cw); const tc = camera.position.clone().sub(cw).normalize(); rPlane.position.copy(cw).addScaledVector(tc, 0.3); rPlane.quaternion.copy(camera.quaternion); }
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY - pointer.y * 0.6, 0.04);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.08);
      camera.lookAt(camTarget);
      if (openIdxRef.current !== null) { hover = -1; canvas.style.cursor = "default"; }
      else { ray.setFromCamera(pointer, camera); const hit = ray.intersectObjects(hitMeshes, false); const idx = hit.length ? (hit[0].object.userData.i as number) : -1; if (idx !== hover) { hover = idx; canvas.style.cursor = idx >= 0 ? "pointer" : "grab"; } }
      const w = stage.clientWidth, h = stage.clientHeight;
      const cs = new THREE.Vector3(0, 0.4, 0).project(camera); const csx = (cs.x * 0.5 + 0.5) * w, csy = (-cs.y * 0.5 + 0.5) * h;
      const items = nodeGroups.map((nd, i) => {
        const world = new THREE.Vector3(); nd.g.getWorldPosition(world); world.y += 0.8;
        const p = world.clone().project(camera); const sx = (p.x * 0.5 + 0.5) * w;
        /* Measure the node's real silhouette so the label sits just outside what
           you can actually see. A box around the node put corners at icon height
           near the camera, which project wider than any real geometry — that's
           what was holding the labels out at arm's length. */
        let nMin = Infinity, nMax = -Infinity;
        for (const lp of NODE_SIL) {
          cv.copy(lp).applyMatrix4(nd.g.matrixWorld).project(camera);
          const cvx = (cv.x * 0.5 + 0.5) * w; nMin = Math.min(nMin, cvx); nMax = Math.max(nMax, cvx);
        }
        return { i, sx, sy: (-p.y * 0.5 + 0.5) * h + (NODES[i].labDy || 0) * (narrow ? 0.4 : 1), vis: p.z < 1 && p.z > -1, left: sx < csx, nMin, nMax };
      });
      /* GAP is measured from the node's own on-screen edge, so labels sit close
         whatever the hub's angle. MINGAP only de-collides labels that would
         actually overlap — a bigger value drags them away from their icons. */
      const MINGAP = narrow ? 42 : 90, GAP = narrow ? 6 : 10, pad = 8;
      ([true, false]).forEach((side) => {
        const arr = items.filter((it) => it.left === side).sort((a, b) => a.sy - b.sy);
        for (let k = 1; k < arr.length; k++) { if (arr[k].sy - arr[k - 1].sy < MINGAP) arr[k].sy = arr[k - 1].sy + MINGAP; }
        if (arr.length) { const over = arr[arr.length - 1].sy - (h - 60); if (over > 0) arr.forEach((a) => { a.sy -= over; }); }
        arr.forEach((a) => { a.sy = Math.min(Math.max(a.sy, 56), h - 56); });
      });
      items.forEach((it) => {
        const lab = labelEls.current[it.i]; if (!lab) return;
        const lw = labW.current[it.i] || 216;
        let x = it.left ? it.nMin - GAP : it.nMax + GAP;
        if (it.left) { if (x - lw < pad) x = pad + lw; } else { if (x + lw > w - pad) x = w - pad - lw; }
        lab.style.left = x + "px"; lab.style.top = it.sy + "px";
        lab.style.transform = it.left ? "translate(-100%,-50%)" : "translate(0,-50%)";
        lab.classList.toggle("on", it.vis);
      });
      renderer.render(scene, camera); raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown); canvas.removeEventListener("pointerup", onUp); canvas.removeEventListener("pointermove", onMove);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [narrow]);

  return (
    <>
    {/* the site's ambient background + drifting orbs, same as every other page.
        Skipped when embedded — the host page already draws its own. */}
    {!embedded && <>
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /><div className="orb orb-4" />
      </div>
    </>}

    <div className={"rai-root" + (embedded ? " rai-embed" : "")}>
      <style>{CSS}</style>
      {/* same pattern as the home page's "Why Rawlins" block — deliberately not
          using .reveal, which starts at opacity:0 and needs the home page's
          scroll observer to ever become visible */}
      <header className="rai-intro">
        <p className="section-label"><span className="gold-text">{eyebrow ?? "Automation & AI"}</span></p>
        <h1 className="section-title">{title ?? <>Applied <em>Solutions</em></>}</h1>
        <button
          type="button"
          className={`intro-expand-btn${introOpen ? " expanded" : ""}`}
          aria-expanded={introOpen}
          aria-controls="rai-intro-more"
          aria-label={introOpen ? "Hide details" : "Read more"}
          onClick={() => setIntroOpen((o) => !o)}
        >
          <span className="intro-expand-icon">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1.5l7 7 7-7" />
            </svg>
          </span>
        </button>
        <div id="rai-intro-more" className={`intro-expandable${introOpen ? " expanded" : ""}`}>
          {intro ?? <p className="section-text">Smarter systems, proven in practice. Every challenge started the same way — disconnected tools, duplicated work, and information scattered across systems. We connected what each team already used, automated the manual steps, and brought the full picture into one clear view.</p>}
        </div>
      </header>
      <div className="rai-hint"><span className="dot" /><span>Applied solutions &bull; click to explore &bull; drag to rotate</span></div>
      <div className="rai-stage" ref={sceneRef}>
        <canvas className="rai-canvas" ref={canvasRef} />
        {NODES.map((n, i) => (
          <div className="rai-label" key={n.id} style={{ ["--acc" as string]: n.accent }} onClick={() => openRef.current?.(i)} ref={(el) => { labelEls.current[i] = el; }}>
            <div className="tab">{n.title}</div>
            <div className="body">
              {n.descLines ? n.descLines.map((l) => <span key={l}>{l}</span>) : n.desc}
            </div>
          </div>
        ))}
      </div>
      {/* mobile only — the hub stays tappable, this just names the examples */}
      <ul className="rai-mlist">
        {NODES.map((n, i) => (
          <li key={n.id}>
            <button type="button" className="rai-mcard" style={{ ["--acc" as string]: n.accent }} onClick={() => openRef.current?.(i)}>
              <span className="t">{n.title}</span>
              <span className="d">{n.desc}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Sibling of .rai-root, not a child: .rai-root is position:fixed, which
        makes its own stacking context — nesting the overlay inside trapped its
        z-index there and the nav (z-index 1000) painted over the popup. */}
      {active && (
        <div className="rai-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="rai-modal" role="dialog" aria-modal="true" aria-labelledby="rai-modal-title" style={{ ["--acc" as string]: "#d99a2b" }}>
            <button ref={closeBtnRef} className="rai-close" onClick={close} aria-label="Close"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
            <div className="rai-modal-scroll">
              <div className="rai-modal-head">
                <span className="rai-example">{active.example}</span>
                <h2 id="rai-modal-title" className="rai-modal-title">{active.popupTitle}</h2>
                <p className="rai-modal-subtitle">{active.popupSubtitle}</p>
              </div>

              <div className={"rai-story" + (STEPS[step].fig ? (STEPS[step].stacked ? " prd-stacked" : " prd-side") : "")} key={step}>
                {STEPS[step].fig ? (
                  <>
                    <div className="rai-stage-text prd-above">
                      <div className="rai-kicker">Step {step + 1} of {STEPS.length}</div>
                      <h3 className="rai-step-title">{STEPS[step].k}</h3>
                      {STEPS[step].cap ? <p className="rai-step-cap">{STEPS[step].cap}</p> : null}
                    </div>
                    <PrdFig fig={STEPS[step].fig as string} />
                    {STEPS[step].items.length > 0 && (
                      <ul className="rai-step-list prd-below">
                        {STEPS[step].items.map((tx, k) => (
                          <li key={k} style={{ animationDelay: `${0.12 + k * 0.09}s` }}>
                            {STEPS[step].tone === "problem"
                              ? <XMark color="#e05656" />
                              : <CheckMark color="#c9b78c" />}
                            <span>{tx}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <>
                    <StoryScene3D sceneId={active.id} tone={STEPS[step].tone} />
                    <div className="rai-stage-text">
                      <div className="rai-kicker">Step {step + 1} of {STEPS.length}</div>
                      <h3 className="rai-step-title">{STEPS[step].k}</h3>
                      {STEPS[step].cap ? <p className="rai-step-cap">{STEPS[step].cap}</p> : null}
                      <ul className="rai-step-list">
                        {STEPS[step].items.map((tx, k) => (
                          <li key={k} style={{ animationDelay: `${0.12 + k * 0.09}s` }}>
                            {STEPS[step].tone === "problem"
                              ? <XMark color="#e05656" />
                              : <CheckMark color="#c9b78c" />}
                            <span>{tx}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <div className="rai-nav">
                <button className="rai-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>&larr; Back</button>
                <div className="rai-dots">{STEPS.map((_, k) => (<span key={k} className={"rai-dot" + (k === step ? " on" : "")} />))}</div>
                <button className="rai-btn rai-btn-primary" onClick={() => setStep((s) => (s === STEPS.length - 1 ? 0 : s + 1))}>{step === STEPS.length - 1 ? "Start over" : "Next →"}</button>
              </div>

              {step === STEPS.length - 1 && (
                <div className="rai-final">
                  <blockquote className="rai-quote">{active.quote}</blockquote>
                  <div className="rai-stack">
                    <div className="rai-stack-head"><span className="rai-stack-line" />The Stack We Connect<span className="rai-stack-line" /></div>
                    <div className="rai-stack-items">{active.stack.map((tool) => (<span className="rai-chip" key={tool}><span className="rai-chip-dot" style={{ background: toolDot(tool) }} />{tool}</span>))}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const CSS = `
/* ── Example 01 step figures (prd-) — the briefing's graphics, remade ── */
.rai-story.prd-stacked{grid-template-columns:1fr;align-items:stretch}
.prd-panel{background:radial-gradient(120% 100% at 50% 0%,#fbfcfe 0%,#eaeff7 60%,#dfe6f1 100%);border:1px solid #e6eaf1;border-radius:16px;padding:18px clamp(12px,2.6vw,24px) 20px}
.prd-h4{margin:0;font-size:16px;font-weight:800;color:#16233A}
.prd-sub{margin:3px 0 0;font-size:12.5px;color:#44546A}
.prd-underline{display:block;width:52px;height:2.5px;background:#8096B4;margin:8px 0 14px}

/* problem — the eight-chevron strip */
.prd-chevrow{display:flex;flex-wrap:wrap;margin:2px 0 12px}
.prd-chev{flex:0 0 calc(12.5% + 12.25px);min-width:0;height:auto;display:block;margin-left:-14px}
.prd-chev:first-child{margin-left:0}
.prd-legend{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
.prd-leg-item{display:flex;align-items:center;gap:10px;white-space:nowrap}
.prd-leg-item + .prd-leg-item{margin-left:14px}
.prd-leg-pill{background:#BDD0E9;color:#16233A;font-size:12px;font-weight:800;padding:6px 16px;border-radius:999px}
.prd-leg-pill.dashed{background:#fff;border:2px dashed #E1524A}
.prd-leg-t{font-size:13px;font-weight:800;color:#16233A}

/* how we work — conventional vs ours */
.prd-vs{display:grid;grid-template-columns:1fr 44px 1fr;gap:8px;align-items:start}
.prd-vs-banner{position:relative;display:flex;align-items:center;gap:12px;font-size:13px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;padding:11px 16px;margin-bottom:14px}
.prd-vs-banner.light{background:#C9D7EC;color:#16233A;clip-path:polygon(0 0,calc(100% - 18px) 0,100% 50%,calc(100% - 18px) 100%,0 100%);padding-right:28px}
.prd-vs-banner.dark{background:#1F3864;color:#fff;clip-path:polygon(18px 0,100% 0,100% 100%,18px 100%,0 50%);padding-left:28px;justify-content:flex-end;text-align:right}
.prd-vs-ic{flex:0 0 32px;width:32px;height:32px;border-radius:50%;background:#fff;border:3px solid #1F3864;display:flex;align-items:center;justify-content:center}
.prd-vs-ic svg{width:18px;height:18px}
.prd-vs-mid{align-self:center;justify-self:center;width:38px;height:38px;border-radius:10px;background:#eef2f8;color:#44546A;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;text-transform:uppercase;margin-top:56px}
.prd-vs-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px}
.prd-vs-list li{display:flex;align-items:center;gap:12px}
.prd-vs-list.right li{justify-content:flex-end;text-align:right}
.prd-vs-list p{margin:0;font-size:13px;line-height:1.5;color:#33415c;max-width:300px}
.prd-vs-n{flex:0 0 36px;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800}
.prd-vs-n.light{background:#C9D7EC;color:#16233A}
.prd-vs-n.dark{background:#1F3864;color:#fff}

/* what we built — today vs in the system */
.prd-built{display:grid;grid-template-columns:1fr 40px 1fr;gap:12px;align-items:start}
.prd-built-arrow{align-self:center;justify-self:center;width:36px;height:36px;border-radius:50%;border:2px solid #1F3864;background:#fff;display:flex;align-items:center;justify-content:center;margin-top:110px}
.prd-built-arrow svg{width:19px;height:19px}
.prd-scatter{display:grid;grid-template-columns:repeat(3,1fr);gap:22px 18px;padding:8px 6px}
.prd-tool{display:flex;flex-direction:column;align-items:center;gap:6px;background:#F7F1E7;border:1px solid #E3D5BC;border-radius:8px;box-shadow:0 4px 10px rgba(90,70,40,.12);padding:11px 6px;text-align:center}
.prd-tool svg{width:23px;height:23px}
.prd-tool span{font-size:10.5px;font-weight:800;color:#4a3f2f;line-height:1.25}
.prd-scatter .prd-tool:nth-child(3n+1){transform:rotate(-3.5deg)}
.prd-scatter .prd-tool:nth-child(3n+2){transform:rotate(2.5deg) translateY(4px)}
.prd-scatter .prd-tool:nth-child(3n){transform:rotate(-1.5deg)}
.prd-chain{display:flex;flex-direction:column;align-items:center;width:min(100%,240px)}
.prd-chain-row{position:relative;display:flex;flex-direction:column;align-items:center;width:100%}
.prd-down{width:15px;height:11px;margin:4px 0}
.prd-box{width:100%;background:#DCE7F4;border:1.6px solid #1F3864;border-radius:10px;padding:8px 12px;text-align:center;font-size:12.5px;font-weight:700;color:#16233A}
.prd-box-intake{display:flex;align-items:center;justify-content:center;gap:10px;background:#EAF1F9;border-width:2.2px}
.prd-box-intake svg{width:22px;height:22px;flex:0 0 auto}
.prd-box-intake span{display:flex;flex-direction:column;line-height:1.3}
.prd-box-intake b{font-size:13px;letter-spacing:.03em}
.prd-box-intake em{font-style:normal;font-size:10.5px;font-weight:600;color:#44546A}
.prd-note{font-size:10.5px;line-height:1.35;color:#6b7891;margin-top:3px;text-align:center}
@media (min-width: 900px){.prd-note{position:absolute;left:calc(100% + 10px);top:50%;transform:translateY(-30%);width:104px;margin:0;border-top:1.5px dashed #9FB4CB;padding-top:4px;text-align:left}}

/* architecture — three layers */
.prd-arch-legend{display:flex;align-items:center;gap:8px;font-size:11px;color:#44546A;margin-bottom:10px;justify-content:flex-end}
.prd-dash-glyph{width:24px;height:13px;border:1.6px dashed #6b7891;border-radius:5px;flex:0 0 auto}
.prd-arch-row{display:grid;grid-template-columns:120px 1fr;gap:14px;align-items:center}
.prd-arch-side{font-size:11.5px;font-weight:700;color:#33415c;line-height:1.4}
.prd-band{border:2px solid #1F3864;border-radius:14px;padding:11px 15px 13px}
.prd-band b{display:block;font-size:14px;color:#16233A}
.prd-band i{display:block;font-style:normal;font-size:11.5px;color:#2c3a52;margin:2px 0 9px}
.prd-chips{display:flex;flex-wrap:wrap;gap:7px}
.prd-chips span{background:#fff;border:1.4px solid #1F3864;border-radius:7px;padding:4px 11px;font-size:11px;font-weight:700;color:#16233A}
.prd-chips span.dashed{border-style:dashed;border-color:#6b7891;color:#6b7891}
.prd-chips span.dashed em{font-style:italic;font-weight:600}
.prd-arch-arrows{display:flex;justify-content:space-around;padding:2px 0;margin-left:134px}
.prd-arch-arrows svg{width:10px;height:18px}

/* stacked steps: heading above, bullets below */
.rai-story.prd-stacked{gap:16px}
.rai-story.prd-side{grid-template-columns:1.05fr 1fr;grid-template-areas:"fig head" "fig list";column-gap:26px;row-gap:4px;align-items:center}
.prd-side .prd-above{grid-area:head;align-self:end}
.prd-side .prd-panel{grid-area:fig;align-self:center}
.prd-side .rai-step-list.prd-below{grid-area:list;align-self:start}
.prd-above{text-align:left}
.prd-panel{overflow:hidden}
.rai-step-list.prd-below{margin-top:2px}
.prd-web{position:absolute;inset:0;width:100%;height:100%;z-index:0}
.prd-scatter{position:relative}
.prd-scatter .prd-tool{position:relative;z-index:1}

/* governance — the visual */
.prd-gov{display:flex;align-items:center;justify-content:center}
.prd-gov svg{width:100%;max-width:400px;height:auto}

/* proof — stat tiles */
.prd-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.prd-tile{border-radius:14px;padding:22px 14px;text-align:center;color:#fff}
.prd-tile b{display:block;font-size:clamp(28px,4vw,40px);font-weight:800;line-height:1;margin-bottom:10px}
.prd-tile span{font-size:12px;font-weight:700;line-height:1.5;display:block}
.prd-tile.dark{color:#16233A}

/* where this applies — the slide's own graphic */
.prd-apply-img{padding:12px}
.prd-apply-img img{display:block;width:100%;height:auto;border-radius:10px}

@media (max-width: 760px){
  .rai-story.prd-side{display:flex;flex-direction:column;gap:14px}
  .prd-chev{flex-basis:calc(25% + 10.5px)}
  .prd-chev:nth-child(5){margin-left:0}
  .prd-vs{grid-template-columns:1fr}
  .prd-vs-mid{margin:2px auto}
  .prd-vs-col{min-width:0}
  .prd-vs-banner{max-width:100%}
  .prd-vs-banner.dark{clip-path:polygon(0 0,calc(100% - 18px) 0,100% 50%,calc(100% - 18px) 100%,0 100%);padding:11px 28px 11px 16px;justify-content:flex-end;text-align:left;flex-direction:row-reverse}
  .prd-vs-list.right li{flex-direction:row-reverse;justify-content:flex-end;text-align:left}
  .prd-built{grid-template-columns:1fr}
  .prd-built-arrow{margin:6px auto;transform:rotate(90deg)}
  .prd-built-col{text-align:center}
  .prd-built-col .prd-underline{margin-left:auto;margin-right:auto}
  .prd-chain{margin:0 auto}
  .prd-note{text-align:center}
  .prd-arch-row{grid-template-columns:1fr;gap:6px}
  .prd-arch-arrows{margin-left:0}
  .prd-tiles{grid-template-columns:1fr}
}

/* The site hides the native cursor and each page draws its own dot+ring. This
   page doesn't render that, and the hub sets its own grab/pointer cursors, so
   restore the real cursor instead of leaving none over the nav. The site sets
   cursor:none on body, a AND button, so the nav's own links need it too. */
body:has(.rai-root){cursor:default}
body:has(.rai-root) .nav a,body:has(.rai-root) .nav button,
body:has(.rai-root) .mobile-menu a,body:has(.rai-root) .mobile-menu button,
body:has(.rai-root) .footer a,body:has(.rai-root) .footer button{cursor:pointer}
/* Tokens + font live on BOTH: the overlay is a sibling of .rai-root (see the
   stacking-context note in the JSX), so it can't inherit them from it. */
.rai-root,.rai-overlay{--navy:#1e2d4d;--gold:#d99a2b;--ink:#3a4661;--muted:#7b869b;--line:#e6eaf1;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
/* Flex column rather than position:fixed, so the hero and hub share the
   viewport and the footer has somewhere to go below. Padding clears the fixed
   nav (80px; 64px on smaller screens). */
/* transparent + above the orbs (z-index 1), so the site's ambient background
   shows through instead of a flat fill covering it */
.rai-root{position:relative;z-index:2;min-height:100vh;display:flex;flex-direction:column;padding-top:80px;color:#eaf0fb;
  background:transparent}
@media (max-width:1003px){.rai-root{padding-top:64px}}
.rai-root *,.rai-overlay *{box-sizing:border-box}
/* Embedded in another page: it's a section, not the page. No nav offset, height
   from content, and no full-viewport minimum. */
.rai-root.rai-embed{min-height:0;padding-top:0}
.rai-root.rai-embed .rai-stage{flex:0 0 auto;height:clamp(420px,58vh,640px);min-height:0;margin-bottom:0}
/* touch-action:none on the canvas would trap the page scroll on a phone when
   this sits mid-page; pan-y keeps vertical scrolling while horizontal drag
   still rotates the hub */
.rai-root.rai-embed .rai-canvas{touch-action:pan-y}
/* Centred block using the home page's "Why Rawlins" pattern: the site's own
   section-label / section-title / intro-expand-btn / intro-expandable classes
   do the styling, this just centres and places it. */
.rai-intro{flex:0 0 auto;width:100%;max-width:1240px;margin:0 auto;padding:32px 60px 0;text-align:center}
.rai-intro .section-title{margin:0 auto;max-width:900px}
.rai-intro .section-label{margin-bottom:8px}
/* trimmed from the home page's 72px/28px: this sits above the hub rather than
   in a full content section, and every px here comes off the hub */
.rai-intro .intro-expand-btn{width:54px;height:54px;margin-top:14px;margin-bottom:2px}
/* .section-text is left-aligned at 620px by default; centre it and let the
   longer copy breathe */
.rai-intro .section-text{max-width:780px;margin:0 auto}
.rai-intro .intro-expandable{padding-bottom:14px}
.rai-intro .intro-expand-btn{margin-bottom:0}
/* the site draws its own cursor and hides the native one; this page doesn't */
body:has(.rai-root) .intro-expand-btn{cursor:pointer}
@media (max-width:1003px){.rai-intro{padding:38px 24px 0}}
/* takes whatever height the hero leaves */
.rai-stage{position:relative;flex:1 1 auto;min-height:400px}
.rai-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none}
/* width:max-content so the box hugs its text — a fixed width padded short
   lines with dead space and pushed the label away from its icon */
.rai-label{position:absolute;pointer-events:none;width:max-content;max-width:216px;text-align:center;opacity:0;transition:opacity .3s}
.rai-label.on{opacity:1}
.rai-label .tab{display:block;background:none;border:0;box-shadow:none;padding:0;
  font-family:var(--font-dm-sans),'DM Sans',sans-serif;
  font-size:19px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#fff;line-height:1.15;
  text-shadow:0 2px 14px rgba(4,9,20,.98),0 0 34px rgba(4,9,20,.9),0 0 3px rgba(4,9,20,.9)}
.rai-label .body{background:none;border:0;box-shadow:none;margin-top:9px;padding:0;text-align:center;
  font-size:14.5px;line-height:1.45;color:#c3d0e4;
  text-shadow:0 2px 12px rgba(4,9,20,1),0 0 26px rgba(4,9,20,.95),0 0 3px rgba(4,9,20,.9)}
.rai-label .body span{display:block}
/* Light #DCE6F2 pill with black text on every size. Order puts it under the
   image on desktop and above it on mobile, without moving the markup. */
.rai-intro{order:1}
.rai-stage{order:2}
.rai-hint{order:3}
.rai-mlist{order:4}
.rai-hint{position:relative;align-self:center;margin:16px auto 16px;font-size:13px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:#0D0D0D;display:flex;align-items:center;gap:9px;background:rgba(220,230,242,.92);border:1px solid rgba(220,230,242,.55);border-radius:999px;padding:9px 18px;pointer-events:none;opacity:1}
.rai-hint .dot{width:8px;height:8px;border-radius:50%;background:#1D3759;animation:rai-ping 2s ease-out infinite}
@keyframes rai-ping{0%{box-shadow:0 0 0 0 rgba(29,55,89,.5)}70%,100%{box-shadow:0 0 0 8px rgba(29,55,89,0)}}
/* above the site nav (z-index 1000) so the popup isn't cut by the header */
.rai-overlay{position:fixed;inset:0;z-index:1200;background:rgba(6,12,26,.68);display:flex;align-items:flex-start;justify-content:center;padding:32px 18px;overflow-y:auto;cursor:default}
.rai-overlay *{cursor:default}
.rai-overlay .rai-close,.rai-overlay .rai-btn{cursor:pointer}
.rai-overlay .rai-btn[disabled]{cursor:default}
.rai-modal{position:relative;width:100%;max-width:960px;background:#fff;border-radius:22px;box-shadow:0 50px 100px -30px rgba(0,0,0,.7);overflow:hidden;border-top:4px solid #DCE6F2}
.rai-modal-scroll{padding:32px clamp(20px,4vw,44px) 36px}
.rai-close{position:absolute;top:14px;right:14px;z-index:5;width:38px;height:38px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--navy);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,transform .15s}
.rai-close:hover{background:#f1f4f9;transform:rotate(90deg)}
.rai-modal-head{margin-bottom:22px;padding-right:40px}
.rai-example{display:inline-block;background:#C4D8F2;color:#1D3759;font-size:12.5px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;padding:7px 15px;border-radius:20px}
.rai-modal-title{font-family:var(--font-dm-sans),'DM Sans',sans-serif;font-size:clamp(28px,4.6vw,42px);font-weight:800;color:var(--navy);margin:14px 0 5px;letter-spacing:-.3px}
.rai-modal-subtitle{font-size:17px;color:var(--muted);font-style:italic;margin:0}
/* ---- story player ---- */
.rai-story{display:grid;grid-template-columns:1.05fr 1fr;gap:26px;align-items:center;margin:26px 0 20px;min-height:250px}
.rai-kicker{font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:transparent}
.rai-step-title{font-family:var(--font-dm-sans),'DM Sans',sans-serif;font-size:30px;font-weight:800;color:var(--navy);margin:8px 0 16px;letter-spacing:-.2px}
.rai-step-cap{font-size:17px;font-weight:700;color:var(--navy);margin:0 0 14px}
.rai-step-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.rai-step-list li{display:flex;gap:11px;align-items:flex-start;font-size:16.5px;line-height:1.5;color:#46566f;animation:rai-li .45s ease backwards}
@keyframes rai-li{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.rai-step-list li svg{flex:0 0 auto;margin-top:3px}
/* visuals: shared primitives, tailored per project.
   NOTE: base state is VISIBLE; animations use fill-mode 'backwards' so the
   art still renders if animations never run (hidden tab, throttling,
   reduced-motion). Never gate content behind an animation. */
.rai-vis{position:relative;height:250px;border-radius:16px;overflow:hidden;border:1px solid #e6eaf1;
  background:radial-gradient(120% 100% at 50% 0%,#fbfcfe 0%,#eaeff7 60%,#dfe6f1 100%)}
.rai-vis canvas{border-radius:16px}
.rai-nav{display:flex;align-items:center;justify-content:space-between;gap:16px;border-top:1px solid var(--line);padding-top:18px}
.rai-dots{display:flex;gap:8px}
.rai-dot{width:9px;height:9px;border-radius:50%;background:#d7dee9;transition:all .25s}
.rai-dot.on{background:linear-gradient(135deg,#c9b78c 0%,#eae2cc 50%,#c9b78c 100%);width:26px;border-radius:6px}
.rai-btn{font:inherit;font-size:15px;font-weight:700;padding:11px 20px;border-radius:10px;cursor:pointer;border:1px solid var(--line);background:#fff;color:var(--navy);transition:background .15s,opacity .15s}
.rai-btn:hover{background:#f2f5fa}
.rai-btn[disabled]{opacity:.35;cursor:default}
/* matches .auto-hero-btn on the live rawlinsic.com site */
.rai-btn-primary{background:linear-gradient(135deg,#c9b78c 0%,#eae2cc 50%,#c9b78c 100%);
  color:#060c16;border:1px solid transparent;text-shadow:none;
  font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:14px 30px}
/* re-state the gradient: .rai-btn:hover's background shorthand would blank it */
.rai-btn-primary:hover{background:linear-gradient(135deg,#c9b78c 0%,#eae2cc 50%,#c9b78c 100%);filter:brightness(1.04)}
.rai-final{margin-top:22px}
.rai-ba{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:stretch;margin-bottom:24px}
.rai-ba-card{border-radius:16px;padding:16px 16px 18px;border:1px solid var(--line)}
.rai-ba-before{background:#fbf1f1;border-color:#f2dede}.rai-ba-after{background:#eef7f1;border-color:#d9ecdf}
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
.rai-quote{margin:0 0 24px;padding:16px 22px;border-left:4px solid #1D3759;background:#DCE6F2;border-radius:0 12px 12px 0;font-family:Georgia,serif;font-style:italic;font-size:17.5px;line-height:1.6;color:var(--navy)}
.rai-stack{border-top:1px solid var(--line);padding-top:22px}
.rai-stack-head{display:flex;align-items:center;justify-content:center;gap:14px;font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--navy)}
.rai-stack-line{height:1px;width:56px;background:var(--line)}
.rai-stack-items{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin-top:18px}
.rai-chip{display:inline-flex;align-items:center;gap:8px;font-size:14.5px;font-weight:600;color:var(--navy);background:#fff;border:1px solid var(--line);border-radius:11px;padding:8px 14px;box-shadow:0 6px 16px -12px rgba(30,45,77,.35)}
.rai-chip-dot{width:9px;height:9px;border-radius:50%}
/* the tappable capability list — mobile only */
.rai-mlist{display:none;list-style:none;margin:0;padding:0 14px 30px;gap:10px;grid-template-columns:1fr 1fr}
.rai-mcard{display:flex;flex-direction:column;gap:5px;width:100%;height:100%;text-align:left;cursor:pointer;
  padding:13px 14px;border-radius:14px;border:1px solid rgba(255,255,255,.14);
  background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.04));
  border-left:3px solid var(--acc)}
.rai-mcard .t{font-family:var(--font-dm-sans),'DM Sans',sans-serif;
  font-size:13px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:#fff;line-height:1.2}
.rai-mcard .d{font-size:12px;line-height:1.4;color:#b9c7de}

@media (max-width:760px){
  .rai-story{grid-template-columns:1fr}
  .rai-ba{grid-template-columns:1fr}
  .rai-ba-arrow{transform:rotate(90deg)}
  .rai-cols{grid-template-columns:1fr}
  /* hero, hub, list, footer all stack — height comes from content */
  .rai-root{min-height:0}
  .rai-intro{padding:22px 18px 0}
  /* Fixed-height hub here, so it must opt out of the desktop flex:1. The hub is
     width-bound on a phone and draws ~0.67x as tall as it is wide, so 70vw keeps
     the canvas hugging it instead of padding it with dead space above and below.
     The clamp still caps it on wider phones, where height is what binds. */
  .rai-stage{flex:0 0 auto;min-height:0;height:min(clamp(300px,42vh,380px),70vw);margin-bottom:0}
  /* embedded on a real page, the same: its taller desktop stage would otherwise
     outrank the rule above and reopen the gap under the pill */
  .rai-root.rai-embed .rai-stage{height:min(clamp(300px,42vh,380px),70vw)}
  /* names live in the list below, so nothing competes with the hub */
  .rai-label{display:none}
  .rai-mlist{display:grid}
  /* under the image here too, so it keeps the base order; the margins give the
     hub and the tiles below it room to breathe either side of the pill */
  .rai-hint{margin:12px auto 18px;max-width:calc(100% - 28px);
    font-size:11px;letter-spacing:.2px;line-height:1.35;border-radius:14px;padding:8px 13px;gap:7px}
  .rai-hint .dot{flex:0 0 auto;width:7px;height:7px}
}
@media (max-width:400px){.rai-mlist{grid-template-columns:1fr}}

`;
