-- Create the table for Manali trip responses
CREATE TABLE IF NOT EXISTS manali_responses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  option TEXT,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE manali_responses ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts (you can modify this as needed)
CREATE POLICY "Allow insert for all users" ON manali_responses
  FOR INSERT WITH CHECK (true);

-- Create a policy to allow reads (you can modify this as needed)
CREATE POLICY "Allow read for all users" ON manali_responses
  FOR SELECT USING (true);
