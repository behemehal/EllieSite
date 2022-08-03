/** @jsx h */
import { h } from "preact";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";


export default function NotFound(props: PageProps) {
  return (
    <body className="d-flex flex-column h-1001">
      <Header />
      <main>
        <section className="theme-section">
            <img
              className="display-center"
              alt="404"
              src="/img/404-light.png"
            />
            <h4 className="text-center">
              The page you're looking for is not found
            </h4>
            <br />
        </section>
        <Footer />
      </main>
    </body>
  );
}
