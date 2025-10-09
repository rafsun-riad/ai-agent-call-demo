"use client";

import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAIAgentDetails } from "@/hooks/useAIAgentDetails";
import { Copy } from "lucide-react";
import { useState } from "react";

interface AIAgentDetailsPageContentProps {
  agentId: string;
}

export default function AIAgentDetailsPageContent({
  agentId,
}: AIAgentDetailsPageContentProps) {
  const { data: agentData } = useAIAgentDetails(agentId);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(agentData, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy JSON:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "AI Agents", href: "/ai-agents" },
          { label: agentData.agent_name },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {agentData.agent_name}
          </h1>
          <div className="space-y-1 mt-2">
            <p className="text-slate-600">Agent ID: {agentData.ai_agent_id}</p>
            <p className="text-slate-600">LLM ID: {agentData.llm?.llm_id}</p>
          </div>
        </div>

        <Button
          onClick={handleCopyJson}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          {copySuccess ? "Copied!" : "Copy JSON"}
        </Button>
      </div>

      {/* Agent Status */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-600">Status:</span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            agentData.agent_status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {agentData.agent_status}
        </span>
        <span className="text-sm text-slate-500 ml-4">
          Language: {agentData.language_code}
        </span>
      </div>

      {/* JSON Display */}
      <div className="bg-slate-50 rounded-lg border">
        <div className="border-b bg-slate-100 px-4 py-2 rounded-t-lg">
          <h2 className="text-sm font-medium text-slate-700">
            Agent Data (JSON)
          </h2>
        </div>
        <div className="p-4">
          <pre className="text-sm text-slate-800 overflow-x-auto whitespace-pre-wrap break-words">
            {JSON.stringify(agentData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
