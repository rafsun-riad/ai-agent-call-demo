"use client";

import { useEffect } from "react";
import { Button } from "./ui/button";

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
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const k = e.key;
      if (/^[0-9*#+]$/.test(k)) {
        onChange(value + k);
      } else if (k === "Backspace") {
        onChange(value.slice(0, -1));
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [value, onChange]);

  return (
    <div className="w-72 mx-auto space-y-4">
      {/* Display Screen */}
      <div className="relative">
        <input
          type="tel"
          className="w-full h-14 px-4 text-2xl font-mono text-center bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter number"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-200"
            onClick={() => onChange(value.slice(0, -1))}
          >
            ⌫
          </Button>
        )}
      </div>

      {/* Dialpad Grid */}
      <div className="grid grid-cols-3 gap-4">
        {keys.flat().map((key) => (
          <Button
            key={key}
            variant="outline"
            className="h-16 w-20 flex items-center justify-center border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all rounded-xl"
            onClick={() => onChange(value + key)}
          >
            <span className="text-xl font-semibold text-slate-900">{key}</span>
          </Button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center pt-2">
        <Button
          variant="outline"
          size="sm"
          className="text-slate-600 hover:text-slate-900 rounded-lg"
          onClick={() => onChange("")}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
