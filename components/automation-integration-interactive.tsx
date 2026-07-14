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
  icon: "chart" | "gauge" | "db" | "flow" | "pin" | "handoff"; ang: number;
  example: string; popupTitle: string; popupSubtitle: string;
  before: string; after: string;
  problem: string[]; built: string[]; result: string[]; stack: string[]; quote: string;
};

const NODES: Node[] = [
  { id: "reporting", title: "Reporting", desc: "Real-time insights that drive action.", accent: "#3a83d6", icon: "chart", ang: 210,
    example: "Example 01", popupTitle: "Project Accounting & Reporting", popupSubtitle: "Project-based technical services firm",
    before: "Data everywhere, no operating picture", after: "One view, drill-down on demand",
    problem: ["Project, accounting, CRM, time & reporting data lived in separate systems", "Teams manually pushed data into spreadsheets to get usable views", "Leaders needed both high-level and department-level visibility", "Field staff had no easy mobile access to site maps, photos & docs"],
    built: ["Migrated core data from Zoho into Monday.com", "Connected platforms with Make.com so data moved reliably", "Built dashboards that drill from high-level to project detail", "Shipped a mobile micro-app for project files from the field"],
    result: ["Leaders got a clean operating view without rebuilding reports", "Project teams reached records and files from the field", "Reliable data flow cut manual handling and lifted confidence"],
    stack: ["Monday.com", "Make.com", "QuickBooks", "QuickBooks Time", "Looker Studio", "Google Drive"],
    quote: "We already had the information — it was just spread across too many places. Once the systems were connected, we could finally see the project picture without rebuilding it every time." },
  { id: "capacity", title: "Capacity", desc: "See capacity before it becomes a bottleneck.", accent: "#e0a63c", icon: "gauge", ang: 150,
    example: "Example 04", popupTitle: "Capacity Planning", popupSubtitle: "Field services / drilling organization",
    before: "Capacity run on guesswork", after: "Capacity you can actually see",
    problem: ["Capacity depended on scattered updates and local knowledge", "No view of equipment location, booking length or downtime", "People & equipment constraints managed inconsistently", "Service windows — PTO for machines — were invisible in the plan"],
    built: ["Built one capacity system in Monday.com + Make.com", "Templatized it to manage people and equipment together", "Tracked locations, booking windows, utilization & downtime", "Made unavailable equipment visible before it caused conflicts"],
    result: ["See capacity before bottlenecks become emergencies", "Know what's booked, available or out of service", "Specialized assets scheduled right alongside people"],
    stack: ["Monday.com", "Make.com"],
    quote: "We stopped relying on scattered updates to understand capacity. We could finally see what was available, what was booked, and where the constraint was coming from." },
  { id: "single-source", title: "Single Source", desc: "One source of truth across your team.", accent: "#33b07a", icon: "db", ang: 90,
    example: "Example 05", popupTitle: "Single Source of Truth", popupSubtitle: "100+ employee manufacturing firm",
    before: "Workshops siloed, data unused", after: "One system, full-company view",
    problem: ["Manufacturing spread across workshops with poor office↔floor comms", "No reliable way to record time against a specific item built", "Data sat unused — no dashboards on production, staffing or capacity", "Heavy manual entry to match materials, time and cost"],
    built: ["Rebuilt everything around a core Monday.com board structure", "One source of truth with per-workshop permission levels", "Formulas + Make.com auto-calculate cost, materials, hours & assignment", "Added Tracket time tracking and DocuSign work orders inside Monday.com"],
    result: ["Estimated time, actual time, team, cost & price all in one place", "Leaders track workshop speed, profitability, staffing & capacity", "Quotes and invoices automated; jobs assigned by capacity, not phone calls"],
    stack: ["Monday.com", "Make.com", "Tracket", "DocuSign"],
    quote: "Transformed from multiple software solutions into a streamlined, easy-to-use single source of truth — full visibility over what's happening across the entire company." },
  { id: "sales-project", title: "Sales → Project", desc: "From opportunity to execution — connected.", accent: "#6d7ff0", icon: "flow", ang: 30,
    example: "Example 06", popupTitle: "Business Development → Project Handover", popupSubtitle: "130-person professional services firm",
    before: "Closed-won ran on memory", after: "Billing-ready in days, not weeks",
    problem: ["Handoff from Business Development to delivery & finance ran on email and memory", "Scope, fee, billing terms & owner moved late or incomplete", "Finance and PMs chased Business Development for info that should be settled at close", "Project setup dragged on for one to two weeks"],
    built: ["Locked the few fields required before an opportunity can close-won", "Required scope, fee, terms, owner & kickoff date in Salesforce", "Automation pushes the project record into Monday.com at close", "Notified finance & delivery instantly with a standardized kickoff checklist"],
    result: ["Setup went from 1–2 weeks of back-and-forth to billing-ready in days", "Finance stopped chasing Business Development for basic setup information", "PMs walked into kickoffs with everything they needed"],
    stack: ["Salesforce", "Monday.com", "Make.com", "QuickBooks", "SharePoint", "Teams"],
    quote: "Project setup went from one to two weeks of back-and-forth to billing-ready in a few business days. Finance stopped chasing Business Development, and PMs walked into kickoffs with what they needed." },
  { id: "field-reporting", title: "Field Reporting", desc: "Capture field data that fuels better decisions.", accent: "#e07a3c", icon: "pin", ang: 330,
    example: "Example 03", popupTitle: "Field Reporting", popupSubtitle: "Field-service / project delivery firm",
    before: "Records that vanished after the visit", after: "Captured on site, filed automatically",
    problem: ["Site-visit info existed but wasn't structured for later use", "Attachments and field details were hard to retrieve afterward", "Office staff had to chase individuals to see what happened"],
    built: ["Added form links directly into Google Calendar events", "Monday.com forms create board items the moment field staff submit", "Attachments auto-file into the right Google Drive structure", "Connected field capture back into the project record"],
    result: ["Field information became easy to find, reuse and report on", "Attachments landed in the right place automatically", "The office gained clean visibility into every site visit"],
    stack: ["Monday.com", "Make.com", "Google Calendar", "Google Drive"],
    quote: "Our team was already capturing the information. The value came from making sure it landed somewhere useful without another person having to chase it down." },
  { id: "service-handoff", title: "Service Handoff", desc: "Seamless transitions. No dropped information.", accent: "#2ab0ab", icon: "handoff", ang: 270,
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
    /* funnel (opportunity) -> arrow -> check (delivered) */
    const fn = M(new THREE.ConeGeometry(0.25, 0.34, 26), acc); fn.rotation.x = Math.PI; fn.position.set(-0.44, 0.39, 0);
    M(new THREE.CylinderGeometry(0.045, 0.045, 0.22, 16), acc).position.set(-0.44, 0.11, 0);
    const ar = new THREE.Group(); ar.position.set(0, 0.38, 0); g.add(ar);
    P(new THREE.BoxGeometry(0.2, 0.05, 0.05), white, ar).position.x = -0.04;
    const hd2 = P(new THREE.ConeGeometry(0.07, 0.14, 18), white, ar); hd2.rotation.z = -Math.PI / 2; hd2.position.x = 0.13;
    const ck = new THREE.Group(); ck.position.set(0.45, 0.42, 0); g.add(ck);
    const c1 = P(new THREE.BoxGeometry(0.085, 0.23, 0.06), acc, ck); c1.rotation.z = Math.PI / 4; c1.position.set(-0.077, -0.005, 0);
    const c2 = P(new THREE.BoxGeometry(0.085, 0.42, 0.06), acc, ck); c2.rotation.z = -0.58; c2.position.set(0.105, 0.12, 0);
  }
  return g;
}

