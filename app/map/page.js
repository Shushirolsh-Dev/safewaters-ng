"use client";
import { useEffect, useRef } from "react";
import incidents from "../../data/mock-incidents.json";

export default function MapPage() {
  const ref = useRef(null);
  useEffect(() => {
    let map;
    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      await import("maplibre-gl/dist/maplibre-gl.css");
      map = new maplibregl.Map({ container: ref.current, style: "https://demotiles.maplibre.org/style.json", center: [3.42, 6.45], zoom: 10 });
      incidents.forEach((i) => {
        new maplibregl.Marker({ color: i.type === "sos" ? "#e63946" : i.type === "hazard" ? "#ffb703" : "#17a398" })
          .setLngLat([i.lng, i.lat])
          .setPopup(new maplibregl.Popup().setText(`${i.type.toUpperCase()}: ${i.note}`))
          .addTo(map);
      });
    })();
    return () => map && map.remove();
  }, []);
  return (
    <div className="section">
      <span className="pill">SHARED RESCUE MAP</span>
      <h2>Lagos Lagoon — live incidents</h2>
      <p className="lead">One map for fishers, cooperatives, patrols and responders. Mock data for the demo.</p>
      <div className="legend">
        <span>🔴 SOS distress</span><span>🟡 Hazard</span><span>🟢 Patrol sighting</span>
      </div>
      <div className="mapbox" ref={ref} />
      <ul className="inc-list">
        {incidents.map((i) => (<li key={i.id}><b>{i.type.toUpperCase()}</b> — {i.note} <span style={{ color: "#8aa5bb" }}>({i.lat.toFixed(3)}, {i.lng.toFixed(3)})</span></li>))}
      </ul>
    </div>
  );
}
