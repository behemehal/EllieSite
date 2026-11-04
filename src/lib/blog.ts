const BLOG_BASE = "https://raw.githubusercontent.com/behemehal/EllieBlog/main";

export interface BlogPostMeta {
  id: string;
  title: string;
  publisher: string;
  description: string;
  date: string;
  file_name: string;
  updated_at?: string;
  updated_by?: string;
}

/** Fetch the blog index, newest first. */
export async function fetchBlogIndex(): Promise<BlogPostMeta[]> {
  const res = await fetch(`${BLOG_BASE}/blog.json`, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Failed to fetch blog index: ${res.status}`);
  }
  const posts = (await res.json()) as BlogPostMeta[];
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Fetch the raw markdown for a single post, or `null` if it does not exist. */
export async function fetchBlogPostSource(name: string): Promise<string | null> {
  const file = name.endsWith(".md") ? name : `${name}.md`;
  const res = await fetch(`${BLOG_BASE}/blogs/${encodeURIComponent(file)}`);
  const text = await res.text();
  if (!res.ok || text.trim() === "404: Not Found") {
    return null;
  }
  return text;
}

export interface ParsedBlogPost {
  meta: Record<string, string>;
  body: string;
}

/**
 * Split a post file into its front-matter block and markdown body.
 * The files use a fixed layout: a `---` fence, six `key: value` lines,
 * a closing `---`, then the markdown. Values are split on the first colon
 * only so timestamps and URLs survive intact.
 */
export function parseBlogPost(source: string): ParsedBlogPost {
  const lineEnding = source.includes("\r\n") ? "\r\n" : "\n";
  const lines = source.split(lineEnding);
  const frontMatter = lines.slice(1, 7);
  const body = lines.slice(8).join(lineEnding);

  const meta: Record<string, string> = {};
  for (const line of frontMatter) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }

  return { meta, body };
}

/** Titles are stored as `Human title@<timestamp>`; strip the suffix. */
export function cleanTitle(title: string): string {
  return title.split("@")[0];
}

/** GitHub handle without the leading `@`. */
export function githubHandle(publisher: string): string {
  return (publisher ?? "").replace(/^@/, "");
}

/** A truthy update marker (the source stores the string "false" when absent). */
export function hasValue(value?: string): boolean {
  return !!value && value !== "false";
}

/** Format an ISO date as `DD.MM.YYYY HH:mm` in UTC. */
export function formatDateTime(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}.${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

/** Escape a string for safe inclusion in XML/HTML text nodes and attributes. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
