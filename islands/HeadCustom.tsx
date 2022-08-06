/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Head } from "$fresh/runtime.ts";

interface HeaderProps {
  url: string;
  title: string;
  description: string;
}

export default function HeadCustom(props: HeaderProps) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta
        property="og:image"
        content="https://www.ellie-lang.org/img/Social.png"
      />

      <meta property="twitter:url" content={props.url} />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      <meta
        property="twitter:image"
        content="https://www.ellie-lang.org/img/Social.png"
      />

      <meta name="title" content={props.title} />
      <meta name="description" content={props.description} />
      <meta
        name="keywords"
        content="ellie,ellie programing language,program,programing language,behemehal"
      />
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
    </Head>
  );
}
