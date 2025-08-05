-- Enable Row Level Security on the table
ALTER TABLE manali_responses ENABLE ROW LEVEL SECURITY;

-- Drop existing insert policy if any
DROP POLICY IF EXISTS "Allow insert for anon" ON manali_responses;

-- Create policy to allow inserts from anon role with WITH CHECK clause
CREATE POLICY "Allow insert for anon" ON manali_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);
