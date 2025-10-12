import { useInfiniteQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";

export interface CallResponse {
  calls: CallData[];
  next_page_token: string | null;
  total_count: number;
}

export interface CallData {
  _id: string;
  ai_agent_id: string;
  ai_agent_name: string;
  call_status: string;
  override_ai_agent_id: string | null;
  metadata: unknown | null;
  pia_llm_dynamic_data: unknown | null;
  call_start_time: string;
  call_end_time: string | null;
  messages: Array<{
    role: string;
    content: string;
  }>;
  recorded_call_audio_url: string;
  access_token: string | null;
  call_duration_seconds: number;
  call_type: string;
  call_finish_reason: string;
  call_id: string;
  from_number: string;
  to_number: string;
  direction: string;
  pcs_status: string;
}

export interface CallsQueryParams {
  sort_direction?: "asc" | "desc";
  page_size?: number;
  page_token?: string;
  ai_agent_id?: string;
}

export function useCalls(params: CallsQueryParams = {}) {
  const { get } = useApi();

  const defaultParams: CallsQueryParams = {
    sort_direction: "desc",
    page_size: 50,
    ...params,
  };

  return useInfiniteQuery({
    queryKey: ["calls", defaultParams],
    queryFn: async ({ pageParam }) => {
      const queryParams = new URLSearchParams();

      // Add default params
      Object.entries(defaultParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      // Add page token if exists
      if (pageParam) {
        queryParams.append("page_token", pageParam);
      }

      const response = await get(`/v1/calls/?${queryParams.toString()}`);
      return response.data as CallResponse;
    },
    getNextPageParam: (lastPage) => lastPage.next_page_token,
    initialPageParam: undefined as string | undefined,
  });
}
