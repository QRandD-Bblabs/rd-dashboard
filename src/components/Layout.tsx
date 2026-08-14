import { useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Map,
  Users,
  Compass,
  Menu,
  X,
} from 'lucide-react';
import { teamName, teamSubtitle } from '../data/operatingModel';

const navItems = [
  { to: '/', label: 'Executive Overview', icon: LayoutDashboard, end: true },
  { to: '/portfolio', label: 'Portfolio', icon: Layers },
  { to: '/roadmap', label: 'Roadmap', icon: Map },
  { to: '/capacity', label: 'Capacity', icon: Users },
  { to: '/operating-model', label: 'Operating Model', icon: Compass },
];

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F7F5]">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 shrink-0 transform bg-[#0B0A07] text-[#F6F7F5] transition-transform duration-200 lg:translate-x-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div>
                <div className="text-sm font-bold tracking-wide text-[#C7FFDF]">{teamName}</div>
                <div className="mt-1 text-[11px] leading-snug text-[#F6F7F5]/55">{teamSubtitle}</div>
              </div>
              <button className="text-[#F6F7F5]/70 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <div className="mx-6 h-px bg-[#F6F7F5]/10" />
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#B2EA36] text-[#0B0A07]'
                        : 'text-[#F6F7F5]/70 hover:bg-[#F6F7F5]/8 hover:text-[#F6F7F5]'
                    }`
                  }
                >
                  <item.icon size={17} strokeWidth={2} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="px-6 py-5">
              <div className="text-[11px] leading-relaxed text-[#F6F7F5]/40">
                Discover → Validate → Build → Learn → Reuse
              </div>
              <Link to="/admin" className="mt-3 inline-block text-[11px] font-medium text-[#F6F7F5]/30 hover:text-[#F6F7F5]/60">
                Admin
              </Link>
            </div>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className="min-w-0 flex-1 lg:pl-72">
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[#0B0A07]/8 bg-[#F6F7F5]/90 px-4 py-3 backdrop-blur sm:px-8">
            <button
              className="rounded-lg p-2 text-[#0B0A07]/70 hover:bg-[#0B0A07]/5 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="text-sm font-semibold text-[#0B0A07]/70">R&amp;D Command Center</div>
            <div className="ml-auto text-xs text-[#0B0A07]/40">Blackbird Labs</div>
          </header>
          <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-8 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
