export const metadata = {
  title: "SafeWaters NG - Small-craft safety for Nigeria",
  description: "Phone-GPS safety net for artisanal fishers and boat operators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06283d" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#06283d", color: "#fff" }}>
        <nav style={{ padding: "12px 16px", display: "flex", gap: 16, borderBottom: "1px solid #123" }}>
          <a href="/" style={{ color: "#fff", fontWeight: 800, textDecoration: "none" }}>SafeWaters NG</a>
          <a href="/trip" style={{ color: "#9fd8ff" }}>Trip</a>
          <a href="/map" style={{ color: "#9fd8ff" }}>Live Map</a>
        </nav>
        <main style={{ padding: 16, maxWidth: 720, margin: "0 auto" }}>{children}</main>
      </body>
    </html>
  );
}
