import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function Nav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav
      className="nav-safe-top fixed inset-x-0 top-0 z-[200]"
      style={{
        background: "#F3EDE1",
      }}
    >
      <div
        className="flex h-[66px] items-center justify-between border-b px-12"
        style={{
          background: "#F3EDE1",
          borderColor: "rgba(30, 24, 14, 0.10)",
        }}
      >
        <Link
          href="/"
          className="font-display text-[15px] font-black uppercase tracking-[0.28em] text-ink no-underline"
        >
          <span className="text-fire">Crude</span> Academy
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          <li>
            <Link
              href="/library"
              className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink3 transition-colors hover:text-ink"
            >
              Library
            </Link>
          </li>
          {user && (
            <li>
              <Link
                href="/dashboard"
                className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink3 transition-colors hover:text-ink"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {user ? (
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="font-display text-[12px] font-extrabold uppercase tracking-[0.22em] text-white transition-transform hover:-translate-y-px"
              style={{
                background: "var(--fire)",
                padding: "10px 26px",
                clipPath:
                  "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
            >
              Sign Out
            </button>
          </form>
        ) : (
          <Link
            href="/login"
            className="font-display text-[12px] font-extrabold uppercase tracking-[0.22em] text-white no-underline transition-transform hover:-translate-y-px"
            style={{
              background: "var(--fire)",
              padding: "10px 26px",
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
