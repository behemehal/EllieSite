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
        content="img/Social.png"
      />

      <meta property="twitter:url" content={props.url} />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      <meta
        property="twitter:image"
        content="img/Social.png"
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
        rel="alternate"
        type="rss"
        title="RSS Feed for Ellie Language"
        href="https://ellie-lang.org/rss"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js" />

      <script src="/js/bootstrap.bundle.min.js"></script>
      <script src="/js/index.js"></script>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZLTTGZYE80"
      >
      </script>
      <script>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-ZLTTGZYE80');
      `}
      </script>

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9072743301348476"
        crossOrigin="anonymous" />

      <script async src="https://fundingchoicesmessages.google.com/i/pub-9072743301348476?ers=1" nonce="IYusMFKpWSZZwPawbhBWSA"></script>
      <script nonce="IYusMFKpWSZZwPawbhBWSA">
        {
          `(function () { function signalGooglefcPresent() { if (!window.frames['googlefcPresent']) { if (document.body) { const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe); } else { setTimeout(signalGooglefcPresent, 0); } } } signalGooglefcPresent(); })();`
        }
      </script>

    </Head>
  );
}
