"use client";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  { t: "6:04 AM — Makoko, Lagos Lagoon", h: "Musa starts his trip", c: "One tap. GPS breadcrumbs start saving on-device — no network needed, no hardware, no AIS.", dots: 0, sos: false, pin: false },
  { t: "6:20 AM — mid-lagoon, zero bars", h: "Still logging, fully offline", c: "Every fix is stored on the phone. 40 breadcrumbs banked before anything goes wrong.", dots: 5, sos: false, pin: false },
  { t: "6:41 AM — engine failure", h: "One-tap SOS", c: "Musa hits SOS. Last GPS fix queues instantly — sent by data, or by SMS when there is no signal.", dots: 8, sos: true, pin: false },
  { t: "6:43 AM — the shared map", h: "Everyone sees the red pin", c: "Cooperative, nearby boats and responders see SOS + live position. Closest canoe diverts. Response, not rumour.", dots: 8, sos: true, pin: true },
  { t: "The business", h: "Every trip is data that earns", c: "Cooperatives pay ₦500/mo for the fleet dashboard. Insurers price cover off verified trips. Pilot: 500 fishers, Lagos Lagoon.", dots: 8, sos: true, pin: true },
];

const DOTS = [
  [60, 300], [100, 270], [140, 250], [180, 225], [220, 205], [260, 185], [300, 165], [340, 150],
];

export default function DemoPage() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);
  const step = STEPS[i];

  useEffect(() => () => clearInterval(timer.current), []);
  const play = () => {
    setPlaying(true);
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setI((v) => {
        if (v >= STEPS.length - 1) { clearInterval(timer.current); setPlaying(false); return v; }
        return v + 1;
      });
    }, 4500);
  };
  const replay = () => { setI(0); play(); };

  return (
    <div className="section">
      <span className="pill">45-SECOND VIDEO DEMO</span>
      <h2>Press play. Screen-record it. Submit it.</h2>
      <p className="lead">This plays like the video judges watch. Record your screen while it runs, save as <b>public/demo.mp4</b>, and the homepage player picks it up automatically.</p>
      <div className="player">
        <div className="phone">
          <div className="progress"><i style={{ width: `${((i + 1) / STEPS.length) * 100}%` }} /></div>
          <div className="phone-screen">
            <div style={{ fontSize: 13, color: "#8aa5bb" }}>{step.t}</div>
            <h3>{step.h}</h3>
            <svg viewBox="0 0 400 340" style={{ width: "100%", background: "#06283d", borderRadius: 12, border: "1px solid #1c4a6b" }}>
              <path d="M20 300 Q120 260 180 210 T360 120" stroke="#1c4a6b" strokeWidth="3" fill="none" strokeDasharray="8 6" />
              {DOTS.slice(0, step.dots).map((d, k) => (<circle className="route-dot" key={k} cx={d[0]} cy={d[1]} r="7" fill="#17a398" />))}
              {step.sos && (<g><circle cx="340" cy="150" r="16" fill="#e63946"><animate attributeName="r" values="12;20;12" dur="1.2s" repeatCount="indefinite" /></circle><text x="340" y="156" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">SOS</text></g>)}
              {step.pin && (<g><circle cx="100" cy="270" r="9" fill="#ffb703" /><circle cx="260" cy="185" r="9" fill="#ffb703" /><circle cx="180" cy="225" r="9" fill="#17a398" /></g>)}
              <text x="40" y="325" fontSize="13" fill="#8aa5bb">Makoko</text>
              <text x="300" y="110" fontSize="13" fill="#8aa5bb">Epe channel</text>
            </svg>
            <p className="cap">{step.c}</p>
          </div>
        </div>
        <div className="big-btns" style={{ justifyContent: "center" }}>
          {!playing && i === 0 && <button className="btn" onClick={play}>▶ Play demo</button>}
          {playing && <button className="btn-ghost" onClick={() => { clearInterval(timer.current); setPlaying(false); }}>Pause</button>}
          {!playing && i > 0 && <button className="btn" onClick={replay}>↻ Replay</button>}
          {!playing && i > 0 && i < STEPS.length - 1 && <button className="btn" onClick={play}>▶ Resume</button>}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {STEPS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} style={{ width: 12, height: 12, borderRadius: "50%", border: 0, cursor: "pointer", background: k === i ? "#e63946" : "#1c4a6b" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
