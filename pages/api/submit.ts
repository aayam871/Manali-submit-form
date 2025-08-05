import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { name, option, reason } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }
    if (option === "Janna" && !reason) {
      return res
        .status(400)
        .json({ message: 'Reason is required when "Janna" is selected.' });
    }
    if (option === "" && !reason) {
      return res
        .status(400)
        .json({ message: "Reason is required when no option is selected." });
    }

    try {
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('manali_responses')
        .insert([
          {
            name: name.trim(),
            option: option || null,
            reason: reason.trim(),
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ message: `Failed to save response: ${error.message}` });
      }

      return res
        .status(200)
        .json({ message: "Response submitted successfully!", data });
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
