ALTER TABLE assessment_responses
  ADD COLUMN IF NOT EXISTS answered_at TIMESTAMPTZ;
