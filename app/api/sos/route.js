export async function POST(req) {
  const body = await req.json();
  // MVP stub: log SOS, queue Termii/Africa's Talking SMS here.
  // Replace with real SMS provider using TERMII_API_KEY env var.
  const id = "SOS-" + Date.now().toString(36).toUpperCase();
  console.log("SOS received", id, body);
  return Response.json({ ok: true, id, sms: "queued (stub - wire Termii for prod)" });
}
