import { useTranslations } from 'next-intl';
import { getBlogPosts } from '../../../lib/blog';
import { BlogPost } from '../../../lib/directus';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const locale = (await params).locale;
  
  return {
    title: 'Blog - URL4IRL',
    description: 'Insights and thoughts on technology that serves humanity.',
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const locale = (await params).locale;
  const t = useTranslations();
  const posts = await getBlogPosts(locale);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6 md:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {t('blog.title', { default: 'Blog' })}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            {t('blog.description', { 
              default: 'Insights and thoughts on technology that serves humanity.' 
            })}
          </p>
        </div>

        {/* Blog Posts */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:gap-12">
            {posts.map((post: BlogPost) => (
              <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date_created)}
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    <Link 
                      href={`/${locale}/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <Link 
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {t('blog.readMore', { default: 'Read more' })}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {t('blog.noPosts', { default: 'No blog posts available yet.' })}
            </p>
          </div>
        )}

        {/* RSS Link */}
        <div className="text-center mt-16">
          <Link 
            href={`/${locale}/blog/rss.xml`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('blog.rss', { default: 'Subscribe to RSS Feed' })}
          </Link>
        </div>
      </div>
    </div>
  );
}