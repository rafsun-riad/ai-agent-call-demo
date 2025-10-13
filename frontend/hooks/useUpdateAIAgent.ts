"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
    onMutate: () => {
      const toastId = toast.loading("Updating AI agent...");
      return { id: toastId };
    },
    onSuccess: (data, variables, context) => {
      toast.success("AI agent updated successfully!", { id: context.id });

      // Invalidate and refetch the agent details
      queryClient.invalidateQueries({
        queryKey: ["aiAgentDetails", agentId],
      });
    },
    onError: (error: unknown, variables, context) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update AI agent. Please try again.";

      toast.error(errorMessage, { id: context?.id });
    },
  });
};
