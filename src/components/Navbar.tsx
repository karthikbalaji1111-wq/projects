import { motion, useScroll, useTransform } from "framer-motion";
import { GitBranch, Sparkles } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Generator", href: "#generator" },
  { label: "Preview", href: "#preview" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 90],
    ["rgba(3, 6, 12, 0.28)", "rgba(3, 6, 12, 0.78)"],
  );
  const borderColor = useTransform(
    scrollY,
    [0, 90],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.12)"],
  );

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-2xl"
      style={{ backgroundColor, borderColor }}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-2xl border border-white/15 bg-white/10 shadow-line">
            <span className="absolute inset-0 rounded-2xl bg-cyan-300/20 blur-xl transition group-hover:bg-cyan-300/35" />
            <Sparkles className="relative h-4 w-4 text-cyan-200" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">ReadmeAI</span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm text-white/62 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="https://github.com"
          className="shine-button hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white shadow-line transition hover:border-cyan-200/40 hover:bg-white/[0.13] sm:flex"
        >
          <GitBranch className="h-4 w-4" />
          GitHub
        </a>
      </nav>
    </motion.header>
  );
}
