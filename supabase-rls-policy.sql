-- Enable Row Level Security on the table
ALTER TABLE manali_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anon role
CREATE POLICY "Allow insert for anon" ON manali_responses
  FOR INSERT
  TO anon
  USING (true);
