import React from 'react';
import { Compass, ShieldCheck, Heart, Award, Users, Trees, Film, Globe, ExternalLink, Sparkles, Megaphone, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import forestNatureImage from '../assets/images/nature_category_forest_1790306772375.jpg';
import aiTechImage from '../assets/images/ai_wildlife_technology_1790306783625.jpg';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen py-12 bg-[#070d0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Mission & Story</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-['Montserrat'] leading-tight">
            Who We Are
          </h1>
          <p className="text-base sm:text-lg text-emerald-300/90 leading-relaxed font-medium">
            We showcase original content produced by natural history filmmakers who are passionate about wildlife, conservation, nature and adventure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200">
              Short Films
            </span>
            <span className="text-neutral-500">&bull;</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200">
              Documentaries
            </span>
            <span className="text-neutral-500">&bull;</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200">
              Feature Length
            </span>
            <span className="text-neutral-500">&bull;</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200">
              Series
            </span>
          </div>
        </div>

        {/* Visual Story Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
            <img
              src={forestNatureImage}
              alt="Natural History Cinematography"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d0a] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-xs text-neutral-300">
              <span className="font-bold text-white block mb-0.5 font-['Montserrat']">Zero-Interference Filming Ethics</span>
              All footage captured with long-range telephoto arrays, quiet bio-drones, and remote camera sensors without disturbing nesting territories.
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat']">
                Passionate Storytelling for the Living Planet
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                We showcase original content produced by natural history filmmakers who are passionate about wildlife, conservation, nature and adventure.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We will be introducing more titles in the months ahead, watch with no ads and no contracts! Every production celebrates Earth&apos;s magnificent biodiversity and frontline champions preserving our vulnerable ecosystems.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Ad-Free &amp; Contract-Free Commitment</span>
              </div>
              <p className="text-neutral-300">
                Stream independent natural history documentaries directly with total freedom — zero ads, zero tracking, and no recurring contracts.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0b1510] border border-[#2d5a47]/50">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-bold text-white">Direct Impact</h4>
                <p className="text-xs text-neutral-400 mt-1">100% verified field stories and grassroots support.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0b1510] border border-[#2d5a47]/50">
                <Globe className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-bold text-white">Global Reach</h4>
                <p className="text-xs text-neutral-400 mt-1">Expeditions active across 14 countries on 4 continents.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activist Crowdfunding & Petitions Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1812] to-[#070d0a] border border-[#2d5a47] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Megaphone className="w-3.5 h-3.5" />
              <span>For All Activists</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Montserrat']">
              Crowdfunding &amp; Grassroots Petitions
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              For all you activists out there we have our crowdfunding page which enables you to setup a campaign or you can create a petition to draw attention to something you feel passionate about.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('get-involved')}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/50"
              >
                Launch Campaign or Petition &rarr;
              </button>
              <a
                href="https://wireflow.ai/?ref=wccvod"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all"
              >
                <span>Discover Craters (Wireflow)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Craters Feature Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 rounded-3xl bg-[#0b1510] border border-amber-500/30 shadow-2xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creator Ecosystem</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Montserrat']">
              Craters by Wireflow.ai
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Empowering natural history creators, visual artists, and documentary teams with intelligent distribution and creative workflows. Connect directly with the Craters community through Wireflow.
            </p>
            <div>
              <a
                href="https://wireflow.ai/?ref=wccvod"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                <span>Visit Craters on Wireflow.ai</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#070d0a] border border-white/10 space-y-3">
            <span className="text-xs text-neutral-400 uppercase tracking-wider font-mono">Official Integration Link</span>
            <div className="p-3 rounded-xl bg-black border border-white/10 text-xs font-mono text-amber-300 break-all select-all">
              https://wireflow.ai/?ref=wccvod
            </div>
            <p className="text-[11px] text-neutral-400">
              Direct partnership referral for wildlife conservation filmmakers and visual creators.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="py-8 border-t border-b border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat']">
              Our Documentary Catalog
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Short Films, Documentaries, Feature Length and Series with uncompromised biological accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/50 space-y-3">
              <Film className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-white font-['Montserrat']">Short Films &amp; Features</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Cinematic 4K wildlife chronicles ranging from quick field dispatches to comprehensive feature-length wildlife investigations.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/50 space-y-3">
              <Award className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-white font-['Montserrat']">Scientific Veracity</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Co-produced with leading field taxonomists, park rangers, and ecologists to guarantee authentic natural history representation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0b1510] border border-[#2d5a47]/50 space-y-3">
              <Heart className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-white font-['Montserrat']">No Ads &bull; No Contracts</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Watch freely without intrusive advertisements or lock-in subscriptions. New documentary titles introduced continuously.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-white font-['Montserrat']">
            Explore All Films
          </h3>
          <p className="text-xs text-neutral-400">
            Stream Short Films, Feature Films, and Documentaries or launch your own activist campaign.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('videos')}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Browse Documentaries
            </button>
            <button
              onClick={() => navigateTo('get-involved')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all"
            >
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
