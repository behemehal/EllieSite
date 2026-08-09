// Builds the Error Index from the Ellie compiler's Rust source of truth.
// The lists live in the Ellie-Language repo (VM_GEN2 branch) as `lazy_static!`
// blocks; we fetch and parse them so this page always mirrors the compiler.

const BRANCH = "VM_GEN2";
const BLOB = `https://github.com/behemehal/Ellie-Language/blob/${BRANCH}`;
const RAW = `https://raw.githubusercontent.com/behemehal/Ellie-Language/${BRANCH}`;

const ERROR_PATH = "ellie_engine/core/src/error/error_list.rs";
const WARNING_PATH = "ellie_engine/core/src/warning/warning_list.rs";

/** Human-facing GitHub links, shown as "view source" on the page. */
export const ERROR_SOURCE_URL = `${BLOB}/${ERROR_PATH}`;
export const WARNING_SOURCE_URL = `${BLOB}/${WARNING_PATH}`;

export type AssistLevel = "semi" | "full" | null;

export interface EllieDiagnostic {
  /** The Rust ref name, e.g. `ERROR_S1`. */
  id: string;
  /** Raw code from the source, e.g. `0x00`. */
  code: string;
  /** Category, e.g. `SyntaxError` / `ClassNameRule`. */
  title: string;
  /** Message template, may contain `$token` style placeholders. */
  message: string;
  /** Whether the compiler can auto-assist a fix. */
  assist: AssistLevel;
}

/** Split a `_list.rs` file into diagnostics by scanning each `lazy_static` ref. */
function parseDiagnostics(source: string): EllieDiagnostic[] {
  const blocks = source.split(/pub static ref /g).slice(1);
  const diagnostics: EllieDiagnostic[] = [];

  for (const block of blocks) {
    const id = block.match(/^(\w+)/)?.[1] ?? "";
    const code = block.match(/code:\s*(0x[0-9A-Fa-f]+|\d+)/)?.[1];
    const title = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const message = block.match(/message:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    if (!code || !title || !message) continue;

    const assist: AssistLevel = /full_assist:\s*true/.test(block)
      ? "full"
      : /semi_assist:\s*true/.test(block)
        ? "semi"
        : null;

    diagnostics.push({ id, code, title, message, assist });
  }

  return diagnostics;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

export interface ErrorIndex {
  errors: EllieDiagnostic[];
  warnings: EllieDiagnostic[];
}

export async function fetchErrorIndex(): Promise<ErrorIndex> {
  const [errorSrc, warningSrc] = await Promise.all([
    fetchText(`${RAW}/${ERROR_PATH}`),
    fetchText(`${RAW}/${WARNING_PATH}`),
  ]);
  return {
    errors: parseDiagnostics(errorSrc),
    warnings: parseDiagnostics(warningSrc),
  };
}

/** Stable-ish accent colour per diagnostic category, on the Ellie palette. */
const CATEGORY_COLORS: Record<string, string> = {
  SyntaxError: "#a83250",
  ReferenceError: "#884a6f",
  TypeError: "#5a5fb0",
  OverflowError: "#b5652d",
  ImportError: "#2f8f7f",
};

export function categoryColor(title: string): string {
  return CATEGORY_COLORS[title] ?? "#884a6f";
}

/**
 * Split a message into plain-text and `$placeholder` parts so the page can
 * render placeholders distinctly without dangerouslySetInnerHTML.
 */
export function messageParts(
  message: string,
): { text: string; placeholder: boolean }[] {
  return message
    .split(/(\$\w+)/g)
    .filter((part) => part.length > 0)
    .map((part) => ({ text: part, placeholder: /^\$\w+$/.test(part) }));
}
