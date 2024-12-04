'use client'

import { useState, useEffect } from 'react';

interface DescriptionGeneratorProps {
  title: string | null;
}

export default function DescriptionGenerator({ title }: DescriptionGeneratorProps) {
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (title) {
      setIsLoading(true);
      setError(null);
      fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setDescription(data.description);
          }
        })
        .catch(() => setError('Failed to generate description'))
        .finally(() => setIsLoading(false));
    }
  }, [title]);

  if (!title) return null;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Generated Description:</h3>
      {isLoading && <p className="text-gray-600">Generating description...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {description && <p className="text-gray-800">{description}</p>}
    </div>
  );
}

