/** @jsx h */
import { h } from "preact";
import {
  AppProps,
  HandlerContext,
  Handlers,
  PageProps,
} from "$fresh/server.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../islands/Footer.tsx";
import {
  Marked,
  Parsed,
  Renderer,
} from "https://deno.land/x/markdown@v2.0.0/mod.ts";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";

//Parse key and value seperated by ':'
function parseKeyValue(str: string) {
  var arr = str.toString().split(":");
  return {
    key: arr[0].trim(),
    value: arr[1].trim(),
  };
}

//Convert object array which has key and value to object (This comment exist because co-pilot)
function convertToObject(arr: any) {
  var obj: any = {};
  for (var i = 0; i < arr.length; i++) {
    obj[arr[i].key] = arr[i].value;
  }
  return obj;
}

function whichLineEnding(source: string) {
  var temp = source.indexOf("\n");
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
    let res = await fetch(
      new Request(
        "https://raw.githubusercontent.com/behemehal/EllieBlog/main/blogs/" +
          ctx.params.name + ".md",
      ),
      {
        method: "GET",
      },
    );
    let data = await res.text();
    console.log("Response arrived");
    if (data == "404: Not Found") {
      return new Response("not found", { status: 404 });
    } else {
      const lineEnding = whichLineEnding(data);
      const lines = data.split(lineEnding);
      const conf = lines.slice(1, 7);
      const md = lines.slice(8);
      const parsedConf: any = convertToObject(
        conf.map((x) => parseKeyValue(x)),
      );

      const renderer = new Renderer();
      renderer.image = (href: string, title: string, text: string) => {
        return `<img src="${href}" alt="${text}" title="${title}" class="img-fluid">`;
      };

      let c = Marked.setOptions({
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
  props.data.updated_at = moment(props.data.updated_at).format("MMMM Do YYYY");
  props.data.updated_by = "ahmtcn123";
  console.log(props.data);
  return (
    <body className="d-flex flex-column h-1001">
      <Header isDark />
      <main>
        <section className="theme-section" style={{ "padding": "3rem" }}>
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

        <Footer />
      </main>
    </body>
  );
}
