import React, { useState, useEffect, useCallback } from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { DashboardSection } from '../components/DashboardSection';
import { SocialProof } from '../components/SocialProof';
import { WhyUs } from '../components/WhyUs';
import { Footer } from '../components/Footer';

export function Home() {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  useEffect(() => {
    const scrollToDashboard = () => {
      const el = document.getElementById('dashboard');
      if (el && window.location.hash === '#dashboard') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    scrollToDashboard();
    window.addEventListener('hashchange', scrollToDashboard);
    return () => window.removeEventListener('hashchange', scrollToDashboard);
  }, []);

  return (
    <div className="relative min-h-screen bg-background font-sans selection:bg-accent/20 selection:text-primary">
      <main className="overflow-x-hidden">
        <Hero scrollY={scrollY} />
        <div className="relative z-10 bg-background pt-24 pb-32">
          <Features />
          <DashboardSection />
          <WhyUs />
          <SocialProof />
        </div>
      </main>
      <Footer />
    </div>
  );
}
