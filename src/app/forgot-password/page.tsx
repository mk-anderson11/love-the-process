import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const sp = await searchParams;

  async function sendReset(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "").trim();

    const supabase = await createClient();
    const origin = (await headers()).get("origin") ?? "";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent("/update-password")}`,
    });

    if (error) {
      redirect(
        `/forgot-password?error=${encodeURIComponent(error.message)}`,
      );
    }

    // Generic success notice (do not reveal whether the email exists).
    redirect(
      `/forgot-password?notice=${encodeURIComponent("If an account exists for that email, a reset link is on its way.")}`,
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-66px)] items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-fire">
          Reset password
        </p>
        <h1 className="mb-8 font-display text-5xl font-black uppercase leading-[0.95] tracking-wide text-ink">
          Forgot Password
        </h1>

        <p className="mb-6 font-body text-[15px] leading-relaxed text-ink2">
          Enter the email you used to sign up. We&rsquo;ll send a link you can
          use to set a new password.
        </p>

        {sp.notice && (
          <p className="mb-6 border-l-2 border-fire bg-paper2 px-3 py-3 text-sm text-ink">
            {sp.notice}
          </p>
        )}

        <ForgotPasswordForm action={sendReset} error={sp.error} />

        <p className="mt-6 text-sm text-ink2">
          Remembered it?{" "}
          <Link href="/login" className="text-fire underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
