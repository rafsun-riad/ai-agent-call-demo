import { useSuspenseQuery } from "@tanstack/react-query";
import { AIAgentData } from "./useAIAgents";
import { useApi } from "./useApi";

export function useAIAgentDetails(agentId: string) {
  const api = useApi();

  return useSuspenseQuery({
    queryKey: ["ai-agent", agentId],
    queryFn: async (): Promise<AIAgentData> => {
      const response = await api.get(`/api/ai-agents/${agentId}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
