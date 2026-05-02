# Crude Academy: Next.js + Supabase

The course-platform rebuild of the Crude Academy refinery-education site.
Next.js 14 (App Router, TypeScript, Tailwind) + Supabase auth/database,
deployed on Vercel.

The original static site still lives one level up (`../index.html`,
`../library.html`, `../articles/`, `../Content/`). Nothing here touches it.

---

## 1. Prerequisites

- Node.js 20+ and npm
- A free Supabase project (https://supabase.com): **you already have this**
- A Vercel account (https://vercel.com): **you already have this**
- Git + a GitHub repo for this folder

## 2. First-time setup

```bash
cd web
npm install
cp .env.local.example .env.local
```

Open your Supabase project → **Project Settings → API** and paste into
`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## 3. Initialize the database

In the Supabase dashboard → **SQL Editor** → New query, paste the contents of
[`supabase/schema.sql`](./supabase/schema.sql) and run it. This creates:

- `public.profiles`: one row per user (auto-populated on signup)
- `public.article_progress`: which articles each user has read
- Row-Level-Security policies so users can only read/write their own rows

## 4. Configure Supabase auth

Supabase dashboard → **Authentication → URL Configuration**:

- **Site URL**: `http://localhost:3000` (dev). Change to your Vercel URL in
  production
- **Redirect URLs**: add both `http://localhost:3000/auth/callback` and
  `https://YOUR-VERCEL-DOMAIN/auth/callback`

For now email/password signup is enabled by default. The app surfaces a
"check your email" notice after signup because Supabase sends a confirm link.
If you'd rather skip that during dev, turn **Confirm email** off under
Authentication → Providers → Email.

## 5. Run it locally

```bash
npm run dev
```

Then open http://localhost:3000. The two sample MDX articles (`welcome`,
`paraffin-basics`) will render immediately. Create an account, mark them as
read, and you'll see your progress on `/dashboard`.

## 6. Port your existing `.docx` content

With `.env.local` filled in and dependencies installed:

```bash
npm run port-content
```

This reads every `.docx` under `../Content/<folder>/`, converts to Markdown
with `mammoth`, and writes `content/articles/<slug>.mdx` with frontmatter.
Edit `scripts/docx-to-mdx.ts` if you need to adjust the folder → module
mapping (it prints any unmapped folders after a run).

After porting:

```bash
npm run dev
```

All articles will show up in `/library`, grouped by module.

## 7. Deploy to Vercel

1. Commit & push this `web/` folder (or the whole repo) to GitHub.
2. Vercel → **New Project** → import the repo.
3. **Root Directory**: `web` (important, the repo root still contains the
   old static site).
4. **Environment Variables**. Add both:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy. Once you have the production URL, go back to Supabase →
   Authentication → URL Configuration and add that URL as both the Site URL
   and as a redirect entry for `/auth/callback`.

## Project layout

```
web/
  src/
    app/
      layout.tsx              root layout: fonts, nav, footer
      page.tsx                homepage
      library/page.tsx        all articles grouped by module
      articles/[slug]/page.tsx article + YouTube embed + mark-read
      dashboard/page.tsx      per-user progress (protected)
      login/                  email+password sign-in
      signup/                 email+password sign-up
      auth/callback/route.ts  Supabase magic-link handoff
      auth/signout/route.ts   POST → log out
      globals.css             design-system tokens + prose styles
    components/
      Nav.tsx                 top bar (server component; reads session)
      Footer.tsx
      MarkReadButton.tsx      toggles article_progress (client component)
    lib/
      modules.ts              3 course modules
      content.ts              MDX frontmatter loader
      supabase/
        client.ts             browser-side Supabase
        server.ts             server-side Supabase (cookies)
        middleware.ts         session refresh + route protection
  middleware.ts               wires the above into Next.js
  content/articles/*.mdx      article source (ported from ../Content/)
  supabase/schema.sql         tables + RLS policies
  scripts/docx-to-mdx.ts      DOCX → MDX porter
```

## What's intentionally NOT here yet

These were out of scope for the initial scaffold; each is a small, contained
follow-up when you're ready:

- OAuth providers (Google, GitHub): just flip them on in Supabase
- Password reset flow: `supabase.auth.resetPasswordForEmail` + a new page
- Storage for article images: use Supabase Storage or put them in
  `public/images/` if they can ship with the repo
- Video watch-position persistence, notes, bookmarks: schema hooks are
  ready to extend `article_progress` into a richer `user_activity` table
