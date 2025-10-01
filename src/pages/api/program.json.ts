import type { APIRoute } from "astro";
import { getProgramData } from "../../lib/notion";

export const GET: APIRoute = async () => {
  try {
    const programSections = await getProgramData();

    return new Response(JSON.stringify(programSections), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
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
