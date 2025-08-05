-- Ensure table schema is correct
CREATE TABLE IF NOT EXISTS manali_responses (
  id int8 PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  option TEXT,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE manali_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anon key
CREATE POLICY "Allow insert for anon" ON manali_responses
  FOR INSERT
  TO anon
  USING (true);
