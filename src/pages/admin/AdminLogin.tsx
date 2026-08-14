import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth, isSupabaseConfigured } from '../../contexts/AuthContext';
import { Card } from '../../components/Card';

export function AdminLogin() {
  const { signIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isAdmin) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) setError(error);
    else navigate('/admin');
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-[#0B0A07] p-2.5 text-[#C7FFDF]">
            <Lock size={18} />
          </div>
          <div>
            <h1 className="text-base font-bold text-[#0B0A07]">Admin sign in</h1>
            <p className="text-xs text-[#0B0A07]/50">R&D Command Center</p>
          </div>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-4 rounded-lg border border-[#F2545B]/30 bg-[#F2545B]/5 px-3 py-2 text-xs text-[#B8232B]">
            Backend not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#0B0A07]/60">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#0B0A07]/15 px-3 py-2 text-sm outline-none focus:border-[#0B0A07]/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#0B0A07]/60">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#0B0A07]/15 px-3 py-2 text-sm outline-none focus:border-[#0B0A07]/40"
            />
          </div>
          {error && <div className="text-xs font-medium text-[#F2545B]">{error}</div>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[#0B0A07] py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </Card>
    </div>
  );
}
