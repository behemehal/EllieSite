/** @jsx h */
import { Fragment, h } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import DownloadButton from "../islands/DownloadButton.tsx";
import Footer from "../islands/Footer.tsx";
import HeadCustom from "../islands/HeadCustom.tsx";

//<div class="vr"></div>
//<DownloadButton />

export default function Home() {
  return (
    <body>
      <HeadCustom
        title="About Ellie"
        description="Ellie is a scripting engine that runs on embedded and sandboxed environments."
        url="https://www.ellie-lang.org"
      />
      <Header isDark />
      <main class="mt-4">
        <section className="section dark-section">
          <br />
          <h1 className="text-center">
            Why Ellie?
          </h1>
          <hr className="w-25 display-center" />
          <p className="w-50 display-center text-center">
            Ellie is a type-safe language that designed to be run on the
            bare-metal platforms or sandboxed environments.
          </p>
        </section>
        <section className="section theme-section sectionLead">
          <div className="feature-block">
            <div className="feature-text-l">
              <h3>Portable</h3>
              <hr />
              <p className="feature-text-p">
                Ellie engine expands and shrinks with features. You can shrink
                ellie engine as small as 49kb.
              </p>
            </div>
            <div className="feature-photo-r">
              <img
                src="/img/page_res/content3.png"
                alt="portable"
                width="900px"
              />
            </div>
          </div>
        </section>
        <section className="section theme-section sectionLead">
          <div className="feature-block">
            <div className="feature-text-l">
              <h3>Library Sizes</h3>
              <hr />
              <p className="feature-text-p">
                Ellie engine expands and shrinks with features. You can shrink
                ellie engine as small as 49kb.
              </p>
            </div>
            <div className="feature-photo-r">
              <img
                src="/img/page_res/content3.png"
                alt="portable"
                width="900px"
              />
            </div>
            <br />
            <div className="feature-text-l">
              <h3></h3>
              <hr />
              <p className="feature-text-p">
                Ellie engine expands and shrinks with features. You can shrink
                ellie engine as small as 49kb.
              </p>
            </div>
            <div className="feature-photo-r">
              <img
                src="/img/page_res/content3.png"
                alt="portable"
                width="900px"
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </body>
  );
}
