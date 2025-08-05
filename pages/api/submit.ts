import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, option, reason } = req.body;

    // Basic validation (you can skip or keep)
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

    // *** Fake success, no saving ***
    return res
      .status(200)
      .json({ message: "Response submitted successfully!" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
