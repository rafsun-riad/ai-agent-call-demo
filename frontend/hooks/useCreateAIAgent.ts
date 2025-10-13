"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApi } from "./useApi";

interface CreateAIAgentRequest {
  agent_name: string;
  llm: {
    llm_type: string;
    max_tokens: number;
    model_provider: string;
    model_name: string;
    model_temperature: number;
    system_prompt: string;
  };
  stt: {
    provider: string;
    model: string;
  };
  tts: {
    provider: string;
    voice_name: string;
    voice_id: string;
    voice_temperature: number;
  };
  welcome_message: string;
}

interface CreateAIAgentResponse {
  ai_agent_id: string;
  status: string;
  message: string;
  [key: string]: unknown;
}

export const useCreateAIAgent = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (
      data: CreateAIAgentRequest
    ): Promise<CreateAIAgentResponse> => {
      const response = await post(`/api/ai-agents`, data);
      return response.data as CreateAIAgentResponse;
    },
    onMutate: () => {
      const toastId = toast.loading("Creating AI agent...");
      return { id: toastId };
    },
    onSuccess: (data, variables, context) => {
      toast.success("AI agent created successfully!", { id: context.id });

      // Invalidate and refetch the AI agents list
      queryClient.invalidateQueries({
        queryKey: ["ai-agents"],
      });

      // Navigate to the agent details page
      if (data.ai_agent_id) {
        router.push(`/ai-agents/${data.ai_agent_id}`);
      }
    },
    onError: (error: unknown, variables, context) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create AI agent. Please try again.";

      toast.error(errorMessage, { id: context?.id });
    },
  });
};
