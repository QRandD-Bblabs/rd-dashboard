import { Link, Outlet, useLocation } from 'react-router-dom';
import { LogOut, Library, ShieldAlert, Users, Layers, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const links = [
  { to: '/admin/solutions', label: 'Solution Inventory', icon: Library },
  { to: '/admin/initiatives', label: 'Initiatives', icon: Layers },
  { to: '/admin/risks', label: 'Risks', icon: ShieldAlert },
  { to: '/admin/capacity', label: 'Capacity', icon: Users },
];

export function AdminHome() {
  const { signOut } = useAuth();
  const location = useLocation();
  const isRoot = location.pathname === '/admin' || location.pathname === '/admin/';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0B0A07]/10 pb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[#0B0A07]/40">Admin</div>
          <h1 className="text-xl font-bold text-[#0B0A07]">Superadmin Panel</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1.5 rounded-lg border border-[#0B0A07]/12 px-3 py-2 text-xs font-semibold text-[#0B0A07]/70">
            <ExternalLink size={13} /> View public dashboard
          </Link>
          <button onClick={signOut} className="flex items-center gap-1.5 rounded-lg bg-[#0B0A07] px-3 py-2 text-xs font-semibold text-white">
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold ${
              location.pathname.startsWith(l.to)
                ? 'border-[#0B0A07] bg-[#0B0A07] text-white'
                : 'border-[#0B0A07]/12 text-[#0B0A07]/70 hover:bg-[#F6F7F5]'
            }`}
          >
            <l.icon size={15} /> {l.label}
          </Link>
        ))}
      </div>

      {isRoot ? (
        <div className="rounded-xl border border-dashed border-[#0B0A07]/15 px-6 py-10 text-center text-sm text-[#0B0A07]/50">
          Pick a section above to manage its content.
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
