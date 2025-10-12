"use client";

import { useApi } from "@/hooks/useApi";
import { usePhoneNumbers } from "@/hooks/usePhoneNumbers";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import Dialpad from "./dialpad";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DialCallRequest {
  from_number: string;
  to_number: string;
}

interface DialCallResponse {
  call_id?: string;
  status?: string;
  message?: string;
  [key: string]: unknown;
}

export default function PhoneNumberList() {
  const { data, isLoading, error } = usePhoneNumbers();
  const { post } = useApi();
  const [selected, setSelected] = useState<string | null>(null);
  const [toNumber, setToNumber] = useState("");

  const { mutate: makeCall, isPending } = useMutation({
    mutationFn: async (data: DialCallRequest): Promise<DialCallResponse> => {
      const response = await post("/v1/calls/dial-outbound-phone-call", data);
      return response.data as DialCallResponse;
    },
    onMutate: (variables) => {
      const toastId = toast.loading(
        `Initiating call from ${variables.from_number} to ${variables.to_number}...`
      );
      return {
        id: toastId,
        from_number: variables.from_number,
        to_number: variables.to_number,
      };
    },
    onSuccess: (data, variables, context) => {
      toast.success("Call initiated successfully!", { id: context.id });
      // Clear the input after successful call
      setToNumber("");
    },
    onError: (error: unknown, variables, context) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to initiate call. Please try again.";

      toast.error(errorMessage, { id: context?.id });
    },
  });

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

                    makeCall({
                      from_number: selected,
                      to_number: toNumber.trim(),
                    });
                  }}
                  disabled={!toNumber.trim() || isPending}
                >
                  {isPending ? "Calling..." : "📞 Make Call"}
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
