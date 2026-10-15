export default function Home() {
  return (
    <div>
      <div className="hero">
        <span className="pill">NIMASA NATIONAL INNOVATION HACKATHON 2026</span>
        <h1>200,000+ boats are <span>invisible.</span> We make them seen.</h1>
        <p className="sub">
          SafeWaters NG is a phone-GPS safety net for artisanal fishers and small-boat operators.
          No hardware. Works offline. One-tap SOS by SMS.
        </p>
        <div className="btn-row">
          <a className="btn" href="/trip">Try the live SOS demo</a>
          <a className="btn-ghost" href="/demo">Watch 45-sec demo</a>
        </div>
        <div className="stats">
          <div className="stat"><b>200k+</b><span>small boats invisible to AIS</span></div>
          <div className="stat"><b>3 tracks</b><span>safety · fisheries · ocean data</span></div>
          <div className="stat"><b>₦0</b><span>hardware cost — phone only</span></div>
          <div className="stat"><b>SMS</b><span>SOS fallback, zero data needed</span></div>
        </div>
      </div>

      <div className="section">
        <h2>Demo video</h2>
        <p className="lead">45 seconds: a Makoko fishing trip, an engine failure, an SOS, a rescue map.</p>
        <div className="video-shell">
          <video controls preload="metadata" poster="/demo-poster.svg">
            <source src="/demo.mp4" type="video/mp4" />
          </video>
          <div className="video-cap">
            <span>No MP4 yet — record the interactive demo on your phone and drop it in as <b>public/demo.mp4</b>.</span>
            <a className="btn" href="/demo">Play interactive demo</a>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>The problem NIMASA pays to solve</h2>
        <p className="lead">Deep Blue protects big vessels. Small crafts — where most deaths happen — have nothing.</p>
        <div className="grid3">
          <div className="card"><h3>Capsizes go unreported</h3><p>No AIS, no radio on canoes. Missing boats are noticed hours later, when it is too late.</p></div>
          <div className="card"><h3>Zero trip data</h3><p>Insurers and banks will not serve fishers they cannot see. No data, no loans, no cover.</p></div>
          <div className="card"><h3>Scattered response</h3><p>Incidents live in word-of-mouth. No shared map for cooperatives, patrols or responders.</p></div>
        </div>
      </div>

      <div className="section">
        <h2>How it works</h2>
        <div className="grid3">
          <div className="card"><div className="n">1</div><h3>Start Trip</h3><p>GPS breadcrumbs save on-device every 10 seconds, fully offline. Cheap Android, Pidgin prompts.</p></div>
          <div className="card"><div className="n">2</div><h3>One-tap SOS</h3><p>Emergency sends last GPS fix by data — or by SMS when there is no signal. Queued and retried automatically.</p></div>
          <div className="card"><div className="n">3</div><h3>Shared rescue map</h3><p>SOS, hazards and patrol sightings appear on one community map for cooperatives and responders.</p></div>
        </div>
        <div className="tag-row">
          <span className="tag">Maritime safety, surveillance &amp; security</span>
          <span className="tag">Coastal &amp; artisanal fishing</span>
          <span className="tag">Ocean data &amp; analytics</span>
        </div>
      </div>

      <div className="section">
        <h2>Built to earn, not just to win</h2>
        <div className="grid3">
          <div className="card"><h3>₦500/mo cooperatives</h3><p>Fleet dashboard, member trips, incident history for fishing cooperatives.</p></div>
          <div className="card"><h3>Insurance API</h3><p>Verified trip data insurers can price micro-cover against. Revenue share per policy.</p></div>
          <div className="card"><h3>Responder + SMS layer</h3><p>Paid alert routing for private responders, plus Termii SMS margin at scale.</p></div>
        </div>
      </div>

      <div className="section">
        <div className="panel">
          <h2 style={{ marginTop: 0 }}>Pilot: 500 fishers, Lagos Lagoon</h2>
          <p className="lead">Makoko → Badagry → Epe. One cooperative, one responder partner, 90 days. Success = 2,000 logged trips, SOS response under 30 minutes.</p>
          <div className="btn-row" style={{ justifyContent: "flex-start" }}>
            <a className="btn" href="/trip">Run the demo judges will run</a>
            <a className="btn-ghost" href="/map">See the incident map</a>
          </div>
        </div>
      </div>
    </div>
  );
}
