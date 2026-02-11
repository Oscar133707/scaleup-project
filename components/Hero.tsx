
import React from 'react';

interface HeroProps {
  scrollY: number;
}

export const Hero: React.FC<HeroProps> = ({ scrollY }) => {
  const parallaxY = scrollY * 0.4;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Elements - Light Theme */}
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accentSoft rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-6xl md:text-9xl font-heading font-bold text-primary mb-8 tracking-tighter leading-none animate-slide-up" style={{ opacity: 0 }}>
            We live in <span className="text-accent">2026</span>, <br />
            do you?
          </h1>

          <p className="text-xl md:text-2xl text-secondary mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Building the future of scaling with AI-driven strategy and modular architecture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <button className="group relative px-8 py-4 bg-accent text-white rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 cursor-pointer">
              Start Building
              <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="px-8 py-4 text-primary border-2 border-primary rounded-full font-bold text-lg hover:bg-primary hover:text-background transition-colors cursor-pointer">
              Vision 2026
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};
