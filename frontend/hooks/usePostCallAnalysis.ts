import { useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";

export interface PostCallAnalysisItem {
  type: string;
  name: string;
  description: string;
  analysis_prompt: string;
  result: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model?: string;
  temperature?: number;
}

export interface PostCallAnalysisResult {
  call_id?: string;
  ai_agent_id?: string;
  items?: PostCallAnalysisItem[];
  message?: string;
  available?: boolean;
}

export function usePostCallAnalysis(
  aiAgentId: string | null,
  callId: string | null
) {
  const { get } = useApi();

  return useQuery({
    queryKey: ["post-call-analysis", aiAgentId, callId],
    queryFn: async () => {
      if (!aiAgentId || !callId)
        throw new Error("AI Agent ID and Call ID are required");
      const response = await get(
        `/v2/ai-agents/${aiAgentId}/postcall-analysis/results/${callId}`
      );

      // Handle the nested data structure from the external API
      const responseData = response.data;
      if (responseData?.data) {
        // If the response has a nested 'data' property, use that
        return responseData.data as PostCallAnalysisResult;
      }

      // Otherwise return the response directly
      return responseData as PostCallAnalysisResult;
    },
    enabled: !!aiAgentId && !!callId,
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 or 500 from the external API
      if (error?.message?.includes("500") || error?.message?.includes("404")) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
  });
}
