-- AI Tools Hub database schema
-- Run this in Supabase SQL Editor. Keep the service role key server-only.
create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  icon text not null default 'sparkles',
  created_at timestamptz not null default now()
);

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  tagline text not null,
  description text not null,
  logo_url text,
  website_url text not null,
  affiliate_url text,
  category_slug text not null references public.categories(slug) on update cascade on delete restrict,
  tags text[] not null default '{}',
  pricing text not null default 'Check vendor',
  pricing_plans jsonb not null default '[]'::jsonb,
  discount_code text,
  discount_note text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('published','draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Safe to run on projects created from an earlier version of this schema.
alter table public.tools add column if not exists pricing_plans jsonb not null default '[]'::jsonb;
alter table public.tools add column if not exists discount_code text;
alter table public.tools add column if not exists discount_note text;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  status text not null default 'draft' check (status in ('published','draft')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.click_events (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid,
  tool_slug text not null,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists click_events_tool_slug_idx on public.click_events(tool_slug);
create index if not exists click_events_created_at_idx on public.click_events(created_at desc);
create index if not exists tools_status_idx on public.tools(status);
create index if not exists tools_category_idx on public.tools(category_slug);

-- Public visitors can read published content only through the anon client if you later add public DB reads.
alter table public.categories enable row level security;
alter table public.tools enable row level security;
alter table public.posts enable row level security;
alter table public.click_events enable row level security;

-- No anon/authenticated policies are intentionally created. The app currently reads/writes
-- via the server-only service role after admin allowlist verification. Never expose service role key.

insert into public.categories (name,slug,description,icon) values
('AI Writing','ai-writing','Writing, rewriting, and copywriting assistants.','pen-line'),
('AI Image','ai-image','Image generation, editing, and graphic design.','image'),
('AI Video','ai-video','Video generation, editing, and animation.','video'),
('AI Audio & Voice','ai-audio-voice','Voice generation, cloning, music, and audio tools.','audio-lines'),
('AI Chatbots','ai-chatbots','Chatbots, assistants, and AI agents.','bot'),
('AI Coding','ai-coding','Coding assistants and developer productivity.','code'),
('AI Marketing & SEO','ai-marketing-seo','Marketing, SEO, and content growth tools.','megaphone'),
('AI Productivity','ai-productivity','Automation, workflow, and business tools.','workflow'),
('AI Website Builders','ai-website-builders','Build websites and landing pages with AI.','globe'),
('AI Education','ai-education','Learning, teaching, and research assistants.','graduation-cap'),
('AI Presentations','ai-presentations','Create slides, documents, and presentations.','presentation'),
('AI Data & Analytics','ai-data-analytics','Data analysis, visualization, and insights.','chart-no-axes-combined'),
('AI Avatars & Animation','ai-avatars-animation','Talking avatars, doodles, and animation.','user-round'),
('Other AI Tools','other-ai-tools','Discover useful tools across other AI categories.','layers')
on conflict (slug) do nothing;
