export const siteConfig = {
  name: "Passporto",
  tagline: "A slow-travel journal for people who stay a little longer",
  title: "Passporto — A slow-travel journal by Nora Alviar",
  description:
    "A slow-travel journal of long walks, small towns, and the occasional overnight train. Field notes, city guides, and food essays by Nora Alviar.",
  siteUrl: "https://passporto.xocoweb.workers.dev",
  authorName: "Nora Alviar",
  email: "hello@example.com",
  language: "en",
  locale: "en_US",
  socialImage: "/og-image.jpg",
  newsletter: {
    action: "",
    method: "post",
    emailFieldName: "email",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "Pinterest", href: "https://www.pinterest.com/", icon: "pinterest" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
    { label: "RSS", href: "/rss.xml", icon: "rss" },
  ] as const,
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Journal", href: "/blog/" },
  { label: "Guides", href: "/guides/" },
  { label: "Writers", href: "/authors/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];
