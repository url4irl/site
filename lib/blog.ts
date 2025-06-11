/* eslint-disable @typescript-eslint/no-explicit-any */
import { directus, BlogPost } from "./directus";
import { readItems } from "@directus/sdk";

export async function getBlogPosts(locale?: string): Promise<BlogPost[]> {
  try {
    const posts = await directus.request(
      readItems("blog_posts", {
        filter: {
          status: { _eq: "published" },
          ...(locale && { locale: { _eq: locale } }),
        },
        sort: ["-date_created"],
        fields: [
          "id",
          "title",
          "slug",
          "excerpt",
          "featured_image",
          "author",
          "date_created",
          "date_updated",
          "locale",
        ],
      })
    );
    return posts as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(
  slug: string,
  locale?: string
): Promise<BlogPost | null> {
  try {
    const posts = await directus.request(
      readItems("blog_posts", {
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
          ...(locale && { locale: { _eq: locale } }),
        },
        limit: 1,
        fields: [
          "id",
          "title",
          "slug",
          "content",
          "excerpt",
          "featured_image",
          "author",
          "date_created",
          "date_updated",
          "locale",
        ],
      })
    );

    return posts.length > 0 ? (posts[0] as BlogPost) : null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getBlogPostSlugs(locale?: string): Promise<string[]> {
  try {
    const posts = await directus.request(
      readItems("blog_posts", {
        filter: {
          status: { _eq: "published" },
          ...(locale && { locale: { _eq: locale } }),
        },
        fields: ["slug"],
      })
    );
    return posts.map((post: any) => post.slug);
  } catch (error) {
    console.error("Error fetching blog post slugs:", error);
    return [];
  }
}
