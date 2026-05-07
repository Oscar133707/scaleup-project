-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_type TEXT NOT NULL CHECK (business_type IN ('new', 'established')),
  company_name TEXT,
  user_email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Assessment responses (one per area per assessment)
CREATE TABLE IF NOT EXISTS assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  area_number INT NOT NULL,
  area_name TEXT NOT NULL,
  current_state_text TEXT NOT NULL DEFAULT '',
  current_state_rating INT NOT NULL DEFAULT 5 CHECK (current_state_rating >= 1 AND current_state_rating <= 10),
  future_vision_text TEXT NOT NULL DEFAULT '',
  UNIQUE(assessment_id, area_number)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_assessments_user_email ON assessments(user_email);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_assessment_id ON assessment_responses(assessment_id);

-- RLS (Row Level Security) - enable and add policies as needed
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/authenticated insert and select for now (tighten with auth.uid() when using Supabase Auth)
CREATE POLICY "Allow all for assessments" ON assessments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for assessment_responses" ON assessment_responses FOR ALL USING (true) WITH CHECK (true);
