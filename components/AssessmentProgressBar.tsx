import React from 'react';
import type { AreaResponse } from '../store/assessmentStore';
import type { AssessmentAreaConfig } from '../types/assessment';

interface Props {
  currentStep: number;
  totalSteps: number;
  responses: Record<number, AreaResponse>;
  areas: AssessmentAreaConfig[];
}

export function AssessmentProgressBar({ currentStep, totalSteps, responses, areas }: Props) {
  const answeredCount = areas.filter(
    (a, i) => i + 1 < currentStep
  ).length;

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-8 sm:mb-10 bg-surface rounded-2xl border border-borderSubtle p-4 sm:p-5 shadow-soft-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #22c55e, #06b6d4)' }}
          >
            {currentStep}
          </div>
          <span className="text-sm font-semibold text-primary">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary hidden sm:inline">
            {answeredCount} of {totalSteps} completed
          </span>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-bold text-white tabular-nums"
            style={{ background: 'linear-gradient(135deg, #22c55e, #06b6d4)', minWidth: 48, textAlign: 'center' }}
          >
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Progress bar track */}
      <div
        className="w-full rounded-full mb-4 overflow-hidden"
        style={{ height: 10, background: '#E5E7EB', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #22c55e 0%, #84cc16 55%, #06b6d4 100%)',
            boxShadow: '0 0 10px rgba(34,197,94,0.55)',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-end justify-between gap-0.5">
        {areas.map((area, index) => {
          const stepIndex = index + 1;
          const isCompleted = stepIndex < currentStep;
          const isCurrent = stepIndex === currentStep;
          const hasContent = (responses[area.id]?.current_state_text ?? '').length > 0;

          const dotSize = isCurrent ? 28 : 20;
          let bg = '#E5E7EB';
          if (isCompleted && hasContent) bg = '#22c55e';
          else if (isCompleted) bg = '#86efac';
          else if (isCurrent) bg = '#22c55e';

          return (
            <div key={area.id} className="flex flex-col items-center gap-1" style={{ flex: 1, minWidth: 0 }}>
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  width: dotSize,
                  height: dotSize,
                  background: bg,
                  boxShadow: isCurrent
                    ? '0 0 0 4px rgba(34,197,94,0.2), 0 2px 10px rgba(34,197,94,0.4)'
                    : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {isCompleted ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : isCurrent ? (
                  <span
                    style={{ width: 9, height: 9, borderRadius: '50%', background: 'white', display: 'block' }}
                  />
                ) : null}
              </div>
              <span
                className="hidden sm:block text-center font-medium"
                style={{
                  fontSize: 9,
                  color: isCurrent ? '#22c55e' : isCompleted ? '#86efac' : '#CBD5E1',
                  lineHeight: 1,
                  transition: 'color 0.3s ease',
                }}
              >
                {stepIndex}
              </span>
            </div>
          );
        })}
      </div>

      {/* Area name hint */}
      <p className="text-xs text-secondary mt-3 truncate hidden sm:block">
        <span className="font-medium text-primary">{areas[currentStep - 1]?.name}</span>
        {areas[currentStep - 1]?.description ? ` — ${areas[currentStep - 1].description.slice(0, 60)}${areas[currentStep - 1].description.length > 60 ? '…' : ''}` : ''}
      </p>
    </div>
  );
}
