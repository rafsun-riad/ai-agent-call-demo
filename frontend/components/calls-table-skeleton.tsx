"use client";

export default function CallsTableSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Card Skeleton */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
          <div>
            <div className="h-4 bg-slate-200 rounded w-16 animate-pulse mb-2"></div>
            <div className="h-8 bg-slate-200 rounded w-12 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Filters Section Skeleton */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* AI Agent Select */}
          <div>
            <div className="h-4 bg-slate-200 rounded w-16 animate-pulse mb-2"></div>
            <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
          </div>

          {/* Date Picker */}
          <div>
            <div className="h-4 bg-slate-200 rounded w-20 animate-pulse mb-2"></div>
            <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
          </div>

          {/* Column Selector */}
          <div>
            <div className="h-4 bg-slate-200 rounded w-24 animate-pulse mb-2"></div>
            <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
          </div>

          {/* Refresh Button */}
          <div>
            <div className="h-4 bg-slate-200 rounded w-12 animate-pulse mb-2"></div>
            <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="border-b bg-slate-50 px-6 py-4">
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-4 bg-slate-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="px-6 py-4">
              <div className="grid grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, colIndex) => (
                  <div
                    key={colIndex}
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
