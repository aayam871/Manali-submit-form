import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs/promises"
import path from "path"

const responsesFilePath = path.join(process.cwd(), "data", "responses.json")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, option, reason } = req.body

    // Server-side validation
    if (!name) {
      return res.status(400).json({ message: "Name is required." })
    }

    if (option === "Janna" && !reason) {
      return res.status(400).json({ message: 'Reason is required when "Janna" is selected.' })
    }

    if (option === "" && !reason) {
      return res.status(400).json({ message: "Reason is required when no option is selected." })
    }

    const newResponse = {
      name,
      option: option || "-", // Store '-' if no option is selected
      reason: reason || "",
      timestamp: new Date().toISOString(),
    }

    try {
      const fileContents = await fs.readFile(responsesFilePath, "utf8")
      const responses = JSON.parse(fileContents)
      responses.push(newResponse)
      await fs.writeFile(responsesFilePath, JSON.stringify(responses, null, 2))
      res.status(200).json({ message: "Response submitted successfully!" })
    } catch (error) {
      console.error("Failed to write response:", error)
      res.status(500).json({ message: "Failed to submit response." })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
