import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";
import HeadCustom from "../islands/HeadCustom.tsx";

export default function NotFound(_: PageProps) {
  return (
    <body className="d-flex flex-column h-1001">
      <HeadCustom
        title="Ellie Programing Language - 404 Not Found"
        description="404 Not Found"
        url="https://www.ellie-lang.org"
      />
      <Header />
      <main>
        <section className="theme-section section-single-fullSize">
          <img
            className="display-center"
            alt="404"
            src="/img/404-light.png"
          />
          <h4 className="text-center">
            The page you're looking for is not found
          </h4>
          <br />
          <br />
        </section>
        <Footer />
      </main>
    </body>
  );
}
