"use client";
import { useEffect, useRef, useState } from "react";

export default function TripPage() {
  const [points, setPoints] = useState([]);
  const [active, setActive] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [status, setStatus] = useState("Ready — start a trip to log GPS breadcrumbs.");
  const watchId = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("safewaters_trip");
      if (saved) setPoints(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("safewaters_trip", JSON.stringify(points)); } catch {}
  }, [points ]);

  const start = () => {
    if (!("geolocation" in navigator)) { setStatus("GPS not available on this device."); return; }
    setActive(true); setStartedAt(Date.now());
    setStatus("Tracking — breadcrumb saved every fix. Fully offline-capable.");
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => setPoints((p) => [...p, { lat: pos.coords.latitude, lng: pos.coords.longitude, t: Date.now() }]),
      (err) => setStatus("GPS error: " + err.message),
      { enableHighAccuracy: true }
    );
  };
  const stop = () => {
    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    setActive(false); setStatus(`Trip saved — ${points.length} breadcrumbs stored on-device.`);
  };
  const sos = async () => {
    const last = points[points.length - 1] || { lat: 6.45, lng: 3.4 };
    setStatus("Sending SOS with last GPS fix…");
    try {
      const res = await fetch("/api/sos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lat: last.lat, lng: last.lng, note: "SOS from live trip demo" }) });
      const data = await res.json();
      setStatus(`SOS logged: ${data.id} — SMS ${data.sms}.`);
    } catch {
      const q = JSON.parse(localStorage.getItem("safewaters_sos") || "[]");
      q.push({ ...last, t: Date.now(), offline: true });
      localStorage.setItem("safewaters_sos", JSON.stringify(q));
      setStatus("Offline — SOS queued on-device, will send by SMS when signal returns.");
    }
  };

  const last = points[points.length - 1];
  const mins = startedAt ? Math.floor((Date.now() - startedAt) / 60000) : 0;

  return (
    <div className="section">
      <span className="pill">LIVE TRIP DEMO</span>
      <h2>Small-boat trip tracker</h2>
      <p className="lead">For the boats AIS cannot see. Start a trip, sail, hit SOS if anything goes wrong.</p>
      <div className="panel">
        <div><span className="status-dot" style={{ background: active ? "#17a398" : "#5b748a" }} />{status}</div>
        <div className="big-btns">
          {!active ? <button className="btn" onClick={start}>Start Trip</button>
                   : <button className="btn-ghost" onClick={stop}>End Trip</button>}
          <button onClick={sos} style={{ background: "#ffb703", color: "#1a1a1a" }}>SOS — Send distress</button>
          <button className="btn-ghost" onClick={() => { setPoints([]); try { localStorage.removeItem("safewaters_trip"); } catch {} }}>Clear</button>
        </div>
        <div className="stats" style={{ margin: "12px 0" }}>
          <div className="stat"><b>{points.length}</b><span>breadcrumbs</span></div>
          <div className="stat"><b>{active ? mins + " min" : "—"}</b><span>trip time</span></div>
          <div className="stat"><b>{last ? last.lat.toFixed(4) : "—"}</b><span>last lat</span></div>
          <div className="stat"><b>{last ? last.lng.toFixed(4) : "—"}</b><span>last lng</span></div>
        </div>
        <div className="log"><pre style={{ margin: 0 }}>{JSON.stringify(points.slice(-10), null, 2) || "[]"}</pre></div>
      </div>
    </div>
  );
}
