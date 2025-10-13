"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AIAgentData } from "./useAIAgents";
import { useApi } from "./useApi";

interface UpdateAIAgentRequest {
  agent_name?: string;
  language_code?: string;
  llm?: {
    system_prompt?: string;
  };
  welcome_message?: string;
}

interface UpdateAIAgentResponse {
  ai_agent_id: string;
  status: string;
  message: string;
  [key: string]: unknown;
}

export const useUpdateAIAgent = (agentId: string) => {
  const { put } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: UpdateAIAgentRequest
    ): Promise<UpdateAIAgentResponse> => {
      const response = await put(`/api/ai-agents/${agentId}`, data);
      return response.data as UpdateAIAgentResponse;
    },
    onMutate: async (variables) => {
      const toastId = toast.loading("Updating AI agent...");

      // Cancel any outgoing refetches for the agent details
      await queryClient.cancelQueries({ queryKey: ["ai-agent", agentId] });

      // Snapshot the previous value for potential rollback
      const previousAgentData = queryClient.getQueryData(["ai-agent", agentId]);

      // Optimistically update the cache with new data
      queryClient.setQueryData(
        ["ai-agent", agentId],
        (old: AIAgentData | undefined) => {
          if (!old) return old;

          return {
            ...old,
            // Update specific fields based on what's being changed
            ...(variables.agent_name && { agent_name: variables.agent_name }),
            ...(variables.welcome_message && {
              welcome_message: variables.welcome_message,
            }),
            ...(variables.llm?.system_prompt && {
              llm: {
                ...old.llm,
                system_prompt: variables.llm.system_prompt,
              },
            }),
          };
        }
      );

      return { id: toastId, previousAgentData };
    },
    onSuccess: (data, variables, context) => {
      toast.success("AI agent updated successfully!", { id: context.id });

      // Since we're doing optimistic updates, we still want to invalidate
      // to ensure we have the latest server state, but it's less critical
      queryClient.invalidateQueries({
        queryKey: ["ai-agent", agentId],
      });

      // Also invalidate the general AI agents list if it exists
      queryClient.invalidateQueries({
        queryKey: ["ai-agents"],
      });
    },
    onError: (error: unknown, variables, context) => {
      // Rollback the optimistic update by restoring the previous data
      if (context?.previousAgentData) {
        queryClient.setQueryData(
          ["ai-agent", agentId],
          context.previousAgentData
        );
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update AI agent. Please try again.";

      toast.error(errorMessage, { id: context?.id });
    },
  });
};
