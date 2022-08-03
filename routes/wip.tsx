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
            src="https://media.giphy.com/media/Apktz7Hk4M8A4BfPEf/giphy-downsized.gif"
          />
          <br />
          <h2 class="text-center">
            Under construction
          </h2>
          <p className="text-center">
            This page is under construction. Please come back later.
          </p>
          <br />
          <br />
        </section>
        <Footer />
      </main>
    </body>
  );
}
