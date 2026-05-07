import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../store/assessmentStore';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { Step0BusinessType } from './Step0BusinessType';

export function AssessmentIndex() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const user = useAuthStore((s) => s.user);
  const businessType = useAssessmentStore((s) => s.businessType);
  const assessmentId = useAssessmentStore((s) => s.assessmentId);
  const loadAssessment = useAssessmentStore((s) => s.loadAssessment);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      setChecking(false);
      return;
    }

    const email = user.email;
    if (!email) {
      setChecking(false);
      return;
    }

    (async () => {
      const { data } = await supabase
        .from('assessments')
        .select('id')
        .eq('user_email', email)
        .eq('completed', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data?.id) {
        await loadAssessment(data.id);
        navigate('/assessment/results', { replace: true });
        setChecking(false);
        return;
      }

      if (businessType && assessmentId) {
        navigate('/assessment/step/1', { replace: true });
      }
      setChecking(false);
    })();
  }, [user, businessType, assessmentId, navigate, loadAssessment]);

  if (!user) return null;
  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-secondary">Loading…</p>
      </div>
    );
  }
  return <Step0BusinessType />;
}
