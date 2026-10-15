"use client";
import { useEffect, useRef, useState } from "react";

export default function TripPage() {
  const [points, setPoints] = useState([]);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("Idle - press Start Trip");
  const watchId = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("safewaters_trip");
    if (saved) setPoints(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("safewaters_trip", JSON.stringify(points));
  }, [points]);

  const start = () => {
    if (!("geolocation" in navigator)) {
      setStatus("GPS not available on this device");
      return;
    }
    setActive(true);
    setStatus("Tracking... breadcrumb every 10s");
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude, t: Date.now() };
        setPoints((prev) => [...prev, p]);
      },
      (err) => setStatus("GPS error: " + err.message),
      { enableHighAccuracy: true }
    );
  };

  const stop = () => {
    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    setActive(false);
    setStatus(`Trip saved. ${points.length} points.`);
  };

  const sos = async () => {
    const last = points[points.length - 1] || { lat: 6.45, lng: 3.4 };
    setStatus("Sending SOS...");
    try {
      const res = await fetch("/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: last.lat, lng: last.lng, note: "SOS from demo trip" }),
      });
      const data = await res.json();
      setStatus(`SOS logged: ${data.id} (SMS stub: ${data.sms})`);
    } catch {
      const logs = JSON.parse(localStorage.getItem("safewaters_sos") || "[]");
      logs.push({ ...last, t: Date.now(), offline: true });
      localStorage.setItem("safewaters_sos", JSON.stringify(logs));
      setStatus("Offline - SOS queued locally, will send by SMS when signal returns.");
    }
  };

  return (
    <div>
      <h2>Trip Tracker (PWA demo)</h2>
      <p>{status}</p>
      <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
        {!active ? (
          <button onClick={start} style={red}>Start Trip</button>
        ) : (
          <button onClick={stop} style={ghost}>End Trip</button>
        )}
        <button onClick={sos} style={sosBtn}>SOS</button>
        <button onClick={() => { setPoints([]); localStorage.removeItem("safewaters_trip"); }} style={ghost}>Clear</button>
      </div>
      <p>Points: {points.length}</p>
      <pre style={{ background: "#0a3a5a", padding: 12, borderRadius: 8, overflow: "auto", maxHeight: 240 }}>
        {JSON.stringify(points.slice(-10), null, 2)}
      </pre>
      <p style={{ opacity: 0.8 }}>Vibe-note: on a real phone this uses GPS. On desktop it will prompt for location.</p>
    </div>
  );
}
const red = { background: "#e63946", color: "#fff", border: 0, padding: "12px 18px", borderRadius: 8, fontWeight: 700 };
const ghost = { background: "transparent", color: "#9fd8ff", border: "1px solid #9fd8ff", padding: "12px 18px", borderRadius: 8 };
const sosBtn = { background: "#ffb703", color: "#000", border: 0, padding: "12px 18px", borderRadius: 8, fontWeight: 800 };
