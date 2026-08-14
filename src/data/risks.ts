import type { Risk, Decision } from './types';

export const risks: Risk[] = [
  {
    id: 'RISK-001',
    risk: 'Tech Lead role is unfilled (TBD)',
    severity: 'High',
    initiativeId: 'RD-001',
    owner: 'TBD',
    mitigation: 'TBD',
    dueDate: 'TBD',
    status: 'Open',
    impact: [
      'Architecture without a formal owner',
      'Technical decisions without a final owner',
      'Quality gate without a formal owner',
      'Deployment and technical risk without an owner',
    ],
  },
  {
    id: 'RISK-002',
    risk: 'Clara success metric is TBD',
    severity: 'Medium / High',
    initiativeId: 'RD-001',
    owner: 'Verónica Martínez',
    mitigation: 'Needs Definition',
    dueDate: 'TBD',
    status: 'Open',
    impact: [
      'Clara can function technically, but what "success" means for the Corbeta kick-off is still undefined.',
    ],
  },
  {
    id: 'RISK-003',
    risk: 'Clara acceptance criteria are TBD',
    severity: 'High',
    initiativeId: 'RD-001',
    owner: 'Verónica Martínez',
    mitigation: 'Define a maximum of five verifiable criteria before delivery.',
    dueDate: 'TBD',
    status: 'Open',
    impact: ['No agreed definition of done for the 26 Aug delivery.'],
  },
  {
    id: 'RISK-004',
    risk: 'Repository fragmentation across platforms',
    severity: 'Medium',
    initiativeId: 'RD-001',
    owner: 'TBD',
    mitigation:
      'Clara stays on GitHub until after 26 Aug delivery, then: tag a stable release, validate README, preserve Git history, migrate to Azure Repos, configure branch policies, update SharePoint links, archive GitHub repo. Retail remains on Azure Repos / Azure DevOps. Future initiatives default to Azure DevOps + Azure Repos.',
    dueDate: 'TBD',
    status: 'Open',
    impact: [
      'Clara is on GitHub, Retail is on Azure Repos, Retail management is in Azure DevOps — no single source of engineering truth yet.',
    ],
  },
];

export const decisions: Decision[] = [];
