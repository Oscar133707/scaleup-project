export type BusinessType = 'new' | 'established';

export interface Assessment {
  id: string;
  business_type: BusinessType;
  company_name: string | null;
  user_email: string;
  created_at: string;
  completed: boolean;
}

export interface AssessmentResponse {
  id: string;
  assessment_id: string;
  area_number: number;
  area_name: string;
  current_state_text: string;
  current_state_rating: number;
  future_vision_text: string;
  answered_at?: string;
}

export interface AssessmentAreaConfig {
  id: number;
  name: string;
  description: string;
  questionNew: string;
  questionEstablished: string;
  futureVisionQuestion: string;
  establishedOnly?: boolean;
}

export type PriorityLevel = 'HIGH PRIORITY' | 'STRATEGIC' | 'CRITICAL GAP' | 'SCALABILITY';
