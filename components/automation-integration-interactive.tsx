"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ──────────────────────────────────────────────────────────────
   Rawlins · Automation & Integration — interactive WebGL hub.
   Real-3D scene (Three.js): floating capability tiles, glowing
   R-core with orbiting halos, flowing connectors, drag to rotate.
   Click a node → its real case study opens in an overlay.
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
    example: "Example 06", popupTitle: "BD → Project Handover", popupSubtitle: "130-person professional services firm",
    before: "Closed-won ran on memory", after: "Billing-ready in days, not weeks",
    problem: ["Handoff from BD to delivery & finance ran on email and memory", "Scope, fee, billing terms & owner moved late or incomplete", "Finance and PMs chased BD for info that should be settled at close", "Project setup dragged on for one to two weeks"],
    built: ["Locked the few fields required before an opportunity can close-won", "Required scope, fee, terms, owner & kickoff date in Salesforce", "Automation pushes the project record into Monday.com at close", "Notified finance & delivery instantly with a standardized kickoff checklist"],
    result: ["Setup went from 1–2 weeks of back-and-forth to billing-ready in days", "Finance stopped chasing BD for basic setup information", "PMs walked into kickoffs with everything they needed"],
    stack: ["Salesforce", "Monday.com", "Make.com", "QuickBooks", "SharePoint", "Teams"],
    quote: "Project setup went from one to two weeks of back-and-forth to billing-ready in a few business days. Finance stopped chasing BD, and PMs walked into kickoffs with what they needed." },
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

/* canvas textures (called only inside the effect / browser) */
function iconCanvas(kind: string, color: string): THREE.CanvasTexture {
  const s = 256, cv = document.createElement("canvas"); cv.width = cv.height = s;
  const x = cv.getContext("2d")!; x.clearRect(0, 0, s, s);
  x.fillStyle = color; x.beginPath(); x.arc(s / 2, s / 2, 104, 0, 7); x.fill();
  x.strokeStyle = "rgba(255,255,255,.92)"; x.lineWidth = 13; x.lineCap = "round"; x.lineJoin = "round"; x.fillStyle = "#fff";
  const cx = s / 2, cy = s / 2;
  if (kind === "chart") { x.beginPath(); x.moveTo(cx - 42, cy - 40); x.lineTo(cx - 42, cy + 40); x.lineTo(cx + 46, cy + 40); x.stroke(); x.fillRect(cx - 30, cy + 6, 16, 28); x.fillRect(cx - 6, cy - 14, 16, 48); x.fillRect(cx + 18, cy - 2, 16, 36); }
  else if (kind === "gauge") { x.beginPath(); x.arc(cx, cy + 14, 44, Math.PI * 1.05, Math.PI * 1.95); x.stroke(); x.beginPath(); x.moveTo(cx, cy + 14); x.lineTo(cx + 26, cy - 14); x.stroke(); x.beginPath(); x.arc(cx, cy + 14, 7, 0, 7); x.fill(); }
  else if (kind === "db") { x.beginPath(); x.ellipse(cx, cy - 30, 42, 16, 0, 0, 7); x.stroke(); x.beginPath(); x.moveTo(cx - 42, cy - 30); x.lineTo(cx - 42, cy + 30); x.moveTo(cx + 42, cy - 30); x.lineTo(cx + 42, cy + 30); x.stroke(); x.beginPath(); x.ellipse(cx, cy, 42, 16, 0, 0, Math.PI); x.stroke(); x.beginPath(); x.ellipse(cx, cy + 30, 42, 16, 0, 0, Math.PI); x.stroke(); }
  else if (kind === "flow") { x.beginPath(); x.arc(cx - 34, cy - 26, 12, 0, 7); x.arc(cx - 34, cy + 26, 12, 0, 7); x.stroke(); x.beginPath(); x.moveTo(cx - 22, cy - 26); x.lineTo(cx + 16, cy - 26); x.lineTo(cx + 40, cy); x.lineTo(cx + 16, cy + 26); x.lineTo(cx - 22, cy + 26); x.stroke(); x.beginPath(); x.moveTo(cx + 40, cy); x.lineTo(cx + 16, cy); x.stroke(); }
  else if (kind === "pin") { x.strokeRect(cx - 30, cy - 46, 60, 92); x.beginPath(); x.arc(cx, cy - 8, 11, 0, 7); x.stroke(); x.beginPath(); x.moveTo(cx, cy + 3); x.lineTo(cx, cy + 30); x.stroke(); }
  else if (kind === "handoff") { x.beginPath(); x.moveTo(cx - 40, cy - 14); x.lineTo(cx + 34, cy - 14); x.moveTo(cx + 18, cy - 30); x.lineTo(cx + 34, cy - 14); x.lineTo(cx + 18, cy + 2); x.stroke(); x.beginPath(); x.moveTo(cx + 40, cy + 14); x.lineTo(cx - 34, cy + 14); x.moveTo(cx - 18, cy - 2); x.lineTo(cx - 34, cy + 14); x.lineTo(cx - 18, cy + 30); x.stroke(); }
  const t = new THREE.CanvasTexture(cv); t.anisotropy = 8; t.colorSpace = THREE.SRGBColorSpace; return t;
}
function rCanvas(): THREE.CanvasTexture {
  const s = 512, cv = document.createElement("canvas"); cv.width = cv.height = s;
  const x = cv.getContext("2d")!; x.clearRect(0, 0, s, s);
  x.font = '700 360px Georgia, "Times New Roman", serif'; x.textAlign = "center"; x.textBaseline = "middle";
  x.save(); x.beginPath(); x.rect(0, 0, s * 0.52, s); x.clip(); x.fillStyle = "#e0a63c"; x.fillText("R", s / 2, s / 2 + 18); x.restore();
  x.save(); x.beginPath(); x.rect(s * 0.52, 0, s, s); x.clip(); x.fillStyle = "#1e2d4d"; x.fillText("R", s / 2, s / 2 + 18); x.restore();
  const t = new THREE.CanvasTexture(cv); t.anisotropy = 8; t.colorSpace = THREE.SRGBColorSpace; return t;
}

