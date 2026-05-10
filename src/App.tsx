import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FeatureGrid } from "./components/FeatureGrid";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { GeneratorSection } from "./components/GeneratorSection";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Testimonials } from "./components/Testimonials";
import { defaultProject } from "./data";
import type { GithubRepository, ProjectForm } from "./types";
import { hydrateGithubRepository, mergeRepositoryIntoForm } from "./utils/github";
import { buildReadme } from "./utils/readme";

const generationSteps = [
  "Reading project context",
  "Hydrating repository metadata",
  "Designing documentation structure",
  "Generating polished markdown",
  "Refining badges and sections",
];

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export default function App() {
  const initialMarkdown = useMemo(() => buildReadme(defaultProject), []);
  const [form, setForm] = useState<ProjectForm>(defaultProject);
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState(generationSteps[0]);
  const [previewMode, setPreviewMode] = useState<"preview" | "edit">("preview");

  const generate = async () => {
    setIsGenerating(true);
    setPreviewMode("preview");

    let repository: GithubRepository | null = null;
    let nextForm = form;

    for (const [index, step] of generationSteps.entries()) {
      setStatus(step);

      if (index === 1) {
        repository = await hydrateGithubRepository(form.repoUrl);
        nextForm = mergeRepositoryIntoForm(form, repository);
        setForm(nextForm);
      }

      await wait(index === 1 ? 520 : 360);
    }

    setMarkdown(buildReadme(nextForm, repository));
    setIsGenerating(false);
    setStatus("README generated");
  };

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="readme-ai"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="min-h-screen overflow-x-hidden bg-ink-950 text-white"
      >
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(120deg,#03060c_0%,#07111d_38%,#101017_68%,#03060c_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
          <div className="aurora absolute left-[-8%] top-[-12%] h-[34rem] w-[34rem] rounded-full bg-cyan-300/12 blur-3xl" />
          <div className="aurora absolute bottom-[10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-amber-300/10 blur-3xl [animation-delay:-5s]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(3,6,12,0.72)_72%)]" />
        </div>

        <Navbar />
        <main>
          <Hero />
          <FeatureGrid />
          <GeneratorSection
            form={form}
            markdown={markdown}
            copied={copied}
            isGenerating={isGenerating}
            status={status}
            previewMode={previewMode}
            onFormChange={setForm}
            onMarkdownChange={setMarkdown}
            onGenerate={generate}
            onCopy={copyMarkdown}
            onDownload={downloadMarkdown}
            onPreviewModeChange={setPreviewMode}
          />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
