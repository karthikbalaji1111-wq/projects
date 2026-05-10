import type { GithubRepository, ProjectForm } from "../types";

interface GithubApiResponse {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  license: { spdx_id: string; name: string } | null;
  topics?: string[];
  owner: { login: string };
}

export function parseGithubUrl(value: string) {
  if (!value.trim()) return null;

  try {
    const url = new URL(value.trim());
    if (!url.hostname.includes("github.com")) return null;

    const [owner, repo] = url.pathname
      .replace(/\.git$/, "")
      .split("/")
      .filter(Boolean);

    if (!owner || !repo) return null;
    return { owner, repo };
  } catch {
    const shorthand = value.trim().match(/^([\w.-]+)\/([\w.-]+)$/);
    if (!shorthand) return null;
    return { owner: shorthand[1], repo: shorthand[2] };
  }
}

export async function hydrateGithubRepository(
  repoUrl: string,
): Promise<GithubRepository | null> {
  const parsed = parseGithubUrl(repoUrl);
  if (!parsed) return null;

  const fallback: GithubRepository = {
    owner: parsed.owner,
    repo: parsed.repo,
    fullName: `${parsed.owner}/${parsed.repo}`,
    htmlUrl: `https://github.com/${parsed.owner}/${parsed.repo}`,
    topics: [],
    languages: [],
  };

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 2600);

  try {
    const [repoResponse, languagesResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
        signal: controller.signal,
      }),
      fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/languages`, {
        signal: controller.signal,
      }).catch(() => null),
    ]);

    if (!repoResponse.ok) return fallback;

    const repo = (await repoResponse.json()) as GithubApiResponse;
    const languages =
      languagesResponse && languagesResponse.ok
        ? Object.keys((await languagesResponse.json()) as Record<string, number>)
        : [];

    return {
      owner: repo.owner.login,
      repo: repo.name,
      fullName: repo.full_name,
      htmlUrl: repo.html_url,
      description: repo.description ?? undefined,
      homepage: repo.homepage ?? undefined,
      language: repo.language ?? undefined,
      license: repo.license?.spdx_id || repo.license?.name || undefined,
      topics: repo.topics ?? [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      languages,
    };
  } catch {
    return fallback;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function mergeRepositoryIntoForm(
  current: ProjectForm,
  repository: GithubRepository | null,
): ProjectForm {
  if (!repository) return current;

  const readableName = repository.repo
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const mergedStack = Array.from(
    new Set(
      [
        ...current.techStack.split(",").map((item) => item.trim()).filter(Boolean),
        repository.language,
        ...repository.languages.slice(0, 5),
      ].filter(Boolean) as string[],
    ),
  ).join(", ");

  return {
    ...current,
    name: current.name.trim() || readableName,
    tagline:
      current.tagline.trim() ||
      repository.description ||
      `A production-ready project from ${repository.fullName}.`,
    description:
      current.description.trim() ||
      repository.description ||
      `A professional software project maintained at ${repository.htmlUrl}.`,
    techStack: mergedStack || current.techStack,
    license: current.license.trim() || repository.license || "MIT",
  };
}
