import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Film, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoCard } from '../components/VideoCard';

export const VideosArchivePage: React.FC = () => {
  const { videos, currentFilter, setVideoFilter } = useApp();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>(() => currentFilter || 'all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (currentFilter) {
      setFilterType(currentFilter);
      setCurrentPage(1);
    }
  }, [currentFilter]);

  const categories = [
    { id: 'all', label: 'All Documentaries' },
    { id: 'short-films', label: 'Short Films (< 40m)' },
    { id: 'feature-films', label: 'Feature Films (40m+)' },
    { id: 'trailers', label: 'Trailers & Previews' },
    { id: 'ai-wildlife', label: 'AI & Wildlife' },
    { id: 'wildlife', label: 'Wildlife' },
    { id: 'nature', label: 'Nature' },
    { id: 'conservation', label: 'Conservation' },
    { id: 'free', label: 'Free to Stream' },
    { id: 'premium', label: 'Premium Only' },
  ];

  // Filter and sort logic
  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        // Search filter
        const query = search.toLowerCase();
        const matchesSearch =
          !query ||
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.tags.some((t) => t.toLowerCase().includes(query)) ||
          video.species.some((s) => s.toLowerCase().includes(query));

        // Category / format filter
        let matchesFilter = true;
        if (filterType === 'all' || filterType === 'documentaries') {
          matchesFilter = true;
        } else if (filterType === 'short-films') {
          const durationNum = parseInt(video.duration, 10) || 0;
          matchesFilter = durationNum > 0 && durationNum < 40;
        } else if (filterType === 'feature-films') {
          const durationNum = parseInt(video.duration, 10) || 0;
          matchesFilter = durationNum >= 40;
        } else if (filterType === 'trailers') {
          matchesFilter = !video.isPremium || Boolean(video.previewUrl);
        } else if (filterType === 'free') {
          matchesFilter = !video.isPremium;
        } else if (filterType === 'premium') {
          matchesFilter = video.isPremium;
        } else {
          matchesFilter = video.category === filterType;
        }

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        }
        if (sortBy === 'popular') {
          return parseFloat(b.viewsCount) - parseFloat(a.viewsCount);
        }
        if (sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (sortBy === 'price-high') {
          return b.price - a.price;
        }
        return 0;
      });
  }, [videos, search, filterType, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage) || 1;
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen py-12 bg-[#070d0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Complete Video Archive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            Wildlife & Conservation Films
          </h1>
          <p className="text-sm text-neutral-400 mt-3 max-w-xl mx-auto">
            Browse our full catalog of award-winning documentaries, scientific field journals, and ecological investigations.
          </p>
        </div>

        {/* Filter & Search Bar Container */}
        <div className="bg-[#0b1510] border border-[#2d5a47]/60 rounded-2xl p-5 mb-10 shadow-xl space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search documentaries, species, locations..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-emerald-400 text-white text-xs placeholder:text-neutral-500 focus:outline-none"
              />
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <span className="text-xs text-neutral-400 flex items-center gap-1.5 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs font-medium focus:outline-none focus:border-emerald-400"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Tabs (Interactive Filter Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-white/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilterType(cat.id);
                  setVideoFilter(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterType === cat.id
                    ? 'bg-emerald-500 text-[#070d0a] shadow-md shadow-emerald-950/40'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        {paginatedVideos.length > 0 ? (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-8 border-t border-white/10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3.5 py-2 rounded-xl bg-[#0b1510] border border-white/10 text-neutral-300 text-xs font-semibold disabled:opacity-40 hover:bg-white/10 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === page
                          ? 'bg-emerald-500 text-[#070d0a]'
                          : 'bg-[#0b1510] text-neutral-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3.5 py-2 rounded-xl bg-[#0b1510] border border-white/10 text-neutral-300 text-xs font-semibold disabled:opacity-40 hover:bg-white/10 flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4 bg-[#0b1510] rounded-3xl border border-white/5">
            <Film className="w-12 h-12 text-neutral-500 mx-auto" />
            <h3 className="text-xl font-bold text-white font-['Montserrat']">No Documentaries Match Filter</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              No films were found matching "{search}". Try clearing filters or searching another keyword.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setFilterType('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 text-[#070d0a] text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
