"use client"

import type { GetServerSideProps } from "next"
import fs from "fs/promises"
import path from "path"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ResponseEntry {
  name: string
  option: string
  reason: string
  timestamp: string
}

interface ResponsesPageProps {
  responses: ResponseEntry[]
  error?: string
}

export const getServerSideProps: GetServerSideProps<ResponsesPageProps> = async () => {
  const responsesFilePath = path.join(process.cwd(), "data", "responses.json")
  try {
    const fileContents = await fs.readFile(responsesFilePath, "utf8")
    const responses: ResponseEntry[] = JSON.parse(fileContents)
    return {
      props: {
        responses: responses.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      },
    }
  } catch (error) {
    console.error("Failed to read responses file:", error)
    return {
      props: {
        responses: [],
        error: "Could not load responses. The file might not exist or is malformed.",
      },
    }
  }
}

export default function ResponsesPage({ responses, error }: ResponsesPageProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  }

  return (
    <motion.div
      className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-sans text-foreground"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-extrabold text-center text-primary-900 mb-10 tracking-tight"
          variants={itemVariants}
        >
          Manali Trip Responses
        </motion.h1>

        {error && (
          <motion.div
            className="bg-destructive-50 border border-destructive text-destructive-foreground px-4 py-3 rounded-lg relative mb-6 shadow-sm"
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </motion.div>
        )}

        {responses.length === 0 && !error ? (
          <motion.p className="text-center text-muted-foreground text-lg" variants={itemVariants}>
            No responses submitted yet.
          </motion.p>
        ) : (
          <motion.div className="space-y-6" variants={containerVariants}>
            {responses.map((response, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="shadow-lg rounded-xl bg-card border border-border"
                whileHover={{ y: -3, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-primary-800">{response.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground space-y-2">
                  <p>
                    <span className="font-medium text-primary-700">Option:</span>{" "}
                    {response.option === "-" ? "No option selected" : response.option}
                  </p>
                  {response.reason && (
                    <p>
                      <span className="font-medium text-primary-700">Reason:</span> {response.reason}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Submitted On:</span> {new Date(response.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
