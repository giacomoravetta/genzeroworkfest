import type { APIRoute } from "astro";
import { getProgramData } from "../../lib/notion";

export const GET: APIRoute = async (context) => {
  try {
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

    return new Response(JSON.stringify(programData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching program data:", error);
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
