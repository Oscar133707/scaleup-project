import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from './shared/Reveal';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { useAuthStore } from '../store/authStore';

const SAMPLE_RADAR_DATA = [
  { area: 'STRATEGY', value: 82, fullMark: 100 },
  { area: 'GROWTH', value: 64, fullMark: 100 },
  { area: 'MARKET', value: 70, fullMark: 100 },
  { area: 'ENGINEERING', value: 75, fullMark: 100 },
  { area: 'VISION', value: 91, fullMark: 100 },
];

const VISION_PILLARS = [
  {
    name: 'STRATEGY',
    match: 82,
    description: 'Deep analytical positioning for long-term competitive advantage.',
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'GROWTH',
    match: 64,
    description: 'Proven scaling loops and acquisition acceleration techniques.',
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    name: 'CREATE',
    match: 91,
    description: 'World-class design systems and engineering excellence.',
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

export const DashboardSection: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <section
      className="dashboard-section container mx-auto px-6 mb-32 relative z-10 bg-background scroll-mt-24"
      id="dashboard"
      role="region"
      aria-labelledby="dashboard-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accentSoft text-accent text-xs font-bold tracking-widest uppercase mb-4">
              Your results are in
            </span>
            <h2 id="dashboard-heading" className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
              See the <span className="text-accent">Growth Gap</span>
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Your current trajectory compared against the 2026 industry benchmarks. Scale faster with data-driven architecture.
            </p>
          </div>
        </Reveal>

        {/* Two columns: Radar + Growth card | Vision Pillars */}
        <Reveal delay={100}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-14">
          {/* Left: Radar chart + growth card */}
          <div className="space-y-6">
            <div className="bg-surface rounded-3xl border border-borderSubtle p-6 md:p-8 shadow-soft-card">
              <div className="h-72 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={SAMPLE_RADAR_DATA}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="area" tick={{ fill: '#64748B', fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                    <Radar name="Match" dataKey="value" stroke="#22C55E" fill="#22C55E" fillOpacity={0.35} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-surface rounded-2xl border border-accent/30 p-6 shadow-soft-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accentSoft flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">+45%</p>
                <p className="text-secondary text-sm">Average potential growth increase with modular architecture.</p>
              </div>
            </div>
          </div>

          {/* Right: Vision Pillars */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-6">Vision Pillars</h3>
            <div className="space-y-5">
              {VISION_PILLARS.map((pillar) => (
                <div
                  key={pillar.name}
                  className="bg-surface rounded-2xl border border-borderSubtle p-5 shadow-soft-card"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accentSoft flex items-center justify-center">
                        {pillar.icon}
                      </div>
                      <span className="font-bold text-primary">{pillar.name}</span>
                    </div>
                    <span className="text-xs font-bold text-accent bg-accentSoft px-2.5 py-1 rounded-full">
                      {pillar.match}% Match
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-500"
                      style={{ width: `${pillar.match}%` }}
                    />
                  </div>
                  <p className="text-secondary text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={200}>
        <div className="text-center">
          {user ? (
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-accent text-white font-bold text-lg hover:opacity-95 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              View your assessment
              <span>→</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-accent text-white font-bold text-lg hover:opacity-95 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Start your assessment
              <span>→</span>
            </Link>
          )}
          <p className="text-secondary text-sm mt-4">
            Takes less than 3 minutes • No credit card required
          </p>
        </div>
        </Reveal>
      </div>
    </section>
  );
};
