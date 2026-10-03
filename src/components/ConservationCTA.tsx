import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake, Trees } from 'lucide-react';
import { useApp } from '../context/AppContext';
import forestNatureImage from '../assets/images/nature_category_forest_1790306772375.jpg';

export const ConservationCTA: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="relative py-28 overflow-hidden bg-[#070d0a]">
      {/* Cinematic Wildlife/Nature Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={forestNatureImage}
          alt="Primeval Old-Growth Rainforest"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#070d0a]/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d0a] via-transparent to-[#070d0a]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <HeartHandshake className="w-4 h-4 text-emerald-400" />
          <span>Frontline Wildlife Alliance</span>
        </div>

        {/* Headline Required by Prompt */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-['Montserrat'] leading-[1.15] text-balance max-w-3xl mx-auto">
          Protecting Wildlife.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            Preserving Our Planet.
          </span>
        </h2>

        {/* Short Conservation Message */}
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal text-balance">
          Every film we produce powers direct conservation initiatives on the ground. From protecting habitat corridors in the Congo to outfitting anti-poaching units with thermal camera arrays, your viewership fuels tangible ecological regeneration.
        </p>

        {/* Impact Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-white/10 max-w-3xl mx-auto">
          <div>
            <div className="text-3xl font-extrabold text-white font-['Montserrat']">3.2M</div>
            <div className="text-xs text-neutral-400 mt-1">Acres Monitored</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400 font-['Montserrat']">140+</div>
            <div className="text-xs text-neutral-400 mt-1">Active AI Bio-Sensors</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-['Montserrat']">840</div>
            <div className="text-xs text-neutral-400 mt-1">Frontline Rangers Supported</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-teal-300 font-['Montserrat']">100%</div>
            <div className="text-xs text-neutral-400 mt-1">Independent Production</div>
          </div>
        </div>

        {/* Required Button */}
        <div>
          <button
            onClick={() => navigateTo('about')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-sm tracking-wider uppercase shadow-2xl shadow-emerald-950/80 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
