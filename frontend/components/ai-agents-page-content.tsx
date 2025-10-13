"use client";

import AIAgentsTable, {
  SortDirection,
  SortField,
} from "@/components/ai-agents-table";
import ColumnVisibilitySelector, {
  ColumnKey,
} from "@/components/column-visibility-selector";
import DashboardLayout from "@/components/dashboard-layout";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIAgents } from "@/hooks/useAIAgents";
import { useCreateAIAgent } from "@/hooks/useCreateAIAgent";
import { useDeleteAIAgent } from "@/hooks/useDeleteAIAgent";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

const DEFAULT_VISIBLE_COLUMNS: ColumnKey[] = [
  "sno",
  "agentName",
  "agentType",
  "voice",
  "createdAt",
  "actions",
];

export default function AIAgentsPageContent() {
  const { data: agents } = useAIAgents();
  const deleteAIAgentMutation = useDeleteAIAgent();
  const createAIAgentMutation = useCreateAIAgent();

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    DEFAULT_VISIBLE_COLUMNS
  );
  const [sortField, setSortField] = useState<SortField | null>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

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
    const agent = agents.find((a) => a.id === id);
    if (agent) {
      setAgentToDelete({ id, name: agent.agentName });
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (agentToDelete) {
      try {
        await deleteAIAgentMutation.mutateAsync(agentToDelete.id);
        setDeleteDialogOpen(false);
        setAgentToDelete(null);
      } catch (error) {
        // Error is handled by the mutation hook
        console.error("Delete failed:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAgentToDelete(null);
  };

  const handleCreateAgent = () => {
    const newAgentData = {
      agent_name: "Simple Agent",
      llm: {
        llm_type: "simple",
        max_tokens: 4096,
        model_provider: "openai",
        model_name: "gpt-4o-mini",
        model_temperature: 0,
        system_prompt: "You are a simple friendly AI assistant",
      },
      stt: {
        provider: "pia",
        model: "pia_bangla_v1",
      },
      tts: {
        provider: "pia",
        voice_name: "Maria",
        voice_id: "maria",
        voice_temperature: 0,
      },
      welcome_message: "Hello, How Can I help you today?",
    };

    createAIAgentMutation.mutate(newAgentData);
  };

  const filteredAndSortedAgents = useMemo(() => {
    const filtered = agents.filter(
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
          case "agentName":
            aValue = a.agentName.toLowerCase();
            bValue = b.agentName.toLowerCase();
            break;
          case "agentType":
            aValue = a.agentType.toLowerCase();
            bValue = b.agentType.toLowerCase();
            break;
          case "voice":
            aValue = a.voice.toLowerCase();
            bValue = b.voice.toLowerCase();
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
  }, [agents, searchTerm, sortField, sortDirection]);

  return (
    <DashboardLayout
      title="AI Agents"
      subtitle="Manage your AI agents for call handling"
      actions={
        <Button
          className="bg-black text-white hover:bg-slate-800"
          onClick={handleCreateAgent}
          disabled={createAIAgentMutation.isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          {createAIAgentMutation.isPending ? "Creating..." : "Create Agent"}
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        agentName={agentToDelete?.name || ""}
        isDeleting={deleteAIAgentMutation.isPending}
      />
    </DashboardLayout>
  );
}
