import type { KnowledgeCategory, AcceleratorItem } from './types';

export const knowledgeCategories: KnowledgeCategory[] = [
  { id: 'ai-agents', name: 'AI & Agents', itemCount: 0, description: 'Agent design, orchestration, avatars, conversational systems.' },
  { id: 'retail', name: 'Retail', itemCount: 0, description: 'Retail operations domain knowledge, inventory and fulfillment flows.' },
  { id: 'fintech', name: 'Finance / Fintech', itemCount: 0, description: 'Financial services domain knowledge.' },
  { id: 'healthcare', name: 'Healthcare', itemCount: 0, description: 'Healthcare domain knowledge.' },
  { id: 'architecture', name: 'Architecture', itemCount: 0, description: 'Reference architectures and technical design notes.' },
  { id: 'data', name: 'Data', itemCount: 0, description: 'Data modeling, pipelines, quality practices.' },
  { id: 'integrations', name: 'Integrations', itemCount: 0, description: 'Integration patterns across APIs and platforms.' },
  { id: 'research', name: 'Research', itemCount: 0, description: 'Exploratory research not yet tied to an initiative.' },
];

export const acceleratorCatalog: AcceleratorItem[] = [
  { id: 'app-frontend', group: 'Application', name: 'Frontend templates', description: 'Starter frontend scaffolds for new initiatives.' },
  { id: 'app-backend', group: 'Application', name: 'Backend templates', description: 'Starter backend scaffolds for new initiatives.' },
  { id: 'app-ui', group: 'Application', name: 'UI components', description: 'Reusable UI component library.' },
  { id: 'app-auth', group: 'Application', name: 'Authentication', description: 'Auth patterns and starter implementations.' },
  { id: 'ai-llm', group: 'AI', name: 'LLM wrapper', description: 'Shared wrapper for LLM calls across initiatives.' },
  { id: 'ai-rag', group: 'AI', name: 'RAG base', description: 'Base retrieval-augmented generation building block.' },
  { id: 'ai-prompt', group: 'AI', name: 'Prompt patterns', description: 'Reusable prompt design patterns.' },
  { id: 'ai-agent', group: 'AI', name: 'Agent patterns', description: 'Reusable agent orchestration patterns.' },
  { id: 'ai-eval', group: 'AI', name: 'Evaluation tooling', description: 'Tooling to evaluate AI use cases before scaling.' },
  { id: 'data-ingest', group: 'Data', name: 'Ingestion', description: 'Reusable data ingestion patterns.' },
  { id: 'data-clean', group: 'Data', name: 'Cleaning', description: 'Reusable data cleaning utilities.' },
  { id: 'data-validate', group: 'Data', name: 'Validation', description: 'Reusable data validation rules.' },
  { id: 'platform-docker', group: 'Platform', name: 'Docker', description: 'Container starter setups.' },
  { id: 'platform-cicd', group: 'Platform', name: 'CI/CD', description: 'Pipeline templates.' },
  { id: 'platform-logging', group: 'Platform', name: 'Logging', description: 'Shared logging setup.' },
  { id: 'platform-health', group: 'Platform', name: 'Health checks', description: 'Standard health-check endpoints.' },
  { id: 'qa-smoke', group: 'QA', name: 'Smoke tests', description: 'Baseline smoke test suite.' },
  { id: 'qa-evidence', group: 'QA', name: 'Acceptance evidence', description: 'Templates for capturing acceptance evidence.' },
  { id: 'sec-checklist', group: 'Security', name: 'MVP security checklist', description: 'Minimum security bar for any MVP delivery.' },
];

export const acceleratorNote =
  'This is a conceptual catalog structure. No components have been formally cataloged yet — population happens as initiatives close and reusable pieces are extracted.';
