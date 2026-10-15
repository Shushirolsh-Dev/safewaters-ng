import "./globals.css";
import Nav from "../components/Nav";

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
        <Nav />
        <div className="wrap">{children}</div>
        <div className="wrap">
          <div className="footer">
            SafeWaters NG — NIMASA National Innovation Hackathon 2026 · Safety &amp; Surveillance, Artisanal Fishing, Ocean Data · Pilot: Lagos Lagoon
          </div>
        </div>
      </body>
    </html>
  );
}
