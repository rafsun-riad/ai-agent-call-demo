"use client";

import AIAgentsTable, {
  AIAgent,
  SortDirection,
  SortField,
} from "@/components/ai-agents-table";
import ColumnVisibilitySelector, {
  ColumnKey,
} from "@/components/column-visibility-selector";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

// Mock data - replace with actual data fetching
const MOCK_AGENTS: AIAgent[] = [
  {
    id: "1",
    agentName: "Customer Support Agent",
    agentType: "Support",
    voice: "Emma (Female)",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-02-01T14:20:00Z",
  },
  {
    id: "2",
    agentName: "Sales Assistant",
    agentType: "Sales",
    voice: "James (Male)",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-25T16:45:00Z",
  },
  {
    id: "3",
    agentName: "Technical Support",
    agentType: "Technical",
    voice: "Sarah (Female)",
    createdAt: "2024-02-01T11:00:00Z",
    updatedAt: "2024-02-05T13:30:00Z",
  },
];

const DEFAULT_VISIBLE_COLUMNS: ColumnKey[] = [
  "sno",
  "agentName",
  "agentType",
  "createdAt",
  "updatedAt",
  "actions",
];

export default function AIAgentsPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    DEFAULT_VISIBLE_COLUMNS
  );
  const [sortField, setSortField] = useState<SortField | null>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleToggleColumn = (column: ColumnKey) => {
    if (column === "actions") return; // Actions column always visible

    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log("Delete agent:", id);
  };

  const filteredAndSortedAgents = useMemo(() => {
    const filtered = MOCK_AGENTS.filter(
      (agent) =>
        agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.agentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.voice.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortField) {
          case "sno":
            // For S.No, we'll use the original array index
            aValue = MOCK_AGENTS.indexOf(a);
            bValue = MOCK_AGENTS.indexOf(b);
            break;
          case "agentName":
            aValue = a.agentName.toLowerCase();
            bValue = b.agentName.toLowerCase();
            break;
          case "agentType":
            aValue = a.agentType.toLowerCase();
            bValue = b.agentType.toLowerCase();
            break;
          case "createdAt":
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case "updatedAt":
            aValue = new Date(a.updatedAt).getTime();
            bValue = new Date(b.updatedAt).getTime();
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  return (
    <DashboardLayout
      title="AI Agents"
      subtitle="Manage your AI agents for call handling"
      actions={
        <Button className="bg-black text-white hover:bg-slate-800">
          <Plus className="h-4 w-4 mr-2" />
          Create Agent
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Search and Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <ColumnVisibilitySelector
            visibleColumns={visibleColumns}
            onToggleColumn={handleToggleColumn}
          />
        </div>

        {/* Table */}
        <AIAgentsTable
          agents={filteredAndSortedAgents}
          visibleColumns={visibleColumns}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}
