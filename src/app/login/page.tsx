import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthForm } from "./AuthForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next ?? "/dashboard";

  async function login(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const nextPath = String(formData.get("next") ?? "/dashboard");

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      redirect(
        `/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(nextPath)}`,
      );
    }
    redirect(nextPath);
  }

  return (
    <section className="flex min-h-[calc(100vh-66px)] items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-fire">
          Welcome back
        </p>
        <h1 className="mb-8 font-display text-5xl font-black uppercase leading-[0.95] tracking-wide text-ink">
          Sign In
        </h1>

        <AuthForm
          action={login}
          submitLabel="Sign In"
          next={next}
          error={sp.error}
        />

        <p className="mt-6 text-sm text-ink2">
          New here?{" "}
          <Link href="/signup" className="text-fire underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
