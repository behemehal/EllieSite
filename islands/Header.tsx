import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface HeaderProps {
  isDark?: boolean;
}

export default function Header(props: HeaderProps) {
  return (
    <header>
      <nav
        className={`navbar navbar-expand-md fixed-top bg-theme navbar-theme ${
          props.isDark ? "dark-section" : ""
        }`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <span className="mt-5 mb-3">
              Ellie
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul
            id="navbarCollapse"
            className="nav col-12 col-md-auto mb-2 justify-content-end mb-md-0 collapse navbar-collapse"
          >
            <li>
              <a className="nav-link px-2" href="/blog">Blog</a>
            </li>
            <li>
              <a className="nav-link px-2" href="./releases">Releases</a>
            </li>
            <li>
              <a className="nav-link px-2" href="https://docs.ellie-lang.org">
                Docs
              </a>
            </li>
            <li>
              <a
                className="nav-link px-2"
                href="https://playground.ellie-lang.org"
              >
                Playground
              </a>
            </li>
            {
              /*             <li>
              <a className="nav-link px-2" href="https://ellie-lang.org">
                Lia - Package Manager
              </a>
            </li> */
            }
          </ul>
        </div>
      </nav>
    </header>
  );
}
