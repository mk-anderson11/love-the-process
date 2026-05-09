import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const sp = await searchParams;

  // The user lands here after clicking the reset email. The auth callback
  // exchanges the code for a session cookie before redirecting, so by the
  // time we render there should already be a session. If there isn't, send
  // them back to /forgot-password to start over.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/forgot-password?error=${encodeURIComponent("Reset link is invalid or expired. Please request a new one.")}`,
    );
  }

  async function updatePassword(formData: FormData) {
    "use server";
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    if (password !== confirm) {
      redirect(
        `/update-password?error=${encodeURIComponent("Passwords do not match.")}`,
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      redirect(
        `/update-password?error=${encodeURIComponent(error.message)}`,
      );
    }

    redirect(
      `/login?notice=${encodeURIComponent("Password updated. Please sign in with your new password.")}`,
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-66px)] items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-fire">
          Almost done
        </p>
        <h1 className="mb-8 font-display text-5xl font-black uppercase leading-[0.95] tracking-wide text-ink">
          New Password
        </h1>

        <p className="mb-6 font-body text-[15px] leading-relaxed text-ink2">
          Choose a new password for {user.email}. Minimum six characters.
        </p>

        {sp.notice && (
          <p className="mb-6 border-l-2 border-fire bg-paper2 px-3 py-3 text-sm text-ink">
            {sp.notice}
          </p>
        )}

        <UpdatePasswordForm action={updatePassword} error={sp.error} />
      </div>
    </section>
  );
}
