import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoCard } from './VideoCard';

export const FeaturedVideos: React.FC = () => {
  const { videos, navigateTo } = useApp();

  const featured = videos.filter((v) => v.featured).slice(0, 4);

  return (
    <section className="py-20 bg-[#070d0a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Montserrat']">
              Featured Stories
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Hand-picked wildlife chronicles showcasing extraordinary resilience, rare species behavior, and field research breakthroughs.
            </p>
          </div>

          <button
            onClick={() => navigateTo('videos')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider group"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Video Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};
