-- R&D Command Center — migration 002: Opportunities, Roadmap, Knowledge, Accelerator
-- Run this in the Supabase SQL Editor after schema.sql. Safe to re-run.

-- ─────────────────────────────────────────────────────────────────────────
-- Opportunities (customer-derived opportunity backlog)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  opportunity_id text unique not null,
  name text not null,
  family text not null default '',
  problem_pattern text not null default '',
  potential_mvp text[] not null default '{}',
  recommended_entry text not null default '',
  pipeline_status text not null default 'Needs Validation',
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- Roadmap items — Now/Next/Later/Explore columns on the public Roadmap page,
-- plus the Retail phased roadmap (horizon = 'RETAIL_PHASE').
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists roadmap_items (
  id uuid primary key default gen_random_uuid(),
  item_id text unique not null,
  horizon text not null default 'LATER', -- NOW | NEXT | LATER | EXPLORE | RETAIL_PHASE
  label text not null,
  detail text not null default '',
  sort_order int not null default 0
);

-- ─────────────────────────────────────────────────────────────────────────
-- Knowledge Base categories
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists knowledge_categories (
  id uuid primary key default gen_random_uuid(),
  category_id text unique not null,
  name text not null,
  description text not null default '',
  item_count int not null default 0
);

-- ─────────────────────────────────────────────────────────────────────────
-- Accelerator catalog
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists accelerator_items (
  id uuid primary key default gen_random_uuid(),
  item_id text unique not null,
  group_name text not null default 'Application', -- Application | AI | Data | Platform | QA | Security
  name text not null,
  description text not null default ''
);

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security: public read, authenticated write (same model as the
-- tables in schema.sql)
-- ─────────────────────────────────────────────────────────────────────────
alter table opportunities enable row level security;
alter table roadmap_items enable row level security;
alter table knowledge_categories enable row level security;
alter table accelerator_items enable row level security;

create policy "public read opportunities" on opportunities for select using (true);
create policy "public read roadmap_items" on roadmap_items for select using (true);
create policy "public read knowledge_categories" on knowledge_categories for select using (true);
create policy "public read accelerator_items" on accelerator_items for select using (true);

create policy "authenticated write opportunities" on opportunities for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write roadmap_items" on roadmap_items for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write knowledge_categories" on knowledge_categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write accelerator_items" on accelerator_items for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────────
-- Seed data — mirrors the app's original static content.
-- ─────────────────────────────────────────────────────────────────────────
insert into opportunities (opportunity_id, name, family, problem_pattern, potential_mvp, recommended_entry, pipeline_status) values
  ('OPP-001', 'AI Service Desk Copilot', 'Support / AI', 'Equipos de soporte saturados y baja automatización en mesas de servicio.', '{"Ticket classification","Priority","Routing","Suggested response","RAG","Human validation"}', 'Discovery + Technical Spike', 'Needs Validation'),
  ('OPP-002', 'AI Governance Starter Kit', 'AI Governance', 'Uso creciente de ChatGPT / Copilot sin lineamientos claros, con riesgos de privacidad, seguridad y datos.', '{"AI use case intake","Risk classification","Data checklist","Approval workflow","Model/provider registration","Audit evidence"}', 'Discovery', 'Needs Validation'),
  ('OPP-003', 'Document Operations Copilot', 'Intelligent Automation', 'Procesos manuales asociados a documentos.', '{"Document upload","OCR","Structured extraction","Validation","Human review","Structured output"}', 'Technical Spike', 'Needs Validation'),
  ('OPP-004', 'Process Intake & Automation Hub', 'Automation', 'Procesos manuales y automatizaciones fragmentadas.', '{"Request","Validation","Classification","Approval","Automation","Exception","Closure"}', 'Discovery', 'Needs Validation'),
  ('OPP-005', 'Operational Data Foundation', 'Data & Analytics', 'Datos fragmentados, baja trazabilidad y decisiones manuales.', '{"One business question","Two sources","Minimal data model","Quality rules","Basic dashboard"}', 'Discovery + Data Spike', 'Needs Validation'),
  ('OPP-006', 'QA Acceleration Kit', 'Software Delivery', 'Retos en QA, pruebas y velocidad de entrega.', '{"Commit","Build","Lint","Unit tests","API smoke","E2E smoke","Demo deployment"}', 'Internal MVP XS', 'Needs Validation'),
  ('OPP-007', 'Secure Pipeline Starter', 'DevSecOps', 'Seguridad poco integrada en el ciclo de desarrollo.', '{"Secret scanning","Dependency scanning","Critical vulnerability gate","Evidence"}', 'Internal MVP XS', 'Needs Validation'),
  ('OPP-008', 'Enterprise Knowledge Assistant', 'Knowledge / AI', 'Knowledge fragmentation.', '{"Controlled document base","RAG","Answers with citations","Access control","Feedback"}', 'Technical Spike', 'Needs Validation'),
  ('OPP-009', 'API Integration Gateway Lite', 'Integration', 'Integraciones ad-hoc sin manejo estandarizado de fallas, reintentos o logging.', '{"Source","Authentication","Transformation","Target","Timeout","Retry","Logging","Fallback"}', 'MVP XS or Spike depending on API maturity', 'Needs Validation'),
  ('OPP-010', 'AI Use Case Evaluation Workbench', 'AI Governance', 'Falta de un marco consistente para evaluar casos de uso de IA antes de escalar inversión.', '{"Use case","Baseline","Dataset","Model","Metrics","Latency","Cost","Failures","Fallback","Go / Adjust / No-Go"}', 'Internal MVP XS', 'Needs Validation')
