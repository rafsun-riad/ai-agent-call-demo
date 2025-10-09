"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  CalendarIcon,
  Eye,
  EyeOff,
  Phone,
  RefreshCw,
  Settings2,
} from "lucide-react";
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

  const handleRefresh = () => {
    setSelectedAgent("all");
    setDateRange({
      from: subDays(new Date(), 7),
      to: new Date(),
    });
  };

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
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
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

  const getDirectionIcon = (direction: string) => {
    return direction === "Inbound" ? "↓" : "↑";
  };

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Phone className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-slate-600">Total Calls</p>
              <p className="text-3xl font-bold text-slate-900">
                {filteredCalls.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters Section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* AI Agent Select */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                AI Agent
              </label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_AI_AGENTS.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Picker */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Date Range
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
            </div>

            {/* Column Selector */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Table Columns
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings2 className="mr-2 h-4 w-4" />
                    Customize Columns
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start">
                  <div className="space-y-2">
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

            {/* Refresh Button */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Actions
              </label>
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calls Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {visibleColumns.map((column) => (
                    <TableHead
                      key={column}
                      className="font-semibold whitespace-nowrap"
                    >
                      {COLUMN_LABELS[column]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow key={call.id} className="hover:bg-slate-50">
                    {visibleColumns.includes("callStartTime") && (
                      <TableCell className="whitespace-nowrap">
                        {format(
                          new Date(call.callStartTime),
                          "MMM dd, yyyy HH:mm"
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.includes("aiAgentName") && (
                      <TableCell className="font-medium">
                        {call.aiAgentName}
                      </TableCell>
                    )}
                    {visibleColumns.includes("duration") && (
                      <TableCell className="whitespace-nowrap font-mono">
                        {call.duration}
                      </TableCell>
                    )}
                    {visibleColumns.includes("callType") && (
                      <TableCell>{call.callType}</TableCell>
                    )}
                    {visibleColumns.includes("callStatus") && (
                      <TableCell>{getStatusBadge(call.callStatus)}</TableCell>
                    )}
                    {visibleColumns.includes("callFinishReason") && (
                      <TableCell className="max-w-xs truncate">
                        {call.callFinishReason}
                      </TableCell>
                    )}
                    {visibleColumns.includes("fromNumber") && (
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        {call.fromNumber}
                      </TableCell>
                    )}
                    {visibleColumns.includes("toNumber") && (
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        {call.toNumber}
                      </TableCell>
                    )}
                    {visibleColumns.includes("direction") && (
                      <TableCell>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <span className="text-lg">
                            {getDirectionIcon(call.direction)}
                          </span>
                          {call.direction}
                        </span>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCalls.length === 0 && (
            <div className="text-center py-12">
              <Phone className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No calls found
              </h3>
              <p className="text-slate-500">
                No calls match your current filters. Try adjusting your search
                criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
