import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { MODULES, SUBMODULES, type ModuleId, type SubmoduleId } from "./modules";

export type ArticleFrontmatter = {
  title: string;
  slug: string;
  module: ModuleId;
  submodule: SubmoduleId;
  type?: "article" | "video";
  youtube?: string;
  summary?: string;
  order?: number;
};

export type Article = ArticleFrontmatter & {
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

/**
 * Load all articles from content/articles/*.mdx at build/request time.
 * Results are cached per-process by the module system.
 */
let _cache: Article[] | null = null;

export async function getAllArticles(): Promise<Article[]> {
  if (_cache) return _cache;

  let files: string[] = [];
  try {
    files = await fs.readdir(CONTENT_DIR);
  } catch {
    return (_cache = []);
  }

  const articles: Article[] = [];
  for (const file of files) {
    if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;
    const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as Partial<ArticleFrontmatter>;
    if (!fm.title || !fm.slug || !fm.module || !fm.submodule) continue;
    articles.push({
      title: fm.title,
      slug: fm.slug,
      module: fm.module,
      submodule: fm.submodule,
      type: fm.type ?? "article",
      youtube: fm.youtube,
      summary: fm.summary,
      order: fm.order,
      body: content,
    });
  }

  const moduleIndex = new Map<ModuleId, number>(
    MODULES.map((m, i) => [m.id, i]),
  );
  const submoduleIndex = new Map<SubmoduleId, number>(
    SUBMODULES.map((s, i) => [s.id, i]),
  );

  articles.sort((a, b) => {
    const modDiff =
      (moduleIndex.get(a.module) ?? 999) - (moduleIndex.get(b.module) ?? 999);
    if (modDiff !== 0) return modDiff;
    const subDiff =
      (submoduleIndex.get(a.submodule) ?? 999) -
      (submoduleIndex.get(b.submodule) ?? 999);
    if (subDiff !== 0) return subDiff;
    const orderDiff = (a.order ?? 999) - (b.order ?? 999);
    if (orderDiff !== 0) return orderDiff;
    return a.title.localeCompare(b.title);
  });

  return (_cache = articles);
}

export type ArticleNeighbor = {
  slug: string;
  title: string;
};

export async function getArticleNeighbors(
  slug: string,
): Promise<{ prev: ArticleNeighbor | null; next: ArticleNeighbor | null }> {
  const all = await getAllArticles();
  const idx = all.findIndex((a) => a.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prevA = idx > 0 ? all[idx - 1] : null;
  const nextA = idx < all.length - 1 ? all[idx + 1] : null;
  return {
    prev: prevA ? { slug: prevA.slug, title: prevA.title } : null,
    next: nextA ? { slug: nextA.slug, title: nextA.title } : null,
  };
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const all = await getAllArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getArticlesByModule(
  moduleId: ModuleId,
): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.module === moduleId);
}

export async function getArticlesBySubmodule(
  submoduleId: SubmoduleId,
): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.submodule === submoduleId);
}
