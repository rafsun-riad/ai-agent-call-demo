"use client";

export default function AIAgentDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-1">
        <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
        <div className="h-3 w-3 bg-slate-200 rounded animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
        <div className="h-3 w-3 bg-slate-200 rounded animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
      </div>

      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 bg-slate-200 rounded w-48 animate-pulse mb-2"></div>
          <div className="space-y-1">
            <div className="h-4 bg-slate-200 rounded w-64 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded w-56 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Agent Status skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-4 bg-slate-200 rounded w-12 animate-pulse"></div>
        <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-20 animate-pulse ml-4"></div>
      </div>

      {/* System Prompt Editor skeleton */}
      <div className="bg-white border rounded-lg">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-5 bg-slate-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="p-6">
          {/* Tabs skeleton */}
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg mb-4">
            <div className="h-8 bg-slate-200 rounded w-20 animate-pulse"></div>
            <div className="h-8 bg-slate-200 rounded w-16 animate-pulse"></div>
          </div>
          {/* Content area skeleton */}
          <div className="h-96 bg-slate-50 border rounded-lg p-6">
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message Editor skeleton */}
      <div className="bg-white border rounded-lg">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-5 bg-slate-200 rounded w-36 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-32 bg-slate-100 border rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* AI Agent Configuration skeleton */}
      <div className="bg-white border rounded-lg">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-5 bg-slate-200 rounded w-44 animate-pulse"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LLM Configuration skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-slate-200 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Audio Configuration skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-28 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="h-3 bg-slate-200 rounded w-18 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-28 animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible JSON section skeleton */}
      <div className="bg-slate-50 border rounded-lg">
        <div className="px-4 py-2 border-b bg-slate-100 rounded-t-lg">
          <div className="h-4 bg-slate-200 rounded w-64 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
