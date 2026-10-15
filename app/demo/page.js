"use client";
import { useEffect, useRef, useState } from "react";

const T = 45; // seconds
const ROUTE = [[40,300],[75,285],[110,268],[145,250],[180,232],[215,215],[250,198],[285,182],[320,168],[345,158],[360,150]];
const SOS_PT = [360, 150];
const BASE_PT = [352, 96];

function segLens(pts) {
  const L = [0];
  for (let k = 1; k < pts.length; k++) {
    const dx = pts[k][0] - pts[k-1][0], dy = pts[k][1] - pts[k-1][1];
    L.push(L[k-1] + Math.hypot(dx, dy));
  }
  return L;
}
const LENS = segLens(ROUTE);
const TOTAL = LENS[LENS.length - 1];
function posAt(p) {
  const d = Math.min(Math.max(p, 0), 1) * TOTAL;
  let k = 1;
  while (k < LENS.length - 1 && LENS[k] < d) k++;
  const f = (d - LENS[k-1]) / Math.max(LENS[k] - LENS[k-1], 1e-6);
  return [ROUTE[k-1][0] + (ROUTE[k][0]-ROUTE[k-1][0])*f, ROUTE[k-1][1] + (ROUTE[k][1]-ROUTE[k-1][1])*f];
}
const lerp = (a, b, f) => [a[0]+(b[0]-a[0])*f, a[1]+(b[1]-a[1])*f];

// One narration line per scene. Subtitles show these; voiceover speaks them.
const LINES = [
  { to: 8, line: "6:04 AM, Makoko. Musa taps Start Trip, and logging begins. No network. No extra hardware." },
  { to: 18, line: "Mid-lagoon, zero bars. The phone keeps recording. That trail becomes a record banks can trust." },
  { to: 28, line: "Engine failure. One tap — SOS goes out by data, or by SMS where there is no signal." },
  { to: 38, line: "The whole lagoon sees the red pin. His cooperative, nearby canoes, responders — one map." },
  { to: 99, line: "Every trip is data that earns. Five hundred fishers. Lagos Lagoon. That is the pilot." },
];

function pickVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const vs = window.speechSynthesis.getVoices();
  return vs.find((v) => v.lang === "en-NG")
    || vs.find((v) => v.lang && v.lang.startsWith("en") && /male|daniel|arthur|george/i.test(v.name))
    || vs.find((v) => v.lang && v.lang.startsWith("en-GB"))
    || vs.find((v) => v.lang && v.lang.startsWith("en"))
    || null;
}

