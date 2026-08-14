import type { Person, CapacityAllocation } from './types';

export const people: Person[] = [
  { id: 'vero', name: 'Verónica Martínez', role: 'Product Lead' },
  { id: 'techlead', name: 'TBD', role: 'Tech Lead / Delivery Lead', isGap: true },
  { id: 'maria', name: 'María Yanes', role: 'R&D Team' },
  { id: 'fabian', name: 'Fabián Lugo', role: 'R&D Team' },
  { id: 'luis', name: 'Luis Orozco', role: 'R&D Team' },
  { id: 'daniel', name: 'Daniel Villareal', role: 'Director de Solutions & Customer Success' },
  { id: 'rami', name: 'Rami', role: 'Domain Support (Retail)' },
];

export const capacity: CapacityAllocation[] = [
  {
    personId: 'maria',
    name: 'María Yanes',
    currentInitiativeId: 'RD-001',
    currentInitiativeName: 'Clara',
    allocationNote: '100% currently focused with team',
  },
  {
    personId: 'fabian',
    name: 'Fabián Lugo',
    currentInitiativeId: 'RD-001',
    currentInitiativeName: 'Clara',
    allocationNote: '100% currently focused with team',
  },
  {
    personId: 'luis',
    name: 'Luis Orozco',
    currentInitiativeId: 'RD-001',
    currentInitiativeName: 'Clara',
    allocationNote: '100% currently focused with team',
  },
];

export const capacitySummary = {
  headline: '100% of the R&D team is effectively committed to Clara.',
  note: 'Individual allocation splits beyond this statement are not tracked. No new initiative can start without freeing capacity or adding headcount.',
};
