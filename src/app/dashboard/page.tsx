import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAllArticles } from "@/lib/content";
import { MODULES } from "@/lib/modules";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const articles = await getAllArticles();
  const { data: progress } = await supabase
    .from("article_progress")
    .select("article_slug, read_at")
    .eq("user_id", user.id);

  const readSlugs = new Set((progress ?? []).map((p) => p.article_slug));

  const moduleStats = MODULES.map((m) => {
    const modArticles = articles.filter((a) => a.module === m.id);
    const readCount = modArticles.filter((a) => readSlugs.has(a.slug)).length;
    const pct = modArticles.length
      ? Math.round((readCount / modArticles.length) * 100)
      : 0;
    return { ...m, total: modArticles.length, readCount, pct };
  });

  const recent = [...(progress ?? [])]
    .sort(
      (a, b) =>
        new Date(b.read_at ?? 0).getTime() -
        new Date(a.read_at ?? 0).getTime(),
    )
    .slice(0, 5)
    .map((p) => articles.find((a) => a.slug === p.article_slug))
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-[900px] px-6 pb-24 pt-32">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-fire">
        Welcome back
      </p>
      <h1 className="mb-12 font-display text-[clamp(36px,6vw,64px)] font-black uppercase leading-[0.95] tracking-wide text-ink">
        Your Progress
      </h1>

      <div className="mb-14 grid gap-[2px] md:grid-cols-3">
        {moduleStats.map((m) => (
          <Link
            key={m.id}
            href={`/library#module-${m.number}`}
            className="block border p-7 transition-colors hover:bg-[#D8E4F0]"
            style={{
              background: "var(--paper2)",
              borderColor: "var(--border2)",
            }}
          >
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink3">
              Module {m.number}
            </div>
            <h3 className="mb-5 font-display text-lg font-extrabold uppercase leading-tight tracking-wide text-ink">
              {m.title}
            </h3>
            <div
              className="mb-3 h-[6px] w-full"
              style={{ background: "var(--paper3)" }}
            >
              <div
                className="h-full"
                style={{ width: `${m.pct}%`, background: "var(--fire)" }}
              />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink2">
              {m.readCount} / {m.total} read · {m.pct}%
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mb-6 font-display text-2xl font-extrabold uppercase tracking-wide text-ink">
        Recently Read
      </h2>
      {recent.length === 0 ? (
        <p className="text-[15px] leading-[1.65] text-ink2">
          Nothing yet. Head to the{" "}
          <Link href="/library" className="text-fire underline">
            library
          </Link>{" "}
          and mark your first article as read.
        </p>
      ) : (
        <ul className="flex flex-col gap-[2px]">
          {recent.map(
            (a) =>
              a && (
                <li key={a.slug}>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="block border p-5 transition-colors hover:bg-[#D8E4F0]"
                    style={{
                      background: "var(--paper2)",
                      borderColor: "var(--border2)",
                    }}
                  >
                    <div className="font-display text-[17px] font-extrabold uppercase tracking-wide text-ink">
                      {a.title}
                    </div>
                  </Link>
                </li>
              ),
          )}
        </ul>
      )}
    </section>
  );
}
