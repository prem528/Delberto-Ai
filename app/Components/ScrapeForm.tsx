"use client";

import { useState, FormEvent } from "react";

interface ScrapeResponse {
  title: string | null;
  description: string | null;
  images: string[];
  success: boolean;
  error?: string;
}

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<ScrapeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setData(null);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result: ScrapeResponse = await response.json();

      if (!result.success) {
        setError(result.error || "Something went wrong");
      } else {
        setData(result);
      }
    } catch (err: any) {
      setError("Failed to fetch data.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-2xl font-bold flex justify-center items-center mb-4">Enter Your URL </h1>
      <form onSubmit={handleSubmit} className="flex justify-center items-center mb-4">
        <input
          type="url"
          placeholder="https://www.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="p-2 w-72 mr-2 border border-black rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Scrape
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div>
          {data.title && <h2 className="text-xl flex justify-center items-center">Title: {data.title}</h2>}
          {data.description && (
            <span className="text-xl flex justify-center items-center" >
              <h2 >Description: {data.description} </h2>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
