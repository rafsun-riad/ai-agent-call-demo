"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AIAgent } from "./useAIAgents";
import { useApi } from "./useApi";

interface DeleteAIAgentResponse {
  status: string;
  message: string;
  [key: string]: unknown;
}

export const useDeleteAIAgent = () => {
  const { del } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (agentId: string): Promise<DeleteAIAgentResponse> => {
      const response = await del(`/api/ai-agents/${agentId}`);
      return response.data as DeleteAIAgentResponse;
    },
    onMutate: async (agentId) => {
      const toastId = toast.loading("Deleting AI agent...");

      // Cancel any outgoing refetches for the agents list
      await queryClient.cancelQueries({ queryKey: ["ai-agents"] });

      // Snapshot the previous value for potential rollback
      const previousAgents = queryClient.getQueryData(["ai-agents"]);

      // Optimistically remove the agent from the cache
      queryClient.setQueryData(["ai-agents"], (old: AIAgent[] | undefined) => {
        if (!old) return old;
        return old.filter((agent) => agent.id !== agentId);
      });

      return { id: toastId, previousAgents, agentId };
    },
    onSuccess: (data, variables, context) => {
      toast.success("AI agent deleted successfully!", { id: context.id });

      // Invalidate and refetch the AI agents list
      queryClient.invalidateQueries({
        queryKey: ["ai-agents"],
      });
    },
    onError: (error: unknown, variables, context) => {
      // Rollback the optimistic update by restoring the previous data
      if (context?.previousAgents) {
        queryClient.setQueryData(["ai-agents"], context.previousAgents);
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to delete AI agent. Please try again.";

      toast.error(errorMessage, { id: context?.id });
    },
  });
};
