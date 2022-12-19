/** @jsx h */
import { h } from "preact";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";
import HeadCustom from "../islands/HeadCustom.tsx";

export default function ServerError(props: PageProps) {
  return (
    <body className="d-flex flex-column h-1001">
      <HeadCustom
        title="Ellie Programing Language - 500 Internal Server Error"
        description="500 Internal Server Error"
        url="https://www.ellie-lang.org"
      />
      <Header />
      <main>
        <section className="theme-section section section-single-fullSize">
          <img className="display-center" alt="404" src="https://media.giphy.com/media/NTur7XlVDUdqM/giphy.gif" />
          <br />
          <h2 class="text-center">
            500 - Internal Server Error
          </h2>
          <p className="text-center">
            Please try again later. If the problem persists, please contact us.
            <br />
            <a href="mailto:info@behemehal.org">info@behemehal.org</a>
          </p>
          <br />
          <br />
        </section>
        <Footer />
      </main>
    </body>
  );
}
