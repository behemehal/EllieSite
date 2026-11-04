import type { APIRoute } from "astro";
import { fetchBlogIndex, cleanTitle, escapeXml } from "../lib/blog";

export const prerender = false;

const SITE = "https://www.ellie-lang.org";

export const GET: APIRoute = async () => {
  const posts = await fetchBlogIndex();

  const lastBuildDate = posts.length
    ? new Date(posts[0].date).toUTCString()
    : new Date(0).toUTCString();

  const items = posts
    .map((post) => {
      const link = `${SITE}/blog/${post.file_name.replace(".md", "")}`;
      const author = `https://github.com/${post.publisher.replace(/^@/, "")}`;
      return [
        "<item>",
        `<title>${escapeXml(cleanTitle(post.title))}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<author>${escapeXml(author)}</author>`,
        `<guid isPermaLink="false">${escapeXml(link)}</guid>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        "<language>en-us</language>",
        "</item>",
      ].join("");
    })
    .join("");

  const channel = [
    `<title>Ellie Blog</title>`,
    `<link>${SITE}/blog</link>`,
    `<description>Ellie is a type-safe programing language that runs on embedded and sandboxed environments. You can read the blog posts about the language here</description>`,
    `<language>en-us</language>`,
    `<copyright>Ellie Language GPL-2.0</copyright>`,
    `<generator>Ellie Site RSS Generator</generator>`,
    `<managingEditor>ahmetcanco@gmail.com (Ahmetcan Aksu)</managingEditor>`,
    `<webMaster>ahmetcanco@gmail.com (Ahmetcan Aksu)</webMaster>`,
    `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    items,
  ].join("");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?><rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0"><channel>${channel}</channel></rss>`;

  return new Response(feed, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
