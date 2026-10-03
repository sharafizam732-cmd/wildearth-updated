import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { LatestVideos } from '../components/LatestVideos';
import { CategoryCards } from '../components/CategoryCards';
import { FeaturedVideos } from '../components/FeaturedVideos';
import { ConservationCTA } from '../components/ConservationCTA';
import { NewsletterSection } from '../components/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <main className="space-y-0">
      <HeroSection />
      {/* Latest Videos swapped to top */}
      <LatestVideos />
      <CategoryCards />
      {/* Featured Stories swapped to lower position */}
      <FeaturedVideos />
      <ConservationCTA />
      <NewsletterSection />
    </main>
  );
};
