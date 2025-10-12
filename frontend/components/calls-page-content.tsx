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
import { cn } from "@/lib/utils";
import { addDays, format, subDays } from "date-fns";
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
  callStartTime: "Call Start Time",
  aiAgentName: "AI Agent Name",
  duration: "Duration",
  callType: "Call Type",
  callStatus: "Call Status",
  callFinishReason: "Finish Reason",
  fromNumber: "From Number",
  toNumber: "To Number",
  direction: "Direction",
};

const DEFAULT_VISIBLE_COLUMNS: ColumnKey[] = [
  "callStartTime",
  "aiAgentName",
  "duration",
  "callStatus",
  "fromNumber",
  "direction",
];

// Mock data for demonstration
const MOCK_CALLS = [
  {
    id: "1",
    callStartTime: "2024-01-15T10:30:00Z",
    aiAgentName: "MetLife Support",
    duration: "00:02:45",
    callType: "Inbound",
    callStatus: "Completed",
    callFinishReason: "Customer ended call",
    fromNumber: "+880171234567",
    toNumber: "+880171234568",
    direction: "Inbound",
  },
  {
    id: "2",
    callStartTime: "2024-01-15T11:15:00Z",
    aiAgentName: "Sales Assistant",
    duration: "00:01:32",
    callType: "Outbound",
    callStatus: "Failed",
    callFinishReason: "No answer",
    fromNumber: "+880171234568",
    toNumber: "+880171234569",
    direction: "Outbound",
  },
  {
    id: "3",
    callStartTime: "2024-01-15T14:22:00Z",
    aiAgentName: "Technical Support",
    duration: "00:05:18",
    callType: "Inbound",
    callStatus: "Completed",
    callFinishReason: "Issue resolved",
    fromNumber: "+880171234570",
    toNumber: "+880171234568",
    direction: "Inbound",
  },
  {
    id: "4",
    callStartTime: "2024-01-15T16:45:00Z",
    aiAgentName: "MetLife Support",
    duration: "00:00:45",
    callType: "Inbound",
    callStatus: "Abandoned",
    callFinishReason: "Customer hung up",
    fromNumber: "+880171234571",
    toNumber: "+880171234568",
    direction: "Inbound",
  },
];

const MOCK_AI_AGENTS = [
  { id: "all", name: "All Agents" },
  { id: "1", name: "MetLife Support" },
  { id: "2", name: "Sales Assistant" },
  { id: "3", name: "Technical Support" },
];

export default function CallsPageContent() {
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    DEFAULT_VISIBLE_COLUMNS
  );

  const filteredCalls = useMemo(() => {
    let filtered = MOCK_CALLS;

    // Filter by AI agent
    if (selectedAgent !== "all") {
      const agentName = MOCK_AI_AGENTS.find(
        (agent) => agent.id === selectedAgent
      )?.name;
      filtered = filtered.filter((call) => call.aiAgentName === agentName);
    }

    // Filter by date range
    if (dateRange?.from) {
      filtered = filtered.filter((call) => {
        const callDate = new Date(call.callStartTime);
        const fromDate = dateRange.from!;
        const toDate = dateRange.to || dateRange.from;
        return callDate >= fromDate && callDate <= addDays(toDate!, 1);
      });
    }

    return filtered;
  }, [selectedAgent, dateRange]);

  const handleColumnToggle = (column: ColumnKey) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
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

  return (
    <div className="space-y-6">
      {/* Header with inline filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md">
            <span className="font-medium">
              Total Calls: {filteredCalls.length}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* AI Agent Filter */}
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All agents" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_AI_AGENTS.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
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
            {filteredCalls.length === 0 ? (
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
              filteredCalls.map((call) => (
                <TableRow
                  key={call.id}
                  className="hover:bg-slate-50 border-b border-slate-100"
                >
                  {visibleColumns.includes("callStartTime") && (
                    <TableCell className="px-4 py-3 text-sm">
                      {format(
                        new Date(call.callStartTime),
                        "dd MMMM, yyyy HH:mm"
                      )}
                    </TableCell>
                  )}
                  {visibleColumns.includes("aiAgentName") && (
                    <TableCell className="px-4 py-3 text-sm font-medium text-slate-900">
                      {call.aiAgentName}
                    </TableCell>
                  )}
                  {visibleColumns.includes("duration") && (
                    <TableCell className="px-4 py-3 text-sm">
                      {call.duration}
                    </TableCell>
                  )}
                  {visibleColumns.includes("callType") && (
                    <TableCell className="px-4 py-3 text-sm">
                      {call.callType}
                    </TableCell>
                  )}
                  {visibleColumns.includes("callStatus") && (
                    <TableCell className="px-4 py-3">
                      {getStatusBadge(call.callStatus)}
                    </TableCell>
                  )}
                  {visibleColumns.includes("callFinishReason") && (
                    <TableCell className="px-4 py-3 text-sm text-slate-600">
                      {call.callFinishReason}
                    </TableCell>
                  )}
                  {visibleColumns.includes("fromNumber") && (
                    <TableCell className="px-4 py-3 text-sm font-mono">
                      {call.fromNumber || "N/A"}
                    </TableCell>
                  )}
                  {visibleColumns.includes("toNumber") && (
                    <TableCell className="px-4 py-3 text-sm font-mono">
                      {call.toNumber || "N/A"}
                    </TableCell>
                  )}
                  {visibleColumns.includes("direction") && (
                    <TableCell className="px-4 py-3 text-sm">
                      {call.direction}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
