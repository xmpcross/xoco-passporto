import { getCollection } from "astro:content";
import { destinationHref, formatDate, postHref, visiblePosts } from "@/lib/content";
import type { SearchItem } from "@/lib/search";

/**
 * The searchable index: published journal entries newest first, then the
 * destination guides. Served from `/search-index.json` for the header palette
 * and inlined by the `/search/` page.
 */
export const buildSearchIndex = async (): Promise<SearchItem[]> => {
  const [posts, destinations, authors] = await Promise.all([
    getCollection("posts"),
    getCollection("destinations"),
    getCollection("authors"),
  ]);
  const authorNames = new Map(authors.map((author) => [author.id, author.data.name]));

  return [
    ...visiblePosts(posts).map((post) => ({
      type: "Journal" as const,
      title: post.data.title,
      excerpt: post.data.dek,
      meta: [post.data.category, post.data.location, formatDate(post.data.date)],
      keywords: authorNames.get(post.data.author.id) ?? "",
      href: postHref(post),
    })),
    ...destinations.map((destination) => ({
      type: "Guide" as const,
      title: `${destination.data.name}, ${destination.data.country}`,
      excerpt: destination.data.tagline,
      meta: [destination.data.country],
      keywords: [
        destination.data.intro,
        destination.data.bestTime,
        ...destination.data.things,
      ].join(" "),
      href: destinationHref(destination),
    })),
  ];
};
