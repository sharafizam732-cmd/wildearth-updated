import React, { useEffect } from 'react';
import { FileText, ChevronRight, ArrowLeft, Shield, CreditCard, AlertCircle, Ban, Copyright, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TermsPage: React.FC = () => {
  const { navigateTo } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen py-12 bg-[#070d0a] text-neutral-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span className="text-white font-medium">Terms &amp; Conditions</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Service Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">
            Please read these terms carefully before accessing or using Wildlife Conservation Channel services, streaming video catalog, or online features.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat'] uppercase tracking-wide">
                DESCRIPTION OF SERVICE
              </h2>
            </div>
            <p className="text-neutral-300">
              WCC is an online media service, providing our members with access to video and audio streamed over the Internet to computers, smartphones, tablets, Internet-connected TVs, and other devices. Filmmakers authorise the WCC service to profile, promote and sell their content.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                Acceptance of Terms of Use
              </h2>
            </div>
            <p className="text-neutral-300">
              These Terms of Use govern your use of the WCC service, including all features and functionalities, video and streaming, audio, written media, our website and user interfaces, and all content and software associated therewith (the WCC service). By using, visiting, or browsing WCC services, you accept and agree to be bound by these Terms of Use.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat'] uppercase tracking-wide">
                BILLING AND PAYMENTS
              </h2>
            </div>
            <p className="text-neutral-300">
              Subscription and all accompanying charges are due in full upon beginning of Your Subscription Term, you give full authorization and access to wildlifeconservationchannel or agents authorized by it, as applicable, to bill Your credit card or other accepted payment method beginning upon the commencement of Your specified subscription term and renew it upon a timely method as is in accordance with the terms of the service plan. This will hold true and viable until you terminate or put on hold your subscription with. Along with acknowledging the fact that wildlifeconservationchannel will provide access to third parties such as banks to clear any transactions that need to be met.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                Disclaimer of Warranties and Limitations of Liability
              </h2>
            </div>
            <p className="text-neutral-300">
              This site is solely provided for informational reasons and provided services for commercial and residential use free of any illegal conduct. Using our services with reasonable care and skill are a must. We cannot be held accountable for any mishap or accident that you may cause by default. We and our suppliers desclaim all warranties, in such a case. Neither we nor suppliers shall be liable for any damages of any kind with the use of this website. We will also be not held reliable in relation to circumstances beyond our control.
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Ban className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat'] uppercase tracking-wide">
                RESTRICTIONS OF USE
              </h2>
            </div>
            <p className="text-neutral-300">
              By browsing or accessing any part or service of our site you agree to not use any automated device, software, process or other such means that may enable you to access or index our site, along with being forbidden to use any and all malicious software or Trojan or any device, software, process that can cause an influence soon the operations and modules of our site, in such an act you will be held viably responsible and be either banned or charged for. Constructing or using malicious means to collect any form of database through the implementation of our site will result in an immediate ban and a full thorough follow up. We hold all rights to retallate to any foreign or Internal body trying to gain unverified and unapproved access our site. This may include precautionary steps such as putting up secure services to reporting to authorities.
            </p>
          </section>

          {/* Section 6 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Copyright className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                Copyright
              </h2>
            </div>
            <p className="text-neutral-300">
              Ever matter or subject published or accessible from our websites and publications is copyright. Apart from fair dealing permitted by the Copyright Act 1968, wildlifeconservationchannel enables visitors and dients to view material provided by wildlifeconservationchannel and be used as long as it is used for original purposes while the subscription holds valid. Additionally, any sharing of content or gaining illegal access to content will be treated as copyright infringement, especially, we ensure that all content used on our web presence is lawful and that no third party rights are violated. Upon any copyright infringement the individual will be subjected to lawful enforcement anywhere on the geographic plane.
            </p>
          </section>

          {/* Section 7 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
              Accuracy of Information
            </h2>
            <p className="text-neutral-300">
              While we use reasonable efforts to furnish accurate and up-to-date information, we makes no warranties or representations as to it being completely accurate, complete, reliable, current or error-free. We assumes no liability or responsibility for any errors or inadvertences or exclusions provided by the content of this Site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
