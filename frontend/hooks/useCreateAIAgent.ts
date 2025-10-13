"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApi } from "./useApi";

interface CreateAIAgentRequest {
  agent_name: string;
  language_code: string;
  llm: {
    llm_type: string;
    model_provider: string;
    model_name: string;
    system_prompt: string;
    model_temperature: number;
  };
  stt: {
    provider: string;
    model: string;
  };
  tts: {
    provider: string;
    voice_name: string;
    voice_id: string;
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
      console.log(
        "🎯 useCreateAIAgent - Sending data:",
        JSON.stringify(data, null, 2)
      );

      try {
        const response = await post(`/api/ai-agents`, data);
        console.log("✅ useCreateAIAgent - Success response:", response.data);
        return response.data as CreateAIAgentResponse;
      } catch (error) {
        console.error("❌ useCreateAIAgent - Error:", error);
        throw error;
      }
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
      console.error("💥 useCreateAIAgent - onError triggered:", error);

      let errorMessage = "Failed to create AI agent. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
        console.error("💥 Error message:", error.message);
        console.error("💥 Error stack:", error.stack);
      }

      // Check if it's an axios error with response data
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { details?: string }; status?: number };
        };
        console.error("💥 Axios error response:", axiosError.response?.data);
        console.error("💥 Axios error status:", axiosError.response?.status);

        if (axiosError.response?.data?.details) {
          errorMessage = `${errorMessage} Details: ${axiosError.response.data.details}`;
        }
      }

      toast.error(errorMessage, { id: context?.id });
    },
  });
};