on conflict (opportunity_id) do nothing;

insert into roadmap_items (item_id, horizon, label, detail, sort_order) values
  ('now-clara', 'NOW', 'Clara', 'P0 · Active · Target 26 Aug 2026 · Team allocation 100%', 0),
  ('next-retail', 'NEXT', 'Retail — Inventory & Controlled Outbound', 'Shaping / Discovery · Date: TBD', 0),
  ('later-warehousing', 'LATER', 'Retail — Warehousing', '', 0),
  ('later-dispatching', 'LATER', 'Retail — Dispatching', '', 1),
  ('later-procurement', 'LATER', 'Retail — Requirements / Procurement', '', 2),
  ('later-control-tower', 'LATER', 'Retail — Control Tower', '', 3),
  ('later-service-desk', 'LATER', 'Service Desk AI', '', 4),
  ('later-governance', 'LATER', 'AI Governance', '', 5),
  ('later-document-ai', 'LATER', 'Document AI', '', 6),
  ('later-data-foundation', 'LATER', 'Data Foundation', '', 7),
  ('later-qa-devsecops', 'LATER', 'QA / DevSecOps', '', 8),
  ('explore-agents', 'EXPLORE', 'AI Agents', '', 0),
  ('explore-rag', 'EXPLORE', 'RAG', '', 1),
  ('explore-multimodal', 'EXPLORE', 'Multimodal AI', '', 2),
  ('explore-cv', 'EXPLORE', 'Computer Vision', '', 3),
  ('explore-automation', 'EXPLORE', 'Intelligent Automation', '', 4),
  ('explore-governance', 'EXPLORE', 'Agent Governance', '', 5),
  ('explore-reusable', 'EXPLORE', 'Reusable AI components', '', 6),
  ('explore-integration', 'EXPLORE', 'Integration patterns', '', 7),
  ('phase-1', 'RETAIL_PHASE', 'Phase 1 — Inventory & Controlled Outbound', 'Shaping / Discovery', 0),
  ('phase-2', 'RETAIL_PHASE', 'Phase 2 — Warehousing', 'Later', 1),
  ('phase-3', 'RETAIL_PHASE', 'Phase 3 — Dispatching', 'Later', 2),
  ('phase-4', 'RETAIL_PHASE', 'Phase 4 — Requirements / Replenishment / Procurement', 'Later', 3),
  ('phase-future', 'RETAIL_PHASE', 'Future — Retail Control Tower / Intelligence', 'Future', 4)
on conflict (item_id) do nothing;

insert into knowledge_categories (category_id, name, description, item_count) values
  ('ai-agents', 'AI & Agents', 'Agent design, orchestration, avatars, conversational systems.', 0),
  ('retail', 'Retail', 'Retail operations domain knowledge, inventory and fulfillment flows.', 0),
  ('fintech', 'Finance / Fintech', 'Financial services domain knowledge.', 0),
  ('healthcare', 'Healthcare', 'Healthcare domain knowledge.', 0),
  ('architecture', 'Architecture', 'Reference architectures and technical design notes.', 0),
  ('data', 'Data', 'Data modeling, pipelines, quality practices.', 0),
  ('integrations', 'Integrations', 'Integration patterns across APIs and platforms.', 0),
  ('research', 'Research', 'Exploratory research not yet tied to an initiative.', 0)
on conflict (category_id) do nothing;

insert into accelerator_items (item_id, group_name, name, description) values
  ('app-frontend', 'Application', 'Frontend templates', 'Starter frontend scaffolds for new initiatives.'),
  ('app-backend', 'Application', 'Backend templates', 'Starter backend scaffolds for new initiatives.'),
  ('app-ui', 'Application', 'UI components', 'Reusable UI component library.'),
  ('app-auth', 'Application', 'Authentication', 'Auth patterns and starter implementations.'),
  ('ai-llm', 'AI', 'LLM wrapper', 'Shared wrapper for LLM calls across initiatives.'),
  ('ai-rag', 'AI', 'RAG base', 'Base retrieval-augmented generation building block.'),
  ('ai-prompt', 'AI', 'Prompt patterns', 'Reusable prompt design patterns.'),
  ('ai-agent', 'AI', 'Agent patterns', 'Reusable agent orchestration patterns.'),
  ('ai-eval', 'AI', 'Evaluation tooling', 'Tooling to evaluate AI use cases before scaling.'),
  ('data-ingest', 'Data', 'Ingestion', 'Reusable data ingestion patterns.'),
  ('data-clean', 'Data', 'Cleaning', 'Reusable data cleaning utilities.'),
  ('data-validate', 'Data', 'Validation', 'Reusable data validation rules.'),
  ('platform-docker', 'Platform', 'Docker', 'Container starter setups.'),
  ('platform-cicd', 'Platform', 'CI/CD', 'Pipeline templates.'),
  ('platform-logging', 'Platform', 'Logging', 'Shared logging setup.'),
  ('platform-health', 'Platform', 'Health checks', 'Standard health-check endpoints.'),
  ('qa-smoke', 'QA', 'Smoke tests', 'Baseline smoke test suite.'),
  ('qa-evidence', 'QA', 'Acceptance evidence', 'Templates for capturing acceptance evidence.'),
  ('sec-checklist', 'Security', 'MVP security checklist', 'Minimum security bar for any MVP delivery.')
on conflict (item_id) do nothing;
