import React, { useState, useMemo } from 'react';
import { X, Search, Tag, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoCard } from './VideoCard';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, videos } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    videos.forEach((v) => {
      v.tags.forEach((t) => set.add(t));
    });
    return Array.from(set).slice(0, 8);
  }, [videos]);

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!searchTerm.trim() && !selectedTag) return [];

    const query = searchTerm.toLowerCase();
    return videos.filter((video) => {
      const matchesText =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.categoryName.toLowerCase().includes(query) ||
        video.location.toLowerCase().includes(query) ||
        video.species.some((s) => s.toLowerCase().includes(query)) ||
        video.tags.some((t) => t.toLowerCase().includes(query));

      const matchesTag = !selectedTag || video.tags.includes(selectedTag);

      return matchesText && matchesTag;
    });
  }, [videos, searchTerm, selectedTag]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-[#0b1510] border border-[#2d5a47] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-6 border-b border-white/10 bg-[#070d0a]/90 flex items-center gap-4">
          <Search className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, species (e.g. Lion, Whale), tags, or location..."
            className="w-full bg-transparent text-lg text-white placeholder:text-neutral-500 focus:outline-none font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="px-3 py-1.5 rounded-lg bg-white/10 text-neutral-300 hover:text-white text-xs font-semibold"
          >
            Esc
          </button>
        </div>

        {/* Quick Tag Pills (Interactive Filter Controls) */}
        <div className="px-6 py-3 bg-[#0d1a13] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-400 flex items-center gap-1 shrink-0 font-medium">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            Quick Tags:
          </span>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-2.5 py-1 rounded bg-rose-900/60 text-rose-200 border border-rose-700 font-medium shrink-0 flex items-center gap-1"
            >
              <span>Clear Filter</span>
              <X className="w-3 h-3" />
            </button>
          )}
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-md text-xs font-medium shrink-0 transition-colors ${
                selectedTag === tag
                  ? 'bg-emerald-500 text-[#070d0a] font-bold'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-6 overflow-y-auto flex-grow">
          {filteredResults.length > 0 ? (
            <div className="space-y-4">
              <div className="text-xs text-neutral-400">
                Found <span className="text-white font-bold">{filteredResults.length}</span> matching documentaries
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredResults.map((video) => (
                  <div key={video.id} onClick={closeSearch}>
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            </div>
          ) : searchTerm || selectedTag ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-neutral-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-['Montserrat']">No Documentaries Found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                No videos match your criteria. Try searching for "lion", "ocean", "rhino", "camera", or "rainforest".
              </p>
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white font-['Montserrat']">Search Our Conservation Archive</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Type keywords above to discover species, scientific papers, directors, and ecological filming expeditions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
