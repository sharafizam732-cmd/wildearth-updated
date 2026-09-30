import React, { useState } from 'react';
import { X, Play, Lock, CheckCircle2, ShoppingCart, Volume2, ShieldCheck, Film, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Video } from '../types';
import { UniversalVideoPlayer } from '../utils/videoUtils';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideoPlayer, closeVideoPlayer, isPurchased, directBuyNow } = useApp();
  const [isPlayingAlternative, setIsPlayingAlternative] = useState(false);

  if (!activeVideoPlayer) return null;

  const purchased = isPurchased(activeVideoPlayer.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0b1510] border border-[#2d5a47] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070d0a]/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-white font-['Montserrat'] truncate max-w-md">
              {activeVideoPlayer.title}
            </span>
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline truncate max-w-xs">
              Source: {activeVideoPlayer.vimeoId.slice(0, 30)}
              {activeVideoPlayer.vimeoId.length > 30 ? '...' : ''}
            </span>
          </div>

          <button
            onClick={closeVideoPlayer}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {activeVideoPlayer.isPremium && !purchased ? (
            /* Paywall Protected Gate */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#070d0a]/95">
              <img
                src={activeVideoPlayer.thumbnail}
                alt={activeVideoPlayer.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm"
              />
              <div className="relative z-10 max-w-md space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-xl">
                  <Lock className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-white font-['Montserrat']">
                  Premium Documentary Protected
                </h3>

                <p className="text-sm text-neutral-300">
                  This 4K wildlife production is available directly on Vimeo OTT. Stream, rent, or buy with your Vimeo account.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={activeVideoPlayer.vimeoOttUrl || `https://vimeo.com/ondemand/${activeVideoPlayer.slug || activeVideoPlayer.vimeoId || 'wildlife'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00adef] hover:bg-[#0092ca] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-sky-950/50 transition-all hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Watch on Vimeo OTT {activeVideoPlayer.price > 0 ? `· $${activeVideoPlayer.price.toFixed(2)}` : ''}</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* Responsive Video Player (Link, Embed Code, Upload, or Direct Stream) */
            <div className="w-full h-full relative">
              {isPlayingAlternative ? (
                <video
                  src={activeVideoPlayer.previewUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={activeVideoPlayer.thumbnail}
                >
                  Your browser does not support HTML5 video streaming.
                </video>
              ) : (
                <UniversalVideoPlayer
                  source={activeVideoPlayer.vimeoId}
                  title={activeVideoPlayer.title}
                  poster={activeVideoPlayer.thumbnail}
                  fallbackPreviewUrl={activeVideoPlayer.previewUrl}
                />
              )}

              {/* Source Switcher Pill */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAlternative(!isPlayingAlternative)}
                  className="px-3 py-1 rounded-md bg-black/80 hover:bg-black text-[11px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-lg backdrop-blur-md"
                >
                  <Film className="w-3 h-3" />
                  <span>{isPlayingAlternative ? 'Switch to Direct Video Player' : 'Switch to Source Video'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Video Info Bottom Drawer */}
        <div className="p-6 bg-[#09130d] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <span className="text-emerald-400 font-semibold">{activeVideoPlayer.categoryName}</span>
              <span>·</span>
              <span>{activeVideoPlayer.duration}</span>
              <span>·</span>
              <span>{activeVideoPlayer.resolution}</span>
              <span>·</span>
              <span>Director: {activeVideoPlayer.director}</span>
            </div>
            <p className="text-xs text-neutral-300 line-clamp-2 max-w-2xl">
              {activeVideoPlayer.description}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {activeVideoPlayer.isPremium && !purchased && (
              <a
                href={activeVideoPlayer.vimeoOttUrl || `https://vimeo.com/ondemand/${activeVideoPlayer.slug || activeVideoPlayer.vimeoId || 'wildlife'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#00adef] hover:bg-[#0092ca] text-white font-bold text-xs uppercase flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Vimeo OTT</span>
              </a>
            )}
            <button
              onClick={closeVideoPlayer}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
