-- Run this after plans.sql: Dashboard → SQL Editor → New query → paste → Run

-- 1. Who is allowed to edit. Logging in is not enough: your user must also be listed here.
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- A logged-in user can only check their own row (so the admin page can ask "am I an admin?")
drop policy if exists "Users can see own admin row" on public.admins;
create policy "Users can see own admin row"
  on public.admins for select
  to authenticated
  using (user_id = (select auth.uid()));

-- 2. Admins (and only admins) may change plans
drop policy if exists "Admins can update plans" on public.plans;
create policy "Admins can update plans"
  on public.plans for update
  to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));

-- 3. After you create your login (Authentication → Users → Add user), make it an admin.
--    Replace the email, then run just this line:
-- insert into public.admins (user_id) select id from auth.users where email = 'you@example.com';
