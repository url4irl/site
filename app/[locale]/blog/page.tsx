import { getBlogPosts } from "../../../lib/blog";
import { BlogContainer } from "@/containers/blog";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const locale = (await params).locale;

  console.log("Generating metadata for locale:", locale);

  return {
    title: "Blog - URL4IRL",
    description: "Insights and thoughts on technology that serves humanity.",
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const locale = (await params).locale;
  const posts = await getBlogPosts(locale);

  return <BlogContainer posts={posts} locale={locale} />;
}
