import { motion } from "framer-motion";
import {
  Check,
  Copy,
  Download,
  Eye,
  GitBranch,
  Loader2,
  PenLine,
  RefreshCcw,
  Wand2,
} from "lucide-react";
import { templates } from "../data";
import type { ProjectForm } from "../types";
import { MarkdownPreview } from "./MarkdownPreview";

interface GeneratorSectionProps {
  form: ProjectForm;
  markdown: string;
  copied: boolean;
  isGenerating: boolean;
  status: string;
  previewMode: "preview" | "edit";
  onFormChange: (form: ProjectForm) => void;
  onMarkdownChange: (markdown: string) => void;
  onGenerate: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onPreviewModeChange: (mode: "preview" | "edit") => void;
}

export function GeneratorSection({
  form,
  markdown,
  copied,
  isGenerating,
  status,
  previewMode,
  onFormChange,
  onMarkdownChange,
  onGenerate,
  onCopy,
  onDownload,
  onPreviewModeChange,
}: GeneratorSectionProps) {
  const updateField = <Key extends keyof ProjectForm>(key: Key, value: ProjectForm[Key]) => {
    onFormChange({ ...form, [key]: value });
  };

  return (
    <section id="generator" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.09),transparent_32%),radial-gradient(circle_at_88%_10%,rgba(250,204,21,0.08),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
              Interactive generator
            </p>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build the README your project deserves.
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 shadow-line backdrop-blur-xl">
            {isGenerating || status === "README generated"
              ? status
              : "Ready for markdown generation"}
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel rounded-[2rem] p-5 sm:p-6"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Project inputs</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Repository context, project voice, and export structure.
                </p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300/12 text-cyan-200">
                <Wand2 className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
                  <GitBranch className="h-4 w-4 text-cyan-200" />
                  GitHub repository
                </span>
                <input
                  value={form.repoUrl}
                  onChange={(event) => updateField("repoUrl", event.target.value)}
                  placeholder="https://github.com/acme/project"
                  className="field"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">
                    Project name
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">License</span>
                  <input
                    value={form.license}
                    onChange={(event) => updateField("license", event.target.value)}
                    className="field"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Tagline</span>
                <input
                  value={form.tagline}
                  onChange={(event) => updateField("tagline", event.target.value)}
                  className="field"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Description
                </span>
                <textarea
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  className="field min-h-28"
                />
              </label>

              <div>
                <span className="mb-3 block text-sm font-medium text-slate-200">
                  README template
                </span>
                <div className="grid gap-3 sm:grid-cols-3">
                  {templates.map((template) => {
                    const isActive = template.id === form.templateId;
                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => updateField("templateId", template.id)}
                        className={`template-card text-left ${isActive ? "template-card-active" : ""}`}
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/75">
                          {template.eyebrow}
                        </span>
                        <span className="mt-2 block text-base font-semibold text-white">
                          {template.name}
                        </span>
                        <span className="mt-2 block text-xs leading-5 text-slate-400">
                          {template.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">
                    Tech stack
                  </span>
                  <textarea
                    value={form.techStack}
                    onChange={(event) => updateField("techStack", event.target.value)}
                    className="field min-h-24"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">
                    Features
                  </span>
                  <textarea
                    value={form.features}
                    onChange={(event) => updateField("features", event.target.value)}
                    className="field min-h-24"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">
                    Installation
                  </span>
                  <textarea
                    value={form.installation}
                    onChange={(event) => updateField("installation", event.target.value)}
                    className="field min-h-24 font-mono"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Usage</span>
                  <textarea
                    value={form.usage}
                    onChange={(event) => updateField("usage", event.target.value)}
                    className="field min-h-24 font-mono"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Screenshot URLs
                </span>
                <textarea
                  value={form.screenshots}
                  onChange={(event) => updateField("screenshots", event.target.value)}
                  className="field min-h-20"
                />
              </label>

              <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.045] p-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.includeBadges}
                    onChange={(event) => updateField("includeBadges", event.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-cyan-300 focus:ring-cyan-300"
                  />
                  Generate badges
                </label>
                <select
                  value={form.tone}
                  onChange={(event) => updateField("tone", event.target.value as ProjectForm["tone"])}
                  className="field max-w-full sm:max-w-44"
                >
                  <option value="polished">Polished</option>
                  <option value="technical">Technical</option>
                  <option value="founder">Founder</option>
                </select>
              </div>

              <button
                type="button"
                onClick={onGenerate}
                disabled={isGenerating}
                className="shine-button group flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-ink-950 shadow-[0_24px_70px_rgba(255,255,255,0.18)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4 transition group-hover:rotate-45" />
                )}
                {isGenerating ? "Generating README" : "Generate README"}
              </button>
            </div>
          </motion.div>

          <motion.div
            id="preview"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel sticky top-24 h-fit overflow-hidden rounded-[2rem]"
          >
            <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-200">Live preview</p>
                <h3 className="text-xl font-semibold text-white">README.md</h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex rounded-full border border-white/10 bg-white/[0.06] p-1">
                  <button
                    type="button"
                    onClick={() => onPreviewModeChange("preview")}
                    className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${
                      previewMode === "preview" ? "bg-white text-ink-950" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => onPreviewModeChange("edit")}
                    className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${
                      previewMode === "edit" ? "bg-white text-ink-950" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <PenLine className="h-3.5 w-3.5" />
                    Edit
                  </button>
                </div>
                <button type="button" onClick={onCopy} className="icon-button" aria-label="Copy README">
                  {copied ? <Check className="h-4 w-4 text-emerald-200" /> : <Copy className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={onDownload}
                  className="icon-button"
                  aria-label="Download README"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>

            {isGenerating && (
              <div className="border-b border-white/10 bg-cyan-200/[0.05] px-5 py-3">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-1/2 animate-shimmer rounded-full bg-cyan-200/80" />
                </div>
              </div>
            )}

            <div className="max-h-[760px] overflow-y-auto p-4 sm:p-6">
              {previewMode === "edit" ? (
                <textarea
                  value={markdown}
                  onChange={(event) => onMarkdownChange(event.target.value)}
                  className="min-h-[680px] w-full resize-y rounded-3xl border border-white/10 bg-[#060a12] p-5 font-mono text-sm leading-7 text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-cyan-200/40 focus:shadow-[0_0_0_4px_rgba(103,232,249,0.08)]"
                />
              ) : (
                <MarkdownPreview markdown={markdown} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
