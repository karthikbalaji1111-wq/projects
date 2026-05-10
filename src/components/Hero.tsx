import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, FileText, GitBranch, Sparkles, Wand2 } from "lucide-react";
import { HeroCanvas } from "./HeroCanvas";

function scrollToGenerator() {
  document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-28">
      <HeroCanvas />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_36%),linear-gradient(180deg,rgba(3,6,12,0.1),#03060c_88%)]" />
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/12 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl items-center gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3 py-2 text-sm text-cyan-100 shadow-line backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            AI documentation studio for modern teams
          </div>

          <h1 className="mt-8 max-w-5xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Generate a launch-ready README in seconds.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Paste a GitHub repository or describe your project. ReadmeAI turns the raw
            ingredients into elegant markdown with badges, sections, code blocks, and a
            gorgeous live preview.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToGenerator}
              className="shine-button group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_18px_60px_rgba(255,255,255,0.18)] transition hover:scale-[1.02]"
            >
              Start generating
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <a
              href="#preview"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-6 py-3.5 text-sm font-semibold text-white shadow-line backdrop-blur-xl transition hover:border-cyan-200/40 hover:bg-white/[0.12]"
            >
              <FileText className="h-4 w-4" />
              View live preview
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["3", "templates"],
              ["12+", "sections"],
              ["1-click", "export"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-4 shadow-line backdrop-blur-xl"
              >
                <div className="text-2xl font-semibold text-white">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -left-10 top-16 hidden rounded-3xl border border-white/12 bg-white/[0.08] p-4 shadow-panel backdrop-blur-2xl lg:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-300/15 text-emerald-200">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Badges ready</p>
                <p className="text-xs text-slate-400">license, stack, stars</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-5 bottom-16 hidden rounded-3xl border border-white/12 bg-white/[0.08] p-4 shadow-panel backdrop-blur-2xl lg:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-300/15 text-amber-200">
                <Wand2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">AI draft</p>
                <p className="text-xs text-slate-400">instant markdown</p>
              </div>
            </div>
          </div>

          <div className="glass-panel overflow-hidden rounded-[2rem] border-white/15">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-300">
                <GitBranch className="h-3.5 w-3.5" />
                github.com/acme/atlas-ui
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-white/10 bg-white/[0.035] p-5 lg:border-b-0 lg:border-r">
                <div className="mb-4 h-2 w-28 rounded-full bg-cyan-200/50" />
                <div className="space-y-3">
                  {["Project name", "Tech stack", "Features", "License"].map((item, index) => (
                    <motion.div
                      key={item}
                      animate={{ opacity: [0.58, 1, 0.58] }}
                      transition={{ duration: 2.4, delay: index * 0.22, repeat: Infinity }}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] p-3"
                    >
                      <div className="h-2 w-24 rounded-full bg-white/25" />
                      <div className="mt-3 h-2 rounded-full bg-white/10" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-ink-950/70 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-2 w-32 rounded-full bg-white/30" />
                  <div className="h-7 w-20 rounded-full bg-cyan-300/20" />
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5 font-mono text-sm leading-7 text-slate-300">
                  <p className="text-cyan-200"># Atlas UI</p>
                  <p className="text-slate-500">A precision interface system.</p>
                  <p className="mt-4 text-emerald-200">## Features</p>
                  <p>- Composable design tokens</p>
                  <p>- Motion-ready components</p>
                  <p>- Accessible primitives</p>
                  <p className="mt-4 text-amber-200">```bash</p>
                  <p>npm install</p>
                  <p>npm run dev</p>
                  <p className="text-amber-200">```</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
