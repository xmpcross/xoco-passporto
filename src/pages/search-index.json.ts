import type { APIRoute } from "astro";
import { buildSearchIndex } from "@/lib/search-index";

/**
 * The search index as a separate document so the header palette does not
 * inline the whole archive into every page. Fetched on first use.
 */
export const GET: APIRoute = async () => {
  const index = await buildSearchIndex();

  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};
