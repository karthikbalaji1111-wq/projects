import { motion } from "framer-motion";
import { Braces, Code2, FileText, GitBranch, Layers3, Shield, Sparkles, Zap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const features = [
  {
    icon: Sparkles,
    title: "AI README generation",
    description: "Turns project notes and repository metadata into polished markdown instantly.",
  },
  {
    icon: FileText,
    title: "Live markdown preview",
    description: "Edit markdown directly and watch the rendered README update in real time.",
  },
  {
    icon: GitBranch,
    title: "GitHub link input",
    description: "Hydrates public repository details including language, license, topics, and stats.",
  },
  {
    icon: Shield,
    title: "Auto badges",
    description: "Generates beautiful status, license, stack, stars, forks, and issue badges.",
  },
  {
    icon: Layers3,
    title: "Multiple templates",
    description: "Switch between launch, open source, and enterprise README structures.",
  },
  {
    icon: Code2,
    title: "Syntax-highlighted code",
    description: "Code blocks are rendered with refined dark-mode styling and token color.",
  },
  {
    icon: Braces,
    title: "Editable export",
    description: "Fine-tune every line before copying or downloading a production README.md.",
  },
  {
    icon: Zap,
    title: "Instant workflow",
    description: "Smooth loading states and microinteractions keep the generation flow delightful.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 soft-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Documentation intelligence"
          title="Everything a serious README needs, tuned for polish."
          description="A full documentation workspace with the visual refinement of a premium SaaS product and the practical controls developers expect."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="magnetic-card group rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-5 shadow-line backdrop-blur-xl transition"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-cyan-200 transition group-hover:border-cyan-200/35 group-hover:bg-cyan-300/15">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
