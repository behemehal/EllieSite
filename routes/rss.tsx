import { Handlers } from "$fresh/server.ts";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";

//Parse key and value seperated by ':'
function parseKeyValue(str: string) {
  const arr = str.toString().split(":");
  return {
    key: arr[0].trim(),
    value: arr[1].trim(),
  };
}

function convertToObject(arr: { [key: string]: string }[]) {
  const obj: { [key: string]: string } = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i].key] = arr[i].value;
  }
  return obj;
}

function whichLineEnding(source: string) {
  const temp = source.indexOf("\n");
  if (source[temp - 1] === "\r") {
    return "\r\n";
  }
  return "\n";
}

interface BlogData {
  title: string;
  description: string;
  publisher: string;
  date: string;
  rendered: string;
  updated_by?: string;
  updated_at?: string;
}

export const handler: Handlers<BlogData> = {
  async GET(_req, ctx) {
    const res = await fetch(
      new Request(
        "https://raw.githubusercontent.com/behemehal/EllieBlog/main/blog.json",
      ),
      {
        method: "GET",
        cache: "no-cache",
      },
    );
    const json = await res.json();

    const blogChannel: any = {
      title: "Ellie Blog",
      link: "https://www.ellie-lang.org/blog",
      description:
        "Ellie is a type-safe programing language that runs on embedded and sandboxed environments. You can read the blog posts about the language here",
      language: "en-us",
      copyright: "Ellie Language GPL-2.0",
      generator: "Ellie Site RSS Generator",
      managingEditor: "ahmetcanco@gmai.com (Ahmetcan Aksu)",
      webMaster: "ahmetcanco@gmail.com (Ahmetcan Aksu)",
      lastBuildDate: new Date().toUTCString(),
      items: [],
    };

    const data = json.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    blogChannel.lastBuildDate = moment(data[0].date).format();

    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      const item = {
        title: post.title.split("@")[0],
        link: `https://www.ellie-lang.org/blog/${
          post.file_name.replace(".md", "")
        }`,
        description: post.description,
        author: "https://github.com/" + post.publisher.replace("@", ""),
        guid: `https://www.ellie-lang.org/blog/${
          post.file_name.replace(".md", "")
        }`,
        pubDate: moment(post.date).format(),
        language: "en-us",
      };
      blogChannel.items.push(item);
    }

    let channels = [
      blogChannel,
      //Releases Channel to be implemented
    ];

    let _channels = "";
    for (let i = 0; i < channels.length; i++) {
      const channel = channels[i];
      let attributes = Object.entries(channel).map(([key, value]) => {
        if (key === "items") {
          return "";
        }
        return `<${key}>${value}</${key}>`;
      }).join("");
      for (let j = 0; j < channel.items.length; j++) {
        const item = channel.items[j];
        const itemAttributes = Object.entries(item).map(([key, value]) => {
          if (key === "guid") {
            return `<guid isPermaLink="false">${value}</guid>`;
          }
          return `<${key}>${value}</${key}>`;
        }).join("");
        attributes += `<item>${itemAttributes}</item>`;
      }

      _channels += `<channel>${attributes}</channel>`;
    }

    const rss_feed =
      `<?xml version="1.0" encoding="UTF-8" ?><rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">${_channels}</rss>`;

    return new Response(rss_feed, {
      headers: {
        "content-type": "xml",
      },
    });
  },
};
