"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AIAgent } from "@/hooks/useAIAgents";
import { ArrowUpDown, Trash2 } from "lucide-react";
import Link from "next/link";
import { COLUMN_LABELS, ColumnKey } from "./column-visibility-selector";

export type SortField =
  | "agentName"
  | "agentType"
  | "voice"
  | "createdAt"
  | "updatedAt";
export type SortDirection = "asc" | "desc";

type Props = {
  agents: AIAgent[];
  visibleColumns: ColumnKey[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onDelete: (id: string) => void;
};

export default function AIAgentsTable({
  agents,
  visibleColumns,
  sortField,
  sortDirection,
  onSort,
  onDelete,
}: Props) {
  const renderSortIcon = () => {
    // Always show the up/down arrow icon for sorting
    return <ArrowUpDown className="h-4 w-4 ml-1 text-slate-600" />;
  };

  const renderSortableHeader = (field: SortField, label: string) => (
    <button
      type="button"
      onClick={() => onSort(field)}
      aria-sort={
        sortField === field
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : undefined
      }
      className="inline-flex items-center gap-1 p-0 text-sm font-medium text-slate-900 hover:underline"
    >
      <span>{label}</span>
      {renderSortIcon()}
    </button>
  );

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.includes("sno") && (
              <TableHead className="w-16">{COLUMN_LABELS.sno}</TableHead>
            )}
            {visibleColumns.includes("agentName") && (
              <TableHead>
                {renderSortableHeader("agentName", COLUMN_LABELS.agentName)}
              </TableHead>
            )}
            {visibleColumns.includes("agentType") && (
              <TableHead>
                {renderSortableHeader("agentType", COLUMN_LABELS.agentType)}
              </TableHead>
            )}
            {visibleColumns.includes("voice") && (
              <TableHead>
                {renderSortableHeader("voice", COLUMN_LABELS.voice)}
              </TableHead>
            )}
            {visibleColumns.includes("createdAt") && (
              <TableHead>
                {renderSortableHeader("createdAt", COLUMN_LABELS.createdAt)}
              </TableHead>
            )}
            {visibleColumns.includes("updatedAt") && (
              <TableHead>
                {renderSortableHeader("updatedAt", COLUMN_LABELS.updatedAt)}
              </TableHead>
            )}
            {visibleColumns.includes("actions") && (
              <TableHead className="w-20">{COLUMN_LABELS.actions}</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length}
                className="text-center py-8 text-slate-500"
              >
                No AI agents found
              </TableCell>
            </TableRow>
          ) : (
            agents.map((agent, index) => (
              <TableRow key={agent.id}>
                {visibleColumns.includes("sno") && (
                  <TableCell className="font-medium">{index + 1}</TableCell>
                )}
                {visibleColumns.includes("agentName") && (
                  <TableCell className="font-medium">
                    <Link
                      href={`/ai-agents/${agent.id}`}
                      className="text-slate-900 hover:text-slate-600 hover:underline"
                    >
                      {agent.agentName}
                    </Link>
                  </TableCell>
                )}
                {visibleColumns.includes("agentType") && (
                  <TableCell className=" capitalize">
                    {agent.agentType}
                  </TableCell>
                )}
                {visibleColumns.includes("voice") && (
                  <TableCell>{agent.voice}</TableCell>
                )}
                {visibleColumns.includes("createdAt") && (
                  <TableCell className="text-slate-600">
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </TableCell>
                )}
                {visibleColumns.includes("updatedAt") && (
                  <TableCell className="text-slate-600">
                    {new Date(agent.updatedAt).toLocaleDateString()}
                  </TableCell>
                )}
                {visibleColumns.includes("actions") && (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(agent.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
