import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, closeAuth, login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset fields when opening modal
  React.useEffect(() => {
    if (isAuthOpen) {
      setError('');
      setPassword('');
    }
  }, [isAuthOpen]);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide your administrator email and password.');
      return;
    }

    setLoading(true);
    const res = login(email, password, 'admin');
    setLoading(false);

    if (!res.success) {
      setError(res.error || 'Authentication failed. Please verify your administrator credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-[#0b1510] border border-[#2d5a47] rounded-3xl overflow-hidden shadow-2xl p-8">
        {/* Close Button */}
        <button
          onClick={closeAuth}
          className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close portal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <BrandLogo size="md" variant="light" />
        </div>

        {/* Header */}
        <div className="mb-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white font-['Montserrat']">
            Administrator Portal
          </h3>
          <p className="text-xs text-neutral-400">
            Secure authentication for Wildlife Conservation Channel management &amp; video curation.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs text-center leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1.5">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="wccvod@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-amber-400 focus:outline-none text-white text-xs font-mono placeholder:text-neutral-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-amber-400 focus:outline-none text-white text-xs font-mono placeholder:text-neutral-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/40 mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In as Administrator'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
