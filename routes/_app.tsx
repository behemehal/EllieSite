/** @jsx h */
import { Component, h } from "preact";
import { asset, Head, IS_BROWSER } from "$fresh/runtime.ts";
import { AppProps, PageProps } from "$fresh/src/server/types.ts";

export default function App({ Component }: AppProps, props: PageProps) {
  const url = "https://www.ellie-lang.org";
  const title = "Ellie Programing Language";
  const description =
    "Ellie is a scripting engine that runs on embedded and sandboxed environments.";
  const socialImg = "https://www.ellie-lang.org/img/Social.png";
  const keywords =
    "ellie,ellie programing language,program,programing language,behemehal";

  

  return (
    <html data-custom="data">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={socialImg} />

        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={socialImg} />

        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="copyright" content="Behemehal" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="5 days" />
        <meta name="author" content="Behemehal" />

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="icon"
          href="/img/EllieCharIcon@0,1x.png"
          type="image/x-icon"
        />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
          rel="stylesheet"
        />
        <link href="/css/index.css" rel="stylesheet" type="text/css" />
        <link href="/css/theme.css" rel="stylesheet" type="text/css" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js" />

        <script src="/js/bootstrap.bundle.min.js"></script>
        <script src="/js/index.js"></script>
      </head>
      <body className="d-flex flex-column h-100">
        <Component />
      </body>
    </html>
  );
}