export default function DemoPage() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [hasSpeech, setHasSpeech] = useState(false);
  const raf = useRef(null);
  const lastTs = useRef(0);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setHasSpeech(true);
      window.speechSynthesis.getVoices();
    }
    return () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  }, []);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  useEffect(() => {
    if (!playing) return;
    lastTs.current = performance.now();
    const loop = (now) => {
      const dt = (now - lastTs.current) / 1000;
      lastTs.current = now;
      setT((v) => {
        const n = v + dt;
        if (n >= T) { setPlaying(false); return T; }
        return n;
      });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  const sceneIdx = LINES.findIndex((c) => t < c.to);

  // speak the line whenever the scene changes and voice is on
  useEffect(() => {
    if (!voiceOn || !hasSpeech) return;
    const v = pickVoice();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(LINES[sceneIdx].line);
    if (v) u.voice = v;
    u.rate = 0.98;
    window.speechSynthesis.speak(u);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, voiceOn]);

  const toggleVoice = () => {
    if (voiceOn && hasSpeech) window.speechSynthesis.cancel();
    setVoiceOn((v) => !v);
  };

  // motion state from timeline
  const sailP = t < 18 ? (t / 18) * 0.92 : 0.92;
  const boat = posAt(sailP);
  const bob = sailP >= 0.92 && t >= 18 ? Math.sin(t * 4) * 3 : 0;
  const crumbs = Math.floor(sailP * 22);
  const sosOn = t >= 18;
  const ring = sosOn ? ((t - 18) % 1.6) / 1.6 : 0;
  const zoom = t >= 28 ? Math.min((t - 28) / 6, 1) : 0;
  const scale = 1 + zoom * 0.45;
  const respP = t >= 28 ? Math.min((t - 28) / 10, 1) : 0;
  const resp = lerp(BASE_PT, SOS_PT, respP * respP * (3 - 2 * respP));
  const mm = 4 + Math.floor((t / T) * 37);
  const clock = `6:${String(mm).padStart(2, "0")} AM`;
  const outro = t >= 38 ? Math.min((t - 38) / 2, 1) : 0;
  const smsLines = [
    t >= 19 && "SOS queued — no data signal",
    t >= 22 && "SMS sent → +234 ••• ••• 210",
    t >= 25 && "Makoko cooperative alerted — 14 boats nearby",
    t >= 29 && "Responder dispatched — ETA 22 min",
  ].filter(Boolean);

  return (
    <div className="section">
      <span className="pill">45-SECOND FILM</span>
      <h2>One trip across the lagoon</h2>
      <div className="player" style={{ maxWidth: 640 }}>
        <div className="phone">
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8aa5bb" }}>
            <span>{clock}</span><span>Lagos Lagoon · {sosOn ? "SOS ACTIVE" : "TRACKING"}</span>
          </div>
          <div className="progress"><i style={{ width: `${(t / T) * 100}%` }} /></div>
          <div style={{ position: "relative" }}>
            <svg viewBox="0 0 400 340" style={{ width: "100%", background: "#06283d", borderRadius: 12, border: "1px solid #1c4a6b", display: "block" }}>
              <g className="waves" stroke="#134a6e" strokeWidth="2" fill="none" opacity="0.7">
                <path d="M-400 60 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
                <path d="M-400 120 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
                <path d="M-400 200 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
                <path d="M-400 280 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
              </g>
              <g transform={`translate(${SOS_PT[0]} ${SOS_PT[1]}) scale(${scale}) translate(${-SOS_PT[0]} ${-SOS_PT[1]})`}>
                <path d="M20 300 Q120 260 180 210 T360 120" stroke="#1c4a6b" strokeWidth="3" fill="none" strokeDasharray="8 6" />
                {Array.from({ length: crumbs }).map((_, k) => {
                  const p = posAt((k / 22) * 0.92);
                  return <circle key={k} cx={p[0]} cy={p[1]} r="5" fill="#17a398" opacity="0.9" />;
                })}
                {respP > 0 && <line x1={BASE_PT[0]} y1={BASE_PT[1]} x2={resp[0]} y2={resp[1]} stroke="#ffb703" strokeWidth="2" strokeDasharray="6 5" />}
                <text x="40" y="325" fontSize="13" fill="#8aa5bb">Makoko</text>
                <text x="300" y="100" fontSize="13" fill="#8aa5bb">Epe channel</text>
                <g transform={`translate(${boat[0]} ${boat[1] + bob})`}>
                  <path d="M-12 0 L12 0 L7 8 L-7 8 Z" fill={sosOn ? "#e63946" : "#9fd8ff"} />
                  <rect x="-2" y="-10" width="4" height="10" fill="#8aa5bb" />
                </g>
                {sosOn && (
                  <g>
                    <circle cx={SOS_PT[0]} cy={SOS_PT[1]} r={12 + ring * 46} fill="none" stroke="#e63946" strokeWidth={3 - ring * 2} opacity={1 - ring} />
                    <circle cx={SOS_PT[0]} cy={SOS_PT[1]} r="13" fill="#e63946" />
                    <text x={SOS_PT[0]} y={SOS_PT[1] + 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">SOS</text>
                  </g>
                )}
                {respP > 0 && (
                  <g transform={`translate(${resp[0]} ${resp[1]})`}>
                    <path d="M-11 0 L11 0 L6 7 L-6 7 Z" fill="#ffb703" />
                    <circle cx="0" cy="-6" r="4" fill="#ffb703" />
                  </g>
                )}
                {respP > 0 && <circle cx="100" cy="270" r="8" fill="#ffb703" opacity="0.9" />}
                {respP > 0 && <circle cx="180" cy="225" r="8" fill="#17a398" opacity="0.9" />}
              </g>
              {outro > 0 && (
                <g opacity={outro}>
                  <rect x="30" y="90" width="340" height="160" rx="14" fill="#041c2e" stroke="#17a398" strokeWidth="2" />
                  <text x="200" y="130" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">SafeWaters NG</text>
                  <text x="200" y="158" textAnchor="middle" fontSize="14" fill="#9fd8ff">500 fishers · Lagos Lagoon pilot</text>
                  <text x="200" y="182" textAnchor="middle" fontSize="14" fill="#9fd8ff">₦500/mo co-ops · insurance API</text>
                  <text x="200" y="212" textAnchor="middle" fontSize="14" fill="#ffb703">Lead this frontier. Do not follow it.</text>
                </g>
              )}
            </svg>
            <div className="sub-overlay" style={{ position: "absolute", left: 12, right: 12, bottom: 12, background: "rgba(0,0,0,0.78)", borderRadius: 8, padding: "10px 14px", fontSize: 15, lineHeight: 1.5, textAlign: "center" }}>
              {LINES[sceneIdx].line}
            </div>
          </div>
          <div className="sub-below">{LINES[sceneIdx].line}</div>
          {smsLines.length > 0 && (
            <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
              {smsLines.map((s, k) => (
                <div key={k} style={{ background: "#041c2e", border: "1px solid #1c4a6b", borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>{s}</div>
              ))}
            </div>
          )}
        </div>
        <div className="big-btns" style={{ justifyContent: "center" }}>
          {!playing && t === 0 && <button className="btn" onClick={() => setPlaying(true)}>▶ Play</button>}
          {playing && <button className="btn-ghost" onClick={() => setPlaying(false)}>Pause</button>}
          {!playing && t > 0 && t < T && <button className="btn" onClick={() => setPlaying(true)}>▶ Resume</button>}
          {!playing && t > 0 && <button className="btn-ghost" onClick={() => { setT(0); setPlaying(true); }}>↻ Replay</button>}
          {hasSpeech && <button className="btn-ghost" onClick={toggleVoice}>{voiceOn ? "🔊 Voice on" : "🔇 Voice off"}</button>}
        </div>
        <input type="range" min="0" max={T} step="0.1" value={t} onChange={(e) => { setPlaying(false); setT(Number(e.target.value)); }} style={{ width: "100%" }} />
        <div style={{ textAlign: "center", color: "#8aa5bb", fontSize: 13 }}>{t.toFixed(1)}s / {T}s</div>
      </div>
    </div>
  );
}
