import { useSuspenseQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";

export interface AIAgentResponse {
  data: AIAgentData[];
  next_page_token: string | null;
}

export interface AIAgentData {
  ai_agent_id: string;
  agent_name: string;
  agent_status: "ACTIVE" | "INACTIVE";
  language_code: string;
  created_at: number;
  modified_at: number;
  created_by_user_id: string;
  modified_by_user_id: string | null;
  organization_id: string;
  workspace_id: string | null;
  knowledge_base_id: string | null;
  enable_user_interruptions: boolean;
  minimum_speech_duration_for_interruptions: number;
  minimum_words_before_interruption: number;
  wait_time_before_detecting_end_of_speech: number;
  ambient_sound: string;
  ambient_sound_volume: number;
  webhook_url: string | null;
  end_call_after_silence_seconds: number;
  max_call_duration_seconds: number;
  welcome_message: string;
  voicemail_detection_timeout_seconds: number;
  agent_ended_call_delay_seconds: number | null;
  welcome_message_delay_in_seconds: number | null;
  dynamic_data_config: unknown | null;
  post_call_analysis: unknown | null;
  tts: {
    provider: string;
    voice_id: string;
    voice_name: string;
    model_name: string | null;
    voice_temperature: number;
  };
  llm: {
    tools: unknown | null;
    llm_id: string;
    llm_type: string;
    model_provider: string;
    llm_description: string | null;
    base_url: string | null;
    api_key: string | null;
    llm_name: string | null;
    max_tokens: number;
    model_name: string;
    model_temperature: number;
    required_dynamic_data: unknown | null;
    system_prompt: string;
    graph_data: unknown | null;
  };
  stt: {
    provider: string;
    model: string;
  };
}

// Transformed AI Agent type for the table
export interface AIAgent {
  id: string;
  agentName: string;
  agentType: string;
  voice: string;
  createdAt: string;
  updatedAt: string;
}

// Transform API data to match our table structure
export function transformAIAgentData(apiData: AIAgentData[]): AIAgent[] {
  return apiData.map((agent) => ({
    id: agent.ai_agent_id,
    agentName: agent.agent_name,
    agentType:
      `${agent.llm.model_provider} (${agent.language_code})` || "Unknown",
    voice: `${agent.tts.voice_name} (${agent.tts.provider})` || "Unknown",
    createdAt: new Date(agent.created_at * 1000).toISOString(),
    updatedAt: new Date(agent.modified_at * 1000).toISOString(),
  }));
}

export function useAIAgents() {
  const api = useApi();

  return useSuspenseQuery({
    queryKey: ["ai-agents"],
    queryFn: async (): Promise<AIAgent[]> => {
      const response = await api.get("/v2/ai-agents/");
      const apiResponse: AIAgentResponse = response.data;
      return transformAIAgentData(apiResponse.data);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
