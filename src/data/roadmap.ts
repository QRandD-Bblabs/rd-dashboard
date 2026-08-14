export interface RoadmapItem {
  id: string;
  label: string;
  detail?: string;
}

export const roadmapNow: RoadmapItem[] = [
  { id: 'now-clara', label: 'Clara', detail: 'P0 · Active · Target 26 Aug 2026 · Team allocation 100%' },
];

export const roadmapNext: RoadmapItem[] = [
  { id: 'next-retail', label: 'Retail — Inventory & Controlled Outbound', detail: 'Shaping / Discovery · Date: TBD' },
];

export const roadmapLater: RoadmapItem[] = [
  { id: 'later-warehousing', label: 'Retail — Warehousing' },
  { id: 'later-dispatching', label: 'Retail — Dispatching' },
  { id: 'later-procurement', label: 'Retail — Requirements / Procurement' },
  { id: 'later-control-tower', label: 'Retail — Control Tower' },
  { id: 'later-service-desk', label: 'Service Desk AI' },
  { id: 'later-governance', label: 'AI Governance' },
  { id: 'later-document-ai', label: 'Document AI' },
  { id: 'later-data-foundation', label: 'Data Foundation' },
  { id: 'later-qa-devsecops', label: 'QA / DevSecOps' },
];

export const roadmapExplore: RoadmapItem[] = [
  { id: 'explore-agents', label: 'AI Agents' },
  { id: 'explore-rag', label: 'RAG' },
  { id: 'explore-multimodal', label: 'Multimodal AI' },
  { id: 'explore-cv', label: 'Computer Vision' },
  { id: 'explore-automation', label: 'Intelligent Automation' },
  { id: 'explore-governance', label: 'Agent Governance' },
  { id: 'explore-reusable', label: 'Reusable AI components' },
  { id: 'explore-integration', label: 'Integration patterns' },
];

export const roadmapExploreNote = 'Research topics. Not automatically converted into initiatives.';
