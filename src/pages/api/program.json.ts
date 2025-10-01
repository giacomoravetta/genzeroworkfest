import type { APIRoute } from "astro";
import { getProgramData } from "../../lib/notion";

export const GET: APIRoute = async () => {
  try {
    const programSections = await getProgramData();

    return new Response(JSON.stringify(programSections), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
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
