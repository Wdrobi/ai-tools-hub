import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, hasSupabase } from "@/lib/supabase";
import { getToolBySlug } from "@/lib/queries";
import { siteUrl } from "@/lib/utils";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fallbackTool = await getToolBySlug(slug);
  let toolId: string | undefined = fallbackTool?.id;
  let websiteUrl: string | undefined = fallbackTool?.website_url;
  let affiliateUrl: string | null | undefined = fallbackTool?.affiliate_url;

  if (hasSupabase) {
    try {
      const { data } = await getAdminDb().from("tools").select("id,website_url,affiliate_url").eq("slug", slug).eq("status", "published").maybeSingle();
      if (data) { toolId = data.id; websiteUrl = data.website_url; affiliateUrl = data.affiliate_url; }
    } catch {}
  }

  const destination = affiliateUrl || websiteUrl;
  if (!destination) return NextResponse.redirect(siteUrl("/tools"), 302);
  // Never redirect to non-HTTPS or malformed destinations, even if a bad value enters the DB.
  try { if (new URL(destination).protocol !== "https:") return NextResponse.redirect(siteUrl("/tools"), 302); }
  catch { return NextResponse.redirect(siteUrl("/tools"), 302); }

  try {
    if (hasSupabase) {
      await getAdminDb().from("click_events").insert({
        tool_id: toolId || null, tool_slug: slug,
        referrer: request.headers.get("referer"),
        user_agent: request.headers.get("user-agent")?.slice(0, 300) || null
      });
    }
  } catch {}

  const response = NextResponse.redirect(destination, 302);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
