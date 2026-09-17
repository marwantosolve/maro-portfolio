export type SubstackPost = {
  title: string;
  url: string;
  publishedAt: string; // ISO date
  excerpt: string;
  image?: string;
  categories: string[];
  readingTime: number; // minutes, computed from the article body
};

const FEED_URL = "https://marwantosolve.substack.com/feed";
const WORDS_PER_MINUTE = 200;

function extract(pattern: RegExp, source: string): string | undefined {
  const match = source.match(pattern);
  if (!match) return undefined;
  return match[1].trim();
}

function extractAll(pattern: RegExp, source: string): string[] {
  const out: string[] = [];
  const global = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g");
  let match: RegExpExecArray | null;
  while ((match = global.exec(source)) !== null) {
    const value = match[1].trim();
    if (value) out.push(value);
  }
  return out;
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

      const categories = extractAll(/<category>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/, item)
        .map((c) => c.replace(/\s+/g, " "))
        .filter((c) => c.length > 0 && c.length < 30);

      const wordCount = stripHtml(content).split(" ").filter(Boolean).length;
      const readingTime = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));

      posts.push({
        title,
        url,
        publishedAt: new Date(pubDate).toISOString(),
        excerpt: excerpt ? excerpt + (excerpt.length >= 180 ? "…" : "") : "",
        image,
        categories,
        readingTime,
      });
      if (posts.length >= limit) break;
    }

    return posts.length > 0 ? posts : null;
  } catch {
    return null;
  }
}
