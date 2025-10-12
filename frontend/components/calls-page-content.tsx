"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAIAgents } from "@/hooks/useAIAgents";
import { CallsQueryParams, useCalls } from "@/hooks/useCalls";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { CalendarIcon, Eye, EyeOff, Settings2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

// Column definitions
type ColumnKey =
  | "callStartTime"
  | "aiAgentName"
  | "duration"
  | "callType"
  | "callStatus"
  | "callFinishReason"
  | "fromNumber"
  | "toNumber"
  | "direction";

const COLUMN_LABELS: Record<ColumnKey, string> = {
  callStartTime: "Time",
  aiAgentName: "Agent Name",
  duration: "Call Duration",
  callType: "Type",
  callStatus: "Call Status",
  callFinishReason: "Ended Reason",
  fromNumber: "From Number",
  toNumber: "To Number",
  direction: "Direction",
};

const DEFAULT_VISIBLE_COLUMNS: ColumnKey[] = [
  "callStartTime",
  "aiAgentName",
  "duration",
  "callStatus",
  "callFinishReason",
  "fromNumber",
  "toNumber",
  "direction",
];

// Mock data for demonstration
const MOCK_CALLS: never[] = [];

export default function CallsPageContent() {
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    DEFAULT_VISIBLE_COLUMNS
  );

  // API query parameters
  const queryParams: CallsQueryParams = useMemo(() => {
    const params: CallsQueryParams = {
      sort_direction: "desc",
      page_size: 50,
    };

    // Add agent filter if selected
    if (selectedAgent !== "all") {
      params.ai_agent_id = selectedAgent;
    }

    return params;
  }, [selectedAgent]);

  // Fetch calls data with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useCalls(queryParams);

  // Fetch AI agents for filter dropdown
  const { data: agentsData } = useAIAgents();

  // Flatten all pages of calls data
  const allCalls = useMemo(() => {
    return data?.pages.flatMap((page) => page.calls) || [];
  }, [data]);

  // Get total count from first page
  const totalCount = data?.pages[0]?.total_count || 0;

  const handleColumnToggle = (column: ColumnKey) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "ended":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Ended
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "abandoned":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Abandoned
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Format duration from seconds to mm:ss format
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  // Handle infinite scroll
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load calls</p>
          <p className="text-sm text-slate-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with inline filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md">
            <span className="font-medium">Total Calls: {totalCount}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* AI Agent Filter */}
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All agents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              {agentsData?.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.agentName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[240px] justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd")} -{" "}
                      {format(dateRange.to, "MMM dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM dd, y")
                  )
                ) : (
                  <span>Pick a Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Column Customizer */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings2 className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Customize Field</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Show/Hide Columns</h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(COLUMN_LABELS).map(([key, label]) => {
                    const columnKey = key as ColumnKey;
                    const isVisible = visibleColumns.includes(columnKey);
                    return (
                      <label
                        key={key}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 p-2 rounded"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => handleColumnToggle(columnKey)}
                        >
                          {isVisible ? (
                            <Eye className="h-3 w-3" />
                          ) : (
                            <EyeOff className="h-3 w-3" />
                          )}
                        </Button>
                        <span className="text-sm">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Calls Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200">
              {visibleColumns.map((column) => (
                <TableHead
                  key={column}
                  className="h-10 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50"
                >
                  {COLUMN_LABELS[column]}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allCalls.length === 0 && !isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length}
                  className="text-center py-8"
                >
                  <div className="text-slate-500">
                    <p className="text-lg font-medium">No calls found</p>
                    <p className="text-sm">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              allCalls.map((call) => (
                <TableRow
                  key={call._id}
                  className="hover:bg-slate-50 border-b border-slate-100"
                >
                  {visibleColumns.includes("callStartTime") && (
                    <TableCell className="px-4 py-3 text-sm">
                      {format(
                        new Date(call.call_start_time),
                        "dd MMMM, yyyy HH:mm"
                      )}
                    </TableCell>
                  )}
                  {visibleColumns.includes("aiAgentName") && (
                    <TableCell className="px-4 py-3 text-sm font-medium text-slate-900">
                      {call.ai_agent_name}
                    </TableCell>
                  )}
                  {visibleColumns.includes("duration") && (
                    <TableCell className="px-4 py-3 text-sm">
                      {formatDuration(call.call_duration_seconds)}
                    </TableCell>
                  )}
                  {visibleColumns.includes("callType") && (
                    <TableCell className="px-4 py-3 text-sm">
                      {call.call_type === "phone_call"
                        ? "Phone"
                        : call.call_type}
                    </TableCell>
                  )}
                  {visibleColumns.includes("callStatus") && (
                    <TableCell className="px-4 py-3">
                      {getStatusBadge(call.call_status)}
                    </TableCell>
                  )}
                  {visibleColumns.includes("callFinishReason") && (
                    <TableCell className="px-4 py-3 text-sm text-slate-600">
                      {call.call_finish_reason.replace(/_/g, " ")}
                    </TableCell>
                  )}
                  {visibleColumns.includes("fromNumber") && (
                    <TableCell className="px-4 py-3 text-sm font-mono">
                      {call.from_number || "N/A"}
                    </TableCell>
                  )}
                  {visibleColumns.includes("toNumber") && (
                    <TableCell className="px-4 py-3 text-sm font-mono">
                      {call.to_number || "N/A"}
                    </TableCell>
                  )}
                  {visibleColumns.includes("direction") && (
                    <TableCell className="px-4 py-3 text-sm capitalize">
                      {call.direction}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Load More Button */}
        {hasNextPage && (
          <div className="p-4 text-center border-t border-slate-200">
            <Button
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              variant="outline"
              className="w-full"
            >
              {isFetchingNextPage ? (
                <>
                  <div className="mr-2 h-4 w-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                  Loading more...
                </>
              ) : (
                `Load More Calls`
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
