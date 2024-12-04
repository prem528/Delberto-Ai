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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Advanced Scraper Tool</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Scrape
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
          {data.title && <h2>Title: {data.title}</h2>}
          {data.description && (
            <p>
              <strong>Description:</strong> {data.description}
            </p>
          )}

          {data.images.length > 0 && (
            <div>
              <h3>Images:</h3>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {data.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Image ${index + 1}`}
                    style={{ maxWidth: "200px", margin: "10px" }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
