# Changelog

All notable changes to Passporto are documented here.

## 2.0.0 - 2026-11-03

- Redesigned the theme with square corners, quieter metadata, and Instrument Sans body text alongside Marcellus.
- Added a deep sea-green brand colour for dark sections, the footer, and primary buttons.
- The header is transparent at the top of the page, hides on scroll down, and returns on scroll up.
- The homepage hero features the newest post marked `featured: true`.
- Added homepage sections: destination tiles, latest stories, reading by section, featured stories, and the writers.
- Search shows results only once you type.
- Post galleries and destination photo essays show every photo in justified rows.
- Added MDX support for posts and a `<Gallery />` tag that places a post's gallery anywhere in the text.
- Added wide figures and list styles to article prose.
- Added a share card with native mobile sharing and an author card to the end of every post.
- Redesigned destination guides with a sticky section nav, an at-a-glance panel, essentials cards, a day-by-day timeline, and practical cards.
- Redesigned the guides index.
- The journal section filter can be linked with `?category=`.
- The footer holds the newsletter sign-up and social icons.
- Expanded the Lisbon demo post with lists, a wide photo, and five gallery photos.
- `coords` is optional in destination frontmatter.

## 1.3.1 - 2026-10-21

- Updated Astro to 7.4.1 and other dependencies.
- Updated `AGENTS.md` for Astro 7.
- Files check out with LF line endings on every platform.
- Added the build command to `wrangler.jsonc`.

## 1.3.0 - 2026-08-04

- Added "Load more" pagination to author profile pages, matching the journal archive by showing six stories at a time and only rendering the button when a writer has more.
- Tightened the article header metadata by reducing its size and letter spacing, and stacked the date, reading time, and location on a single line beneath the category eyebrow on mobile.
- Rebuilt search as a command palette: a native `dialog` with a blurred backdrop, a resting "Latest stories" list, a live result summary, arrow-key navigation, a designed empty state, and keyboard hints in the footer. `Cmd/Ctrl+K` and `/` open it.
- Trimmed the palette result rows on small screens to the category alone, restoring the location and date from the `sm` breakpoint up, and stopped long titles from scrolling the list sideways.
- Added ranked search matching that requires every typed word and orders results by title prefix, title, label, then supporting copy, so multi-word queries narrow instead of widening.
- Added a `/search/` page for the full archive, reachable by pressing Enter in the palette. It rests on the field alone and reveals ranked results as you type or from `?q=`. Every entry is still rendered server-side, so the archive stays browsable without JavaScript, and the page stays out of the sitemap.
- Moved the search index to `/search-index.json`, fetched on first use, so growing the archive no longer inflates every page of the site.
- Simplified the "On the ground" panel on destination guides to the numbered list alone, dropping the coordinates line, the north and field-checked footer, and its divider.

## 1.2.0 - 2026-08-04

- Capped the search dialog at eight results and added a match counter when a query returns more, so opening search no longer renders the entire index.
- Split search result metadata into a category and a location field, keeping the label row on a single line on small screens and restoring the full location from the `sm` breakpoint up.
- Moved the search button into the mobile header and removed the duplicate search entry from the navigation drawer.
- Rewrote `AGENTS.md` as a scoped agent guide covering change discipline, Astro implementation, accessibility, SEO, media, performance, security, and a verification checklist.

## 1.1.0 - 2026-07-27

- Improved the mobile navigation drawer accessibility tree by using compatible dialog markup, hiding the closed drawer from assistive technology, trapping focus while open, and restoring focus on close.
- Increased post-card reading-time legibility on mobile while keeping the metadata visually quiet.
- Replaced manual `readMinutes` post frontmatter with automatic reading-time calculation from each post's markdown body.
- Updated Astro and related build dependencies, including `astro` 7.1.3, `@astrojs/markdown-remark` 7.2.1, `@astrojs/check` 0.9.9, and `sharp` 0.35.3.

## 1.0.0 - 2026-07-09

- Initial commercial release.
- Added Astro 7 templates for home, journal index/archive, article, destination guides, guides index, writers index/profile, about, contact, colophon, RSS, robots, sitemap, and 404 pages.
- Added typed content collections for posts, destinations, and authors, with credited local imagery.
- Added SEO metadata, canonical URLs, Open Graph, Twitter/X cards, and JSON-LD.
- Added an accessible mobile navigation drawer, category-filtered journal archive, paginated photo galleries with a lightbox, and provider-neutral newsletter configuration.
- Added responsive Astro image handling for covers, galleries, photo essays, and avatars.
