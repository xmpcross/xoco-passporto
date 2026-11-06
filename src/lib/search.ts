/**
 * Shared search model and ranking for the header command palette and the
 * `/search/` page.
 *
 * This module runs in the browser, so it must stay free of `astro:content`
 * imports. The index itself is built in `search-index.ts`.
 */

/** Most rows the command palette shows for a query, before "search all". */
export const PALETTE_LIMIT = 7;

export interface SearchItem {
  /** Result kind, shown as the first label on a result row. */
  type: "Journal" | "Guide";
  title: string;
  excerpt: string;
  /** Labels shown under the title (category, place, date). Also searchable. */
  meta: string[];
  /** Supporting text that is searchable but never displayed. */
  keywords: string;
  href: string;
}

/**
 * Match tier for a single term, lower being better: a title prefix beats a
 * title match, which beats a label match, which beats the supporting copy.
 * `Infinity` means the term is absent, which disqualifies the item.
 */
const rankTerm = (item: SearchItem, term: string) => {
  const title = item.title.toLowerCase();
  if (title.startsWith(term)) return 0;
  if (title.includes(term)) return 1;
  if (`${item.type} ${item.meta.join(" ")}`.toLowerCase().includes(term)) return 2;
  if (`${item.excerpt} ${item.keywords}`.toLowerCase().includes(term)) return 3;
  return Number.POSITIVE_INFINITY;
};

/**
 * Positions of the items that match every term in `query`, best match first.
 * Requiring all terms means "kyoto food" narrows the list instead of widening
 * it. Equal ranks keep index order, which is newest first.
 *
 * An empty query matches everything in index order.
 */
export const rankedPositions = (items: SearchItem[], query: string) => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return items.map((_, position) => position);

  return items
    .map((item, position) => ({
      position,
      rank: terms.reduce((total, term) => total + rankTerm(item, term), 0) / terms.length,
    }))
    .filter(({ rank }) => Number.isFinite(rank))
    .sort((a, b) => a.rank - b.rank)
    .map(({ position }) => position);
};

/** Matching items, best match first. */
export const searchItems = (items: SearchItem[], query: string) =>
  rankedPositions(items, query).map((position) => items[position]);

export const resultCount = (count: number) => `${count} ${count === 1 ? "result" : "results"}`;
