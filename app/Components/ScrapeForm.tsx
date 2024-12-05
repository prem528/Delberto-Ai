"use client";

import { useState, FormEvent } from "react";
import DescriptionGenerator from "./DescriptionGenerator";

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
    <div className="flex flex-col h-[calc(100vh-4rem)] lg:ml-64 pt-16">
      <div className="flex flex-1 justify-center items-center">
        <div className="p-4 border border-gray-200 rounded shadow-lg bg-white max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-4">
            Enter Your URL
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="url"
              placeholder="https://www.example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="p-2 w-full mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700 transition-colors"
            >
              Scrape
            </button>
          </form>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {data && (
            <div className="mt-4">
              {data.title && (
                <h2 className="text-xl font-semibold text-center">
                  Title: {data.title}
                </h2>
              )}
              {data.description && (
                <p className="text-center mt-2">
                  Description: {data.description}
                </p>
              )}
              {data.images && data.images.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.images.map((image, index) => (
                    <div key={index} className="flex justify-center">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="rounded-lg shadow-md max-w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <DescriptionGenerator title={data.title} />
        </div>
      </div>
    </div>
  );
}
