import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <section className="py-20 bg-[#0b1510] border-t border-b border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400">
          <Mail className="w-6 h-6" />
        </div>

        {/* Heading Required by Prompt */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Montserrat']">
          Stay Connected With Wildlife
        </h2>

        {/* Text Required by Prompt */}
        <p className="text-base text-neutral-300 mt-3 max-w-xl mx-auto">
          Subscribe for new documentaries, wildlife stories and conservation updates.
        </p>

        {/* Form Container */}
        <div className="mt-8 max-w-md mx-auto">
          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 text-sm flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Thank you for joining! You are now subscribed to our monthly dispatch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email Address"
                    required
                    className="w-full px-5 py-3.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-emerald-400 focus:outline-none text-white text-sm placeholder:text-neutral-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-[#10b981] hover:bg-[#34d399] text-[#070d0a] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-950/50"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {error && <p className="text-xs text-rose-400 text-left pl-2">{error}</p>}

              <p className="text-[11px] text-neutral-500 text-center">
                We respect your inbox. No spam. One curated field digest per month.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
