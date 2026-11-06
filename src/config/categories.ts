export const categories = ["Field Notes", "City Guides", "Slow Travel", "Food", "Essays"] as const;

export type Category = (typeof categories)[number];