export default function AutomationIntegrationInteractive() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const labelEls = useRef<(HTMLDivElement | null)[]>([]);
  const openRef = useRef<(i: number) => void>(() => {});
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const active = openIdx === null ? null : NODES[openIdx];

  openRef.current = (i: number) => { lastFocused.current = document.activeElement as HTMLElement; setOpenIdx(i); };
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
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 0);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x3f60a8, emissive: 0xffd27a, emissiveIntensity: 0.13, metalness: 0.28, roughness: 0.26, flatShading: true });
    const core = new THREE.Mesh(coreGeo, coreMat); core.castShadow = true; center.add(core); disposables.push(coreGeo, coreMat);
    const haloGeo = new THREE.TorusGeometry(1.75, 0.045, 18, 80); const haloMat = new THREE.MeshBasicMaterial({ color: 0xe8b552 });
    const halo = new THREE.Mesh(haloGeo, haloMat); halo.rotation.x = Math.PI / 2.3; center.add(halo); disposables.push(haloGeo, haloMat);
    const halo2Geo = new THREE.TorusGeometry(2.05, 0.02, 16, 80); const halo2Mat = new THREE.MeshBasicMaterial({ color: 0x5b8bd6, transparent: true, opacity: 0.5 });
    const halo2 = new THREE.Mesh(halo2Geo, halo2Mat); halo2.rotation.x = Math.PI / 1.7; center.add(halo2); disposables.push(halo2Geo, halo2Mat);
    const rTex = rCanvas(); const rGeo = new THREE.PlaneGeometry(1.9, 1.9); const rMat = new THREE.MeshBasicMaterial({ map: rTex, transparent: true, depthWrite: false, depthTest: false });
    const rPlane = new THREE.Mesh(rGeo, rMat); rPlane.renderOrder = 20; scene.add(rPlane); disposables.push(rTex, rGeo, rMat);

    const pedGeo = new RoundedBoxGeometry(1.5, 0.4, 1.5, 4, 0.13); disposables.push(pedGeo);
    const nodeGroups: { g: THREE.Group; ped: THREE.Mesh; badge: THREE.Mesh; base: number; phase: number }[] = [];
    NODES.forEach((n, i) => {
      const a = (n.ang * Math.PI) / 180, px = Math.sin(a) * R, pz = Math.cos(a) * R;
      const g = new THREE.Group(); g.position.set(px, 0, pz); rig.add(g);
      const pedMat = new THREE.MeshStandardMaterial({ color: 0xeef2f8, metalness: 0.05, roughness: 0.55 }); disposables.push(pedMat);
      const ped = new THREE.Mesh(pedGeo, pedMat); ped.castShadow = true; ped.receiveShadow = true; ped.userData.i = i; g.add(ped); hitMeshes.push(ped);
      const tex = iconCanvas(n.icon, n.accent); const bGeo = new THREE.PlaneGeometry(1.15, 1.15); const bMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
      const badge = new THREE.Mesh(bGeo, bMat); badge.position.y = 0.95; badge.userData.i = i; g.add(badge); hitMeshes.push(badge); disposables.push(tex, bGeo, bMat);
      const gl = new THREE.PointLight(new THREE.Color(n.accent).getHex(), 4, 4, 2); gl.position.set(0, 0.9, 0); g.add(gl);
      nodeGroups.push({ g, ped, badge, base: 0.95, phase: i * 1.1 });
    });

    const flows: { curve: THREE.QuadraticBezierCurve3; dot: THREE.Mesh; off: number }[] = [];
    NODES.forEach((n, i) => {
      const a = (n.ang * Math.PI) / 180, px = Math.sin(a) * R, pz = Math.cos(a) * R;
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(px / 2, 1.15, pz / 2), new THREE.Vector3(px, 0.35, pz));
      const tGeo = new THREE.TubeGeometry(curve, 26, 0.022, 8, false); const tMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(n.accent), transparent: true, opacity: 0.32 });
      rig.add(new THREE.Mesh(tGeo, tMat)); disposables.push(tGeo, tMat);
      const dGeo = new THREE.SphereGeometry(0.075, 12, 12); const dMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(n.accent) });
      const dot = new THREE.Mesh(dGeo, dMat); rig.add(dot); disposables.push(dGeo, dMat);
      flows.push({ curve, dot, off: i / NODES.length });
    });

    /* interaction */
    const ray = new THREE.Raycaster(), pointer = new THREE.Vector2(); let hover = -1;
    let drag = false, px0 = 0, rotY = 0, rotVel = 0, lastX = 0;
    const onDown = (e: PointerEvent) => { drag = true; lastX = e.clientX; px0 = e.clientX; canvas.setPointerCapture(e.pointerId); };
    const onUp = (e: PointerEvent) => { drag = false; if (Math.abs(e.clientX - px0) < 5) clickAt(e); };
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1; pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1; if (drag) { rotVel = (e.clientX - lastX) * 0.005; rotY += rotVel; lastX = e.clientX; } };
    const clickAt = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1; pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1; ray.setFromCamera(pointer, camera); const hit = ray.intersectObjects(hitMeshes, false); if (hit.length) openRef.current(hit[0].object.userData.i as number); };
    canvas.addEventListener("pointerdown", onDown); canvas.addEventListener("pointerup", onUp); canvas.addEventListener("pointermove", onMove);

    const resize = () => { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    window.addEventListener("resize", resize); resize();

    let raf = 0;
    const animate = (now: number) => {
      const t = now * 0.001;
      if (!drag) { rotVel *= 0.92; rotY += rotVel; }
      rig.rotation.y = rotY + Math.sin(t * 0.18) * 0.14;
      core.rotation.y = t * 0.35; core.rotation.x = Math.sin(t * 0.4) * 0.15;
      halo.rotation.z = t * 0.5; halo2.rotation.z = -t * 0.35;
      center.position.y = 0.35 + Math.sin(t * 0.9) * 0.12;
      nodeGroups.forEach((nd, i) => {
        nd.g.position.y = Math.sin(t * 0.9 + nd.phase) * 0.14;
        nd.badge.position.y = nd.base + Math.sin(t * 1.3 + nd.phase) * 0.05;
        nd.badge.quaternion.copy(camera.quaternion);
        const sc = hover === i ? 1.12 : 1; nd.ped.scale.setScalar(THREE.MathUtils.lerp(nd.ped.scale.x, sc, 0.15));
      });
      { const cw = new THREE.Vector3(); center.getWorldPosition(cw); const tc = camera.position.clone().sub(cw).normalize(); rPlane.position.copy(cw).addScaledVector(tc, 1.55); rPlane.quaternion.copy(camera.quaternion); }
      flows.forEach((f) => { const p = (t * 0.14 + f.off) % 1; f.curve.getPointAt(p, f.dot.position); });
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 7.8 - pointer.y * 0.6, 0.04);
      camera.lookAt(camTarget);
      ray.setFromCamera(pointer, camera); const hit = ray.intersectObjects(hitMeshes, false);
      const idx = hit.length ? (hit[0].object.userData.i as number) : -1;
      if (idx !== hover) { hover = idx; canvas.style.cursor = idx >= 0 ? "pointer" : "grab"; }
      const w = stage.clientWidth, h = stage.clientHeight;
      const cs = new THREE.Vector3(0, 0.4, 0).project(camera); const csx = (cs.x * 0.5 + 0.5) * w, csy = (-cs.y * 0.5 + 0.5) * h;
      nodeGroups.forEach((nd, i) => {
        const world = new THREE.Vector3(); nd.badge.getWorldPosition(world);
        const p = world.clone().project(camera); let sx = (p.x * 0.5 + 0.5) * w, sy = (-p.y * 0.5 + 0.5) * h;
        let dx = sx - csx, dy = sy - csy; const len = Math.hypot(dx, dy) || 1; sx += (dx / len) * 78; sy += (dy / len) * 78;
        const lab = labelEls.current[i]; if (lab) { lab.style.left = sx + "px"; lab.style.top = sy + "px"; lab.classList.toggle("on", p.z < 1 && p.z > -1); }
      });
      renderer.render(scene, camera); raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
          <div className="rai-label" key={n.id} ref={(el) => { labelEls.current[i] = el; }}>
            <div className="t">{n.title}</div>
            <div className="d">{n.desc}</div>
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
                <div className="rai-stack-items">{active.stack.map((tool) => (<span className="rai-chip" key={tool}><span className="rai-chip-dot" style={{ background: toolDot(tool) }} />{tool}</span>))}</div>
              </div>
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
.rai-label{position:absolute;transform:translate(-50%,-50%);pointer-events:none;text-align:center;width:180px;opacity:0;transition:opacity .3s}
.rai-label.on{opacity:1}
.rai-label .t{font-size:14px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:#fff;line-height:1.15;text-shadow:0 2px 10px rgba(0,0,0,.7)}
.rai-label .d{font-size:12px;line-height:1.35;color:#c3cde0;margin-top:4px;text-shadow:0 1px 10px rgba(0,0,0,.85)}
.rai-hint{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#c4cee0;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:8px 16px;pointer-events:none;opacity:.9}
.rai-hint .dot{width:8px;height:8px;border-radius:50%;background:var(--gold);animation:rai-ping 2s ease-out infinite}
@keyframes rai-ping{0%{box-shadow:0 0 0 0 rgba(217,154,43,.5)}70%,100%{box-shadow:0 0 0 8px rgba(217,154,43,0)}}
.rai-overlay{position:fixed;inset:0;z-index:1000;background:rgba(6,12,26,.68);display:flex;align-items:flex-start;justify-content:center;padding:32px 18px;overflow-y:auto}
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
.rai-quote{margin:0 0 24px;padding:14px 20px;border-left:3px solid var(--acc);background:#f7f9fc;border-radius:0 12px 12px 0;font-family:Georgia,serif;font-style:italic;font-size:15.5px;line-height:1.6;color:var(--navy)}
.rai-stack{border-top:1px solid var(--line);padding-top:22px}
.rai-stack-head{display:flex;align-items:center;justify-content:center;gap:14px;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--navy)}
.rai-stack-line{height:1px;width:56px;background:var(--line)}
.rai-stack-items{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin-top:18px}
.rai-chip{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--navy);background:#fff;border:1px solid var(--line);border-radius:11px;padding:8px 14px;box-shadow:0 6px 16px -12px rgba(30,45,77,.35)}
.rai-chip-dot{width:9px;height:9px;border-radius:50%}
@media (max-width:760px){.rai-ba{grid-template-columns:1fr}.rai-ba-arrow{transform:rotate(90deg)}.rai-cols{grid-template-columns:1fr}.rai-label{width:130px}.rai-label .t{font-size:12px}.rai-label .d{font-size:10.5px}}
`;
