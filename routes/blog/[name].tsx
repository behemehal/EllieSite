/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../islands/Footer.tsx";
import HeadCustom from "../../islands/HeadCustom.tsx";
import {
  Marked,
  Parsed,
  Renderer,
} from "https://deno.land/x/markdown@v2.0.0/mod.ts";
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
        "https://raw.githubusercontent.com/behemehal/EllieBlog/main/blogs/" +
        (ctx.params.name.includes(".md") ? ctx.params.name : ctx.params.name + ".md"),
      ),
      {
        method: "GET",
      },
    );
    const data = await res.text();
    if (data == "404: Not Found") {
      return Response.redirect("https://www.ellie-lang.org/404");
    } else {
      const lineEnding = whichLineEnding(data);
      const lines = data.split(lineEnding);
      const conf = lines.slice(1, 7);
      const md = lines.slice(8);
      const parsedConf = convertToObject(
        conf.map((x) => parseKeyValue(x))
      );

      const renderer = new Renderer();
      renderer.image = (href: string, title: string, text: string) => {
        return `<img src="${href}" alt="${text}" title="${title}" class="img-fluid">`;
      };

      const c = Marked.setOptions({
        langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        renderer,
      });

      const rendered = c.parse(md.join(lineEnding)).content;

      return ctx.render({
        description: parsedConf.description,
        title: parsedConf.title,
        date: parsedConf.date,
        publisher: parsedConf.publisher,
        rendered,
      });
    }
  },
};

export default function BlogPage(props: PageProps<BlogData>) {
  return (
    <body>
      <HeadCustom
        title={props.data.title}
        description={props.data.description}
        url={`https://www.ellie-lang.org/blog/${props.params.name}`}
      />
      <Header isDark />
      <main>
        <section className="section dark-section">
          <br />
          <h1 className="text-left">
            {props.data.title.split("@")[0]}
          </h1>
        </section>
        <section
          className="theme-section"
          style={{ "padding": "3rem", minHeight: 500 }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: props.data.rendered,
            }}
          />
          <div style="text-align: right;">
            <a
              style="text-align: right;"
              href={`https://github.com/${props.data.publisher}`}
            >
              Created by @ahmtcn123
            </a>
            <p style="text-align: right;">
              Created at {props.data.date}
            </p>
          </div>
          {(!!props.data.updated_at && !!props.data.updated_by) && (
            <div style="text-align: right;">
              <a
                style="text-align: right;"
                href={`https://github.com/${props.data.updated_by}`}
              >
                Updated by @ahmtcn123
              </a>
              <p style="text-align: right;">
                Updated at{" " + props.data.updated_at}
              </p>
            </div>
          )}
        </section>
        <section className="section dark-section">
          <div className="giscus" />
          <script
            src="https://giscus.app/client.js"
            data-repo="behemehal/ellieblog"
            data-repo-id="R_kgDOGdv8Ow"
            data-category="Comments"
            data-category-id="DIC_kwDOGdv8O84CAHDn"
            data-mapping="specific"
            data-term={props.data.title}
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-theme="https://www.ellie-lang.org/css/gis_theme.css"
            data-lang="en"
            crossOrigin="anonymous"
          />
        </section>
        <Footer />
      </main>
    </body>
  );
}
