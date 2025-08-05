"use client";

import { useState } from "react";
import Image from "next/image";

interface ResponseEntry {
  name: string;
  option: string;
  reason: string;
}

export default function HomePage() {
  const [name, setName] = useState("");
  const [option, setOption] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function validateForm() {
    if (!name.trim()) {
      setError("Name is required.");
      return false;
    }
    if (option === "") {
      if (!reason.trim()) {
        setError("Please provide a reason for not selecting an option.");
        return false;
      }
    } else if (option === "Janna") {
      if (!reason.trim()) {
        setError("Please provide a reason for 'Janna' option.");
        return false;
      }
    }
    setError(null);
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const response: ResponseEntry = {
      name: name.trim(),
      option,
      reason: reason.trim(),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
      if (!res.ok) {
        throw new Error("Failed to submit response");
      }
      setSubmitted(true);
      setName("");
      setOption("");
      setReason("");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main className="min-h-screen p-8 font-sans bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-6 text-center">Manali Trip 2082</h1>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className="relative w-full h-48 rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={`/images(${num}).jpg`}
              alt={`Manali photo ${num}`}
              fill
              className="object-cover"
              priority={num === 1}
            />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Choose an option</label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="option"
              value="Janxu"
              checked={option === "Janxu"}
              onChange={() => setOption("Janxu")}
            />
            <span className="ml-2">Janxu</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="option"
              value="Janna"
              checked={option === "Janna"}
              onChange={() => setOption("Janna")}
            />
            <span className="ml-2">Janna</span>
          </label>
        </div>

        {option === "Janna" && (
          <div>
            <label htmlFor="reason" className="block font-medium mb-1">
              Kina jannau? <span className="text-red-600">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
        )}

        {option === "" && (
          <div>
            <label htmlFor="reason" className="block font-medium mb-1">
              Kina fix xaina? Kunai Reason?{" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
        )}

        {error && <p className="text-red-600">{error}</p>}

        {submitted && (
          <p className="text-green-600">Response submitted successfully!</p>
        )}

        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
