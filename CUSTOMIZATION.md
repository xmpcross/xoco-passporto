# Customization Guide

Use this guide when adapting Passporto for a real publication.

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the site name, tagline, default metadata, canonical domain, contact email, social links, newsletter form settings, and the primary navigation.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, and the sitemap all depend on it.

## Categories

Post categories live in one place: [src/config/categories.ts](./src/config/categories.ts). Add, remove, or rename categories there, then update existing post frontmatter so every `category` value still matches the allowed list. Categories drive the section filter on the journal index ([src/pages/blog/index.astro](./src/pages/blog/index.astro)). Link to a filtered view with `/blog/?category=Food`; the homepage section tiles and the category tag on each post already do.

Post reading time is calculated automatically from each markdown body in [src/lib/content.ts](./src/lib/content.ts). Do not add a `readMinutes` field to post frontmatter unless you also change the schema and display helpers.

## Newsletter

The newsletter form is intentionally provider-neutral. Configure it in `siteConfig.newsletter`:

```ts
newsletter: {
  action: "https://example.com/newsletter",
  method: "post",
  emailFieldName: "email",
}
```

Leave `action` empty while the form is only a visual confirmation (the default: submitting swaps the button label but sends nothing). Set `action` to POST to your provider — the form will submit there and still show the same confirmation state. [src/components/Newsletter.astro](./src/components/Newsletter.astro) has three variants: `footer` (the sign-up in the site footer, shown on every page), `stacked`, and `inline`.

## Images and Credits

Posts, destinations, and authors keep images (and destination videos) next to their `index.md`. Every image object, and the destination `video` block itself, carries `creditName` and `creditUrl` frontmatter fields — the theme renders a small credit line under post covers, gallery photos (via the lightbox caption), destination photo essays, and destination videos. Keep this pattern for any new imagery or footage, especially if you keep Unsplash photos or Pexels videos, which require attribution under their respective licenses.

Astro optimizes every content-collection image responsively at build time via Sharp — you don't need to pre-resize source files, but keep them reasonably sized before committing.

## Destination Guide Video

Destination guides can include a `video` block (`src`, `creditName`, `creditUrl`, `poster`, `caption`) rendered by [src/components/VideoPlayer.astro](./src/components/VideoPlayer.astro). The demo destinations ship with real, credited stock footage (from Pexels) colocated with each destination's `index.md` — the same pattern as cover and gallery images.

Video files are plain strings in the schema (`z.string()`), not Astro's `image()` helper, because Astro only optimizes actual images. To keep a video local to its destination folder and have it actually served, [src/pages/destinations/[slug].astro](./src/pages/destinations/[slug].astro) resolves `video.src` at build time with a Vite `import.meta.glob` over `src/content/destinations/*/*.mp4`. Practically, this means:

- Drop your `.mp4` file directly in the destination's own folder (e.g. `src/content/destinations/kyoto/trailer.mp4`).
- Set `video.src` to a relative filename (e.g. `"./trailer.mp4"`) — it must live in that same destination's folder, not a shared or top-level location.
- Update `video.creditName`/`video.creditUrl` to match the new footage's source.

Delete the `video` field from a destination's frontmatter to hide the section entirely (it's conditionally rendered).

## Pages

Core static pages live in [src/pages](./src/pages):

- `about.astro`
- `contact.astro`
- `colophon.astro`

Replace the starter copy with publication-specific masthead, contact, and "how this is made" information.

## Featured Story

Mark posts with `featured: true` in their frontmatter. The newest featured post leads the homepage hero with its cover, category, title, dek, and a link to read it, and it also leads the journal index. Up to three more featured posts appear as cards in the homepage "Featured stories" section, which hides itself when there are none. "Latest stories" skips anything already featured, so no post shows twice. With no featured posts, the hero uses the latest post.

## Photo Gallery

[src/components/PhotoGallery.astro](./src/components/PhotoGallery.astro) shows every photo at once in justified rows: each row runs the full width at one height and each photo keeps its own proportions. Clicking a photo opens a full-screen lightbox (arrow keys, swipe, Escape to close). Pass `caption` to print a line under the set. Without JavaScript the photos fall back to a plain grid.

A post's `gallery` frontmatter renders after the article by default. To place it inside the story, name the post `index.mdx` and put `<Gallery />` on its own line where it should appear, as the Lisbon demo post does. The tag takes no props: the photos, captions, and credits still come from the frontmatter, and the set breaks out wider than the text column. Plain `.md` posts keep the gallery at the end.

For a single wide photo inside the text, in `.md` or `.mdx`:

```md
<figure class="wide">

![Alt text](./photo.jpg)

<figcaption>Caption. Photo: Name / Unsplash</figcaption>
</figure>
```

## Sharing

[src/components/ShareCard.astro](./src/components/ShareCard.astro) closes every story. Its Share button opens the device's own share sheet where the browser offers one (phones, mostly) and [src/components/ShareSheet.astro](./src/components/ShareSheet.astro) everywhere else. Edit the `targets` lists in `ShareSheet.astro` to add or remove services; icons live in [src/icons/bootstrap](./src/icons/bootstrap) and are registered in [src/components/LocalIcon.astro](./src/components/LocalIcon.astro).

## Footer

[src/components/SiteFooter.astro](./src/components/SiteFooter.astro) holds the link columns, the newsletter sign-up, and the social icons. Social links come from `siteConfig.socials`; each entry has a `label`, an `href`, and an `icon` named in [src/components/LocalIcon.astro](./src/components/LocalIcon.astro). To add a network without an icon yet, drop its Bootstrap Icons SVG into `src/icons/bootstrap` and register it there.

## Header

[src/components/SiteHeader.astro](./src/components/SiteHeader.astro) is transparent at the top of the page, turns solid once you scroll, hides while scrolling down, and returns on scroll up. Pages that open on a full-bleed image pass `overlay` so the header starts with light text over the photo; other pages get a spacer so content starts below it.

## Theme Tokens

Global colors, typography, borders, focus styles, and motion rules live in [src/styles/global.css](./src/styles/global.css). Prefer editing tokens near the top of that file before changing individual components. Colors are defined in OKLCH; a `.dark` class-based dark palette is defined in the tokens but not wired to a UI toggle by default.

Body text uses Instrument Sans and headings use Marcellus, both self-hosted from `public/fonts` and declared at the top of `global.css`. The `deep` and `on-deep` tokens colour the footer, the dark homepage and guide bands, and primary buttons. The `meta`, `tag`, and `btn` utilities in the same file set the small metadata text, category tags, and buttons used across the theme.
