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

  const handleOptionClick = (selected: string) => {
    setOption((prev) => (prev === selected ? "" : selected));
  };

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
    <main className="min-h-screen px-4 py-10 bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-100 text-gray-900">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-800 drop-shadow-md">
        Manali Trip 2082
      </h1>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12 px-4">
        {["images2.jpg", "images3.jpg", "images4.jpg", "images5.jpg"].map(
          (filename, index) => (
            <div
              key={index}
              className="relative w-full h-60 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-white hover:border-blue-300"
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

      {/* FORM */}
      <div className="max-w-xl text-2xl mx-auto mb-4 text-center text-blue-800 font-bold ">
        Submit your form with genuine response
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl max-w-xl mx-auto px-8 py-10 space-y-6 border border-gray-200"
      >
        <div>
          <label
            htmlFor="name"
            className="block font-semibold mb-1 text-gray-700"
          >
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="Tapaiko naam..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Choose an option
          </label>
          <div className="flex gap-6">
            {["Janxu", "Janna"].map((opt) => (
              <label
                key={opt}
                className={`inline-flex items-center px-4 py-2 rounded-lg border cursor-pointer transition duration-200 ${
                  option === opt
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={option === opt}
                  onChange={() => handleOptionClick(opt)}
                  className="hidden"
                />
                <span className="font-medium">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {(option === "Janna" || option === "") && (
          <div>
            <label
              htmlFor="reason"
              className="block font-semibold mb-1 text-gray-700"
            >
              {option === "Janna"
                ? "Kina jannau?"
                : "Kina fix xaina? Kunai Reason?"}{" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              rows={3}
              placeholder="Tapai ko reason yaha lekhnu hos..."
              required
            />
          </div>
        )}

        {error && (
          <p className="text-red-600 font-medium bg-red-100 px-4 py-2 rounded-lg border border-red-300">
            {error}
          </p>
        )}
        {submitted && (
          <p className="text-green-700 font-medium bg-green-100 px-4 py-2 rounded-lg border border-green-300">
            Response submitted successfully!
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
