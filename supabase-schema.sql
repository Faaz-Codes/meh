-- Create extension for UUID generation when needed.
create extension if not exists "pgcrypto";

-- Profiles table maps auth users to a dashboard code.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  dashboard_code text not null check (dashboard_code in ('Fz', 'Rt', 'Ak', 'Ar')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  completed boolean not null default false,
  tracked_on date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.journal (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.habits enable row level security;
alter table public.journal enable row level security;

-- Profiles policies: users can read/update only their own profile.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- Habits policies.
drop policy if exists "habits_select_own" on public.habits;
create policy "habits_select_own"
on public.habits
for select
using (auth.uid() = user_id);

drop policy if exists "habits_insert_own" on public.habits;
create policy "habits_insert_own"
on public.habits
for insert
with check (auth.uid() = user_id);

drop policy if exists "habits_update_own" on public.habits;
create policy "habits_update_own"
on public.habits
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "habits_delete_own" on public.habits;
create policy "habits_delete_own"
on public.habits
for delete
using (auth.uid() = user_id);

-- Journal policies.
drop policy if exists "journal_select_own" on public.journal;
create policy "journal_select_own"
on public.journal
for select
using (auth.uid() = user_id);

drop policy if exists "journal_insert_own" on public.journal;
create policy "journal_insert_own"
on public.journal
for insert
with check (auth.uid() = user_id);

drop policy if exists "journal_update_own" on public.journal;
create policy "journal_update_own"
on public.journal
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "journal_delete_own" on public.journal;
create policy "journal_delete_own"
on public.journal
for delete
using (auth.uid() = user_id);
