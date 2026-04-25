import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AuthForm } from "../login/AuthForm";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string; notice?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next ?? "/dashboard";

  async function signup(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const nextPath = String(formData.get("next") ?? "/dashboard");

    const supabase = await createClient();
    const origin = (await headers()).get("origin") ?? "";

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    });

    if (error) {
      redirect(
        `/signup?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(nextPath)}`,
      );
    }

    // By default Supabase sends a confirmation email; direct sign-in will fail
    // until the user confirms. We surface a friendly notice here.
    redirect(
      `/signup?notice=${encodeURIComponent("Check your email to confirm your account.")}`,
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-66px)] items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-fire">
          Start learning
        </p>
        <h1 className="mb-8 font-display text-5xl font-black uppercase leading-[0.95] tracking-wide text-ink">
          Create Account
        </h1>

        {sp.notice && (
          <p className="mb-6 border-l-2 border-fire bg-paper2 px-3 py-3 text-sm text-ink">
            {sp.notice}
          </p>
        )}

        <AuthForm
          action={signup}
          submitLabel="Create Account"
          next={next}
          error={sp.error}
        />

        <p className="mt-6 text-sm text-ink2">
          Already have an account?{" "}
          <Link href="/login" className="text-fire underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
