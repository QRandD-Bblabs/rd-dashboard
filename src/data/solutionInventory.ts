import type { SolutionInventoryItem } from './types';

// No productized solutions have been formally logged in the inventory yet.
// Clara is surfaced here as the one in-flight build so leadership can see
// where the catalog will grow from once it clears delivery + closure.
export const solutionInventory: SolutionInventoryItem[] = [
  {
    id: 'SOL-001',
    name: 'Clara — Virtual Meeting Agent',
    vertical: 'AI / Customer Success',
    problem: 'Answering participant questions live inside a video call using company context.',
    capability: 'Video-call agent: Recall.ai call join + RAG-grounded answers + LiveAvatar presence, with a control center for usage/token visibility.',
    status: 'MVP',
    productOwner: 'Verónica Martínez',
    technicalOwner: 'TBD',
    repository: 'GitHub (pre-migration)',
    demoUrl: 'TBD',
    documentationUrl: 'TBD',
    reuseLevel: 'Partial',
    reusableComponents: 'Needs Definition',
    knownLimitations: 'Needs Definition',
    lastUpdated: '2026-08-14',
  },
];

export const solutionInventoryNote =
  'The catalog is intentionally sparse today. Every initiative closure is required to produce (or update) a Solution Inventory entry — this is where "do we already have something that solves this?" gets answered before any new build starts.';
