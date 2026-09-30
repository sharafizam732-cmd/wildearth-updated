import React from 'react';
import { Play, Heart, Clock, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { Video } from '../types';
import { useApp } from '../context/AppContext';

interface VideoCardProps {
  video: Video;
  showPrice?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, showPrice = true }) => {
  const {
    navigateTo,
    openVideoPlayer,
    toggleWishlist,
    isInWishlist,
    isPurchased,
    directBuyNow,
  } = useApp();

  const purchased = isPurchased(video.id);
  const inWishlist = isInWishlist(video.id);

  const handleCardClick = () => {
    navigateTo('single-video', { slug: video.slug });
  };

  const handleQuickWatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (video.isPremium && !purchased) {
      navigateTo('single-video', { slug: video.slug });
    } else {
      openVideoPlayer(video);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#0f1c16]/80 hover:bg-[#14261e] border border-[#213d2f]/70 hover:border-[#10b981]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/40 cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/60">
        <img
          src={video.thumbnail}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c16] via-black/20 to-transparent" />

        {/* Duration Chip (Top Right) */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm text-[11px] font-medium text-neutral-200">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span>{video.duration}</span>
        </div>

        {/* Access Status (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {video.isPremium ? (
            purchased ? (
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 text-[#070d0a] text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Unlocked
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-black text-[11px] font-bold flex items-center gap-1 shadow">
                <Lock className="w-3 h-3" />
                Full Film {video.price > 0 ? `$${video.price.toFixed(2)}` : ''}
              </span>
            )
          ) : (
            <span className="px-2.5 py-1 rounded-md bg-emerald-900/90 border border-emerald-600/50 text-emerald-200 text-[11px] font-semibold">
              Free to Watch
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(video.id);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all backdrop-blur-sm ${
            inWishlist
              ? 'bg-rose-500 text-white'
              : 'bg-black/60 text-neutral-300 hover:text-rose-400 hover:bg-black/80'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Centered Play Button Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <button
            onClick={handleQuickWatch}
            className="w-12 h-12 rounded-full bg-[#10b981] text-[#070d0a] flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform hover:bg-[#34d399]"
            title={video.isPremium && !purchased ? 'Purchase access' : 'Play video'}
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-medium">
            <span className="text-emerald-400 font-semibold">{video.categoryName}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{video.resolution}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{new Date(video.releaseDate).getFullYear()}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mb-2 font-['Montserrat']">
            {video.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            {video.description}
          </p>
        </div>

        {/* Footer Info Row */}
        {showPrice && (
          <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-auto">
            <div className="text-xs">
              {video.isPremium ? (
                purchased ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    In Your Library
                  </span>
                ) : (
                  <div>
                    <span className="text-neutral-400 text-[10px] block">Full Documentary</span>
                    <span className="text-xs font-bold text-amber-400 tabular-nums">
                      {video.price > 0 ? `$${video.price.toFixed(2)}` : 'Premium Film'}
                    </span>
                  </div>
                )
              ) : (
                <div>
                  <span className="text-neutral-400 text-[10px] block">Access</span>
                  <span className="text-sm font-semibold text-emerald-400">Free Stream</span>
                </div>
              )}
            </div>

            <span className="text-[11px] font-semibold text-neutral-400 group-hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>View Film</span>
              <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
