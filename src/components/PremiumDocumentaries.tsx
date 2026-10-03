import React from 'react';
import { Lock, Sparkles, CheckCircle2, Play, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Video } from '../types';

export const PremiumDocumentaries: React.FC = () => {
  const { videos, navigateTo, directBuyNow, openVideoPlayer, isPurchased } = useApp();

  const premiumVideos = videos.filter((v) => v.isPremium).slice(0, 3);

  return (
    <section className="py-24 bg-gradient-to-b from-[#0b1510] via-[#08120d] to-[#070d0a] relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-900/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Pay-Per-View Cinema Access</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            Premium Wildlife Documentaries
          </h2>
          <p className="text-base text-neutral-300 mt-4 leading-relaxed">
            Access exclusive wildlife and conservation documentaries. 100% of individual film sales directly support fieldwork permits, camera crew wages, and local anti-poaching patrol stipends.
          </p>
        </div>

        {/* 3 Featured Premium Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {premiumVideos.map((video) => {
            const purchased = isPurchased(video.id);

            return (
              <div
                key={video.id}
                className="group relative flex flex-col bg-[#0f1c16] rounded-3xl border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-amber-950/20"
              >
                {/* Image */}
                <div
                  onClick={() => navigateTo('single-video', { slug: video.slug })}
                  className="relative aspect-video w-full overflow-hidden cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c16] via-transparent to-black/40" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md bg-amber-500 text-[#070d0a] text-xs font-extrabold tracking-wide uppercase shadow-lg flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      Premium
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 text-xs bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-neutral-200">
                    {video.duration} · {video.resolution}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        {video.categoryName}
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-white tabular-nums font-['Montserrat']">
                          ${video.price.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-neutral-400 block -mt-1">Lifetime Access</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => navigateTo('single-video', { slug: video.slug })}
                      className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer font-['Montserrat']"
                    >
                      {video.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  {/* Buy Now / Watch Button */}
                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                    {purchased ? (
                      <button
                        onClick={() => openVideoPlayer(video)}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Stream Now (Unlocked)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => directBuyNow(video)}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#070d0a] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-950/40 transition-all transform active:scale-95"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Buy Now &bull; ${video.price.toFixed(2)}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
