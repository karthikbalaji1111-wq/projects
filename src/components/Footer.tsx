import { GitBranch, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/[0.08] text-cyan-200 shadow-line">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <div className="font-semibold text-white">ReadmeAI</div>
            <div className="text-sm text-slate-400">Premium markdown generation for modern builders.</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <a className="transition hover:text-white" href="#features">
            Features
          </a>
          <a className="transition hover:text-white" href="#generator">
            Generator
          </a>
          <a className="transition hover:text-white" href="#faq">
            FAQ
          </a>
          <a className="transition hover:text-white" href="https://github.com">
            <GitBranch className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