/* animated visual for each story step */
function StepVisual({ tone }: { tone: "problem" | "built" | "result" }) {
  if (tone === "problem") {
    const pos: [number, number][] = [[6, 12], [34, 50], [62, 8], [16, 64], [56, 70], [78, 38]];
    return (
      <div className="rai-vis vs-problem">
        {pos.map((p, k) => (<span key={k} className="n" style={{ left: `${p[0]}%`, top: `${p[1]}%`, animationDelay: `${k * 0.07}s, ${k * 0.07 + 0.4}s` }} />))}
        <span className="x" style={{ left: "30%", top: "32%", animationDelay: ".5s" }}>✕</span>
        <span className="x" style={{ left: "70%", top: "58%", animationDelay: ".65s" }}>✕</span>
      </div>
    );
  }
  if (tone === "built") {
    const ang = [0, 60, 120, 180, 240, 300], len = 84;
    return (
      <div className="rai-vis vs-built">
        <span className="hub" />
        {ang.map((a, k) => {
          const rad = (a * Math.PI) / 180;
          return (
            <span key={k}>
              <span className="sp" style={{ ["--len" as string]: `${len}px`, transform: `rotate(${a}deg)`, animationDelay: `${0.25 + k * 0.06}s` }} />
              <span className="n" style={{ left: `calc(50% + ${(Math.cos(rad) * len).toFixed(1)}px - 22px)`, top: `calc(50% + ${(Math.sin(rad) * len).toFixed(1)}px - 15px)`, animationDelay: `${0.5 + k * 0.06}s` }} />
            </span>
          );
        })}
      </div>
    );
  }
  const f = [0.95, 0.82, 0.7, 0.58];
  return (
    <div className="rai-vis vs-result">
      {f.map((v, k) => (<span key={k} className="row" style={{ top: `${20 + k * 20}%`, animationDelay: `${k * 0.1}s` }}><i style={{ ["--f" as string]: v, animationDelay: `${0.2 + k * 0.1}s` }} /></span>))}
      <span className="tick" style={{ top: "74%", animationDelay: ".95s" }}><CheckMark color="#2e9e6a" /></span>
    </div>
  );
}

