"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function MarkReadButton({
  slug,
  initiallyRead,
}: {
  slug: string;
  initiallyRead: boolean;
}) {
  const [read, setRead] = useState(initiallyRead);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function toggle() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/login?next=/articles/${slug}`);
      return;
    }

    startTransition(async () => {
      if (read) {
        await supabase
          .from("article_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("article_slug", slug);
        setRead(false);
      } else {
        await supabase
          .from("article_progress")
          .upsert({ user_id: user.id, article_slug: slug });
        setRead(true);
      }
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      className="font-display text-[13px] font-extrabold uppercase tracking-[0.22em] disabled:opacity-60"
      style={{
        background: read ? "transparent" : "var(--fire)",
        color: read ? "var(--ink)" : "#fff",
        border: read ? "1px solid var(--border)" : "none",
        padding: "12px 26px",
        clipPath: read
          ? undefined
          : "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
      }}
    >
      {isPending ? "…" : read ? "✓ Marked as read" : "Mark as read"}
    </button>
  );
}
