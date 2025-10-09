"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Settings2 } from "lucide-react";

export type ColumnKey =
  | "sno"
  | "agentName"
  | "agentType"
  | "voice"
  | "createdAt"
  | "updatedAt"
  | "actions";

export const COLUMN_LABELS: Record<ColumnKey, string> = {
  sno: "S.No",
  agentName: "Agent Name",
  agentType: "Agent Type",
  voice: "Voice",
  createdAt: "Created At",
  updatedAt: "Updated At",
  actions: "Actions",
};

type Props = {
  visibleColumns: ColumnKey[];
  onToggleColumn: (column: ColumnKey) => void;
};

export default function ColumnVisibilitySelector({
  visibleColumns,
  onToggleColumn,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-10">
          <Settings2 className="h-4 w-4 mr-2" />
          Columns
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(COLUMN_LABELS).map(([key, label]) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={visibleColumns.includes(key as ColumnKey)}
            onCheckedChange={() => onToggleColumn(key as ColumnKey)}
            disabled={key === "actions"} // Actions column always visible
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
