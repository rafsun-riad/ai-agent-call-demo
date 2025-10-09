"use client";

import Breadcrumb from "@/components/breadcrumb";
import SystemPromptEditor from "@/components/system-prompt-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAIAgentDetails } from "@/hooks/useAIAgentDetails";
import { Copy, MessageSquare, Save } from "lucide-react";
import { useEffect, useState } from "react";

interface AIAgentDetailsPageContentProps {
  agentId: string;
}

export default function AIAgentDetailsPageContent({
  agentId,
}: AIAgentDetailsPageContentProps) {
  const { data: agentData } = useAIAgentDetails(agentId);
  const [copySuccess, setCopySuccess] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [welcomeMessageChanged, setWelcomeMessageChanged] = useState(false);

  // Initialize welcome message when data loads
  useEffect(() => {
    if (agentData?.welcome_message) {
      setWelcomeMessage(agentData.welcome_message.replace(/\\n/g, "\n"));
    }
  }, [agentData?.welcome_message]);

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(agentData, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy JSON:", err);
    }
  };

  const handleSystemPromptSave = async (updatedPrompt: string) => {
    try {
      // TODO: Implement API call to update system prompt
      console.log("Saving system prompt:", updatedPrompt);
      // You can implement the API call here using the PATCH endpoint
    } catch (err) {
      console.error("Failed to save system prompt:", err);
    }
  };

  const handleWelcomeMessageChange = (value: string) => {
    setWelcomeMessage(value);
    setWelcomeMessageChanged(
      value !== (agentData?.welcome_message?.replace(/\\n/g, "\n") || "")
    );
  };

  const handleWelcomeMessageSave = async () => {
    try {
      // TODO: Implement API call to update welcome message
      console.log("Saving welcome message:", welcomeMessage);
      setWelcomeMessageChanged(false);
      // You can implement the API call here using the PATCH endpoint
    } catch (err) {
      console.error("Failed to save welcome message:", err);
    }
  };

  const handleWelcomeMessageDiscard = () => {
    setWelcomeMessage(agentData?.welcome_message?.replace(/\\n/g, "\n") || "");
    setWelcomeMessageChanged(false);
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

      {/* System Prompt Editor */}
      <SystemPromptEditor
        systemPrompt={agentData.llm?.system_prompt || ""}
        onSave={handleSystemPromptSave}
        isEditable={true}
      />

      {/* Welcome Message Editor */}
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Welcome Message
            </CardTitle>
            {welcomeMessageChanged && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWelcomeMessageDiscard}
                  className="text-slate-600"
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  onClick={handleWelcomeMessageSave}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Textarea
            value={welcomeMessage}
            onChange={(e) => handleWelcomeMessageChange(e.target.value)}
            placeholder="Enter the welcome message that will be played when a call starts..."
            className="min-h-32 max-h-48 resize-y text-sm leading-relaxed"
            rows={6}
          />
          {welcomeMessageChanged && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-700">
                You have unsaved changes. Click &quot;Save Changes&quot; to
                apply them or &quot;Discard&quot; to revert.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full Agent Data (Collapsible) */}
      <details className="bg-slate-50 rounded-lg border">
        <summary className="border-b bg-slate-100 px-4 py-2 rounded-t-lg cursor-pointer hover:bg-slate-200 transition-colors">
          <h2 className="text-sm font-medium text-slate-700 inline">
            Full Agent Data (JSON) - Click to expand
          </h2>
        </summary>
        <div className="p-4">
          <div className="flex justify-end mb-2">
            <Button
              onClick={handleCopyJson}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              {copySuccess ? "Copied!" : "Copy JSON"}
            </Button>
          </div>
          <pre className="text-sm text-slate-800 overflow-x-auto whitespace-pre-wrap break-words">
            {JSON.stringify(agentData, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
}
