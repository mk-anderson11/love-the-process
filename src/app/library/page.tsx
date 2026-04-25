import Link from "next/link";
import { MODULES, submodulesForModule } from "@/lib/modules";
import { getAllArticles } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const articles = await getAllArticles();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let readSlugs = new Set<string>();
  if (user) {
    const { data } = await supabase
      .from("article_progress")
      .select("article_slug")
      .eq("user_id", user.id);
    readSlugs = new Set((data ?? []).map((r) => r.article_slug));
  }

  return (
    <>
      <section
        className="relative overflow-hidden px-12 pb-20 pt-36"
        style={{ background: "var(--paper)" }}
      >
        <div className="max-w-[900px]">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-fire">
            The Library
          </p>
          <h1 className="mb-7 font-display text-[clamp(42px,7vw,88px)] font-black uppercase leading-[0.95] tracking-wide text-ink">
            Every Article, Organized By Module
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.65] text-ink2">
            Short, simple articles and videos about a wide variety of refinery
            and refinery-adjacent topics. This is not meant to be comprehensive
            in any way. There is always more to learn.
          </p>
        </div>
      </section>

      <section className="px-12 pb-24">
        {MODULES.map((m) => {
          const submodules = submodulesForModule(m.id);
          const modArticles = articles.filter((a) => a.module === m.id);

          return (
            <div
              key={m.id}
              id={`module-${m.number}`}
              className="mb-24 pt-20"
            >
              {/* Module header */}
              <p className="mb-4 font-mono text-[16px] uppercase tracking-[0.28em] text-fire">
                Module {m.number}
              </p>
              <h2 className="mb-3 font-display text-[clamp(26px,4vw,44px)] font-black uppercase tracking-wide text-ink">
                {m.title}
              </h2>
              <p className="mb-6 max-w-[640px] text-[15px] leading-[1.65] text-ink2">
                {m.description}
              </p>
              <div
                className="mb-12 h-[2px]"
                style={{
                  background:
                    "linear-gradient(to right, var(--fire), transparent)",
                }}
              />

              {modArticles.length === 0 ? (
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink3">
                  No articles yet. Run the content port script.
                </p>
              ) : (
                submodules.map((sm) => {
                  const smArticles = modArticles.filter(
                    (a) => a.submodule === sm.id,
                  );
                  if (smArticles.length === 0) return null;
                  return (
                    <div key={sm.id} className="mb-14">
                      {/* Submodule header: mono eyebrow + display heading */}
                      <p className="submod-label mb-2 font-mono text-[12px] uppercase tracking-[0.22em] text-fire">
                        {sm.label}
                      </p>
                      <h3 className="submod-title mb-7 font-display text-[clamp(20px,2.6vw,28px)] font-extrabold uppercase tracking-wide text-ink">
                        {sm.title}
                      </h3>

                      <div className="grid gap-[2px] sm:grid-cols-2 lg:grid-cols-3">
                        {smArticles.map((a) => {
                          const isRead = readSlugs.has(a.slug);
                          return (
                            <Link
                              key={a.slug}
                              href={`/articles/${a.slug}`}
                              className="relative block border p-9 transition-colors hover:bg-[#D8E4F0]"
                              style={{
                                background: "var(--paper2)",
                                borderColor: "var(--border2)",
                              }}
                            >
                              <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink3">
                                <span
                                  className="inline-block h-[6px] w-[6px] rounded-full"
                                  style={{ background: "var(--fire)" }}
                                />
                                {a.type === "video" ? "Video" : "Article"}
                                {isRead && (
                                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-fire">
                                    ✓ Read
                                  </span>
                                )}
                              </div>
                              <h4 className="mb-3 font-display text-xl font-extrabold uppercase leading-tight tracking-wide text-ink">
                                {a.title}
                              </h4>
                              {a.summary && (
                                <p className="text-[14px] leading-[1.5] text-ink2">
                                  {a.summary}
                                </p>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}
