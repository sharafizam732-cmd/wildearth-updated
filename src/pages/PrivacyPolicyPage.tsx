import React, { useEffect } from 'react';
import { Shield, ChevronRight, ArrowLeft, Mail, FileText, Lock, Globe, Eye, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrivacyPolicyPage: React.FC = () => {
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
          <span className="text-white font-medium">Privacy Policy</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Official Policy Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">
            Wildlife Conservation Channel (WCC) is committed to protecting your privacy and ensuring transparency in how your information is handled.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                Information We Collect &amp; It&apos;s Use
              </h2>
            </div>
            <p className="text-neutral-300">
              When you browse and use our site we may collect personal data from you. We collect Personal Data from you when you willingly provide us with such information, such as when you contact us with inquiries, respond to one of our surveys. The IP address you use to access our site will be logged along with the dates and times of access. Any and all information that is collected is used to analyze trends, make changes better suited for our visitors and ensure website security. Though you may also browse our site anonymously, but personal data will have to collected in case you were to request our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                Information We Share With Third Parties
              </h2>
            </div>
            <p className="text-neutral-300">
              We will be required to share your information in case of sales or other transfers. In case your personal information is requested by any government or law enforcing body we will share any information as requested. We will also disclose your information to these parties if it is deemed necessary to help identify, contact or bring legal action against anyone damaging, injuring, or interfering both nationally or internationally. In case you request our site for information from other site we will not be held responsible for defragmentation of their privacy policy. Likewise, if you access another site through a link provided by our site you will henceforth not be affected by our privacy policy but rather be required to follow the privacy policy of the current site your visiting.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                Do we use cookies?
              </h2>
            </div>
            <p className="text-neutral-300">
              According to the new law passed by the European Union, we do not require you download any third party cookies or cookies related to our site but for some services or apps related to our site to work properly might be needed, either way you have free control either to accept or reject cookies.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                Do we disclose any information to outside parties?
              </h2>
            </div>
            <p className="text-neutral-300">
              We do not sell, trade, or otherwise transfer to third parties any of your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or providing services for you like &quot;YouTube&quot;, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                Content
              </h2>
            </div>
            <p className="text-neutral-300">
              We will not have any ownership of content shared or posted by users but will have full entitlement to irrevocable, perpetual, non-exclusive, fully paid, worldwide license to use, copy, perform, display, and distribute all material such as, messages, text, files, images, photos, video, sounds, or any other material. By sharing or posting any content on our site we are entitled to full rights required to forbid any of the following aggregation, display, copying, duplication, reproduction, or exploitation of the content.
            </p>
          </section>

          {/* Section 6 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
              Your Consent
            </h2>
            <p className="text-neutral-300">
              By accessing our site, you consent to our websites privacy policy and terms.
            </p>
          </section>

          {/* Section 7 */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/60 space-y-4 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
              Changes to our Privacy Policy
            </h2>
            <p className="text-neutral-300">
              In case a need to change our privacy policy arises, the changes will be posted to this privacy statement, the homepage, and other places we deem appropriate so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we disclose it. We reserve the right to modify this privacy statement at any time, so please check back every once in a while.
            </p>
          </section>

          {/* Section 8: Contact */}
          <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1812] to-[#070d0a] border border-emerald-500/40 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                Contacting Us
              </h2>
            </div>
            <p className="text-neutral-300">
              If there are any questions regarding this privacy policy you may contact us using the information from our &quot;contact&quot; page.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('contact')}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                Go to Contact Page &rarr;
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
