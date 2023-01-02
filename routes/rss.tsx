/** @jsx h */
import { Handlers } from "$fresh/server.ts";


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
      },
    );
    const json = await res.json();

    let blogChannel = {
      title: "Ellie Blog",
      link: "https://www.ellie-lang.org/blog",
      description: "Ellie is a type-safe programing language that runs on embedded and sandboxed environments. You can read the blog posts about the language here",
      language: "en-us",
      copyright: "Ellie Language GPL-2.0",
      generator: "Ellie Site RSS Generator",
      managingEditor: "ahmetcanco@gmai.com (Ahmetcan Aksu)",
      webMaster: "ahmetcanco@gmail.com (Ahmetcan Aksu)",
      category: "Programming, Technology, Programming Languages, Blog",
      lastBuildDate: new Date().toUTCString(),
      items: [],
    };

    const data = json.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    blogChannel.lastBuildDate = new Date(data[0].date).toUTCString();

    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      let item = {
        title: post.title.split("@")[0],
        link: `https://www.ellie-lang.org/blog/${post.file_name.replace(".md", "")}`,
        description: post.description,
        author: "https://github.com/" + post.publisher.replace("@", ""),
        category: "Programming, Technology, Programming Languages, Blog",
        guid: post.title.split("@")[1],
        pubDate: new Date(post.date).toUTCString(),
        language: "en-us",
      }
      blogChannel.items.push(item);
    }


    let channels = [
      blogChannel,
      //Releases Channel to be implemented
    ];

    let _channels = '';
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
          return `<${key}>${value}</${key}>`;
        }).join("");
        attributes += `<item>${itemAttributes}</item>`;
      }

      _channels += `<channel>${attributes}</channel>`;
    }

    const rss_feed = `<?xml version="1.0" encoding="UTF-8" ?><rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">${_channels}</rss>`;

    return new Response(rss_feed, {
      headers: {
        "content-type": "application/rss+xml; charset=utf-8",
      },
      status: 200,
      statusText: "OK",
    });
  },
};