-- R&D Command Center — Supabase schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Model: anyone (anon key) can READ these tables — that's the public dashboard.
-- Only an authenticated user (the superadmin you create under
-- Authentication → Users) can INSERT/UPDATE/DELETE.
--
-- IMPORTANT: before relying on this, go to Authentication → Providers → Email
-- and turn OFF "Allow new users to sign up". Otherwise anyone could create an
-- account and get write access, since any authenticated user passes these
-- policies. Create the one admin account manually instead.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- Solution Inventory
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists solutions (
  id uuid primary key default gen_random_uuid(),
  solution_id text unique not null,
  name text not null,
  vertical text not null default '',
  problem text not null default '',
  capability text not null default '',
  status text not null default 'Research',
  product_owner text not null default 'TBD',
  technical_owner text not null default 'TBD',
  repository text not null default 'TBD',
  demo_url text not null default 'TBD',
  documentation_url text not null default 'TBD',
  reuse_level text not null default 'No',
  reusable_components text[] not null default '{}',
  known_limitations text[] not null default '{}',
  last_updated date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- Initiatives (editable status fields — the rest of the initiative brief
-- stays in the app's static data for now)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists initiatives (
  id uuid primary key default gen_random_uuid(),
  initiative_id text unique not null,
  name text not null,
  vertical text not null default '',
  priority text not null default 'P2',
  stage text not null default 'Intake',
  status text not null default 'Shaping',
  sponsor text not null default 'TBD',
  product_lead text not null default 'TBD',
  tech_lead text not null default 'TBD',
  team text[] not null default '{}',
  target_date text not null default 'TBD',
  capacity_note text not null default '',
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- Risks
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists risks (
  id uuid primary key default gen_random_uuid(),
  risk_id text unique not null,
  risk text not null,
  severity text not null default 'Medium',
  initiative_id text not null default '',
  owner text not null default 'TBD',
  mitigation text not null default 'TBD',
  due_date text not null default 'TBD',
  status text not null default 'Open',
  impact text[] not null default '{}',
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- Capacity — team status (who's on what, right now)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists capacity (
  id uuid primary key default gen_random_uuid(),
  person_id text unique not null,
  name text not null,
  current_initiative_id text not null default '',
  current_initiative_name text not null default '',
  allocation_note text not null default '',
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security: public read, authenticated write
-- ─────────────────────────────────────────────────────────────────────────
alter table solutions enable row level security;
alter table initiatives enable row level security;
alter table risks enable row level security;
alter table capacity enable row level security;

create policy "public read solutions" on solutions for select using (true);
create policy "public read initiatives" on initiatives for select using (true);
create policy "public read risks" on risks for select using (true);
create policy "public read capacity" on capacity for select using (true);

create policy "authenticated write solutions" on solutions for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write initiatives" on initiatives for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write risks" on risks for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write capacity" on capacity for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────────
-- Seed data — mirrors the app's original static content so the tables
-- start populated instead of empty.
-- ─────────────────────────────────────────────────────────────────────────
insert into solutions (solution_id, name, vertical, problem, capability, status, product_owner, technical_owner, repository, demo_url, documentation_url, reuse_level, reusable_components, known_limitations, last_updated)
values (
  'SOL-001',
  'Clara — Virtual Meeting Agent',
  'AI / Customer Success',
  'Answering participant questions live inside a video call using company context.',
  'Video-call agent: Recall.ai call join + RAG-grounded answers + LiveAvatar presence, with a control center for usage/token visibility.',
  'MVP',
  'Verónica Martínez',
  'TBD',
  'GitHub (pre-migration)',
  'TBD',
  'TBD',
  'Partial',
  '{}',
  '{}',
  '2026-08-14'
)
on conflict (solution_id) do nothing;

insert into initiatives (initiative_id, name, vertical, priority, stage, status, sponsor, product_lead, tech_lead, team, target_date, capacity_note)
values
  ('RD-001', 'Clara', 'AI / Customer Success', 'P0', 'Build / Delivery', 'Active', 'Daniel Villareal', 'Verónica Martínez', 'TBD', '{"María Yanes","Fabián Lugo","Luis Orozco"}', '26 August 2026', '100% of the R&D team is currently focused on Clara.'),
  ('RET-001', 'Retail Operations Ecosystem', 'Retail Operations', 'P1', 'Shaping / Discovery', 'Shaping', 'TBD', 'Verónica Martínez', 'TBD', '{}', 'TBD', 'No R&D capacity allocated yet — team is fully committed to Clara.')
on conflict (initiative_id) do nothing;

insert into risks (risk_id, risk, severity, initiative_id, owner, mitigation, due_date, status, impact)
values
  ('RISK-001', 'Tech Lead role is unfilled (TBD)', 'High', 'RD-001', 'TBD', 'TBD', 'TBD', 'Open', '{"Architecture without a formal owner","Technical decisions without a final owner","Quality gate without a formal owner","Deployment and technical risk without an owner"}'),
  ('RISK-002', 'Clara success metric is TBD', 'Medium / High', 'RD-001', 'Verónica Martínez', 'Needs Definition', 'TBD', 'Open', '{"Clara can function technically, but what \"success\" means for the Corbeta kick-off is still undefined."}'),
  ('RISK-003', 'Clara acceptance criteria are TBD', 'High', 'RD-001', 'Verónica Martínez', 'Define a maximum of five verifiable criteria before delivery.', 'TBD', 'Open', '{"No agreed definition of done for the 26 Aug delivery."}'),
  ('RISK-004', 'Repository fragmentation across platforms', 'Medium', 'RD-001', 'TBD', 'Clara stays on GitHub until after 26 Aug delivery, then migrate to Azure Repos. Retail remains on Azure Repos/DevOps. Future initiatives default to Azure DevOps + Azure Repos.', 'TBD', 'Open', '{"Clara is on GitHub, Retail is on Azure Repos, Retail management is in Azure DevOps — no single source of engineering truth yet."}')
on conflict (risk_id) do nothing;

insert into capacity (person_id, name, current_initiative_id, current_initiative_name, allocation_note)
values
  ('maria', 'María Yanes', 'RD-001', 'Clara', '100% currently focused with team'),
  ('fabian', 'Fabián Lugo', 'RD-001', 'Clara', '100% currently focused with team'),
  ('luis', 'Luis Orozco', 'RD-001', 'Clara', '100% currently focused with team')
on conflict (person_id) do nothing;
