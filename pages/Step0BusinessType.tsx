import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../store/assessmentStore';
import { useAuthStore } from '../store/authStore';

export function Step0BusinessType() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const userEmail = useAuthStore((s) => s.user?.email ?? '');
  const userName = useAuthStore((s) => s.userName);
  const businessType = useAssessmentStore((s) => s.businessType);
  const setBusinessType = useAssessmentStore((s) => s.setBusinessType);
  const createAssessment = useAssessmentStore((s) => s.createAssessment);
  const setUserEmail = useAssessmentStore((s) => s.setUserEmail);
  const setCompanyName = useAssessmentStore((s) => s.setCompanyName);

  useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
      if (userName) setCompanyName(userName);
    }
  }, [user?.email, userName, setUserEmail, setCompanyName]);

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  const handleContinue = async () => {
    if (!businessType) return;
    const id = await createAssessment(userEmail, userName ?? '');
    if (id) navigate('/assessment/step/1', { replace: true });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-sm font-bold text-accent tracking-widest">GROWTH ASSESSMENT</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
        Assess Your Business <span className="text-accent">Growth Potential</span>
      </h1>
      <p className="text-secondary text-lg mb-10">
        Take the first step toward scaling. Choose your current business stage to personalize your growth roadmap and receive AI-driven strategy insights.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <button
          type="button"
          onClick={() => setBusinessType('new')}
          className={`text-left p-6 sm:p-8 rounded-3xl bg-surface border-2 transition-all cursor-pointer shadow-soft-card hover:shadow-lg ${
            businessType === 'new' ? 'border-accent' : 'border-borderSubtle hover:border-accent/50'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-accentSoft flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">New Business</h3>
          <p className="text-secondary text-sm leading-relaxed">
            I'm launching a new venture or I'm in the early stages of product development.
          </p>
        </button>
        <button
          type="button"
          onClick={() => setBusinessType('established')}
          className={`text-left p-6 sm:p-8 rounded-3xl bg-surface border-2 transition-all cursor-pointer shadow-soft-card hover:shadow-lg ${
            businessType === 'established' ? 'border-accent' : 'border-borderSubtle hover:border-accent/50'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-accentSoft flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">Established Business</h3>
          <p className="text-secondary text-sm leading-relaxed">
            I have an existing operation and I'm looking to scale efficiently with data-driven strategy.
          </p>
        </button>
      </div>
      <button
        type="button"
        onClick={handleContinue}
        disabled={!businessType}
        className="w-full py-4 rounded-2xl bg-accent text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition-opacity cursor-pointer"
      >
        Continue to Assessment
      </button>
      <p className="flex items-center justify-center gap-2 text-secondary text-sm mt-4">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Your data is encrypted and secure
      </p>
    </div>
  );
}
