export const missionStatement =
  'R&D no existe para construir más cosas. Existe para descubrir, validar y acelerar las ideas correctas antes de invertir en grande.';

export const missionStatementEn =
  'R&D does not exist to build more things. It exists to discover, validate, and accelerate the right ideas before committing to large investment.';

export const teamName = 'R&D — SWAT Team';
export const teamSubtitle = 'From customer conversations to validated, reusable solutions';

export interface OperatingPrinciple {
  id: string;
  title: string;
  description: string;
}

export const operatingPrinciples: OperatingPrinciple[] = [
  {
    id: 'p1',
    title: 'No request goes straight to development',
    description: 'Every initiative is first understood, validated, and prioritized.',
  },
  {
    id: 'p2',
    title: 'Fixed time, variable scope',
    description:
      'No MVP exceeds 2 sprints or 45 calendar days. If it does not fit: reduce scope, run Discovery, run a Technical Spike, pause, reject, or escalate outside R&D.',
  },
  {
    id: 'p3',
    title: 'Discovery before building',
    description: 'If the problem, user, or scope is not sufficiently clear, Discovery runs first. Expected duration: 3–5 days.',
  },
  {
    id: 'p4',
    title: 'Technical uncertainty = Spike',
    description:
      'Relevant doubts about integrations, APIs, data, AI, performance, security, or new technology trigger a Technical Spike. Expected duration: 3–5 days.',
  },
  {
    id: 'p5',
    title: 'Reuse first',
    description:
      'The Solution Inventory is checked before building anything new. If a solution exists: Existing Solution → Fit Check → Adjust if needed → Deliver — it does not walk the full development flow for configuration or light adjustments.',
  },
  {
    id: 'p6',
    title: 'Every delivery must create reusable knowledge',
    description:
      'Every closure must produce: README, demo, known limitations, learnings, next-step decision, and reusable components when applicable.',
  },
];

export const intakeFlow = ['Customer Conversation', 'Opportunity Intake', 'R&D Intake / Review'];

export const intakeOutcomes = [
  'Needs More Info',
  'Discovery',
  'Technical Spike',
  'Ready to Prioritize',
  'Pause / Reject',
  'Existing Solution in Inventory',
];

export const pathANewSolution = [
  'Discovery / Technical Spike',
  'MVP Brief + Definition of Ready',
  'MVP Development',
  'Demo & Validation',
  'Decision',
];

export const pathAOutcomes = ['Scale', 'Iterate', 'Pause', 'Reuse in Accelerator'];

export const pathBExistingSolution = ['Existing Solution in Inventory', 'Fit Check', 'Adjust if needed', 'Deliver'];

export const mentalModel = ['Discover', 'Validate', 'Build', 'Learn', 'Reuse'];

export const roles = {
  productLead: {
    name: 'Verónica Martínez',
    title: 'Product Lead',
    responsibilities: [
      'Define el problema',
      'Define prioridad',
      'Define alcance',
      'Define no-alcance',
      'Define métrica de éxito',
      'Lidera Discovery',
      'Clasifica cambios',
      'Protege el valor de negocio',
      'Prioriza el portafolio',
    ],
  },
  techLead: {
    name: 'TBD',
    title: 'Tech Lead / Delivery Lead',
    isGap: true,
    responsibilities: [
      'Arquitectura',
      'Estimación técnica',
      'Ejecución técnica',
      'Control técnico de alcance',
      'Revisión de código',
      'Calidad',
      'Despliegue',
      'Evaluación de riesgos técnicos',
      'Definir si una incertidumbre requiere Technical Spike',
      'Relación técnica con cliente',
    ],
  },
};

export const centralizationStrategy = {
  sharepoint: {
    label: 'R&D Command Center / Knowledge System of Record',
    contains: [
      'Portfolio', 'Roadmap', 'Solution Inventory', 'Initiative Briefs', 'Research',
      'Knowledge Base', 'Decision Logs', 'Retrospectives', 'Playbooks', 'Accelerator catalog', 'Governance documentation',
    ],
  },
  azureDevOps: {
    label: 'R&D Engineering & Work Management System',
    usedFor: ['Boards', 'Work Items', 'Tasks', 'Bugs', 'Risks', 'Change Requests', 'Delivery tracking', 'Azure Repos', 'CI/CD'],
  },
};

export const repositoryStrategy = [
  {
    initiative: 'Clara',
    code: 'GitHub',
    note: 'No migration before the 26 August delivery. After delivery: tag a stable release, validate README, preserve Git history, migrate to Azure Repos, configure branch policies, update SharePoint links, archive the GitHub repo after validation.',
  },
  {
    initiative: 'Retail',
    code: 'Azure Repos',
    note: 'Management in Azure DevOps. Stays there.',
  },
  {
    initiative: 'Future initiatives',
    code: 'Azure DevOps + Azure Repos',
    note: 'Future standard. GitHub is an exception, not the default.',
  },
];

export const weeklyReviewAgenda = [
  { id: 'portfolio-health', title: 'Portfolio Health', items: ['Active', 'At Risk', 'Blocked', 'Capacity'] },
  { id: 'active-initiatives', title: 'Active Initiatives', items: ['Current Status', 'Last Milestone', 'Next Milestone', 'Risk', 'Decision Needed'] },
  { id: 'next-initiatives', title: 'Next Initiatives', items: ['Ready?', 'Discovery?', 'Spike?', 'Missing Information?'] },
  { id: 'opportunity-intake', title: 'Opportunity Intake (max 2–3 per review)', items: ['Needs Info', 'Discovery', 'Spike', 'Ready', 'Pause', 'Reject'] },
  { id: 'knowledge-reuse', title: 'Knowledge & Reuse', items: ['New learning', 'New component', 'New pattern', 'New decision'] },
];

export const weeklyReviewCommitments: { id: string; action: string; owner: string; dueDate: string }[] = [];
