import "./globals.css";

export const metadata = {
  title: "SafeWaters NG - Small-craft safety for Nigeria",
  description: "Phone-GPS safety net for artisanal fishers and boat operators. NIMASA Hackathon 2026.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06283d" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="nav">
          <div className="nav-inner">
            <a className="brand" href="/"><span className="brand-dot" />SafeWaters NG</a>
            <div className="nav-links">
              <a href="/trip">Live Trip</a>
              <a href="/map">Incident Map</a>
              <a href="/demo">Video Demo</a>
              <a className="nav-cta" href="/trip">Try SOS Demo</a>
            </div>
          </div>
        </div>
        <div className="wrap">{children}</div>
        <div className="wrap">
          <div className="footer">
            SafeWaters NG — built for NIMASA National Innovation Hackathon 2026 · Tracks: Safety &amp; Surveillance, Artisanal Fishing, Ocean Data · Pilot: Lagos Lagoon
          </div>
        </div>
      </body>
    </html>
  );
}
