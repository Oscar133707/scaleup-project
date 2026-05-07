import React, { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useAssessmentStore } from '../store/assessmentStore';
import type { PriorityLevel } from '../types/assessment';
import { ASSESSMENT_AREAS } from '../config/assessmentAreas';

const PRIORITY_COLORS: Record<PriorityLevel, string> = {
  'HIGH PRIORITY': 'bg-accent',
  'STRATEGIC': 'bg-amber-500',
  'CRITICAL GAP': 'bg-red-500',
  'SCALABILITY': 'bg-accent',
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' });

function formatAnsweredAt(iso?: string): string | null {
  if (!iso) return null;
  try {
    return dateFormatter.format(new Date(iso));
  } catch {
    return null;
  }
}

function getPriority(rating: number, _areaName: string): PriorityLevel {
  if (rating <= 3) return 'CRITICAL GAP';
  if (rating <= 5) return 'STRATEGIC';
  if (rating <= 7) return 'SCALABILITY';
  return 'HIGH PRIORITY';
}

export function AssessmentResults() {
  const navigate = useNavigate();
  const assessmentId = useAssessmentStore((s) => s.assessmentId);
  const businessType = useAssessmentStore((s) => s.businessType);
  const responses = useAssessmentStore((s) => s.responses);
  const getVisibleAreas = useAssessmentStore((s) => s.getVisibleAreas);
  const markCompleted = useAssessmentStore((s) => s.markCompleted);
  const setCurrentStep = useAssessmentStore((s) => s.setCurrentStep);
  const setResponse = useAssessmentStore((s) => s.setResponse);
  const areas = getVisibleAreas();

  useEffect(() => {
    setCurrentStep(12);
    if (!assessmentId) navigate('/assessment', { replace: true });
  }, [assessmentId, navigate, setCurrentStep]);

  useEffect(() => {
    if (assessmentId) markCompleted();
  }, [assessmentId]);

  useEffect(() => {
    areas.forEach((area) => {
      const r = responses[area.id];
      if (r?.current_state_text && !r.answered_at) {
        setResponse(area.id, {});
      }
    });
  }, []);

  const radarData = useMemo(() => {
    return areas.map((a) => ({
      area: a.name.replace(/ &.+$/, '').slice(0, 12),
      value: responses[a.id]?.current_state_rating ?? 5,
      fullMark: 10,
    }));
  }, [areas, responses]);

  const readinessScore = useMemo(() => {
    if (radarData.length === 0) return 0;
    const sum = radarData.reduce((s, d) => s + d.value, 0);
    return Math.round((sum / radarData.length) * 10);
  }, [radarData]);

  const goalCards = useMemo(() => {
    return areas
      .map((a) => {
        const r = responses[a.id];
        const rating = r?.current_state_rating ?? 5;
        return {
          area: a.name,
          description: r?.future_vision_text || 'No vision set.',
          priority: getPriority(rating, a.name),
          timeline: rating <= 3 ? 'Immediate' : rating <= 5 ? 'Q2 2025' : 'Q4 2025',
          answered_at: r?.answered_at,
        };
      })
      .sort((a, b) => {
        const order: PriorityLevel[] = ['CRITICAL GAP', 'STRATEGIC', 'SCALABILITY', 'HIGH PRIORITY'];
        return order.indexOf(a.priority) - order.indexOf(b.priority);
      })
      .slice(0, 6);
  }, [areas, responses]);

  const topGaps = useMemo(() => {
    return areas
      .map((a) => ({ area: a, rating: responses[a.id]?.current_state_rating ?? 5 }))
      .sort((a, b) => a.rating - b.rating)
      .slice(0, 3);
  }, [areas, responses]);

  if (!assessmentId) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <p className="text-xs sm:text-sm font-bold text-secondary tracking-widest mb-2">ASSESSMENT COMPLETE</p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
        Your 2026 <span className="text-accent">Roadmap</span> is Ready.
      </h1>
      <p className="text-secondary text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl">
        Based on your inputs, we've identified key scaling opportunities and architectural gaps. Your current readiness score is {readinessScore}/100.
      </p>
      <div className="flex flex-wrap gap-3 mb-8 sm:mb-12">
        <button
          type="button"
          className="px-5 py-2.5 rounded-xl border-2 border-borderSubtle text-primary font-medium hover:bg-surface cursor-pointer flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
        <button
          type="button"
          onClick={() => navigate('/assessment/step/1')}
          className="px-5 py-2.5 rounded-xl border-2 border-borderSubtle text-primary font-medium hover:bg-surface cursor-pointer flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Answers
        </button>
        <button
          type="button"
          className="px-5 py-2.5 rounded-xl bg-accent text-white font-bold hover:opacity-95 cursor-pointer flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book Consultation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        <div className="bg-surface rounded-3xl border border-borderSubtle p-5 sm:p-8 shadow-soft-card">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-primary">Readiness Profile</h2>
            <span className="px-2.5 py-1 rounded-lg bg-accent text-white text-xs sm:text-sm font-medium">10 Metrics</span>
          </div>
          <p className="text-secondary text-sm mb-4 sm:mb-6">Cross-functional business capability overview</p>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="area" tick={{ fill: '#64748B', fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                <Radar name="Score" dataKey="value" stroke="#22C55E" fill="#22C55E" fillOpacity={0.4} strokeWidth={2} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface rounded-3xl border border-borderSubtle p-5 sm:p-8 shadow-soft-card">
          <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">3-Year Vision Goals</h2>
          <div className="space-y-3 sm:space-y-4 max-h-72 sm:max-h-80 overflow-y-auto">
            {goalCards.map((g, i) => (
              <div
                key={i}
                className="border-l-4 pl-4 py-2 rounded-r-lg border-borderSubtle bg-background/50"
                style={{ borderLeftColor: g.priority === 'CRITICAL GAP' ? '#ef4444' : g.priority === 'STRATEGIC' ? '#f59e0b' : '#22c55e' }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold uppercase" style={{ color: g.priority === 'CRITICAL GAP' ? '#ef4444' : g.priority === 'STRATEGIC' ? '#f59e0b' : '#22c55e' }}>
                    {g.priority}
                  </span>
                  <span className="text-xs text-secondary">{g.timeline}</span>
                </div>
                <h4 className="font-bold text-primary">{g.area}</h4>
                <p className="text-secondary text-sm line-clamp-2">{g.description}</p>
                {formatAnsweredAt(g.answered_at) && (
                  <p className="text-xs text-secondary mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Answered {formatAnsweredAt(g.answered_at)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">Top Priority Areas</h2>
        <p className="text-secondary text-sm sm:text-base mb-4 sm:mb-6">The biggest growth gaps identified in your assessment.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {topGaps.map(({ area }, i) => (
            <div key={area.id} className="bg-surface rounded-2xl border border-borderSubtle p-5 sm:p-6 shadow-soft-card flex sm:flex-col gap-4 sm:gap-0">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mb-4">
                {i === 0 ? (
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                ) : i === 1 ? (
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </div>
              <h4 className="font-bold text-primary mb-2">{area.name}</h4>
              <p className="text-secondary text-sm mb-3 line-clamp-2">
                {responses[area.id]?.current_state_text || 'No description provided.'}
              </p>
              {formatAnsweredAt(responses[area.id]?.answered_at) && (
                <p className="text-xs text-secondary mb-3 flex items-center gap-1">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Answered {formatAnsweredAt(responses[area.id]?.answered_at)}
                </p>
              )}
              <Link to={`/assessment/step/${areas.findIndex((a) => a.id === area.id) + 1}`} className="text-accent font-medium text-sm hover:underline inline-flex items-center gap-1">
                View details
                <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">Answers Log</h2>
            <p className="text-secondary text-sm mt-1">A record of every area you assessed and when you answered it.</p>
          </div>
        </div>
        <div className="bg-surface rounded-3xl border border-borderSubtle shadow-soft-card overflow-hidden">
          {areas.map((area, index) => {
            const r = responses[area.id];
            const rating = r?.current_state_rating ?? 5;
            const priority = getPriority(rating, area.name);
            const dateLabel = formatAnsweredAt(r?.answered_at);
            const stepIndex = areas.findIndex((a) => a.id === area.id) + 1;
            const priorityColor =
              priority === 'CRITICAL GAP' ? '#ef4444' :
              priority === 'STRATEGIC'    ? '#f59e0b' :
              '#22c55e';

            return (
              <div
                key={area.id}
                className="flex items-center gap-4 px-5 sm:px-6 py-4 border-b border-borderSubtle last:border-b-0 hover:bg-background/60 transition-colors"
              >
                {/* Index */}
                <span className="w-7 h-7 rounded-lg bg-background flex items-center justify-center text-xs font-bold text-secondary flex-shrink-0">
                  {index + 1}
                </span>

                {/* Area name */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary text-sm truncate">{area.name}</p>
                  {r?.current_state_text ? (
                    <p className="text-xs text-secondary truncate mt-0.5">{r.current_state_text.slice(0, 80)}{r.current_state_text.length > 80 ? '…' : ''}</p>
                  ) : (
                    <p className="text-xs text-secondary italic mt-0.5">No answer provided</p>
                  )}
                </div>

                {/* Rating badge */}
                <span
                  className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg text-white text-xs font-bold flex-shrink-0"
                  style={{ background: priorityColor }}
                >
                  {rating}
                </span>

                {/* Date */}
                <div className="flex items-center gap-1.5 flex-shrink-0 min-w-[110px] justify-end sm:justify-start">
                  <svg className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-secondary">
                    {dateLabel ?? <span className="italic">Not recorded</span>}
                  </span>
                </div>

                {/* Edit link */}
                <Link
                  to={`/assessment/step/${stepIndex}`}
                  className="flex-shrink-0 w-7 h-7 rounded-lg border border-borderSubtle flex items-center justify-center text-secondary hover:text-accent hover:border-accent transition-colors"
                  title="Edit this answer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-primary rounded-3xl p-8 sm:p-12 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to scale to 2026?</h2>
        <p className="text-white/90 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
          Join 150+ companies using ScaleUp Studio to transform their architectural vision into market reality.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-white font-bold hover:opacity-95 cursor-pointer"
          >
            Start Implementing Now
          </button>
          <Link
            to="/#growth"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-colors text-center"
          >
            View Case Studies
          </Link>
        </div>
      </div>
    </div>
  );
}
