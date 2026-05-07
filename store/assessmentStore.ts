import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { BusinessType } from '../types/assessment';
import { ASSESSMENT_AREAS } from '../config/assessmentAreas';

export interface AreaResponse {
  area_number: number;
  area_name: string;
  current_state_text: string;
  current_state_rating: number;
  future_vision_text: string;
  answered_at?: string;
}

interface AssessmentState {
  assessmentId: string | null;
  businessType: BusinessType | null;
  companyName: string;
  userEmail: string;
  currentStep: number; // 0 = business type, 1-11 = areas, 12 = results
  responses: Record<number, AreaResponse>;
  lastSavedAt: string | null;
  isSaving: boolean;
  setBusinessType: (type: BusinessType) => void;
  setCompanyName: (name: string) => void;
  setUserEmail: (email: string) => void;
  setResponse: (areaNumber: number, data: Partial<AreaResponse>) => void;
  setCurrentStep: (step: number) => void;
  getVisibleAreas: () => typeof ASSESSMENT_AREAS;
  createAssessment: (email: string, name: string) => Promise<string | null>;
  loadAssessment: (id: string) => Promise<void>;
  saveCurrentStep: () => Promise<void>;
  saveResponse: (areaNumber: number) => Promise<void>;
  markCompleted: () => Promise<void>;
  reset: () => void;
}

const initialResponse = (areaNumber: number, areaName: string): AreaResponse => ({
  area_number: areaNumber,
  area_name: areaName,
  current_state_text: '',
  current_state_rating: 5,
  future_vision_text: '',
});

const defaultState = {
  assessmentId: null,
  businessType: null,
  companyName: '',
  userEmail: '',
  currentStep: 0,
  responses: {} as Record<number, AreaResponse>,
  lastSavedAt: null as string | null,
  isSaving: false,
};

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      ...defaultState,

      setBusinessType: (businessType) => set({ businessType }),
      setCompanyName: (companyName) => set({ companyName }),
      setUserEmail: (userEmail) => set({ userEmail }),
      setCurrentStep: (currentStep) => set({ currentStep }),

      setResponse: (areaNumber, data) => {
        const area = ASSESSMENT_AREAS.find((a) => a.id === areaNumber);
        if (!area) return;
        set((s) => {
          const existing = s.responses[areaNumber] ?? initialResponse(areaNumber, area.name);
          const effectiveText = data.current_state_text !== undefined
            ? data.current_state_text
            : existing.current_state_text;
          const isFirstAnswer = effectiveText.length > 0 && !existing.answered_at;
          return {
            responses: {
              ...s.responses,
              [areaNumber]: {
                ...existing,
                ...data,
                ...(isFirstAnswer ? { answered_at: new Date().toISOString() } : {}),
              },
            },
          };
        });
      },

      getVisibleAreas: () => {
        const { businessType } = get();
        if (!businessType) return ASSESSMENT_AREAS;
        return ASSESSMENT_AREAS.filter((a) => !a.establishedOnly || businessType === 'established');
      },

      createAssessment: async (email: string, name: string) => {
        const { businessType } = get();
        if (!businessType) return null;
        const { data, error } = await supabase
          .from('assessments')
          .insert({
            business_type: businessType,
            company_name: name || null,
            user_email: email,
            completed: false,
          })
          .select('id')
          .single();
        if (error) {
          console.error('createAssessment error', error);
          return null;
        }
        set({
          assessmentId: data.id,
          userEmail: email,
          companyName: name,
        });
        return data.id;
      },

      loadAssessment: async (id: string) => {
        const { data: assessment, error: e1 } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', id)
          .single();
        if (e1 || !assessment) return;
        const { data: rows } = await supabase
          .from('assessment_responses')
          .select('*')
          .eq('assessment_id', id);
        const responses: Record<number, AreaResponse> = {};
        (rows ?? []).forEach((r: { area_number: number; area_name: string; current_state_text: string; current_state_rating: number; future_vision_text: string; answered_at?: string }) => {
          responses[r.area_number] = {
            area_number: r.area_number,
            area_name: r.area_name,
            current_state_text: r.current_state_text,
            current_state_rating: r.current_state_rating,
            future_vision_text: r.future_vision_text,
            ...(r.answered_at ? { answered_at: r.answered_at } : {}),
          };
        });
        set({
          assessmentId: assessment.id,
          businessType: assessment.business_type as BusinessType,
          companyName: assessment.company_name ?? '',
          userEmail: assessment.user_email,
          responses,
          currentStep: 0,
        });
      },

      saveCurrentStep: async () => {
        const { assessmentId, responses, businessType } = get();
        if (!assessmentId || !businessType) return;
        set({ isSaving: true });
        const areas = ASSESSMENT_AREAS.filter((a) => !a.establishedOnly || businessType === 'established');
        for (const area of areas) {
          const r = responses[area.id];
          if (!r) continue;
          await supabase.from('assessment_responses').upsert(
            {
              assessment_id: assessmentId,
              area_number: r.area_number,
              area_name: r.area_name,
              current_state_text: r.current_state_text,
              current_state_rating: r.current_state_rating,
              future_vision_text: r.future_vision_text,
            },
            { onConflict: 'assessment_id,area_number' }
          );
        }
        set({ isSaving: false, lastSavedAt: new Date().toISOString() });
      },

      saveResponse: async (areaNumber: number) => {
        const { assessmentId, responses, businessType } = get();
        const r = responses[areaNumber];
        if (!assessmentId || !r) return;
        const area = ASSESSMENT_AREAS.find((a) => a.id === areaNumber);
        if (!area || (area.establishedOnly && businessType !== 'established')) return;
        set({ isSaving: true });
        await supabase.from('assessment_responses').upsert(
          {
            assessment_id: assessmentId,
            area_number: r.area_number,
            area_name: r.area_name,
            current_state_text: r.current_state_text,
            current_state_rating: r.current_state_rating,
            future_vision_text: r.future_vision_text,
            ...(r.answered_at ? { answered_at: r.answered_at } : {}),
          },
          { onConflict: 'assessment_id,area_number' }
        );
        set({ isSaving: false, lastSavedAt: new Date().toISOString() });
      },

      markCompleted: async () => {
        const { assessmentId } = get();
        if (!assessmentId) return;
        await supabase.from('assessments').update({ completed: true }).eq('id', assessmentId);
      },

      reset: () => set(defaultState),
    }),
    { name: 'scaleup-assessment', partialize: (s) => ({ assessmentId: s.assessmentId, businessType: s.businessType, companyName: s.companyName, userEmail: s.userEmail, currentStep: s.currentStep, responses: s.responses }) }
  )
);
