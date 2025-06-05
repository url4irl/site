import { getBlogPosts } from '../../../../lib/blog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const locale = (await params).locale;
  const posts = await getBlogPosts(locale);
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>URL4IRL Blog</title>
    <description>Insights and thoughts on technology that serves humanity.</description>
    <link>${baseUrl}/${locale}/blog</link>
    <atom:link href="${baseUrl}/${locale}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <link>${baseUrl}/${locale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${locale}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date_created).toUTCString()}</pubDate>
      ${post.author ? `<author>${post.author}</author>` : ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}