"use client";

import { useState } from "react";
import { processPdfAction } from "./actions";

interface VideoDetails {
  videoTopic: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  question: string;
}

export default function Home() {
  const [videoTopic, setVideoTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [uniqueSellingPoints, setUniqueSellingPoints] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnswer("");

    try {
      const videoDetails: VideoDetails = {
        videoTopic,
        targetAudience,
        uniqueSellingPoints,
        question,
      };
      const result = await processPdfAction(videoDetails);
      setAnswer(result.summary ?? "No summary generated.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="container mx-auto max-w-2xl bg-gray-900 text-gray-100 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
          Ask me Anything about Video Content Stategy and Execution
        </h1>
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <p className="text-xl font-bold mb-6 text-gray-100">
              Video Details:
            </p>
            <label
              htmlFor="videoTopic"
              className="block mb-2 font-semibold text-gray-200"
            >
              Enter a Video topic or theme
            </label>
            <input
              type="text"
              id="videoTopic"
              value={videoTopic}
              onChange={(e) => setVideoTopic(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., organic soup"
            />
          </div>
          <div>
            <label
              htmlFor="targetAudience"
              className="block mb-2 font-semibold text-gray-200"
            >
              Enter the Target Audience
            </label>
            <input
              type="text"
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., for busy working adults"
            />
          </div>
          <div>
            <label
              htmlFor="uniqueSellingPoints"
              className="block mb-2 font-semibold text-gray-200"
            >
              Enter Unique Selling Points or Opinion
            </label>
            <input
              type="text"
              id="uniqueSellingPoints"
              value={uniqueSellingPoints}
              onChange={(e) => setUniqueSellingPoints(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., ready in 5 minutes"
            />
          </div>
          <div>
            <label
              htmlFor="question"
              className="block mb-2 font-semibold text-gray-200"
            >
              Enter your question about the video
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded mb-2 h-24 resize-y text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., How to make my video hook?"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Generate Content"}
          </button>
        </form>

        {isLoading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-400">
              Analyzing inputs and generating response...
            </p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 mb-4"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {answer && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-200">
              Generated Content:
            </h2>
            <div className="bg-gray-800 p-4 rounded-lg whitespace-pre-wrap text-gray-100 border border-gray-700">
              {answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
