import { useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";

export interface PostCallAnalysisResult {
  call_summary?: string;
  customer_feedback?: string;
  // Add other fields as needed based on the API response
  [key: string]: unknown;
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
      return response.data as PostCallAnalysisResult;
    },
    enabled: !!aiAgentId && !!callId,
  });
}
