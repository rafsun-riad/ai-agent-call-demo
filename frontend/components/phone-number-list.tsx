"use client";

import { usePhoneNumbers } from "@/hooks/usePhoneNumbers";
import { useState } from "react";
import Dialpad from "./dialpad";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function PhoneNumberList() {
  const { data, isLoading, error } = usePhoneNumbers();
  const [selected, setSelected] = useState<string | null>(null);
  const [toNumber, setToNumber] = useState("");

  if (isLoading) return <div>Loading phone numbers...</div>;
  if (error) return <div>Failed to load phone numbers</div>;

  let numbers = data || [];
  if (!Array.isArray(numbers)) {
    numbers = [numbers];
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Available Phone Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {numbers.map((num) => (
              <button
                key={num.id}
                className={`w-full text-left p-3 rounded-md border hover:bg-slate-50 ${
                  selected === num.number ? "bg-slate-100 border-slate-300" : ""
                }`}
                onClick={() => {
                  setSelected(num.number);
                  setToNumber("");
                }}
              >
                <div className="text-sm text-slate-600">From</div>
                <div className="text-lg font-medium">{num.number}</div>
                <div className="text-xs text-slate-500">
                  {num.region || num.provider}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selected && (
        <Card>
          <CardHeader>
            <CardTitle>Dialpad - From {selected}</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialpad value={toNumber} onChange={setToNumber} />

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md"
                onClick={() => {
                  console.log("Make call", { from: selected, to: toNumber });
                  // For now just log; later hook into call API
                }}
              >
                Make Call
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
