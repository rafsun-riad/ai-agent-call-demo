"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function PhoneNumbersSkeleton() {
  return (
    <div className="flex gap-6 h-[calc(100vh-12rem)]">
      {/* Left Side - Phone Numbers List Skeleton */}
      <div className="w-80 flex flex-col">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Available Numbers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full px-4 py-3 border-b border-slate-100 last:border-b-0"
                >
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded animate-pulse w-32"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Dialpad Skeleton */}
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">Make a Call</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selected number skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded animate-pulse w-20"></div>
              <div className="h-10 bg-slate-200 rounded animate-pulse w-full"></div>
            </div>

            {/* Dialpad skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded animate-pulse w-24"></div>
              <div className="h-12 bg-slate-200 rounded animate-pulse w-full mb-4"></div>

              {/* Dialpad grid skeleton */}
              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>

              {/* Buttons skeleton */}
              <div className="flex gap-2 max-w-xs mx-auto mt-4">
                <div className="h-10 bg-slate-200 rounded animate-pulse flex-1"></div>
                <div className="h-10 bg-slate-200 rounded animate-pulse flex-1"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
