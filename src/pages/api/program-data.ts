import type { APIRoute } from "astro";
import { getProgramData } from "../../lib/notion";

export const GET: APIRoute = async (context) => {
  try {
    console.log("🌐 [API] Request received at:", new Date().toISOString());
    const { env } = (context.locals as any).runtime || { env: {} };

    if (!env.NOTION_API_KEY || !env.NOTION_DATABASE_ID) {
      return new Response(
        JSON.stringify({ error: "Notion API not configured" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const programData = await getProgramData(env);
    console.log(
      "🌐 [API] Data fetched successfully. Sections:",
      programData.length,
    );
    if (programData.length > 0) {
      console.log("🌐 [API] First section:", programData[0]?.title);
    }

    return new Response(JSON.stringify(programData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        Pragma: "no-cache",
        Expires: "0",
        "CDN-Cache-Control": "no-store",
        "Cloudflare-CDN-Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("❌ [API] Error fetching program data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch program data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
