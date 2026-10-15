export default function Home() {
  return (
    <div>
      <h1>SafeWaters NG</h1>
      <p>
        Phone-GPS safety net for 200k+ small boats and artisanal fishers.
        No hardware. Works offline. SOS by SMS.
      </p>
      <ul>
        <li>Tracks: Maritime Safety/Surveillance + Artisanal Fishing + Ocean Data</li>
        <li>Built for NIMASA Hackathon 2026, Osun-based, piloting Lagos Lagoon</li>
      </ul>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <a href="/trip" style={btn}>Start Trip Demo</a>
        <a href="/map" style={btnGhost}>View Incident Map</a>
      </div>
      <h3 style={{ marginTop: 32 }}>Why NIMASA cares</h3>
      <p>
        Small crafts are invisible to AIS. Capsizes and missing boats go unreported.
        SafeWaters creates trip breadcrumbs + community incident reports + SOS
        that feeds NIMASA Deep Blue response and insurer/cooperative dashboards.
      </p>
    </div>
  );
}
const btn = { background: "#e63946", color: "#fff", padding: "12px 18px", borderRadius: 8, textDecoration: "none", fontWeight: 700 };
const btnGhost = { border: "1px solid #9fd8ff", color: "#9fd8ff", padding: "12px 18px", borderRadius: 8, textDecoration: "none" };
