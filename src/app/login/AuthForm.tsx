"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full font-display text-[13px] font-extrabold uppercase tracking-[0.22em] text-white disabled:opacity-60"
      style={{
        background: "var(--fire)",
        padding: "14px 26px",
        clipPath:
          "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
      }}
    >
      {pending ? "…" : label}
    </button>
  );
}

export function AuthForm({
  action,
  submitLabel,
  next,
  error,
}: {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  next?: string;
  error?: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next ?? "/dashboard"} />

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink3">
          Email
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="border bg-paper2 px-4 py-3 font-body text-[15px] text-ink outline-none focus:border-fire"
          style={{ borderColor: "var(--border)" }}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink3">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          autoComplete="current-password"
          className="border bg-paper2 px-4 py-3 font-body text-[15px] text-ink outline-none focus:border-fire"
          style={{ borderColor: "var(--border)" }}
        />
      </label>

      {error && (
        <p className="border-l-2 border-fire bg-paper2 px-3 py-2 text-sm text-ink">
          {error}
        </p>
      )}

      <SubmitButton label={submitLabel} />
    </form>
  );
}
