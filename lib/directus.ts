import { createDirectus, rest, graphql } from '@directus/sdk';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author?: string;
  date_created: string;
  date_updated: string;
  status: 'published' | 'draft' | 'archived';
  locale?: string;
  translations?: BlogPost[];
}

interface DirectusSchema {
  blog_posts: BlogPost[];
}

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

export const directus = createDirectus<DirectusSchema>(directusUrl)
  .with(rest())
  .with(graphql());

export type { BlogPost, DirectusSchema };