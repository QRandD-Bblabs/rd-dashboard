// Central type definitions for the R&D Command Center.
// Data is intentionally decoupled from UI so it can later be swapped for
// live SharePoint / Azure DevOps / repository API integrations.

export type TBD = 'TBD' | 'Needs Definition';

export function isTBD(value: string | undefined | null): boolean {
  if (!value) return true;
  return value === 'TBD' || value === 'Needs Definition';
}

export type Priority = 'P0' | 'P1' | 'P2';

export type Stage =
  | 'Intake'
  | 'Discovery'
  | 'Technical Spike'
  | 'Shaping / Discovery'
  | 'Build / Delivery'
  | 'Client Review'
  | 'Done';

export type InitiativeStatus = 'Active' | 'Shaping' | 'Paused' | 'Blocked' | 'Done';

export type Horizon = 'NOW' | 'NEXT' | 'LATER' | 'EXPLORE';

export interface Person {
  id: string;
  name: string;
  role: string;
  isGap?: boolean; // true when role is unfilled (e.g. Tech Lead TBD)
}

export interface Milestone {
  id: string;
  label: string;
  date: string | TBD;
  proposed?: boolean; // true = Proposed date, not a commitment
  done?: boolean;
}

export interface InitiativeLink {
  label: string;
  url: string;
  kind: 'repo' | 'docs' | 'demo' | 'other';
}

export interface Initiative {
  id: string;
  name: string;
  vertical: string;
  priority: Priority;
  stage: Stage;
  status: InitiativeStatus;
  origin: string;
  horizon: Horizon;

  sponsor: string | TBD;
  productLead: string | TBD;
  techLead: string | TBD;
  team: string[];

  problemUser?: string;
  currentProcess?: string;
  pain?: string;
  businessImpact?: string;

  hypothesis?: string;
  successMetric: string | TBD;

  inScope: string[] | TBD;
  outOfScope: string[] | TBD;

  startDate: string | TBD;
  targetDate: string | TBD;
  targetDateProposed?: boolean;
  milestones: Milestone[];

  repo: string | TBD;
  repoPlatform?: string;
  architectureSummary?: string;
  integrations?: string[];
  dataNotes?: string;

  acceptanceCriteria: string[] | TBD;
  knownLimitations: string[] | TBD;
  reusableComponents: string[] | TBD;
  demoUrl?: string | TBD;
  readmeUrl?: string | TBD;
  learnings?: string[] | TBD;
  nextRecommendation?: string | TBD;

  capacityNote?: string;
  links: InitiativeLink[];
}

export type OpportunityFamily =
  | 'Support / AI'
  | 'AI Governance'
  | 'Intelligent Automation'
  | 'Automation'
  | 'Data & Analytics'
  | 'Software Delivery'
  | 'DevSecOps'
  | 'Knowledge / AI'
  | 'Integration';

export type OpportunityPipelineStatus =
  | 'New'
  | 'Needs Validation'
  | 'Discovery'
  | 'Spike'
  | 'Ready'
  | 'Paused'
  | 'Rejected';

export interface Opportunity {
  id: string;
  name: string;
  family: OpportunityFamily;
  problemPattern: string;
  potentialMvp: string[];
  recommendedEntry: string;
  pipelineStatus: OpportunityPipelineStatus;
}

export type RiskSeverity = 'Low' | 'Medium' | 'Medium / High' | 'High';
export type RiskStatus = 'Open' | 'Mitigating' | 'Closed';

export interface Risk {
  id: string;
  risk: string;
  severity: RiskSeverity;
  initiativeId: string;
  owner: string | TBD;
  mitigation: string | TBD;
  dueDate: string | TBD;
  status: RiskStatus;
  impact?: string[];
}

export interface Decision {
  id: string;
  date: string;
  initiativeId: string;
  decision: string;
  why: string;
  owner: string;
  impact: string;
}

export type ReuseLevel = 'Full' | 'Partial' | 'No';
export type SolutionStatus =
  | 'Research'
  | 'Prototype'
  | 'MVP'
  | 'Validated'
  | 'Reusable'
  | 'Productized'
  | 'Deprecated';

export interface SolutionInventoryItem {
  id: string;
  name: string;
  vertical: string;
  problem: string;
  capability: string;
  status: SolutionStatus;
  productOwner: string | TBD;
  technicalOwner: string | TBD;
  repository: string | TBD;
  demoUrl: string | TBD;
  documentationUrl: string | TBD;
  reuseLevel: ReuseLevel;
  reusableComponents: string[] | TBD;
  knownLimitations: string[] | TBD;
  lastUpdated: string;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  itemCount: number;
  description: string;
}

export interface AcceleratorItem {
  id: string;
  group: 'Application' | 'AI' | 'Data' | 'Platform' | 'QA' | 'Security';
  name: string;
  description: string;
}

export interface CapacityAllocation {
  personId: string;
  name: string;
  currentInitiativeId: string;
  currentInitiativeName: string;
  allocationNote: string;
}

export interface WeeklyReviewCommitment {
  id: string;
  action: string;
  owner: string;
  dueDate: string | TBD;
}
