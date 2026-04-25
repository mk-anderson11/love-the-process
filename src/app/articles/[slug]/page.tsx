import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleNeighbors,
} from "@/lib/content";
import { MODULES } from "@/lib/modules";
import { createClient } from "@/lib/supabase/server";
import { MarkReadButton } from "@/components/MarkReadButton";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const all = await getAllArticles();
  return all.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const mod = MODULES.find((m) => m.id === article.module);
  const { prev, next } = await getArticleNeighbors(article.slug);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isRead = false;
  if (user) {
    const { data } = await supabase
      .from("article_progress")
      .select("article_slug")
      .eq("user_id", user.id)
      .eq("article_slug", article.slug)
      .maybeSingle();
    isRead = !!data;
  }

  return (
    <article className="mx-auto max-w-[760px] px-6 pb-24 pt-32">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-fire">
        {mod ? `Module ${mod.number}: ${mod.title}` : "Article"}
      </p>
      <h1 className="mb-8 font-display text-[clamp(32px,5vw,56px)] font-black uppercase leading-[0.98] tracking-wide text-ink">
        {article.title}
      </h1>

      {article.youtube && (
        <div
          className="mb-10 aspect-video w-full border"
          style={{ borderColor: "var(--border)" }}
        >
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${article.youtube}`}
            title={article.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="prose-lp">
        <MDXRemote source={article.body} />
      </div>

      <div
        className="mt-16 border-t pt-8"
        style={{ borderColor: "var(--border)" }}
      >
        <MarkReadButton slug={article.slug} initiallyRead={isRead} />
      </div>

      {(prev || next) && (
        <nav
          aria-label="Article navigation"
          className="mt-12 grid grid-cols-1 gap-px border-t sm:grid-cols-2"
          style={{ borderColor: "var(--border)" }}
        >
          {prev ? (
            <Link
              href={`/articles/${prev.slug}`}
              className="group flex flex-col gap-2 py-6 pr-6 transition-colors sm:border-r"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fire">
                &larr; Previous
              </span>
              <span className="font-display text-[20px] font-black uppercase leading-tight tracking-wide text-ink transition-colors group-hover:text-fire">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div
              className="hidden sm:block sm:border-r"
              style={{ borderColor: "var(--border)" }}
              aria-hidden="true"
            />
          )}

          {next ? (
            <Link
              href={`/articles/${next.slug}`}
              className="group flex flex-col gap-2 py-6 sm:items-end sm:pl-6 sm:text-right"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fire">
                Next &rarr;
              </span>
              <span className="font-display text-[20px] font-black uppercase leading-tight tracking-wide text-ink transition-colors group-hover:text-fire">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" aria-hidden="true" />
          )}
        </nav>
      )}
    </article>
  );
}
