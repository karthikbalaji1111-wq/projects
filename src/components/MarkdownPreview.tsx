import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownPreviewProps {
  markdown: string;
}

function tokenClass(token: string) {
  if (/^(const|let|var|function|return|import|from|export|interface|type|npm|git|pnpm|yarn)$/.test(token)) {
    return "text-cyan-200";
  }
  if (/^["'`].*["'`]$/.test(token)) return "text-emerald-200";
  if (/^(-{1,2}[\w-]+)$/.test(token)) return "text-amber-200";
  if (/^(#.*|\/\/.*)$/.test(token)) return "text-slate-500";
  if (/^\d+$/.test(token)) return "text-rose-200";
  return "text-slate-300";
}

function HighlightedCode({ code, language }: { code: string; language: string }) {
  const parts = code.split(/(\s+|["'`][^"'`]*["'`]|#.*|\/\/.*|-{1,2}[\w-]+|\b\d+\b|\b[\w@/.-]+\b)/g);

  return (
    <pre className="my-5 overflow-x-auto rounded-3xl border border-white/10 bg-[#060a12] p-5 text-sm leading-7 shadow-line">
      <code data-language={language}>
        {parts.map((part, index) => (
          <span key={`${part}-${index}`} className={tokenClass(part)}>
            {part}
          </span>
        ))}
      </code>
    </pre>
  );
}

const components = {
  h1: ({ children }) => (
    <h1 className="mb-5 text-4xl font-semibold tracking-tight text-white">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 border-t border-white/10 pt-8 text-2xl font-semibold tracking-tight text-white">
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="mb-3 mt-8 text-xl font-semibold text-white">{children}</h3>,
  p: ({ children }) => <p className="my-4 leading-8 text-slate-300">{children}</p>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-cyan-200 underline decoration-cyan-200/30 underline-offset-4 transition hover:text-white"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-3xl border border-cyan-200/16 bg-cyan-200/[0.055] px-5 py-4 text-lg text-cyan-50 shadow-line">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => <ul className="my-5 space-y-3 text-slate-300">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-3 leading-7 before:mt-3 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-cyan-200">
      <span>{children}</span>
    </li>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-hidden rounded-3xl border border-white/10">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-white/10 bg-white/[0.07] px-4 py-3 font-semibold text-white">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-b border-white/5 px-4 py-3 text-slate-300">{children}</td>,
  img: ({ src, alt }) => {
    const isBadge = src?.includes("img.shields.io");

    if (isBadge) {
      return (
        <img
          src={src ?? ""}
          alt={alt ?? ""}
          className="mr-2 inline h-7 w-auto rounded-none border-0 align-middle shadow-none"
        />
      );
    }

    return (
      <img
        src={src ?? ""}
        alt={alt ?? ""}
        className="my-5 w-full rounded-3xl border border-white/10 object-cover shadow-panel"
      />
    );
  },
  code: ({ inline, className, children }: { inline?: boolean; className?: string; children?: ReactNode }) => {
    const code = String(children).replace(/\n$/, "");
    const language = /language-(\w+)/.exec(className || "")?.[1] ?? "text";

    if (inline) {
      return (
        <code className="rounded-lg border border-white/10 bg-white/[0.08] px-1.5 py-0.5 text-sm text-cyan-100">
          {children}
        </code>
      );
    }

    return <HighlightedCode code={code} language={language} />;
  },
} as Components;

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  return (
    <div className="preview-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
