-- Crude Academy: Supabase schema
-- Run this in the Supabase SQL Editor (or via `supabase db push`).
--
-- Tables:
--   profiles          : one row per auth.users entry, for display name, etc.
--   article_progress  : marks which articles a user has read
--
-- Everything is locked down with Row Level Security so users can only
-- read/write their own rows.

-- ─────────────────────────────────────────────────────────────
-- profiles
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own"   on public.profiles;
drop policy if exists "profiles: update own" on public.profiles;
drop policy if exists "profiles: insert own" on public.profiles;

create policy "profiles: read own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: insert own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles: update own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ─────────────────────────────────────────────────────────────
-- article_progress
-- Tracks read-state per user, per article slug.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.article_progress (
  user_id      uuid not null references auth.users (id) on delete cascade,
  article_slug text not null,
  read_at      timestamptz not null default now(),
  primary key (user_id, article_slug)
);

alter table public.article_progress enable row level security;

drop policy if exists "progress: read own"   on public.article_progress;
drop policy if exists "progress: write own"  on public.article_progress;
drop policy if exists "progress: delete own" on public.article_progress;

create policy "progress: read own"
  on public.article_progress for select
  using (auth.uid() = user_id);

create policy "progress: write own"
  on public.article_progress for insert
  with check (auth.uid() = user_id);

create policy "progress: delete own"
  on public.article_progress for delete
  using (auth.uid() = user_id);

create index if not exists article_progress_user_idx
  on public.article_progress (user_id);
