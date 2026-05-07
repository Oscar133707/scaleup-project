
import React from 'react';
import { Reveal } from './shared/Reveal';

const companies = [
  { name: 'Company X', type: 'Tech' },
  { name: 'Future Corp', type: 'AI' },
  { name: 'NextBank', type: 'Fintech' },
  { name: 'Quantum UI', type: 'Design' },
  { name: 'Growth Labs', type: 'SaaS' }
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-background overflow-hidden relative" id="growth">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accentSoft rounded-full blur-[120px] pointer-events-none opacity-30" />

      {/* Stats Row */}
      <div className="container mx-auto px-6 mb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-borderSubtle py-12">
          <Reveal delay={100}>
            <div className="text-center group cursor-pointer py-6 md:py-0 border-b md:border-b-0 border-borderSubtle last:border-b-0">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2 tracking-tighter transition-colors duration-200 group-hover:text-accent">
                45%
              </div>
              <p className="text-secondary text-sm uppercase tracking-widest">Average Growth</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="text-center md:border-x border-borderSubtle md:px-12 group cursor-pointer py-6 md:py-0 border-b md:border-b-0 border-borderSubtle">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2 tracking-tighter transition-colors duration-200 group-hover:text-accent">
                2.5x
              </div>
              <p className="text-secondary text-sm uppercase tracking-widest">Efficiency Gain</p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="text-center group cursor-pointer py-6 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2 tracking-tighter transition-colors duration-200 group-hover:text-accent">
                4.9/5
              </div>
              <p className="text-secondary text-sm uppercase tracking-widest">Client Satisfaction</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div className="mb-24 overflow-hidden relative z-10">
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {[...companies, ...companies, ...companies, ...companies].map((company, idx) => (
            <div key={idx} className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-default">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-2xl font-bold text-primary tracking-tight">{company.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface border border-borderSubtle transition-all cursor-pointer shadow-soft-card hover:shadow-lg">
              <img
                src="https://picsum.photos/seed/p1/800/600"
                alt="Fintech Case"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-30"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/40 to-transparent">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-bold text-accent tracking-widest uppercase mb-2 block">Fintech</span>
                  <h4 className="text-3xl font-bold text-white mb-2">Project Phoenix</h4>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Re-engineering core infrastructure for 12M+ concurrent transactions.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface border border-borderSubtle transition-all cursor-pointer shadow-soft-card hover:shadow-lg">
              <img
                src="https://picsum.photos/seed/v1/800/600"
                alt="Retail Case"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-30"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/40 to-transparent">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-bold text-accent tracking-widest uppercase mb-2 block">Retail</span>
                  <h4 className="text-3xl font-bold text-white mb-2">Vanguard Retail</h4>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Omni-channel luxury experience transformation.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
