"use client";

import { useEffect, useState } from "react";
import ResponsesPage from "../pages/responses";

interface ResponseEntry {
  name: string;
  option: string;
  reason: string;
  timestamp: string;
}

export default function SyntheticV0PageForDeployment() {
  const [responses, setResponses] = useState<ResponseEntry[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const res = await fetch("/api/responses");
        if (!res.ok) {
          throw new Error("Failed to fetch responses");
        }
        const data = await res.json();
        setResponses(data);
      } catch (err) {
        setError((err as Error).message);
      }
    }
    fetchResponses();
  }, []);

  return <ResponsesPage responses={responses} error={error} />;
}
