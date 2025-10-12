import { useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { CallData } from "./useCalls";

export type CallDetailsResponse = CallData;

export function useCallDetails(callId: string | null) {
  const { get } = useApi();

  return useQuery({
    queryKey: ["call-details", callId],
    queryFn: async () => {
      if (!callId) throw new Error("Call ID is required");
      const response = await get(`/v1/calls/${callId}`);
      return response.data as CallDetailsResponse;
    },
    enabled: !!callId,
  });
}
