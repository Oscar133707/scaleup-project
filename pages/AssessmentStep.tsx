import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../store/assessmentStore';
import { ASSESSMENT_AREAS, MAX_CURRENT_STATE_CHARS, MAX_FUTURE_VISION_CHARS } from '../config/assessmentAreas';
import { AssessmentProgressBar } from '../components/AssessmentProgressBar';

export function AssessmentStep() {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  const stepNum = parseInt(step ?? '1', 10);
  const getVisibleAreas = useAssessmentStore((s) => s.getVisibleAreas);
  const areas = getVisibleAreas();
  const area = areas[stepNum - 1];
  const businessType = useAssessmentStore((s) => s.businessType);
  const responses = useAssessmentStore((s) => s.responses);
  const setResponse = useAssessmentStore((s) => s.setResponse);
  const setCurrentStep = useAssessmentStore((s) => s.setCurrentStep);
  const saveResponse = useAssessmentStore((s) => s.saveResponse);
  const assessmentId = useAssessmentStore((s) => s.assessmentId);

  useEffect(() => {
    setCurrentStep(stepNum);
  }, [stepNum, setCurrentStep]);

  useEffect(() => {
    if (!assessmentId) navigate('/assessment', { replace: true });
  }, [assessmentId, navigate]);

  useEffect(() => {
    if (area && responses[area.id] === undefined) {
      setResponse(area.id, { area_name: area.name, area_number: area.id });
    }
  }, [area?.id]);

  const r = area ? responses[area.id] : undefined;
  const currentStateText = r?.current_state_text ?? '';
  const currentStateRating = r?.current_state_rating ?? 5;
  const futureVisionText = r?.future_vision_text ?? '';

  const question = area
    ? businessType === 'established'
      ? area.questionEstablished
      : area.questionNew
    : '';

  const save = useCallback(() => {
    if (area) saveResponse(area.id);
  }, [area, saveResponse]);

  useEffect(() => {
    if (!area) return;
    const t = setTimeout(save, 800);
    return () => clearTimeout(t);
  }, [currentStateText, currentStateRating, futureVisionText, area?.id, save]);

  if (!assessmentId || !area || stepNum < 1 || stepNum > areas.length) {
    if (!assessmentId) return null;
    navigate('/assessment', { replace: true });
    return null;
  }

  const handlePrev = () => {
    if (stepNum <= 1) navigate('/assessment');
    else navigate(`/assessment/step/${stepNum - 1}`);
  };

  const handleNext = () => {
    if (stepNum >= areas.length) navigate('/assessment/results');
    else navigate(`/assessment/step/${stepNum + 1}`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <AssessmentProgressBar
        currentStep={stepNum}
        totalSteps={areas.length}
        responses={responses}
        areas={areas}
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">{area.name}</h1>
      <p className="text-secondary mb-6 sm:mb-10 text-sm sm:text-base">{area.description}</p>

      {/* Section 1: Current State Description */}
      <div className="bg-surface rounded-2xl border border-borderSubtle p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft-card">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accentSoft flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-primary mb-2">Current State Description</h3>
            <p className="text-secondary text-sm mb-3">{question}</p>
            <textarea
              value={currentStateText}
              onChange={(e) => {
                const v = e.target.value.slice(0, MAX_CURRENT_STATE_CHARS);
                setResponse(area.id, { current_state_text: v });
              }}
              maxLength={MAX_CURRENT_STATE_CHARS}
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-borderSubtle bg-background text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              placeholder="Type your detailed assessment here..."
            />
            <p className="text-xs text-secondary mt-1">{currentStateText.length}/{MAX_CURRENT_STATE_CHARS}</p>
          </div>
        </div>
      </div>

      {/* Section 2: Current State Rating */}
      <div className="bg-surface rounded-2xl border border-borderSubtle p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft-card">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-primary">Current State Rating</h3>
              <span className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center font-bold text-lg">
                {currentStateRating}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={currentStateRating}
              onChange={(e) => setResponse(area.id, { current_state_rating: Number(e.target.value) })}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #f97316 25%, #eab308 50%, #22c55e 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-secondary mt-2">
              <span>1 — Risk</span>
              <span className="hidden sm:inline">NEUTRAL (5)</span>
              <span>10 — Leader</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Future Vision */}
      <div className="bg-surface rounded-2xl border border-borderSubtle p-4 sm:p-6 mb-6 sm:mb-10 shadow-soft-card">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l-2.286 6.857L21 12l-5.714 2.143L12 21l-2.286-6.857L3 12l5.714-2.143L12 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-primary mb-2">Future Vision</h3>
            <p className="text-secondary text-sm mb-3">{area.futureVisionQuestion}</p>
            <textarea
              value={futureVisionText}
              onChange={(e) => {
                const v = e.target.value.slice(0, MAX_FUTURE_VISION_CHARS);
                setResponse(area.id, { future_vision_text: v });
              }}
              maxLength={MAX_FUTURE_VISION_CHARS}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-borderSubtle bg-background text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              placeholder="Outline your strategic vision for the next 24 months..."
            />
            <p className="text-xs text-secondary mt-1">{futureVisionText.length}/{MAX_FUTURE_VISION_CHARS}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="px-6 py-3 rounded-xl border-2 border-borderSubtle text-primary font-medium hover:bg-surface transition-colors cursor-pointer flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 rounded-xl bg-accent text-white font-bold hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2"
        >
          Next Step
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