export default function AutomationIntegrationInteractive() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const labelEls = useRef<(HTMLDivElement | null)[]>([]);
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
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100); camera.position.set(0, 7.8, 14.6);
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
    const R = 4.6; const hitMeshes: THREE.Object3D[] = [];
    const disposables: { dispose: () => void }[] = [];

    const center = new THREE.Group(); rig.add(center);
    const rTex = new THREE.TextureLoader().load("/images/dev/r-icon.png"); rTex.colorSpace = THREE.SRGBColorSpace; rTex.anisotropy = 8;
    const rGeo = new THREE.PlaneGeometry(2.15, 2.08); const rMat = new THREE.MeshBasicMaterial({ map: rTex, transparent: true, depthWrite: false, depthTest: false });
    const rPlane = new THREE.Mesh(rGeo, rMat); rPlane.renderOrder = 20; scene.add(rPlane); disposables.push(rTex, rGeo, rMat);

    const pedGeo = new RoundedBoxGeometry(1.5, 0.4, 1.5, 4, 0.13); disposables.push(pedGeo);
    const nodeGroups: { g: THREE.Group; phase: number }[] = [];
    NODES.forEach((n, i) => {
      const a = (n.ang * Math.PI) / 180, px = Math.sin(a) * R, pz = Math.cos(a) * R;
      const g = new THREE.Group(); g.position.set(px, 0, pz); rig.add(g);
      const pedMat = new THREE.MeshStandardMaterial({ color: 0xeef2f8, metalness: 0.05, roughness: 0.55 }); disposables.push(pedMat);
      const ped = new THREE.Mesh(pedGeo, pedMat); ped.castShadow = true; ped.receiveShadow = true; ped.userData.i = i; g.add(ped); hitMeshes.push(ped);
      const obj = bObj(n.icon, n.accent); obj.position.y = 0.2; g.add(obj);
      obj.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) { m.userData.i = i; hitMeshes.push(m); disposables.push(m.geometry as THREE.BufferGeometry, m.material as THREE.Material); } });
      const gl = new THREE.PointLight(new THREE.Color(n.accent).getHex(), 3.2, 4.5, 2); gl.position.set(0, 1.0, 0.3); g.add(gl);
      nodeGroups.push({ g, phase: i * 1.1 });
    });

    /* connectors: each node -> the R core (navy->gold, gently curved) */
    const cNavy = new THREE.Color(0x24406e), cGold = new THREE.Color(0xe0a63c);
    NODES.forEach((n, i) => {
      const a = (n.ang * Math.PI) / 180, dx = Math.sin(a), dz = Math.cos(a);
      const start = new THREE.Vector3(dx * R * 0.82, 0.14, dz * R * 0.82);
      const end = new THREE.Vector3(dx * 1.35, 0.3, dz * 1.35);
      const mid = start.clone().lerp(end, 0.5);
      mid.add(new THREE.Vector3(-dz, 0, dx).multiplyScalar(0.42)); mid.y += 0.26;
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const tg = new THREE.TubeGeometry(curve, 44, 0.012, 8, false);
      const uvA = tg.attributes.uv, col = new Float32Array(uvA.count * 3), tmp = new THREE.Color();
      for (let k = 0; k < uvA.count; k++) { const u = uvA.getX(k); tmp.copy(cNavy).lerp(cGold, Math.pow(u, 1.8)); col[k * 3] = tmp.r; col[k * 3 + 1] = tmp.g; col[k * 3 + 2] = tmp.b; }
      tg.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const tm = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5 });
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

    const resize = () => { const w = stage.clientWidth || window.innerWidth, h = stage.clientHeight || window.innerHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
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
      });
      { const cw = new THREE.Vector3(); center.getWorldPosition(cw); const tc = camera.position.clone().sub(cw).normalize(); rPlane.position.copy(cw).addScaledVector(tc, 0.3); rPlane.quaternion.copy(camera.quaternion); }
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 7.8 - pointer.y * 0.6, 0.04);
      camera.lookAt(camTarget);
      if (openIdxRef.current !== null) { hover = -1; canvas.style.cursor = "default"; }
      else { ray.setFromCamera(pointer, camera); const hit = ray.intersectObjects(hitMeshes, false); const idx = hit.length ? (hit[0].object.userData.i as number) : -1; if (idx !== hover) { hover = idx; canvas.style.cursor = idx >= 0 ? "pointer" : "grab"; } }
      const w = stage.clientWidth, h = stage.clientHeight;
      const cs = new THREE.Vector3(0, 0.4, 0).project(camera); const csx = (cs.x * 0.5 + 0.5) * w, csy = (-cs.y * 0.5 + 0.5) * h;
      const items = nodeGroups.map((nd, i) => {
        const world = new THREE.Vector3(); nd.g.getWorldPosition(world); world.y += 0.8;
        const p = world.clone().project(camera); const sx = (p.x * 0.5 + 0.5) * w;
        return { i, sx, sy: (-p.y * 0.5 + 0.5) * h, vis: p.z < 1 && p.z > -1, left: sx < csx };
      });
      const MINGAP = 124, cardW = 264, gap = 62, pad = 12;
      ([true, false]).forEach((side) => {
        const arr = items.filter((it) => it.left === side).sort((a, b) => a.sy - b.sy);
        for (let k = 1; k < arr.length; k++) { if (arr[k].sy - arr[k - 1].sy < MINGAP) arr[k].sy = arr[k - 1].sy + MINGAP; }
        if (arr.length) { const over = arr[arr.length - 1].sy - (h - 72); if (over > 0) arr.forEach((a) => { a.sy -= over; }); }
        arr.forEach((a) => { a.sy = Math.min(Math.max(a.sy, 72), h - 72); });
      });
      items.forEach((it) => {
        const lab = labelEls.current[it.i]; if (!lab) return;
        let x = it.left ? it.sx - gap : it.sx + gap;
        if (it.left) { if (x - cardW < pad) x = pad + cardW; } else { if (x + cardW > w - pad) x = w - pad - cardW; }
        lab.style.left = x + "px"; lab.style.top = it.sy + "px";
        lab.style.transform = it.left ? "translate(-100%,-50%)" : "translate(0,-50%)";
        lab.classList.toggle("lft", it.left); lab.classList.toggle("rgt", !it.left);
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
  }, []);

  return (
    <div className="rai-root">
      <style>{CSS}</style>
      <div className="rai-stage" ref={sceneRef}>
        <canvas className="rai-canvas" ref={canvasRef} />
        {NODES.map((n, i) => (
          <div className="rai-label" key={n.id} style={{ ["--acc" as string]: n.accent }} ref={(el) => { labelEls.current[i] = el; }}>
            <div className="tab">{n.title}</div>
            <div className="body">{n.desc}</div>
          </div>
        ))}
        <div className="rai-hint"><span className="dot" />Click a capability to see a real example · drag to rotate</div>
      </div>

      {active && (
        <div className="rai-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="rai-modal" role="dialog" aria-modal="true" aria-labelledby="rai-modal-title" style={{ ["--acc" as string]: active.accent }}>
            <button ref={closeBtnRef} className="rai-close" onClick={close} aria-label="Close"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
            <div className="rai-modal-scroll">
              <div className="rai-modal-head">
                <span className="rai-example">{active.example}</span>
                <h2 id="rai-modal-title" className="rai-modal-title">{active.popupTitle}</h2>
                <p className="rai-modal-subtitle">{active.popupSubtitle}</p>
              </div>

              <div className="rai-story" key={step}>
                <StepVisual tone={STEPS[step].tone} />
                <div className="rai-stage-text">
                  <div className="rai-kicker">Step {step + 1} of 3</div>
                  <h3 className="rai-step-title">{STEPS[step].k}</h3>
                  {STEPS[step].cap ? <p className="rai-step-cap">{STEPS[step].cap}</p> : null}
                  <ul className="rai-step-list">
                    {STEPS[step].items.map((tx, k) => (
                      <li key={k} style={{ animationDelay: `${0.12 + k * 0.09}s` }}>
                        {STEPS[step].tone === "problem"
                          ? <XMark color="#e05656" />
                          : <CheckMark color={STEPS[step].tone === "built" ? "#2f6fb5" : "#2e9e6a"} />}
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
.rai-label{position:absolute;pointer-events:none;width:262px;opacity:0;transition:opacity .3s}
.rai-label.on{opacity:1}
.rai-label.lft{text-align:right}
.rai-label.rgt{text-align:left}
.rai-label .tab{display:inline-block;background:var(--acc);color:#fff;font-size:23px;font-weight:800;letter-spacing:.2px;
  padding:10px 20px;border-radius:11px;box-shadow:0 12px 24px -8px rgba(0,0,0,.65);position:relative;z-index:2}
.rai-label .body{background:#fff;border:1px solid rgba(30,45,77,.14);border-radius:12px;margin-top:-7px;
  padding:16px 16px 13px;font-size:16px;line-height:1.42;color:#54647f;text-align:left;
  box-shadow:0 18px 40px -14px rgba(0,0,0,.55)}
.rai-hint{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#c4cee0;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:8px 16px;pointer-events:none;opacity:.9}
.rai-hint .dot{width:8px;height:8px;border-radius:50%;background:var(--gold);animation:rai-ping 2s ease-out infinite}
@keyframes rai-ping{0%{box-shadow:0 0 0 0 rgba(217,154,43,.5)}70%,100%{box-shadow:0 0 0 8px rgba(217,154,43,0)}}
.rai-overlay{position:fixed;inset:0;z-index:1000;background:rgba(6,12,26,.68);display:flex;align-items:flex-start;justify-content:center;padding:32px 18px;overflow-y:auto;cursor:default}
.rai-overlay *{cursor:default}
.rai-overlay .rai-close,.rai-overlay .rai-btn{cursor:pointer}
.rai-overlay .rai-btn[disabled]{cursor:default}
.rai-modal{position:relative;width:100%;max-width:960px;background:#fff;border-radius:22px;box-shadow:0 50px 100px -30px rgba(0,0,0,.7);overflow:hidden;border-top:4px solid var(--acc)}
.rai-modal-scroll{padding:32px clamp(20px,4vw,44px) 36px}
.rai-close{position:absolute;top:14px;right:14px;z-index:5;width:38px;height:38px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--navy);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,transform .15s}
.rai-close:hover{background:#f1f4f9;transform:rotate(90deg)}
.rai-modal-head{margin-bottom:22px;padding-right:40px}
.rai-example{display:inline-block;background:var(--navy);color:#fff;font-size:12.5px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;padding:7px 15px;border-radius:20px}
.rai-modal-title{font-size:clamp(28px,4.6vw,42px);font-weight:800;color:var(--navy);margin:14px 0 5px;letter-spacing:-.3px}
.rai-modal-subtitle{font-size:17px;color:var(--muted);font-style:italic;margin:0}
/* ---- story player ---- */
.rai-story{display:grid;grid-template-columns:1.05fr 1fr;gap:26px;align-items:center;margin:26px 0 20px;min-height:250px}
.rai-kicker{font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--acc)}
.rai-step-title{font-size:30px;font-weight:800;color:var(--navy);margin:8px 0 16px;letter-spacing:-.2px}
.rai-step-cap{font-size:17px;font-weight:700;color:var(--navy);margin:0 0 14px}
.rai-step-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.rai-step-list li{display:flex;gap:11px;align-items:flex-start;font-size:16.5px;line-height:1.5;color:#46566f;opacity:0;transform:translateY(8px);animation:rai-li .45s ease forwards}
@keyframes rai-li{to{opacity:1;transform:none}}
.rai-step-list li svg{flex:0 0 auto;margin-top:3px}
.rai-vis{position:relative;height:250px;border-radius:16px;overflow:hidden;border:1px solid #e6eaf1;background:linear-gradient(180deg,#fbfcfe,#eef2f8)}
.rai-vis .n{position:absolute;border-radius:8px;box-shadow:0 8px 16px -5px rgba(30,45,77,.3);opacity:0;animation:rai-pop .45s ease forwards}
@keyframes rai-pop{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:scale(1)}}
.vs-problem .n{width:52px;height:36px;background:#efbfbf;animation:rai-pop .4s ease forwards,rai-jit 3s ease-in-out infinite .4s}
@keyframes rai-jit{0%,100%{translate:0 0}50%{translate:5px -6px}}
.vs-problem .x{position:absolute;font-size:26px;color:#e05656;font-weight:800;opacity:0;animation:rai-pop .4s ease forwards}
.vs-built .hub{position:absolute;left:50%;top:50%;width:62px;height:62px;margin:-31px 0 0 -31px;border-radius:50%;background:#2f6fb5;box-shadow:0 10px 24px -6px rgba(47,111,181,.75);opacity:0;animation:rai-pop .4s ease forwards}
.vs-built .sp{position:absolute;left:50%;top:50%;height:3px;background:#a9c8ea;transform-origin:0 50%;width:0;animation:rai-grow .55s ease forwards}
@keyframes rai-grow{to{width:var(--len)}}
.vs-built .n{width:44px;height:30px;background:#cfe0f4}
.vs-result .row{position:absolute;left:9%;height:16px;border-radius:9px;background:#dbeee5;width:78%;opacity:0;animation:rai-pop .35s ease forwards}
.vs-result .row i{position:absolute;left:0;top:0;bottom:0;border-radius:9px;background:#2e9e6a;transform-origin:left;transform:scaleX(0);animation:rai-fill .8s cubic-bezier(.3,.8,.3,1) forwards}
@keyframes rai-fill{to{transform:scaleX(var(--f))}}
.vs-result .tick{position:absolute;right:6%;opacity:0;animation:rai-pop .4s ease forwards}
.rai-nav{display:flex;align-items:center;justify-content:space-between;gap:16px;border-top:1px solid var(--line);padding-top:18px}
.rai-dots{display:flex;gap:8px}
.rai-dot{width:9px;height:9px;border-radius:50%;background:#d7dee9;transition:all .25s}
.rai-dot.on{background:var(--acc);width:26px;border-radius:6px}
.rai-btn{font:inherit;font-size:15px;font-weight:700;padding:11px 20px;border-radius:10px;cursor:pointer;border:1px solid var(--line);background:#fff;color:var(--navy);transition:background .15s,opacity .15s}
.rai-btn:hover{background:#f2f5fa}
.rai-btn[disabled]{opacity:.35;cursor:default}
.rai-btn-primary{background:var(--navy);color:#fff;border-color:var(--navy)}
.rai-btn-primary:hover{background:#2b3f68}
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
.rai-quote{margin:0 0 24px;padding:16px 22px;border-left:3px solid var(--acc);background:#f7f9fc;border-radius:0 12px 12px 0;font-family:Georgia,serif;font-style:italic;font-size:17.5px;line-height:1.6;color:var(--navy)}
.rai-stack{border-top:1px solid var(--line);padding-top:22px}
.rai-stack-head{display:flex;align-items:center;justify-content:center;gap:14px;font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--navy)}
.rai-stack-line{height:1px;width:56px;background:var(--line)}
.rai-stack-items{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin-top:18px}
.rai-chip{display:inline-flex;align-items:center;gap:8px;font-size:14.5px;font-weight:600;color:var(--navy);background:#fff;border:1px solid var(--line);border-radius:11px;padding:8px 14px;box-shadow:0 6px 16px -12px rgba(30,45,77,.35)}
.rai-chip-dot{width:9px;height:9px;border-radius:50%}
@media (max-width:760px){.rai-story{grid-template-columns:1fr}.rai-ba{grid-template-columns:1fr}.rai-ba-arrow{transform:rotate(90deg)}.rai-cols{grid-template-columns:1fr}.rai-label{width:130px}.rai-label .t{font-size:12px}.rai-label .d{font-size:10.5px}}
`;
