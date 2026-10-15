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
      map = new maplibregl.Map({
        container: ref.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [3.4, 6.45],
        zoom: 10,
      });
      incidents.forEach((i) => {
        new maplibregl.Marker({ color: i.type === "sos" ? "red" : i.type === "hazard" ? "orange" : "blue" })
          .setLngLat([i.lng, i.lat])
          .setPopup(new maplibregl.Popup().setText(`${i.type}: ${i.note}`))
          .addTo(map);
      });
    })();
    return () => map && map.remove();
  }, []);

  return (
    <div>
      <h2>Lagos Lagoon - Live Incident Map (mock)</h2>
      <div ref={ref} style={{ height: 420, borderRadius: 12, overflow: "hidden" }} />
      <ul>
        {incidents.map((i) => (
          <li key={i.id}>{i.type} - {i.note} ({i.lat.toFixed(3)}, {i.lng.toFixed(3)})</li>
        ))}
      </ul>
    </div>
  );
}
