"use client";

import { useDialCall } from "@/hooks/useDialCall";
import { usePhoneNumbers } from "@/hooks/usePhoneNumbers";
import { useState } from "react";
import Dialpad from "./dialpad";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function PhoneNumberList() {
  const { data, isLoading, error } = usePhoneNumbers();
  const dialCallMutation = useDialCall();
  const [selected, setSelected] = useState<string | null>(null);
  const [toNumber, setToNumber] = useState("");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-slate-600">Loading phone numbers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-600">Failed to load phone numbers</div>
      </div>
    );
  }

  let numbers = data || [];
  if (!Array.isArray(numbers)) {
    numbers = [numbers];
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-12rem)]">
      {/* Left Side - Phone Numbers List */}
      <div className="w-80 flex flex-col">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Available Numbers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {numbers.map((num) => (
                <button
                  key={num.id}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${
                    selected === num.number
                      ? "bg-slate-100 border-r-2 border-slate-400"
                      : ""
                  }`}
                  onClick={() => {
                    setSelected(num.number);
                    setToNumber("");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">
                        {num.friendly_name || `Number ${num.number.slice(-4)}`}
                      </div>
                      <div className="text-sm text-slate-600">{num.number}</div>
                      <div className="text-xs text-slate-500">
                        {num.region || num.provider || "Available"}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Dialpad */}
      <div className="flex-1">
        {selected ? (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-lg">📞</span>
                <div>
                  <div>Make a Call</div>
                  <div className="text-sm font-normal text-slate-600">
                    From: {selected}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter number to call
                </label>
                <Dialpad value={toNumber} onChange={setToNumber} />
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                  onClick={async () => {
                    if (!toNumber.trim()) {
                      alert("Please enter a number to call");
                      return;
                    }
                    if (!selected) {
                      alert("Please select a phone number");
                      return;
                    }

                    try {
                      const result = await dialCallMutation.mutateAsync({
                        from_number: selected,
                        to_number: toNumber.trim(),
                      });

                      console.log("Call initiated successfully:", result);
                      alert(
                        `Call initiated successfully! ${
                          result.call_id ? `Call ID: ${result.call_id}` : ""
                        }`
                      );

                      // Clear the input after successful call
                      setToNumber("");
                    } catch (error) {
                      console.error("Failed to initiate call:", error);
                      alert("Failed to initiate call. Please try again.");
                    }
                  }}
                  disabled={!toNumber.trim() || dialCallMutation.isPending}
                >
                  {dialCallMutation.isPending ? "Calling..." : "📞 Make Call"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full">
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-slate-500">
                <div className="text-4xl mb-4">📞</div>
                <div className="text-lg font-medium mb-2">
                  Select a phone number
                </div>
                <div className="text-sm">
                  Choose a number from the left to start making calls
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
