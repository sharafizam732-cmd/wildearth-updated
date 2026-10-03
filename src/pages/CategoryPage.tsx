import React from 'react';
import { Compass, Trees, ShieldAlert, Cpu, ArrowLeft, Film, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoCard } from '../components/VideoCard';
import marineWhaleImage from '../assets/images/wildlife_category_marine_1790306759421.jpg';

export const CategoryPage: React.FC = () => {
  const { currentCategory, categories, videos, navigateTo } = useApp();

  const activeCategoryId = currentCategory || (categories[0]?.id || 'wildlife');
  const matchedCat = categories.find((c) => c.id === activeCategoryId) || {
    id: activeCategoryId,
    title: activeCategoryId.charAt(0).toUpperCase() + activeCategoryId.slice(1).replace(/-/g, ' '),
    description: `Explore all documentaries and films under the ${activeCategoryId} category.`,
    image: marineWhaleImage,
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'wildlife':
        return Compass;
      case 'nature':
        return Trees;
      case 'conservation':
        return ShieldAlert;
      case 'ai-wildlife':
        return Cpu;
      default:
        return Sparkles;
    }
  };

  const Icon = getCategoryIcon(matchedCat.id);
  const categoryVideos = videos.filter((v) => v.category === activeCategoryId);

  return (
    <div className="min-h-screen py-8 bg-[#070d0a]">
      {/* Category Pills Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => navigateTo('category', { category: cat.id })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-emerald-500 text-[#070d0a] border-emerald-400 font-bold shadow-lg shadow-emerald-950/50'
                    : 'bg-[#0b1510] text-neutral-300 border-white/10 hover:border-emerald-500/40 hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Category Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-3xl overflow-hidden min-h-[380px] flex items-center p-8 sm:p-12 border border-white/10 shadow-2xl">
          <img
            src={matchedCat.image}
            alt={matchedCat.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070d0a] via-[#070d0a]/85 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <button
              onClick={() => navigateTo('videos')}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-emerald-400 font-semibold mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Videos</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Icon className="w-3.5 h-3.5" />
              <span>Category Focus</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
              {matchedCat.title}
            </h1>

            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {matchedCat.description}
            </p>

            <div className="text-xs text-emerald-400 font-semibold pt-2">
              Showing {categoryVideos.length} Curated Documentaries
            </div>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categoryVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0b1510] rounded-3xl border border-white/10 p-8 space-y-4">
            <Film className="w-12 h-12 text-neutral-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Documentaries in this Category Yet</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Videos can be added to this category in the Administration section.
            </p>
            <button
              onClick={() => navigateTo('videos')}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider"
            >
              Browse All Videos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
