"use client";

import { useEffect, useRef } from "react";

interface DialpadProps {
  value: string;
  onChange: (v: string) => void;
}

const keys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

export default function Dialpad({ value, onChange }: DialpadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const k = e.key;
      if (/^[0-9*#]$/.test(k)) {
        onChange(value + k);
      } else if (k === "Backspace") {
        onChange(value.slice(0, -1));
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [value, onChange]);

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        className="w-full p-3 text-xl rounded-lg border text-center"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter number"
      />

      <div className="grid grid-cols-3 gap-2">
        {keys.flat().map((k) => (
          <button
            key={k}
            className="p-4 bg-slate-100 rounded-lg text-lg font-medium hover:bg-slate-200"
            onClick={() => onChange(value + k)}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3">
        <button
          className="px-4 py-2 bg-red-50 text-red-700 rounded-md"
          onClick={() => onChange("")}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => {
            // no-op here; the parent handles make call
          }}
        >
          Make Call
        </button>
      </div>
    </div>
  );
}
