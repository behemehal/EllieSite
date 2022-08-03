/** @jsx h */
import { h } from "preact";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";

export default function ServerError(props: PageProps) {
  return (
    <body className="d-flex flex-column h-1001">
      <Header />
      <main>
        <section className="theme-section section">
          <img
            className="display-center"
            alt="404"
            src="https://media.giphy.com/media/oiy799TF4tLlCqZlJp/giphy-downsized.gif"
          />
          <br />
          <h2 class="text-center">
            This page moved
          </h2>
          <p className="text-center">
            Releases are now on <a href="https://lia.ellie-lang.org">Lia</a> with CLI updater
          </p>
          <br />
          <br />
        </section>
        <Footer />
      </main>
    </body>
  );
}
