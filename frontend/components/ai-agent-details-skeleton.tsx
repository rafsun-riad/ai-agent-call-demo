"use client";

export default function AIAgentDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-slate-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
      </div>

      {/* JSON content skeleton */}
      <div className="bg-slate-50 rounded-lg p-6 border">
        <div className="space-y-3">
          {/* Simulate JSON structure lines */}
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse ml-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse ml-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse ml-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse ml-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse ml-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse ml-8"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse ml-8"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse ml-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse ml-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse ml-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/6 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
