"use client";

import { useEffect, useState } from "react";

export const TextToSpeech = ({ text }: { text: string }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setSupported(true);
      // Cancel any ongoing speech when the component mounts (e.g., after a refresh)
      window.speechSynthesis.cancel();
    }

    const handleBeforeUnload = () => {
      window.speechSynthesis.cancel();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = () => {
    if (!supported) {
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    if (isSpeaking) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Lower the rate slightly so it's not too fast.
    // The default is 1, and 0.8 to 0.9 usually sounds much more natural for reading a blog post.
    utterance.rate = 0.85;

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handlePause = () => {
    if (!supported) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const handleStop = () => {
    if (!supported) {
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  if (!supported) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 text-sm text-gray-400 whitespace-nowrap">
      <button
        type="button"
        onClick={isSpeaking ? handlePause : handlePlay}
        className="flex items-center gap-1.5 hover:text-gray-200 transition-colors cursor-pointer"
      >
        {isSpeaking ? (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Pause</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Play</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span>{isSpeaking ? "Pause" : isPaused ? "Resume" : "Listen"}</span>
      </button>

      {Boolean(isSpeaking || isPaused) && (
        <button
          type="button"
          onClick={handleStop}
          className="flex items-center gap-1.5 hover:text-gray-200 transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Stop</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 10h6v4H9z"
            />
          </svg>
          <span>Stop</span>
        </button>
      )}
    </div>
  );
};
