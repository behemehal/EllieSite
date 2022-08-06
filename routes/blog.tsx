/** @jsx h */
import { h, JSX } from "preact";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import HeadCustom from "../islands/HeadCustom.tsx";

const posts: JSX.Element[] = [];

fetch(
  new Request(
    "https://raw.githubusercontent.com/behemehal/EllieBlog/main/blog.json",
  ),
  {
    method: "GET",
  },
)
  .then((response) => response.json())
  .then((data) => {
    let light = false;
    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      posts.push(
        <div class={`section ${light ? "light-section" : "dark-section"}`}>
          <div class="container">
            <div class="row">
              <div class="col">
                <a href={`/blog/${post.file_name.replace(".md","")}`} style="font-size: 1.7em;">
                  {post.title}
                </a>
                <h6>{post.description}</h6>
              </div>
              <div class="col" style="text-align: right;">
                <a
                  href={"https://github.com/" + post.publisher.replace("@", "")}
                >
                  {post.publisher}
                </a>
                <p>{moment(post.date).format("MM.DD.YYYY HH:mm")}</p>
              </div>
            </div>
          </div>
        </div>,
      );
      light = !light;
    }
  })
  .catch((error) => {
    throw error;
  });

export default function Blog() {
  return (
    <body>
      <HeadCustom
        title="Ellie Blog"
        description="Ellie is a scripting engine that runs on embedded and sandboxed environments."
        url="https://www.ellie-lang.org"
      />
      <Header isDark={true} />
      <main class="mt-4">
        <section className="section dark-section">
            <br />
          <h1 className="text-center">
            EllieBlog
          </h1>
        </section>
        {posts}
        <Footer />
      </main>
    </body>
  );
}
