// City for the live-visitors label. Vercel adds geo headers in production; locally there are none.
// Nothing is stored or logged.
export function GET(request: Request) {
  const raw = request.headers.get("x-vercel-ip-city");
  const city = raw ? decodeURIComponent(raw) : null;
  return Response.json({ city }, { headers: { "Cache-Control": "private, no-store" } });
}
