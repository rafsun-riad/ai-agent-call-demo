"use client";

export default function CallsTableSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header with inline filters skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-7 bg-slate-200 rounded-md w-24 animate-pulse"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="h-10 bg-slate-200 rounded w-full sm:w-[180px] animate-pulse"></div>
          <div className="h-10 bg-slate-200 rounded w-full sm:w-[240px] animate-pulse"></div>
          <div className="h-10 bg-slate-200 rounded w-full sm:w-[140px] animate-pulse"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
        {/* Table Header */}
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <div className="grid grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-slate-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="px-4 py-4">
              <div className="grid grid-cols-8 gap-4">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-4 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
