import type { GithubRepository, ProjectForm } from "../types";

const badgeColors = {
  cyan: "0891b2",
  green: "16a34a",
  slate: "334155",
  violet: "7c3aed",
  amber: "d97706",
};

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function listFromComma(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function encodeBadge(value: string) {
  return encodeURIComponent(value.replace(/-/g, "--").replace(/\s+/g, "_"));
}

function badge(label: string, message: string, color = badgeColors.cyan) {
  return `![${label}](https://img.shields.io/badge/${encodeBadge(label)}-${encodeBadge(
    message,
  )}-${color}?style=for-the-badge)`;
}

function repoBadge(repository: GithubRepository | null, metric: string, label: string) {
  if (!repository) return "";
  return `![${label}](https://img.shields.io/github/${metric}/${repository.fullName}?style=for-the-badge&color=${badgeColors.slate})`;
}

function screenshotMarkdown(value: string) {
  const screenshots = lines(value);
  if (!screenshots.length) return "";

  return [
    "## Screenshots",
    "",
    ...screenshots.map((url, index) => `![Screenshot ${index + 1}](${url})`),
    "",
  ].join("\n");
}

function techStackTable(techStack: string) {
  const stack = listFromComma(techStack);
  if (!stack.length) return "";

  return [
    "## Tech Stack",
    "",
    "| Layer | Technology |",
    "| --- | --- |",
    ...stack.map((tech, index) => `| ${index === 0 ? "Core" : "Platform"} | ${tech} |`),
    "",
  ].join("\n");
}

function templateIntro(form: ProjectForm) {
  if (form.templateId === "enterprise") {
    return "Designed for teams that need clear onboarding, dependable workflows, and documentation that scales from prototype to production.";
  }

  if (form.templateId === "open-source") {
    return "Built for maintainers, contributors, and teams who want a project page that is easy to understand, clone, run, and improve.";
  }

  return "Crafted for fast launches, clean onboarding, and a first impression that feels as polished as the product itself.";
}

function toneLine(form: ProjectForm) {
  if (form.tone === "technical") {
    return "The documentation emphasizes architecture, setup precision, and practical implementation details.";
  }

  if (form.tone === "founder") {
    return "The documentation balances product clarity with a launch-ready narrative for users, teams, and investors.";
  }

  return "The documentation is concise, polished, and optimized for confident project evaluation.";
}

function buildBadges(form: ProjectForm, repository: GithubRepository | null) {
  if (!form.includeBadges) return "";

  const stack = listFromComma(form.techStack);
  const badges = [
    form.license ? badge("license", form.license, badgeColors.green) : "",
    stack[0] ? badge("built with", stack[0], badgeColors.cyan) : "",
    repository ? repoBadge(repository, "stars", "stars") : badge("status", "active", badgeColors.violet),
    repository ? repoBadge(repository, "forks", "forks") : "",
    repository ? repoBadge(repository, "issues", "issues") : "",
  ].filter(Boolean);

  return badges.length ? `${badges.join("\n")}\n` : "";
}

export function buildReadme(form: ProjectForm, repository: GithubRepository | null = null) {
  const features = lines(form.features);
  const install = lines(form.installation);
  const usage = form.usage.trim();
  const repoUrl = repository?.htmlUrl || form.repoUrl.trim();
  const repoLine = repoUrl ? `**Repository:** [${repository?.fullName || repoUrl}](${repoUrl})` : "";
  const homepageLine = repository?.homepage
    ? `**Homepage:** [${repository.homepage}](${repository.homepage})`
    : "";

  const badges = buildBadges(form, repository);
  const topics = repository?.topics?.length
    ? `\n**Topics:** ${repository.topics.map((topic) => `\`${topic}\``).join(" ")}\n`
    : "";

  const markdown = [
    `# ${form.name.trim() || "Untitled Project"}`,
    "",
    badges,
    `> ${form.tagline.trim() || "A modern software project built with care."}`,
    "",
    form.description.trim(),
    "",
    templateIntro(form),
    "",
    toneLine(form),
    "",
    [repoLine, homepageLine].filter(Boolean).join("  \n"),
    topics,
    "## Features",
    "",
    ...(features.length
      ? features.map((feature) => `- ${feature}`)
      : [
          "- Thoughtful user experience",
          "- Production-ready project structure",
          "- Fast setup and developer-friendly workflow",
        ]),
    "",
    techStackTable(form.techStack),
    "## Installation",
    "",
    "```bash",
    ...(install.length ? install : ["npm install", "npm run dev"]),
    "```",
    "",
    "## Usage",
    "",
    usage
      ? `\`\`\`${usage.includes("import ") ? "tsx" : "bash"}\n${usage}\n\`\`\``
      : "```bash\nnpm run dev\n```",
    "",
    screenshotMarkdown(form.screenshots),
    "## Project Structure",
    "",
    "```text",
    `${form.name.trim() || "project"}/`,
    "|-- src/",
    "|-- public/",
    "|-- package.json",
    "`-- README.md",
    "```",
    "",
    "## Contributing",
    "",
    "Contributions are welcome. Please open an issue first to discuss major changes, then submit a focused pull request with a clear description and tests where appropriate.",
    "",
    "## License",
    "",
    `Distributed under the ${form.license.trim() || repository?.license || "MIT"} License.`,
    "",
  ]
    .filter((section) => section !== "")
    .join("\n")
    .replace(/\n{4,}/g, "\n\n\n");

  return `${markdown.trim()}\n`;
}
