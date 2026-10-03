import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { VideosArchivePage } from './pages/VideosArchivePage';
import { SingleVideoPage } from './pages/SingleVideoPage';
import { CategoryPage } from './pages/CategoryPage';
import { UserAccountPage } from './pages/UserAccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminVideoManager } from './components/AdminVideoManager';
import { ElementorKitHub } from './components/ElementorKitHub';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'videos':
        return <VideosArchivePage />;
      case 'single-video':
        return <SingleVideoPage />;
      case 'category':
        return <CategoryPage />;
      case 'account':
        return <UserAccountPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'get-involved':
        return <GetInvolvedPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'admin':
        return <AdminVideoManager />;
      case 'elementor-hub':
        return <ElementorKitHub />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070d0a] text-[#e8eee9] antialiased selection:bg-[#10b981] selection:text-[#070d0a]">
      <Header />
      <div className="flex-grow">
        {renderCurrentPage()}
      </div>
      <Footer />

      {/* Global Modals */}
      <VideoPlayerModal />
      <SearchModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
