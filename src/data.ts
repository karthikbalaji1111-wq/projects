import type { ProjectForm, ReadmeTemplate } from "./types";

export const templates: ReadmeTemplate[] = [
  {
    id: "launch",
    name: "Launch",
    eyebrow: "Product-ready",
    description: "Crisp narrative, polished badges, and a startup-grade first impression.",
  },
  {
    id: "open-source",
    name: "Open Source",
    eyebrow: "Community-first",
    description: "Contributor-friendly sections with setup, usage, license, and roadmap cues.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    eyebrow: "Executive polish",
    description: "Structured, trust-forward documentation for serious internal or B2B tools.",
  },
];

export const defaultProject: ProjectForm = {
  repoUrl: "https://github.com/acme/atlas-ui",
  name: "Atlas UI",
  tagline: "A precision interface system for fast-moving product teams.",
  description:
    "Atlas UI is a modern component foundation for building elegant dashboards, collaborative tools, and AI-assisted workflows with production-ready ergonomics.",
  techStack: "React, TypeScript, Tailwind CSS, Framer Motion, Vite",
  features:
    "Composable design tokens\nAccessible primitives\nMotion-ready components\nDark mode architecture\nDeveloper-first documentation",
  installation: "npm install\nnpm run dev",
  usage:
    "import { Button } from '@atlas/ui';\n\nexport function ProductAction() {\n  return <Button intent=\"primary\">Ship it</Button>;\n}",
  screenshots: "https://placehold.co/1200x720/0b1220/e2e8f0?text=Atlas+UI+Dashboard",
  license: "MIT",
  templateId: "launch",
  tone: "polished",
  includeBadges: true,
};

export const testimonials = [
  {
    quote:
      "It turns rough project notes into documentation that feels ready for launch day.",
    author: "Maya Chen",
    role: "Founder, Northstar Labs",
  },
  {
    quote:
      "The live preview and badge generation removed the last bit of README busywork from our release flow.",
    author: "Elias Romero",
    role: "Engineering Lead, VantaForge",
  },
  {
    quote:
      "It has the rare combo of speed, taste, and enough structure for serious open source work.",
    author: "Priya Raman",
    role: "Maintainer, FluxKit",
  },
];

export const faqs = [
  {
    question: "Can it use a GitHub repository link?",
    answer:
      "Yes. Paste a public GitHub URL and the generator hydrates useful repository metadata, then blends it with your project details.",
  },
  {
    question: "Can I edit the generated README?",
    answer:
      "Every generated README is fully editable before you copy or download it as README.md.",
  },
  {
    question: "Does it support multiple README styles?",
    answer:
      "The generator includes launch, open source, and enterprise templates with different structure and writing emphasis.",
  },
  {
    question: "Will badges be added automatically?",
    answer:
      "The app generates polished shields for license, stack, GitHub stars, forks, issues, and repository status where data is available.",
  },
];
