"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function KnowledgeBaseSkeleton() {
  return (
    <div className="flex gap-6 h-[calc(100vh-12rem)]">
      {/* Left Side - Knowledge Base List Skeleton */}
      <div className="w-80 flex flex-col">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Knowledge Bases</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full px-4 py-3 border-b border-slate-100 last:border-b-0"
                >
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-200 rounded animate-pulse w-32"></div>
                    <div className="h-3 bg-slate-200 rounded animate-pulse w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Knowledge Base Details Skeleton */}
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-6 bg-slate-200 rounded animate-pulse w-48 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded animate-pulse w-32"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded animate-pulse w-32"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Document items skeleton */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                  <div className="space-y-1 flex-1">
                    <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
                <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
