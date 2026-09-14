export type SubstackPost = {
  title: string;
  url: string;
  publishedAt: string; // ISO date
  excerpt: string;
  image?: string;
};

const FEED_URL = "https://marwantosolve.substack.com/feed";

function extract(pattern: RegExp, source: string): string | undefined {
  const match = source.match(pattern);
  if (!match) return undefined;
  return match[1].trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Fetch recent posts from the Substack RSS feed.
 * Returns null (never throws) so a Substack outage can't fail the build —
 * callers render a graceful fallback instead.
 */
export async function getSubstackPosts(
  limit = 10,
): Promise<SubstackPost[] | null> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const xml = await res.text();

    const items = xml
      .split("<item>")
      .slice(1)
      .map((chunk) => chunk.split("</item>")[0]);

    const posts: SubstackPost[] = [];
    for (const item of items) {
      const title = extract(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/, item);
      const url = extract(/<link>([\s\S]*?)<\/link>/, item);
      const pubDate = extract(/<pubDate>([\s\S]*?)<\/pubDate>/, item);
      if (!title || !url || !pubDate) continue;

      const rawDescription =
        extract(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/, item) ?? "";
      const content =
        extract(/<content:encoded>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content:encoded>/, item) ?? "";

      const image =
        extract(/<enclosure[^>]*url="([^"]+)"[^>]*type="image[^"]*"/, item) ??
        extract(/<img[^>]*src="([^"]+)"/, content);

      const excerpt = stripHtml(rawDescription).slice(0, 180).trim();

      posts.push({
        title,
        url,
        publishedAt: new Date(pubDate).toISOString(),
        excerpt: excerpt ? (excerpt + (excerpt.length >= 180 ? "…" : "")) : "",
        image,
      });
      if (posts.length >= limit) break;
    }

    return posts.length > 0 ? posts : null;
  } catch {
    return null;
  }
}
