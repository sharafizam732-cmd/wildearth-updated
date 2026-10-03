import React from 'react';
import { ArrowRight, Compass, Trees, ShieldAlert, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CategoryCards: React.FC = () => {
  const { categories, videos, navigateTo } = useApp();

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
        return Compass;
    }
  };

  return (
    <section className="py-20 bg-[#0b1510] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
            Explore Ecosystems
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Montserrat']">
            Browse By Category
          </h2>
          <p className="text-sm text-neutral-400 mt-3">
            Immerse yourself across specialized documentary disciplines, from apex predators to deep-learning ecological sentinels.
          </p>
        </div>

        {/* Visual Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const count = videos.filter((v) => v.category === cat.id).length;
            const countLabel = `${count} ${count === 1 ? 'Documentary' : 'Documentaries'}`;

            return (
              <div
                key={cat.id}
                onClick={() => navigateTo('category', { category: cat.id })}
                className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/10 hover:border-emerald-500/60 transition-all duration-500 flex flex-col justify-end p-7"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay for Contrast Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d0a] via-[#070d0a]/60 to-black/30 group-hover:via-[#070d0a]/75 transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest block">
                    {countLabel}
                  </span>

                  <h3 className="text-2xl font-bold text-white font-['Montserrat'] group-hover:text-emerald-300 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 uppercase tracking-wider">
                      <span>Explore Category</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </span>
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
