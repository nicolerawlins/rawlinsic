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
  icon: "chart" | "gauge" | "db" | "flow" | "pin" | "handoff"; ang: number;
  example: string; popupTitle: string; popupSubtitle: string;
  before: string; after: string;
  problem: string[]; built: string[]; result: string[]; stack: string[]; quote: string;
};

const NODES: Node[] = [
  { id: "reporting", title: "Reporting", desc: "Real-time insights that drive action.", descLines: ["Real-time insights", "that drive action."], labDy: -34, accent: "#3a83d6", icon: "chart", ang: 210,
    example: "Example 01", popupTitle: "Project Accounting & Reporting", popupSubtitle: "Project-based technical services firm",
    before: "Data everywhere, no operating picture", after: "One view, drill-down on demand",
    problem: ["Project, accounting, CRM, time & reporting data lived in separate systems", "Teams manually pushed data into spreadsheets to get usable views", "Leaders needed both high-level and department-level visibility", "Field staff had no easy mobile access to site maps, photos & docs"],
    built: ["Migrated core data from Zoho into Monday.com", "Connected platforms with Make.com so data moved reliably", "Built dashboards that drill from high-level to project detail", "Shipped a mobile micro-app for project files from the field"],
    result: ["Leaders got a clean operating view without rebuilding reports", "Project teams reached records and files from the field", "Reliable data flow cut manual handling and lifted confidence"],
    stack: ["Monday.com", "Make.com", "QuickBooks", "QuickBooks Time", "Looker Studio", "Google Drive"],
    quote: "We already had the information — it was just spread across too many places. Once the systems were connected, we could finally see the project picture without rebuilding it every time." },
  { id: "capacity", title: "Capacity", desc: "See capacity before it becomes a bottleneck.", descLines: ["See capacity before it", "becomes a bottleneck."], labDy: -34, accent: "#e0a63c", icon: "gauge", ang: 150,
    example: "Example 04", popupTitle: "Capacity Planning", popupSubtitle: "Field services / drilling organization",
    before: "Capacity run on guesswork", after: "Capacity you can actually see",
    problem: ["Capacity depended on scattered updates and local knowledge", "No view of equipment location, booking length or downtime", "People & equipment constraints managed inconsistently", "Service windows — PTO for machines — were invisible in the plan"],
    built: ["Built one capacity system in Monday.com + Make.com", "Templatized it to manage people and equipment together", "Tracked locations, booking windows, utilization & downtime", "Made unavailable equipment visible before it caused conflicts"],
    result: ["See capacity before bottlenecks become emergencies", "Know what's booked, available or out of service", "Specialized assets scheduled right alongside people"],
    stack: ["Monday.com", "Make.com"],
    quote: "We stopped relying on scattered updates to understand capacity. We could finally see what was available, what was booked, and where the constraint was coming from." },
  { id: "single-source", title: "Single Source", desc: "One source of truth across your team.", descLines: ["One source of truth", "across your team."], accent: "#33b07a", icon: "db", ang: 90,
    example: "Example 05", popupTitle: "Single Source of Truth", popupSubtitle: "100+ employee manufacturing firm",
    before: "Workshops siloed, data unused", after: "One system, full-company view",
    problem: ["Manufacturing spread across workshops with poor office↔floor comms", "No reliable way to record time against a specific item built", "Data sat unused — no dashboards on production, staffing or capacity", "Heavy manual entry to match materials, time and cost"],
    built: ["Rebuilt everything around a core Monday.com board structure", "One source of truth with per-workshop permission levels", "Formulas + Make.com auto-calculate cost, materials, hours & assignment", "Added Tracket time tracking and DocuSign work orders inside Monday.com"],
    result: ["Estimated time, actual time, team, cost & price all in one place", "Leaders track workshop speed, profitability, staffing & capacity", "Quotes and invoices automated; jobs assigned by capacity, not phone calls"],
    stack: ["Monday.com", "Make.com", "Tracket", "DocuSign"],
    quote: "Transformed from multiple software solutions into a streamlined, easy-to-use single source of truth — full visibility over what's happening across the entire company." },
  { id: "sales-project", title: "Sales → Project", desc: "From opportunity to execution — connected.", descLines: ["From opportunity to", "execution — connected."], labDy: 34, accent: "#8FB9E8", icon: "flow", ang: 30,
    example: "Example 06", popupTitle: "Business Development → Project Handover", popupSubtitle: "130-person professional services firm",
    before: "Closed-won ran on memory", after: "Billing-ready in days, not weeks",
    problem: ["Handoff from Business Development to delivery & finance ran on email and memory", "Scope, fee, billing terms & owner moved late or incomplete", "Finance and PMs chased Business Development for info that should be settled at close", "Project setup dragged on for one to two weeks"],
    built: ["Locked the few fields required before an opportunity can close-won", "Required scope, fee, terms, owner & kickoff date in Salesforce", "Automation pushes the project record into Monday.com at close", "Notified finance & delivery instantly with a standardized kickoff checklist"],
    result: ["Setup went from 1–2 weeks of back-and-forth to billing-ready in days", "Finance stopped chasing Business Development for basic setup information", "PMs walked into kickoffs with everything they needed"],
    stack: ["Salesforce", "Monday.com", "Make.com", "QuickBooks", "SharePoint", "Teams"],
    quote: "Project setup went from one to two weeks of back-and-forth to billing-ready in a few business days. Finance stopped chasing Business Development, and PMs walked into kickoffs with what they needed." },
  { id: "field-reporting", title: "Field Reporting", desc: "Capture field data that fuels better decisions.", descLines: ["Capture field data that", "fuels better decisions."], labDy: 34, accent: "#e07a3c", icon: "pin", ang: 330,
    example: "Example 03", popupTitle: "Field Reporting", popupSubtitle: "Field-service / project delivery firm",
    before: "Records that vanished after the visit", after: "Captured on site, filed automatically",
    problem: ["Site-visit info existed but wasn't structured for later use", "Attachments and field details were hard to retrieve afterward", "Office staff had to chase individuals to see what happened"],
    built: ["Added form links directly into Google Calendar events", "Monday.com forms create board items the moment field staff submit", "Attachments auto-file into the right Google Drive structure", "Connected field capture back into the project record"],
    result: ["Field information became easy to find, reuse and report on", "Attachments landed in the right place automatically", "The office gained clean visibility into every site visit"],
    stack: ["Monday.com", "Make.com", "Google Calendar", "Google Drive"],
    quote: "Our team was already capturing the information. The value came from making sure it landed somewhere useful without another person having to chase it down." },
  { id: "service-handoff", title: "Service Handoff", desc: "Seamless transitions. No dropped information.", descLines: ["Seamless transitions.", "No dropped information."], accent: "#2ab0ab", icon: "handoff", ang: 270,
    example: "Example 02", popupTitle: "Project → Service Handoff", popupSubtitle: "Install & service / maintenance firm",
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

export default function AutomationIntegrationInteractive() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [step, setStep] = useState(0);
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

  const STEPS = active
    ? ([
        { k: "The Problem", cap: active.before, items: active.problem, tone: "problem" as const },
        { k: "What We Built", cap: "", items: active.built, tone: "built" as const },
        { k: "The Result", cap: active.after, items: active.result, tone: "result" as const },
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
    const R = narrow ? 3.2 : 4.6; const hitMeshes: THREE.Object3D[] = [];
    const disposables: { dispose: () => void }[] = [];

    const center = new THREE.Group(); rig.add(center);
    const rTex = new THREE.TextureLoader().load("/images/dev/r-icon.png"); rTex.colorSpace = THREE.SRGBColorSpace; rTex.anisotropy = 8;
    const rGeo = new THREE.PlaneGeometry(2.15, 2.08); const rMat = new THREE.MeshBasicMaterial({ map: rTex, transparent: true, depthWrite: false, depthTest: false });
    const rPlane = new THREE.Mesh(rGeo, rMat); rPlane.renderOrder = 20; scene.add(rPlane); disposables.push(rTex, rGeo, rMat);

    const pedGeo = new RoundedBoxGeometry(1.5, 0.4, 1.5, 4, 0.13); disposables.push(pedGeo);
    const nodeGroups: { g: THREE.Group; spin: THREE.Group; phase: number }[] = [];
    NODES.forEach((n, i) => {
      const a = (n.ang * Math.PI) / 180, px = Math.sin(a) * R, pz = Math.cos(a) * R;
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
      const end = new THREE.Vector3(dx * 1.15, -0.27, dz * 1.15);
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
    let camZ = BASE_Z, camY = BASE_Y;
    const resize = () => {
      const w = stage.clientWidth || window.innerWidth, h = stage.clientHeight || window.innerHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      /* Pull back until the whole ring fits the narrow axis, holding the same
         viewing angle. A portrait phone has a very narrow horizontal FOV, so
         without this the hub runs off both edges. */
      const need = R + (narrow ? 2.4 : 1.2);
      const t = Math.tan((camera.fov * Math.PI) / 360);
      camZ = Math.min(Math.max(BASE_Z, need / (t * Math.max(camera.aspect, 0.01))), 30);
      camY = BASE_Y * (camZ / BASE_Z);
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
        /* measure how wide this node actually is on screen, so the label can sit
           just outside it rather than at a fixed guess of a distance */
        let nMin = Infinity, nMax = -Infinity;
        for (let a = 0; a < 8; a++) {
          const cv = new THREE.Vector3(a & 1 ? 0.78 : -0.78, a & 2 ? 1.7 : 0, a & 4 ? 0.78 : -0.78);
          cv.applyMatrix4(nd.g.matrixWorld).project(camera);
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
    <div className="rai-root">
      <style>{CSS}</style>
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
      {/* sibling of the stage, not a child: the canvas is absolutely
          positioned, so a hint inside the stage lands at its top on mobile */}
      <div className="rai-hint"><span className="dot" />Click a capability to see a real example · drag to rotate</div>


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

              <div className="rai-story" key={step}>
                <StoryScene3D sceneId={active.id} tone={STEPS[step].tone} />
                <div className="rai-stage-text">
                  <div className="rai-kicker">Step {step + 1} of 3</div>
                  <h3 className="rai-step-title">{STEPS[step].k}</h3>
                  {STEPS[step].cap ? <p className="rai-step-cap">{STEPS[step].cap}</p> : null}
                  <ul className="rai-step-list">
                    {STEPS[step].items.map((tx, k) => (
                      <li key={k} style={{ animationDelay: `${0.12 + k * 0.09}s` }}>
                        {STEPS[step].tone === "problem"
                          ? <XMark color="#e05656" />
                          : <CheckMark color="#c9a84c" />}
                        <span>{tx}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rai-nav">
                <button className="rai-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>&larr; Back</button>
                <div className="rai-dots">{[0, 1, 2].map((k) => (<span key={k} className={"rai-dot" + (k === step ? " on" : "")} />))}</div>
                <button className="rai-btn rai-btn-primary" onClick={() => setStep((s) => (s === 2 ? 0 : s + 1))}>{step === 2 ? "Start over" : "Next →"}</button>
              </div>

              {step === 2 && (
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
    </div>
  );
}

const CSS = `
.rai-root{--navy:#1e2d4d;--gold:#d99a2b;--ink:#3a4661;--muted:#7b869b;--line:#e6eaf1;position:fixed;inset:0;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#eaf0fb;
  background:radial-gradient(1200px 820px at 50% 12%, #17264a 0%, #0d1730 52%, #080e1e 100%)}
.rai-root *{box-sizing:border-box}
.rai-stage{position:absolute;inset:0}
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
.rai-hint{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#c4cee0;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:8px 16px;pointer-events:none;opacity:.9}
.rai-hint .dot{width:8px;height:8px;border-radius:50%;background:var(--gold);animation:rai-ping 2s ease-out infinite}
@keyframes rai-ping{0%{box-shadow:0 0 0 0 rgba(217,154,43,.5)}70%,100%{box-shadow:0 0 0 8px rgba(217,154,43,0)}}
.rai-overlay{position:fixed;inset:0;z-index:1000;background:rgba(6,12,26,.68);display:flex;align-items:flex-start;justify-content:center;padding:32px 18px;overflow-y:auto;cursor:default}
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
.rai-kicker{font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;background:linear-gradient(145deg,#c9a84c,#e8d5a0,#d4b878);-webkit-background-clip:text;background-clip:text;color:transparent}
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
.rai-dot.on{background:linear-gradient(135deg,#c9a84c 0%,#e8d5a0 50%,#c9a84c 100%);width:26px;border-radius:6px}
.rai-btn{font:inherit;font-size:15px;font-weight:700;padding:11px 20px;border-radius:10px;cursor:pointer;border:1px solid var(--line);background:#fff;color:var(--navy);transition:background .15s,opacity .15s}
.rai-btn:hover{background:#f2f5fa}
.rai-btn[disabled]{opacity:.35;cursor:default}
/* matches .auto-hero-btn on the live rawlinsic.com site */
.rai-btn-primary{background:linear-gradient(135deg,#c9a84c 0%,#e8d5a0 50%,#c9a84c 100%);
  color:#060c16;border:1px solid transparent;text-shadow:none;
  font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:14px 30px}
/* re-state the gradient: .rai-btn:hover's background shorthand would blank it */
.rai-btn-primary:hover{background:linear-gradient(135deg,#c9a84c 0%,#e8d5a0 50%,#c9a84c 100%);filter:brightness(1.04)}
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
@media (max-width:760px){
  .rai-story{grid-template-columns:1fr}
  .rai-ba{grid-template-columns:1fr}
  .rai-ba-arrow{transform:rotate(90deg)}
  .rai-cols{grid-template-columns:1fr}
  /* hub fills the screen; the hint sits under it */
  .rai-root{position:relative;inset:auto;min-height:100vh}
  .rai-stage{position:relative;height:72vh;min-height:430px}
  /* name tiles beside each icon: title only, and tappable in their own right
     since the icons themselves are small targets on a phone */
  .rai-label{max-width:96px;pointer-events:auto;cursor:pointer;
    padding:7px 8px;border-radius:10px;border:1px solid rgba(255,255,255,.16);
    background:linear-gradient(180deg,rgba(16,28,52,.92),rgba(10,18,38,.92));
    border-left:3px solid var(--acc)}
  .rai-label .tab{font-size:10px;letter-spacing:.3px;line-height:1.25;text-shadow:none}
  .rai-label .body{display:none}
  .rai-hint{position:relative;left:auto;bottom:auto;transform:none;margin:10px auto 22px;
    width:calc(100% - 28px);max-width:420px;justify-content:center;text-align:center;
    white-space:normal;font-size:11px;letter-spacing:.4px;line-height:1.35;border-radius:14px;padding:10px 14px}
  .rai-hint .dot{flex:0 0 auto}
}
`;
