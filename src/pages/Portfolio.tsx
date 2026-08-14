import { Link } from 'react-router-dom';
import { SectionTitle, Card } from '../components/Card';
import { PriorityBadge, StatusBadge, StageBadge } from '../components/Badge';
import { TBDTag } from '../components/TBDTag';
import { initiatives } from '../data/initiatives';

export function Portfolio() {
  return (
    <div className="space-y-6">
      <SectionTitle subtitle="Every initiative R&D owns, and where it currently stands.">Portfolio</SectionTitle>

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#0B0A07]/8 text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/45">
              <th className="px-5 py-3">Initiative</th>
              <th className="px-5 py-3">Vertical</th>
              <th className="px-5 py-3">Stage</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Sponsor</th>
              <th className="px-5 py-3">Product Lead</th>
              <th className="px-5 py-3">Tech Lead</th>
              <th className="px-5 py-3">Team</th>
              <th className="px-5 py-3">Target Date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Next Decision</th>
            </tr>
          </thead>
          <tbody>
            {initiatives.map((i) => (
              <tr key={i.id} className="border-b border-[#0B0A07]/6 last:border-0 hover:bg-[#F6F7F5]">
                <td className="px-5 py-4">
                  <Link
                    to={i.id === 'RD-001' ? '/clara' : '/roadmap'}
                    className="font-semibold text-[#0B0A07] hover:underline"
                  >
                    {i.id} — {i.name}
                  </Link>
                </td>
                <td className="px-5 py-4 text-[#0B0A07]/70">{i.vertical}</td>
                <td className="px-5 py-4"><StageBadge stage={i.stage} /></td>
                <td className="px-5 py-4"><PriorityBadge priority={i.priority} /></td>
                <td className="px-5 py-4 text-[#0B0A07]/70">
                  {i.sponsor === 'TBD' ? <TBDTag /> : i.sponsor}
                </td>
                <td className="px-5 py-4 text-[#0B0A07]/70">
                  {i.productLead === 'TBD' ? <TBDTag /> : i.productLead}
                </td>
                <td className="px-5 py-4">
                  {i.techLead === 'TBD' ? <TBDTag /> : i.techLead}
                </td>
                <td className="px-5 py-4 text-[#0B0A07]/70">
                  {i.team.length ? i.team.join(', ') : <TBDTag label="Not yet allocated" />}
                </td>
                <td className="px-5 py-4 text-[#0B0A07]/70">
                  {i.targetDate === 'TBD' ? <TBDTag /> : i.targetDate}
                </td>
                <td className="px-5 py-4"><StatusBadge status={i.status} /></td>
                <td className="px-5 py-4 text-[#0B0A07]/60">{i.nextRecommendation === 'TBD' ? <TBDTag /> : i.nextRecommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
