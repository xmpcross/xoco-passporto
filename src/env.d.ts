declare namespace App {
  interface Locals {
    /** The current post's gallery, read by `<Gallery />` inside MDX. */
    postGallery?: {
      photos: { src: import("astro").ImageMetadata; alt: string; caption?: string }[];
      caption?: string;
    };
  }
}
