-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run

-- 1. The table
create table if not exists public.plans (
  id          bigint generated always as identity primary key,
  sort_order  int     not null default 0,       -- order on the page (1 = left)
  name        text    not null,
  tagline     text,
  annual      numeric(10,2) not null,           -- monthly price when billed annually
  monthly     numeric(10,2) not null,           -- month-to-month price
  setup_fee   numeric(10,2) not null default 0,
  cta         text    not null default 'Try for free',
  href        text    not null default '#',     -- checkout / booking link
  promo_code  text,                             -- shows a promo box instead of "7-day free trial"
  includes    text,                             -- "Everything in <includes>, plus:"
  popular     boolean not null default false,   -- gold border + "Most popular" ribbon
  features    text[]  not null default '{}',
  created_at  timestamptz not null default now()
);

-- 2. Security: anyone visiting the website may READ plans, nobody may change them with the public key.
--    You edit prices in the Supabase Table Editor (or a future admin page with login).
alter table public.plans enable row level security;

drop policy if exists "Public can read plans" on public.plans;
create policy "Public can read plans"
  on public.plans for select
  to anon, authenticated
  using (true);

-- 3. Starting data (same as src/data/site.js)
insert into public.plans (sort_order, name, tagline, annual, monthly, setup_fee, cta, href, promo_code, includes, popular, features) values
(1, 'Basic', 'Everything you need to capture and answer leads.', 82.50, 99, 197, 'Try for free', '#', null, null, false,
  array['2-way text & email conversations','Facebook & Instagram DM integration','Unlimited calendars','Email marketing','Forms','Unlimited automations','Google Business Profile messaging','Newsletter landing page','Mobile app','Email support','Help center']),
(2, 'Pro', 'AI-powered automation and full marketing tools.', 247.50, 297, 497, 'Get $200 off month 1*', '#', '[YOURCODE]', 'Basic', true,
  array['50+ AI-powered marketing automations','AI chat bot','Lead management pipelines','Client portal integration**','Unlimited pipelines','Lead scoring','Unlimited funnels','Lead magnet funnel & automations','Trackable links','Social media planner','Online community builder','Ads reporting','Unlimited email addresses','Dynamic surveys','Website hosting***','24/7 live chat support','Weekly support office hours']),
(3, 'Premium', 'Done-for-you growth with a dedicated team.', 414.17, 497, 997, 'Book a call', '#', null, 'Pro', false,
  array['Done-for-you account setup','1 custom landing page built by Buildison','Custom automations built for your business','Dedicated account manager','Monthly strategy call','Priority support','Quarterly funnel & campaign review']);
