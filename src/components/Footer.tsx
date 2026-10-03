import React from 'react';
import { Compass, Instagram, Youtube, Facebook, Mail, ShieldAlert, Award, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.96-4.57V8.75a8.16 8.16 0 0 0 4.81 1.56V6.85a4.86 4.86 0 0 1-1-.16Z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#050907] border-t border-[#1b3326] text-neutral-400 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <button
              onClick={() => navigateTo('home')}
              className="text-left group transition-transform focus:outline-none"
              aria-label="Wildlife Conservation Channel Home"
            >
              <BrandLogo size="md" variant="light" />
            </button>
            <p className="text-xs leading-relaxed text-neutral-400">
              Dedicated to chronicling Earth’s most vulnerable ecosystems through cinematic 4K documentary filmmaking, bio-acoustic artificial intelligence, and grassroots conservation funding.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <Award className="w-4 h-4" />
              <span>100% Verified Conservation Storytelling</span>
            </div>
          </div>

          {/* Column 2: Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-['Montserrat']">
              Information
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#10b981] transition-colors">
                  Who We Are
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('get-involved')} className="hover:text-[#10b981] transition-colors">
                  Get Involved &amp; Crowdfunding
                </button>
              </li>
              <li>
                <a
                  href="https://wireflow.ai/?ref=wccvod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 text-amber-400/90 transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>Creators (Wireflow.ai)</span>
                  <span className="text-[10px]">&#8599;</span>
                </a>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#10b981] transition-colors">
                  Contact & Press
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-[#10b981] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-[#10b981] transition-colors">
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us & Elementor Compatibility Badge */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-['Montserrat']">
              Follow Us
            </h4>
            <p className="text-xs text-neutral-400">
              Join 120,000+ wildlife advocates tracking field dispatches and premiere releases.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/wildlifeconservationchannel?stkn=bHFibThlZWdveG5k&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Follow us on Instagram"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#10b981] hover:border-[#10b981] transition-all hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1DczEPHi4u/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Join our Facebook community"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#10b981] hover:border-[#10b981] transition-all hover:scale-105"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@wildlifeconservationchannel?si=1ynytv4eDDcDuIOG"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="Subscribe on YouTube"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#10b981] hover:border-[#10b981] transition-all hover:scale-105"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@conservation.video?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="Follow us on TikTok"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#10b981] hover:border-[#10b981] transition-all hover:scale-105"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-3 rounded-xl bg-[#0b1510] border border-[#2d5a47]/50 text-[11px] text-neutral-300">
              <span className="font-semibold text-emerald-400 block mb-1">
                Direct Wildlife Impact
              </span>
              100% of premiere documentary proceeds directly fund wildlife telemetry, field rangers, and endangered habitat conservation.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Wildlife Conservation Channel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('privacy')} className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </button>
            <span className="text-neutral-600">&bull;</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-emerald-400 transition-colors">
              Terms &amp; Conditions
            </button>
            <span className="text-neutral-600">&bull;</span>
            <button onClick={() => navigateTo('contact')} className="hover:text-emerald-400 transition-colors">
              Support
            </button>
            <span className="text-neutral-600">&bull;</span>
            <button
              onClick={() => navigateTo('admin')}
              className="hover:text-amber-300 text-neutral-500 transition-colors flex items-center gap-1"
              title="Administrator Video CPT Manager Login"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
