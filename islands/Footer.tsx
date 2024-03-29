import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Header() {
  return (
    <section className="black-section section text-center footer">
      <p>Ellie Language</p>
      <a
        title="Behemehal"
        rel="noopener"
        className="imgbh"
        target="_blank"
        href="https://behemehal.org"
      >
        <img
          alt="behemehalLogo"
          target="_blank"
          src="https://behemehal.org/img/bBrand/main.png"
          width="30"
          height="30"
        />
      </a>
      <div className="logo-sections">
        <a
          title="Github"
          rel="noopener"
          target="_blank"
          href="https://github.com/behemehal/Ellie-Language"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            >
            </path>
          </svg>
        </a>
        <a
          title="Issue"
          rel="noopener"
          target="_blank"
          href="https://github.com/behemehal/Ellie-Language/issues/new?assignees=ahmtcn123&labels=bug&template=bug_report.md&title="
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <path
              fill-rule="evenodd"
              d="M4.72.22a.75.75 0 011.06 0l1 .999a3.492 3.492 0 012.441 0l.999-1a.75.75 0 111.06 1.061l-.775.776c.616.63.995 1.493.995 2.444v.327c0 .1-.009.197-.025.292.408.14.764.392 1.029.722l1.968-.787a.75.75 0 01.556 1.392L13 7.258V9h2.25a.75.75 0 010 1.5H13v.5c0 .409-.049.806-.141 1.186l2.17.868a.75.75 0 01-.557 1.392l-2.184-.873A4.997 4.997 0 018 16a4.997 4.997 0 01-4.288-2.427l-2.183.873a.75.75 0 01-.558-1.392l2.17-.868A5.013 5.013 0 013 11v-.5H.75a.75.75 0 010-1.5H3V7.258L.971 6.446a.75.75 0 01.558-1.392l1.967.787c.265-.33.62-.583 1.03-.722a1.684 1.684 0 01-.026-.292V4.5c0-.951.38-1.814.995-2.444L4.72 1.28a.75.75 0 010-1.06zM6.173 5h3.654A.173.173 0 0010 4.827V4.5a2 2 0 10-4 0v.327c0 .096.077.173.173.173zM5.25 6.5a.75.75 0 00-.75.75V11a3.5 3.5 0 107 0V7.25a.75.75 0 00-.75-.75h-5.5z"
            >
            </path>
          </svg>
        </a>
      </div>
      <br />
      <div className="link-sections">
        <a title="Press kit" href="/wip">
          Press kit
        </a>
        <a title="About Ellie" href="/wip">
          About
        </a>
        <a title="Error Index" href="/wip">
          Error Index
        </a>
        <a title="Docs" href="https://docs.ellie-lang.org">
          Docs
        </a>
        <a title="Standard Rules" href="/wip">
          Standard Rules
        </a>
      </div>
    </section>
  );
}
