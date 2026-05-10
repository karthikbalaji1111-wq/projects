export type TemplateId = "launch" | "open-source" | "enterprise";

export type GeneratorTone = "polished" | "technical" | "founder";

export interface ProjectForm {
  repoUrl: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string;
  features: string;
  installation: string;
  usage: string;
  screenshots: string;
  license: string;
  templateId: TemplateId;
  tone: GeneratorTone;
  includeBadges: boolean;
}

export interface ReadmeTemplate {
  id: TemplateId;
  name: string;
  eyebrow: string;
  description: string;
}

export interface GithubRepository {
  owner: string;
  repo: string;
  fullName: string;
  htmlUrl: string;
  description?: string;
  homepage?: string;
  language?: string;
  license?: string;
  topics: string[];
  stars?: number;
  forks?: number;
  openIssues?: number;
  languages: string[];
}
