import React, { useState } from 'react';
import { Play, Sparkles, Compass, ShieldCheck, Film, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import heroLionImage from '../assets/images/hero_wildlife_cinematic_1790306744723.jpg';

export const HeroSection: React.FC = () => {
  const { navigateTo, openAuth, openVideoPlayer, videos } = useApp();
  const [isPlayingBackgroundVideo, setIsPlayingBackgroundVideo] = useState(false);

  // Marquee featured video for hero
  const featuredVideo = videos.find((v) => v.id === 'vid-01') || videos[0];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#070d0a]">
      {/* Cinematic Background Image or Ambient Video */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroLionImage}
          alt="Serengeti Lioness Pride"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-10000"
          style={{ animationDuration: '20s' }}
        />

        {/* Cinematic Multi-layered Vignette & Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d0a] via-[#070d0a]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d0a] via-transparent to-[#070d0a]/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070d0a]/40 to-[#070d0a]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          {/* Subtle Editorial Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Wildlife Conservation Channel</span>
            <span className="text-emerald-500">·</span>
            <span>4K HDR Documentaries</span>
          </div>

          {/* Primary Headline Required by Prompt */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight font-['Montserrat'] leading-[1.08] text-balance">
            Explore. Discover.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#6ee7b7]">
              Protect.
            </span>
          </h1>

          {/* Subheading Required by Prompt */}
          <p className="text-lg sm:text-xl text-neutral-200 font-normal leading-relaxed text-balance max-w-2xl">
            Discover powerful wildlife and conservation stories from around the world. Stream pristine footage, fund frontline rangers, and support grassroots biodiversity restoration.
          </p>

          {/* Required Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('videos')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#34d399] hover:to-[#10b981] text-[#070d0a] font-bold text-sm tracking-wide uppercase shadow-2xl shadow-emerald-950/80 hover:shadow-emerald-900/90 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Videos
            </button>

            <button
              onClick={() => openAuth('register')}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm tracking-wide border border-white/20 backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              Join Now
            </button>

            {/* Quick Watch Trailer Preview */}
            <button
              onClick={() => openVideoPlayer(featuredVideo)}
              className="inline-flex items-center gap-2.5 px-5 py-4 rounded-xl text-xs font-bold text-emerald-300 hover:text-white transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5 text-emerald-400" />
              </div>
              <span className="underline-offset-4 group-hover:underline">
                Watch Featured Trailer (54 min)
              </span>
            </button>
          </div>

          {/* Transparent Trust Metrics */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg text-neutral-300">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-['Montserrat'] tabular-nums">
                24+
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">Wildlife Documentaries</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-['Montserrat'] tabular-nums">
                100%
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">Vimeo Pro 4K Hosting</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-['Montserrat'] tabular-nums">
                $42k+
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">Funded to Conservation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
