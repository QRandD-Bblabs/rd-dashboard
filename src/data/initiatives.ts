import type { Initiative } from './types';

export const initiatives: Initiative[] = [
  {
    id: 'RD-001',
    name: 'Clara',
    vertical: 'AI / Customer Success',
    priority: 'P0',
    stage: 'Build / Delivery',
    status: 'Active',
    origin: 'Customer opportunity — sponsored engagement',
    horizon: 'NOW',

    sponsor: 'Daniel Villareal',
    productLead: 'Verónica Martínez',
    techLead: 'TBD',
    team: ['María Yanes', 'Fabián Lugo', 'Luis Orozco'],

    problemUser: 'Meeting participants in customer video calls (initial use case: Corbeta kick-off).',
    currentProcess:
      'Clara is a virtual agent built on LiveAvatar, Recall.ai, and RAG. It joins a video call via Recall.ai, listens for a participant question, retrieves context through RAG, generates a response, and interacts in the call through the LiveAvatar avatar. A Control Center lets an operator add/remove Clara from a meeting and view usage time and token consumption.',
    pain: 'TBD — not yet documented for this engagement.',
    businessImpact:
      'Immediate goal: use Clara for the kick-off with Corbeta, sponsored by Daniel Villareal (Director de Solutions & Customer Success).',

    hypothesis: 'TBD',
    successMetric: 'TBD',

    inScope: 'Needs Definition',
    outOfScope: 'Needs Definition',

    startDate: 'TBD',
    targetDate: '26 August 2026',
    milestones: [
      { id: 'm1', label: 'Corbeta kick-off', date: '26 August 2026' },
    ],

    repo: 'GitHub (Clara repository)',
    repoPlatform: 'GitHub — exception to the Azure DevOps standard. Migration to Azure Repos planned after 26 Aug delivery.',
    architectureSummary:
      'Control Center → Add Clara to Meeting → Recall.ai connects Clara → Participant asks question → RAG context retrieval → Clara generates response → LiveAvatar interacts in call → Usage / token metrics available → Remove Clara from meeting.',
    integrations: ['LiveAvatar', 'Recall.ai', 'RAG context store'],
    dataNotes: 'TBD',

    acceptanceCriteria: 'Needs Definition',
    knownLimitations: 'Needs Definition',
    reusableComponents: 'Needs Definition',
    demoUrl: 'TBD',
    readmeUrl: 'TBD',
    learnings: 'Needs Definition',
    nextRecommendation: 'TBD',

    capacityNote: '100% of the R&D team is currently focused on Clara.',
    links: [],
  },
  {
    id: 'RET-001',
    name: 'Retail Operations Ecosystem',
    vertical: 'Retail Operations',
    priority: 'P1',
    stage: 'Shaping / Discovery',
    status: 'Shaping',
    origin: 'Internal opportunity — progressive build of a Retail operations ecosystem',
    horizon: 'NEXT',

    sponsor: 'TBD',
    productLead: 'Verónica Martínez',
    techLead: 'TBD',
    team: [],

    problemUser: 'Retail operations teams. Rami provides domain support and business-flow context (not Product Lead, not Tech Lead).',
    currentProcess: 'TBD — subject of Phase 1 Discovery.',
    pain: 'What inventory do we have, and how do we ensure that no product leaves without authorization, validation and traceability?',
    businessImpact:
      'Build progressively toward a Retail operations ecosystem, starting from a small module (Inventory & Controlled Outbound) rather than a full ERP/WMS.',

    hypothesis: 'TBD',
    successMetric: 'TBD',

    inScope: [
      'Phase 1 (Shaping): Inventory & Controlled Outbound',
    ],
    outOfScope: 'Needs Definition',

    startDate: 'TBD',
    targetDate: 'TBD',
    milestones: [],

    repo: 'Azure Repos',
    repoPlatform: 'Azure DevOps (management) + Azure Repos (code) — remains on this stack.',
    architectureSummary:
      'Phase 1 flow: Request → Availability Check → Reservation → Approval → Picking → Verification → Controlled Outbound → Inventory Update → Audit Trail.',
    integrations: [],
    dataNotes: 'TBD',

    acceptanceCriteria: 'Needs Definition',
    knownLimitations: 'Needs Definition',
    reusableComponents: 'Needs Definition',
    demoUrl: 'TBD',
    readmeUrl: 'TBD',
    learnings: 'Needs Definition',
    nextRecommendation: 'Discovery for Phase 1 — Inventory & Controlled Outbound.',

    capacityNote: 'No R&D capacity allocated yet — team is fully committed to Clara.',
    links: [],
  },
];

export const retailRoadmap = [
  { id: 'phase-1', label: 'Phase 1 — Inventory & Controlled Outbound', state: 'Shaping / Discovery' },
  { id: 'phase-2', label: 'Phase 2 — Warehousing', state: 'Later' },
  { id: 'phase-3', label: 'Phase 3 — Dispatching', state: 'Later' },
  { id: 'phase-4', label: 'Phase 4 — Requirements / Replenishment / Procurement', state: 'Later' },
  { id: 'phase-future', label: 'Future — Retail Control Tower / Intelligence', state: 'Future' },
];

export const claraFlowSteps = [
  'Control Center',
  'Add Clara to Meeting',
  'Recall.ai connects Clara',
  'Participant asks question',
  'RAG context retrieval',
  'Clara generates response',
  'LiveAvatar interacts in call',
  'Usage / token metrics available',
  'Remove Clara from meeting',
];

export const claraControlCenterFunctions = [
  'Add Clara to a call',
  'Remove Clara from a call',
  'View usage time',
  'View token consumption',
];

export const claraPendingFields: { field: string; note: string }[] = [
  { field: 'Success Metric', note: 'TBD' },
  { field: 'Acceptance Criteria', note: 'Needs Definition — max. 5 verifiable criteria expected' },
  { field: 'Explicit Scope', note: 'Needs Definition' },
  { field: 'Explicit Out of Scope', note: 'Needs Definition' },
  { field: 'Technical Lead', note: 'TBD' },
  { field: 'Known Limitations', note: 'Needs Definition' },
  { field: 'Reusable Components', note: 'Needs Definition' },
];
