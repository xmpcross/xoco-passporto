import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;
export type Destination = CollectionEntry<"destinations">;
export type Author = CollectionEntry<"authors">;

export const postSlug = (post: Post) => post.id.replace(/\/index$/, "");
export const postHref = (post: Post) => `/blog/${postSlug(post)}/`;

export const destinationSlug = (destination: Destination) => destination.id.replace(/\/index$/, "");
export const destinationHref = (destination: Destination) =>
  `/destinations/${destinationSlug(destination)}/`;

export const authorSlug = (author: Author) => author.id.replace(/\/index$/, "");
export const authorHref = (author: Author) => `/authors/${authorSlug(author)}/`;

export const byNewest = (a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime();

export const visiblePosts = (posts: Post[]) =>
  posts.filter((post) => !post.data.draft).sort(byNewest);

export const relatedPosts = (posts: Post[], current: Post, limit = 3) =>
  visiblePosts(posts)
    .filter((post) => post.id !== current.id)
    .sort((a, b) => {
      const categoryScore =
        Number(b.data.category === current.data.category) -
        Number(a.data.category === current.data.category);
      return categoryScore || byNewest(a, b);
    })
    .slice(0, limit);

export const postsByAuthor = (posts: Post[], authorId: string) =>
  visiblePosts(posts).filter((post) => post.data.author.id === authorId);

const WORDS_PER_MINUTE = 225;

export const readingMinutes = (post: Post) => {
  const body = typeof post.body === "string" ? post.body : "";
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~[\]()`-]/g, " ");
  const words = text.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g)?.length ?? 0;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
