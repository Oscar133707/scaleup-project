
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SocialProof } from './components/SocialProof';
import { WhyUs } from './components/WhyUs';
import { Footer } from './components/Footer';



const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative min-h-screen bg-background font-sans selection:bg-accent/20 selection:text-primary">

      <Navbar />

      <main className="overflow-hidden">
        <Hero scrollY={scrollY} />

        <div className="relative z-10 bg-background pt-24 pb-32">
          <Features />
          <WhyUs />
          <SocialProof />
        </div>
      </main>

      <Footer />

    </div>
  );
};

export default App;
