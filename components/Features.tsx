
import React from 'react';

const pxToRem = (px: number) => `${px / 16}rem`;

const featureData = [
  {
    title: 'START',
    description: 'Launch your business with a solid foundation.',
    className: 'md:col-span-2 md:row-span-2',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'GROWTH',
    description: 'Accelerate acquisition with proven scaling loops.',
    className: 'md:col-span-1 md:row-span-1',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    title: 'CREATE',
    description: 'World-class design and engineering.',
    className: 'md:col-span-1 md:row-span-1',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: 'STRATEGY',
    description: 'Deep analytical insights and positioning to ensure long-term competitive advantage.',
    className: 'md:col-span-2 md:row-span-1',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

export const Features: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-24 mb-32 relative z-10" id="features">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 tracking-tight">
            Everything you need <br />
            <span className="text-accent">to scale.</span>
          </h2>
        </div>
        <p className="text-secondary text-lg max-w-sm text-right hidden md:block">
          Modular expertise for every stage of your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[600px]">
        {featureData.map((feature, idx) => (
          <div
            key={idx}
            className={`group relative p-8 rounded-3xl bg-surface border border-borderSubtle transition-all overflow-hidden flex flex-col justify-between shadow-soft-card hover:shadow-lg cursor-pointer ${feature.className}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-accentSoft flex items-center justify-center border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-colors">
                <div className="text-accent group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-2 line-clamp-2 leading-tight">{feature.title}</h3>
              <p className="text-secondary text-sm leading-relaxed max-w-[90%]">
                {feature.description}
              </p>
            </div>

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accentSoft/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};
