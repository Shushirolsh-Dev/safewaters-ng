"use client";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="nav">
      <div className="nav-inner">
        <a className="brand" href="/"><span className="brand-dot" />SafeWaters NG</a>
        <button className="menu-btn" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? "✕" : "☰"}
        </button>
        <div className={`nav-links${open ? " open" : ""}`}>
          <a href="/trip" onClick={() => setOpen(false)}>Live Trip</a>
          <a href="/map" onClick={() => setOpen(false)}>Incident Map</a>
          <a href="/demo" onClick={() => setOpen(false)}>Film</a>
          <a className="nav-cta" href="/trip" onClick={() => setOpen(false)}>Try SOS Demo</a>
        </div>
      </div>
    </div>
  );
}
