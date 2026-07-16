import { NextResponse, type NextRequest } from "next/server";

/**
 * Trackable QR redirect.
 *
 * Printed QR codes point at `https://www.rawlinsic.com/go/<slug>`. This route
 * looks the slug up below, tags the destination with UTM params so Vercel Web
 * Analytics attributes the visit to the QR, and issues a temporary redirect.
 *
 * TO RE-POINT A PRINTED QR CODE: edit the destination in DESTINATIONS below and
 * deploy. The printed code never changes. The redirect is 307 + no-store, so
 * nothing caches the old target — the next scan gets the new destination.
 *
 * TO ADD A NEW CODE: add a line here, deploy, then generate a QR for
 * https://www.rawlinsic.com/go/<your-slug>.
 *
 * Note: /rc/[slug] is a separate, older QR redirect map that does not add UTM
 * tagging. Codes printed against /rc/... still work; new trackable codes should
 * use /go/... instead.
 */
const DESTINATIONS: Record<string, string> = {
  examples: "/automation-ai-examples",
  automation: "/capabilities/technology/automation-integration",
};

/** Where a scan lands when the slug isn't in the map above. */
const FALLBACK = "/";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const key = (slug || "").toLowerCase().trim();
  const destination = DESTINATIONS[key];

  /* Build against the incoming request, so a scan of www.rawlinsic.com stays on
     www rather than bouncing through the apex and losing a hop to analytics. */
  const target = new URL(destination ?? FALLBACK, request.nextUrl.origin);

  /* Only tag real slugs. An unknown code is a fallback to the homepage, not a
     campaign, and tagging it would inflate the QR numbers. */
  if (destination) {
    target.searchParams.set("utm_source", "qr");
    target.searchParams.set("utm_medium", "print");
    target.searchParams.set("utm_campaign", key);
  }

  /* 307, never 308/301: a permanent redirect would be cached by the scanning
     browser and the printed code could never be re-pointed. */
  const response = NextResponse.redirect(target, 307);
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  return response;
}

/* The redirect depends on the request host, so it must never be prerendered
   or cached at the edge. */
export const dynamic = "force-dynamic";
