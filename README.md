# SafeWaters NG

Phone-GPS safety net for small boats + artisanal fishers. Built for NIMASA Hackathon 2026.

Founder: Osun-based, solo. Pilot: Lagos Lagoon (Makoko / Badagry / Epe).

## Tracks
- Maritime safety, surveillance and security (primary)
- Coastal and artisanal fishing
- Ocean data and analytics

## Run it
```cmd
npm.cmd install
npm.cmd run dev
```
Open http://localhost:3000/trip for GPS trip demo, /map for incident map.

No API keys needed for MVP. SOS `/api/sos` is a stub — wire Termii with `TERMII_API_KEY` for prod.

## Why it wins
Small crafts are invisible to AIS. NIMASA Deep Blue covers big vessels. SafeWaters covers the last mile: trip breadcrumbs + SOS + community hazards, all from a cheap Android, offline-first, SMS fallback.
