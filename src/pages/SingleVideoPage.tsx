import React, { useState } from 'react';
import {
  Play,
  Heart,
  Share2,
  Clock,
  Calendar,
  Lock,
  CheckCircle2,
  ShoppingCart,
  Compass,
  MapPin,
  User,
  Sparkles,
  ChevronRight,
  Film,
  Check,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoCard } from '../components/VideoCard';
import { UniversalVideoPlayer } from '../utils/videoUtils';

export const SingleVideoPage: React.FC = () => {
  const {
    videos,
    currentVideoSlug,
    navigateTo,
    isPurchased,
    directBuyNow,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [isPlayingVimeo, setIsPlayingVimeo] = useState(false);

  // Find active video by slug or default to first
  const video = videos.find((v) => v.slug === currentVideoSlug) || videos[0];
  const purchased = isPurchased(video.id);
  const inWishlist = isInWishlist(video.id);

  // Video playback mode: play trailer by default for unpurchased premium films
  const [playMode, setPlayMode] = useState<'trailer' | 'full'>(
    !purchased && video.isPremium ? 'trailer' : 'full'
  );

  React.useEffect(() => {
    setPlayMode(!purchased && video.isPremium ? 'trailer' : 'full');
  }, [video.id, purchased, video.isPremium]);

  // 4 Related videos from same category or tags
  const relatedVideos = videos
    .filter((v) => v.id !== video.id && (v.category === video.category || v.tags.some((t) => video.tags.includes(t))))
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-[#070d0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400">
          <button onClick={() => navigateTo('home')} className="hover:text-emerald-400 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <button onClick={() => navigateTo('videos')} className="hover:text-emerald-400 transition-colors">
            Videos
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <button
            onClick={() => navigateTo('category', { category: video.category })}
            className="hover:text-emerald-400 transition-colors"
          >
            {video.categoryName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-white font-medium truncate max-w-xs">{video.title}</span>
        </nav>

        {/* TOP: Large Video Player */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-[#2d5a47]/50">
          <div className="w-full h-full relative">
            {/* Active Video Player (Streams Trailer or Full Movie) */}
            <UniversalVideoPlayer
              source={
                playMode === 'trailer' || (!purchased && video.isPremium)
                  ? (video.trailerUrl || video.previewUrl)
                  : (isPlayingVimeo ? video.previewUrl : video.vimeoId)
              }
              title={
                playMode === 'trailer' || (!purchased && video.isPremium)
                  ? `${video.title} - Official Trailer`
                  : video.title
              }
              poster={video.thumbnail}
              fallbackPreviewUrl={video.previewUrl}
            />

            {/* Top-Left: Mode Status Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#10b981]/50 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                <span>
                  {playMode === 'trailer' || (!purchased && video.isPremium)
                    ? 'Official 4K Trailer · Now Playing'
                    : 'Full Documentary · Playing'}
                </span>
              </div>
            </div>

            {/* Top-Right: Quick Actions */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {video.isPremium && !purchased ? (
                <button
                  onClick={() => directBuyNow(video)}
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#34d399] hover:to-[#10b981] text-[#070d0a] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl transition-all active:scale-95"
                  title="Unlock Full Protected Film"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Full Film (${video.price.toFixed(2)})</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlayMode(playMode === 'trailer' ? 'full' : 'trailer')}
                    className="px-3.5 py-1.5 rounded-full bg-black/85 hover:bg-black text-xs font-semibold text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>{playMode === 'trailer' ? 'Watch Full Film' : 'Watch Trailer'}</span>
                  </button>
                  <button
                    onClick={() => setIsPlayingVimeo(!isPlayingVimeo)}
                    className="px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-[11px] font-mono text-neutral-300 border border-white/10 flex items-center gap-1.5 shadow-lg backdrop-blur-md"
                  >
                    <span>{isPlayingVimeo ? 'Source: Direct' : 'Source: Stream'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BELOW PLAYER: Details, Metadata & Purchase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Key Stats */}
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mb-3">
                <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-semibold uppercase tracking-wider">
                  {video.categoryName}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {video.duration}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {new Date(video.releaseDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span>·</span>
                <span className="font-semibold text-white">{video.resolution}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Montserrat']">
                {video.title}
              </h1>
            </div>

            {/* Actions: Add to Wishlist, Share */}
            <div className="flex flex-wrap items-center gap-3 py-4 border-y border-white/10">
              <button
                onClick={() => toggleWishlist(video.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  inWishlist
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 flex items-center gap-2 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Share Video'}</span>
              </button>

              <div className="text-xs text-neutral-400 ml-auto flex items-center gap-2">
                <span>Director:</span>
                <span className="text-white font-medium">{video.director}</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white font-['Montserrat']">About This Documentary</h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {video.longDescription}
              </p>
            </div>

            {/* Species & Field Telemetry */}
            <div className="p-6 rounded-2xl bg-[#0b1510] border border-[#2d5a47]/50 space-y-4">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Scientific Taxonomy & Location
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-400 block mb-1">Filming Coordinates & Reserve:</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{video.location}</span>
                  </div>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-1">Featured Species Tracked:</span>
                  <ul className="text-neutral-200 space-y-1 italic">
                    {video.species.map((sp) => (
                      <li key={sp}>&bull; {sp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Purchase Box / Elementor Pro WooCommerce Widget */}
          <div className="space-y-6">
            <div className="sticky top-28 p-6 rounded-3xl bg-[#0b1510] border border-[#2d5a47] shadow-2xl space-y-6">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                    Access Tier
                  </span>
                  <span className="text-base font-bold text-white">
                    {video.isPremium ? 'Premium Film License' : 'Free Conservation Stream'}
                  </span>
                </div>

                <div className="text-right">
                  {video.isPremium ? (
                    <span className="text-3xl font-extrabold text-white font-['Montserrat'] tabular-nums">
                      ${video.price.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-xl font-bold text-emerald-400">Free</span>
                  )}
                </div>
              </div>

              {/* Purchase Button / Streaming Status */}
              <div>
                {video.isPremium ? (
                  purchased ? (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>You own lifetime streaming rights to this video.</span>
                      </div>
                      <button
                        onClick={() => window.scrollTo({ top: 120, behavior: 'smooth' })}
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Watch Now</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setPlayMode('trailer');
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="w-full py-4 rounded-xl bg-[#10b981] hover:bg-[#34d399] text-[#070d0a] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.01]"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Watch Trailer</span>
                      </button>

                      {/* Unlock Full Film button linked directly to payment gateway website */}
                      <a
                        href={video.unlockUrl || video.vimeoOttUrl || `https://vimeo.com/ondemand/${video.slug || 'wildlife'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#070d0a] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-950/50 transition-all hover:scale-[1.01]"
                      >
                        <Lock className="w-4 h-4 text-[#070d0a]" />
                        <span>Unlock Full Film {video.price > 0 ? `· $${video.price.toFixed(2)}` : ''}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#070d0a]/70" />
                      </a>

                      <p className="text-[11px] text-neutral-400 text-center">
                        Clicking &quot;Unlock Full Film&quot; directs you to the official secure payment gateway.
                      </p>
                    </div>
                  )
                ) : (
                  <button
                    onClick={() => window.scrollTo({ top: 120, behavior: 'smooth' })}
                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Free Stream</span>
                  </button>
                )}
              </div>

              {/* Feature Highlights */}
              <ul className="text-xs text-neutral-300 space-y-2.5 pt-2 border-t border-white/5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Full 4K Ultra HD & Dolby Atmos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Hosted securely on Vimeo Pro CDN</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Multi-language audio & subtitles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Unlimited replay on desktop, tablet, and mobile</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* RELATED VIDEOS: "You May Also Like" */}
        <div className="pt-16 border-t border-white/10 space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat']">
              You May Also Like
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Explore related wildlife documentaries and field chronicles in {video.categoryName}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedVideos.map((rel) => (
              <VideoCard key={rel.id} video={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
