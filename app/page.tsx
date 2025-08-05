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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

      if (!res.ok) throw new Error("Failed to submit response");

      setSubmitted(true);
      setName("");
      setOption("");
      setReason("");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main className="min-h-screen px-4 py-10 bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-900">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-700 drop-shadow-md">
        Manali Trip 2082
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-12 px-4">
        {["images(1).jpg", "images(2).jpg", "images(3).jpg", "images(4).jpg", "images(5).jpg"].map(
          (filename, index) => (
            <div
              key={index}
              className="relative w-full h-48 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={`/${filename}`}
                alt={`Manali photo ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          )
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg max-w-xl mx-auto px-6 py-8 space-y-6"
      >
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Choose an option</label>
          <div className="flex gap-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="option"
                value="Janxu"
                checked={option === "Janxu"}
                onChange={() => setOption("Janxu")}
                className="accent-blue-600"
              />
              <span className="ml-2">Janxu</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="option"
                value="Janna"
                checked={option === "Janna"}
                onChange={() => setOption("Janna")}
                className="accent-blue-600"
              />
              <span className="ml-2">Janna</span>
            </label>
          </div>
        </div>

        {(option === "Janna" || option === "") && (
          <div>
            <label htmlFor="reason" className="block font-semibold mb-1">
              {option === "Janna" ? "Kina jannau?" : "Kina fix xaina? Kunai Reason?"}{" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
        )}

        {error && <p className="text-red-600 font-medium">{error}</p>}
        {submitted && (
          <p className="text-green-600 font-medium">Response submitted successfully!</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
